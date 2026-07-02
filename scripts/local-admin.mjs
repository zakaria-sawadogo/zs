import { createServer } from "node:http";
import { spawn } from "node:child_process";
import { cwd, env, exit } from "node:process";

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

  const add = await run("git", ["add", "data", "public/images"]);
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
