import { createServer } from "node:http";
import { spawn } from "node:child_process";
import { cwd, env, exit } from "node:process";
import { mkdir, writeFile } from "node:fs/promises";
import { basename, join, normalize, relative } from "node:path";

const projectRoot = cwd();
const apiPort = 8787;

function run(command, args) {
  return new Promise((resolve) => {
    const child = spawn(command, args, {
      cwd: projectRoot,
      env,
      shell: false
    });

    let stdout = "";
    let stderr = "";
    child.stdout.on("data", (chunk) => {
      stdout += chunk.toString();
    });
    child.stderr.on("data", (chunk) => {
      stderr += chunk.toString();
    });
    child.on("close", (code) => {
      resolve({ code, stdout, stderr });
    });
  });
}

async function publish() {
  const status = await run("git", ["status", "--short"]);
  if (status.code !== 0) {
    return { ok: false, message: status.stderr || status.stdout };
  }

  if (!status.stdout.trim()) {
    return { ok: true, message: "Aucun changement à publier." };
  }

  const add = await run("git", ["add", "data", "public"]);
  if (add.code !== 0) {
    return { ok: false, message: add.stderr || add.stdout };
  }

  const staged = await run("git", ["diff", "--cached", "--quiet"]);
  if (staged.code === 0) {
    return { ok: true, message: "Aucun changement de contenu à publier." };
  }

  const timestamp = new Date().toISOString().replace("T", " ").slice(0, 16);
  const commit = await run("git", ["commit", "-m", `Update website content ${timestamp}`]);
  if (commit.code !== 0) {
    return { ok: false, message: commit.stderr || commit.stdout };
  }

  const branch = await run("git", ["branch", "--show-current"]);
  const branchName = branch.stdout.trim() || "main";
  const push = await run("git", ["push", "origin", branchName]);
  if (push.code !== 0) {
    return { ok: false, message: push.stderr || push.stdout };
  }

  return {
    ok: true,
    message: `${commit.stdout}\n${push.stdout || push.stderr}`.trim()
  };
}

function readJsonBody(request) {
  return new Promise((resolve, reject) => {
    let body = "";
    request.on("data", (chunk) => {
      body += chunk.toString();
    });
    request.on("end", () => {
      try {
        resolve(JSON.parse(body || "{}"));
      } catch (error) {
        reject(error);
      }
    });
    request.on("error", reject);
  });
}

function safeProjectPath(...parts) {
  const target = normalize(join(projectRoot, ...parts));
  const rel = relative(projectRoot, target);
  if (rel.startsWith("..") || rel.includes("..")) {
    throw new Error("Chemin refusé.");
  }
  return target;
}

async function writeDataFile(payload) {
  const filename = basename(String(payload.filename ?? ""));
  if (!filename.endsWith(".json")) {
    return { ok: false, message: "Nom de fichier JSON invalide." };
  }

  const target = safeProjectPath("data", filename);
  await writeFile(target, `${JSON.stringify(payload.data, null, 2)}\n`, "utf8");
  return { ok: true, message: `${filename} écrit dans data/.` };
}

async function writePublicFile(payload) {
  const folder = String(payload.folder ?? "");
  const filename = basename(String(payload.filename ?? ""));
  const contentBase64 = String(payload.contentBase64 ?? "");

  if (!["downloads", "publications", "images"].includes(folder)) {
    return { ok: false, message: "Dossier public refusé." };
  }
  if (!filename || filename !== String(payload.filename)) {
    return { ok: false, message: "Nom de fichier invalide." };
  }

  const directory = safeProjectPath("public", folder);
  await mkdir(directory, { recursive: true });
  await writeFile(join(directory, filename), Buffer.from(contentBase64, "base64"));
  return { ok: true, message: `${filename} écrit dans public/${folder}/`, url: `/${folder}/${filename}` };
}

const api = createServer(async (request, response) => {
  response.setHeader("Access-Control-Allow-Origin", "*");
  response.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  response.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (request.method === "OPTIONS") {
    response.writeHead(204);
    response.end();
    return;
  }

  if (request.method === "POST" && request.url === "/publish") {
    const result = await publish();
    response.writeHead(result.ok ? 200 : 500, { "Content-Type": "application/json" });
    response.end(JSON.stringify(result));
    return;
  }

  if (request.method === "POST" && request.url === "/write-data") {
    try {
      const result = await writeDataFile(await readJsonBody(request));
      response.writeHead(result.ok ? 200 : 400, { "Content-Type": "application/json" });
      response.end(JSON.stringify(result));
    } catch (error) {
      response.writeHead(500, { "Content-Type": "application/json" });
      response.end(JSON.stringify({ ok: false, message: String(error) }));
    }
    return;
  }

  if (request.method === "POST" && request.url === "/write-public") {
    try {
      const result = await writePublicFile(await readJsonBody(request));
      response.writeHead(result.ok ? 200 : 400, { "Content-Type": "application/json" });
      response.end(JSON.stringify(result));
    } catch (error) {
      response.writeHead(500, { "Content-Type": "application/json" });
      response.end(JSON.stringify({ ok: false, message: String(error) }));
    }
    return;
  }

  response.writeHead(404, { "Content-Type": "application/json" });
  response.end(JSON.stringify({ ok: false, message: "Route introuvable." }));
});

api.listen(apiPort, "127.0.0.1", () => {
  console.log(`Local admin publish server: http://127.0.0.1:${apiPort}`);
});

const next = spawn("npm", ["run", "dev"], {
  cwd: projectRoot,
  env: {
    ...env,
    NEXT_PUBLIC_ENABLE_ADMIN: "true",
    NEXT_PUBLIC_LOCAL_PUBLISH_URL: `http://127.0.0.1:${apiPort}/publish`
  },
  stdio: "inherit"
});

function shutdown() {
  next.kill("SIGINT");
  api.close();
  exit(0);
}

process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);
