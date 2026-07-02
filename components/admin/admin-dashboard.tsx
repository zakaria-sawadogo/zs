"use client";

import { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Check, Copy, Download, Eye, FileJson, FolderOpen, Plus, Save, Trash2 } from "lucide-react";
import { Button } from "@/components/design/button";
import { Card } from "@/components/design/card";
import { Container } from "@/components/design/container";
import { Heading } from "@/components/design/heading";
import { Badge } from "@/components/design/badge";
import { Modal } from "@/components/design/modal";
import { Toast } from "@/components/design/toast";
import { siteData, type DataKey } from "@/lib/data";
import { cn } from "@/utils/cn";

type AdminSection = {
  key: DataKey | "skills" | "downloads" | "cv";
  label: string;
  description: string;
};

type FormValues = {
  json: string;
};

type FileSystemWritableFileStreamLike = {
  write: (data: Blob) => Promise<void>;
  close: () => Promise<void>;
};

type FileSystemFileHandleLike = {
  createWritable: () => Promise<FileSystemWritableFileStreamLike>;
};

type FileSystemDirectoryHandleLike = {
  getDirectoryHandle: (name: string) => Promise<FileSystemDirectoryHandleLike>;
  getFileHandle: (name: string, options?: { create?: boolean }) => Promise<FileSystemFileHandleLike>;
};

type WindowWithSavePicker = Window & {
  showDirectoryPicker?: () => Promise<FileSystemDirectoryHandleLike>;
  showSaveFilePicker?: (options: {
    suggestedName: string;
    types: Array<{ description: string; accept: Record<string, string[]> }>;
  }) => Promise<FileSystemFileHandleLike>;
};

const sections: AdminSection[] = [
  { key: "settings", label: "Dashboard", description: "SEO, navigation, and site-wide settings." },
  { key: "profile", label: "Profil", description: "Identity, biography, contact, statistics, responsibilities." },
  { key: "experience", label: "Expériences", description: "Academic and professional timeline." },
  { key: "education", label: "Diplômes", description: "Degrees and academic training." },
  { key: "skills", label: "Compétences", description: "Editable through profile.skills." },
  { key: "publications", label: "Publications", description: "Scholar-style publication records." },
  { key: "research", label: "Recherche", description: "Research axes, technologies, projects, publications." },
  { key: "projects", label: "Projets", description: "Applied projects and partner information." },
  { key: "courses", label: "Enseignement", description: "Courses, TP, and downloadable supports." },
  { key: "laboratory", label: "Laboratoire", description: "Mission, vision, equipment, axes, partners." },
  { key: "grants", label: "Financements", description: "Grants and sponsored research." },
  { key: "talks", label: "Conférences", description: "Talks, slides, events, locations." },
  { key: "students", label: "Étudiants", description: "Current and former supervisees." },
  { key: "gallery", label: "Galerie", description: "Images and captions." },
  { key: "downloads", label: "Téléchargements", description: "Managed through profile.cvUrl and course materials." },
  { key: "cv", label: "CV", description: "Managed through profile.cvUrl and profile details." },
  { key: "social", label: "Paramètres sociaux", description: "Academic and social profiles." }
];

const jsonSchema = z.string().min(2).transform((value, context) => {
  try {
    return JSON.parse(value) as unknown;
  } catch {
    context.addIssue({ code: z.ZodIssueCode.custom, message: "JSON invalide" });
    return z.NEVER;
  }
});

function getSectionData(key: AdminSection["key"]) {
  if (key === "skills") return siteData.profile.skills;
  if (key === "downloads") {
    return {
      cv: siteData.profile.cvUrl,
      courseMaterials: siteData.courses.flatMap((course) => course.materials)
    };
  }
  if (key === "cv") {
    return {
      cvUrl: siteData.profile.cvUrl,
      name: siteData.profile.name,
      title: siteData.profile.title,
      bio: siteData.profile.bio
    };
  }
  return siteData[key];
}

function fileNameFor(key: AdminSection["key"]) {
  if (key === "skills" || key === "downloads" || key === "cv") return "profile.json";
  return `${key}.json`;
}

function writableDataFor(key: AdminSection["key"], data: unknown) {
  if (key === "skills") {
    return { ...siteData.profile, skills: data };
  }

  if (key === "cv") {
    const cv = data as Partial<typeof siteData.profile>;
    return {
      ...siteData.profile,
      cvUrl: cv.cvUrl ?? siteData.profile.cvUrl,
      name: cv.name ?? siteData.profile.name,
      title: cv.title ?? siteData.profile.title,
      bio: cv.bio ?? siteData.profile.bio
    };
  }

  if (key === "downloads") {
    const downloads = data as { cv?: string };
    return { ...siteData.profile, cvUrl: downloads.cv ?? siteData.profile.cvUrl };
  }

  return data;
}

function downloadJson(filename: string, data: unknown) {
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  link.click();
  URL.revokeObjectURL(url);
}

export function AdminDashboard() {
  const [activeKey, setActiveKey] = useState<AdminSection["key"]>("settings");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [store, setStore] = useState<Record<string, unknown>>({});
  const [projectDirectory, setProjectDirectory] = useState<FileSystemDirectoryHandleLike | null>(null);
  const [toast, setToast] = useState("");
  const [previewOpen, setPreviewOpen] = useState(false);
  const activeSection = sections.find((section) => section.key === activeKey) ?? sections[0];
  const activeData = store[activeKey] ?? getSectionData(activeKey);
  const records = Array.isArray(activeData) ? activeData : [activeData];
  const selectedRecord = records[selectedIndex] ?? records[0] ?? {};
  const { register, handleSubmit, setValue, formState: { errors } } = useForm<FormValues>({
    defaultValues: { json: JSON.stringify(selectedRecord, null, 2) }
  });

  useEffect(() => {
    const loaded = window.localStorage.getItem("academic-admin-json");
    if (loaded) setStore(JSON.parse(loaded));
  }, []);

  useEffect(() => {
    setSelectedIndex(0);
  }, [activeKey]);

  useEffect(() => {
    setValue("json", JSON.stringify(selectedRecord, null, 2));
  }, [selectedRecord, setValue]);

  const dashboardStats = useMemo(() => {
    return [
      { label: "Publications", value: siteData.publications.length },
      { label: "Projects", value: siteData.projects.length },
      { label: "Research axes", value: siteData.research.length },
      { label: "Students", value: siteData.students.length }
    ];
  }, []);

  function persist(nextStore: Record<string, unknown>, message: string) {
    setStore(nextStore);
    window.localStorage.setItem("academic-admin-json", JSON.stringify(nextStore));
    setToast(message);
    window.setTimeout(() => setToast(""), 2500);
  }

  async function writeJsonFile(key: AdminSection["key"], data: unknown) {
    if (!projectDirectory) return false;

    const dataDirectory = await projectDirectory.getDirectoryHandle("data");
    const fileHandle = await dataDirectory.getFileHandle(fileNameFor(key), { create: true });
    const writable = await fileHandle.createWritable();
    await writable.write(new Blob([JSON.stringify(writableDataFor(key, data), null, 2)], { type: "application/json" }));
    await writable.close();
    return true;
  }

  async function chooseProjectDirectory() {
    const browser = window as WindowWithSavePicker;
    if (!browser.showDirectoryPicker) {
      setToast("Ton navigateur ne permet pas l'écriture directe. Utilise Chrome ou Edge en local.");
      return;
    }

    const directory = await browser.showDirectoryPicker();
    setProjectDirectory(directory);
    setToast("Dossier projet sélectionné. Les prochains enregistrements peuvent modifier data/*.json.");
  }

  async function onSubmit(values: FormValues) {
    const parsed = jsonSchema.safeParse(values.json);
    if (!parsed.success) {
      setToast(parsed.error.issues[0]?.message ?? "JSON invalide");
      return;
    }

    const nextData = Array.isArray(activeData)
      ? records.map((item, index) => (index === selectedIndex ? parsed.data : item))
      : parsed.data;

    persist({ ...store, [activeKey]: nextData }, "Modifications enregistrées localement");

    if (projectDirectory) {
      await writeJsonFile(activeKey, nextData);
      setToast(`${fileNameFor(activeKey)} modifié dans le dossier data/`);
    }
  }

  function addRecord() {
    const base = records[0] ?? {};
    const empty = Array.isArray(base)
      ? []
      : Object.fromEntries(Object.keys(base as Record<string, unknown>).map((key) => [key, ""]));
    const nextRecords = [...records, empty];
    persist({ ...store, [activeKey]: nextRecords }, "Nouvel élément ajouté");
    setSelectedIndex(nextRecords.length - 1);
  }

  function deleteRecord() {
    if (!Array.isArray(activeData)) {
      setToast("Cette section contient un objet unique");
      return;
    }
    if (!window.confirm("Confirmer la suppression de cet élément ?")) return;
    const nextRecords = records.filter((_, index) => index !== selectedIndex);
    persist({ ...store, [activeKey]: nextRecords }, "Élément supprimé");
    setSelectedIndex(0);
  }

  async function saveToDisk() {
    const data = store[activeKey] ?? activeData;
    const filename = fileNameFor(activeKey);
    const browser = window as WindowWithSavePicker;
    if (browser.showSaveFilePicker) {
      const handle = await browser.showSaveFilePicker({
        suggestedName: filename,
        types: [{ description: "JSON", accept: { "application/json": [".json"] } }]
      });
      const writable = await handle.createWritable();
      await writable.write(new Blob([JSON.stringify(writableDataFor(activeKey, data), null, 2)], { type: "application/json" }));
      await writable.close();
      setToast("Fichier JSON sauvegardé");
      return;
    }
    downloadJson(filename, writableDataFor(activeKey, data));
    setToast("Fichier JSON exporté");
  }

  async function saveCurrentToProject() {
    if (!projectDirectory) {
      setToast("Choisis d'abord le dossier du projet.");
      return;
    }

    await writeJsonFile(activeKey, store[activeKey] ?? activeData);
    setToast(`${fileNameFor(activeKey)} modifié dans data/. Tu peux maintenant commit et push.`);
  }

  async function saveAllToProject() {
    if (!projectDirectory) {
      setToast("Choisis d'abord le dossier du projet.");
      return;
    }

    const keys = Object.keys(siteData) as DataKey[];
    await Promise.all(keys.map((key) => writeJsonFile(key, store[key] ?? siteData[key])));
    setToast("Tous les fichiers data/*.json ont été écrits. Tu peux commit et push.");
  }

  return (
    <Container className="py-10">
      <Heading eyebrow="Local Admin" title="Academic website administration" text="Les modifications sont d'abord gardées dans le navigateur. Pour les envoyer sur GitHub, choisis le dossier du projet puis écris les fichiers data/*.json avant le commit." />
      <Card className="mb-6 border-[var(--brand)]">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h2 className="text-xl font-bold">Écriture directe dans le projet</h2>
            <p className="mt-2 text-sm leading-6 text-[var(--muted)]">
              Sélectionne le dossier racine du projet, celui qui contient `app`, `components` et `data`.
              Après l'écriture, fais `git status`, `git add`, `commit`, puis `push`.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Button type="button" variant="secondary" onClick={chooseProjectDirectory}>
              <FolderOpen size={16} /> Choisir le dossier
            </Button>
            <Button type="button" variant="secondary" onClick={saveCurrentToProject}>
              <Save size={16} /> Écrire ce fichier
            </Button>
            <Button type="button" onClick={saveAllToProject}>
              <Save size={16} /> Écrire tout
            </Button>
          </div>
        </div>
      </Card>
      <div className="mb-6 grid gap-4 md:grid-cols-4">
        {dashboardStats.map((stat) => (
          <Card key={stat.label}>
            <p className="text-3xl font-bold">{stat.value}</p>
            <p className="text-sm font-semibold text-[var(--muted)]">{stat.label}</p>
          </Card>
        ))}
      </div>
      <div className="grid gap-6 lg:grid-cols-[280px_1fr]">
        <aside className="rounded-lg border border-[var(--line)] bg-[var(--panel)] p-3">
          {sections.map((section) => (
            <button
              key={section.key}
              className={cn(
                "flex w-full items-center gap-3 rounded-md px-3 py-2.5 text-left text-sm font-semibold transition",
                activeKey === section.key ? "bg-[var(--brand)] text-white" : "hover:bg-black/5 dark:hover:bg-white/10"
              )}
              onClick={() => setActiveKey(section.key)}
            >
              <FileJson size={16} />
              {section.label}
            </button>
          ))}
        </aside>
        <div className="grid gap-6 xl:grid-cols-[280px_1fr]">
          <Card>
            <div className="mb-4 flex items-center justify-between gap-3">
              <div>
                <h2 className="text-xl font-bold">{activeSection.label}</h2>
                <p className="mt-1 text-sm text-[var(--muted)]">{activeSection.description}</p>
              </div>
              <Badge>{fileNameFor(activeKey)}</Badge>
            </div>
            <div className="grid gap-2">
              {records.map((record, index) => {
                const item = record as Record<string, unknown>;
                const title = String(item.title ?? item.name ?? item.area ?? item.role ?? item.degree ?? `${activeSection.label} ${index + 1}`);
                return (
                  <button
                    key={`${title}-${index}`}
                    className={cn(
                      "rounded-md border px-3 py-2 text-left text-sm font-semibold",
                      selectedIndex === index ? "border-[var(--brand)] bg-[var(--brand)] text-white" : "border-[var(--line)]"
                    )}
                    onClick={() => setSelectedIndex(index)}
                  >
                    {title}
                  </button>
                );
              })}
            </div>
            <div className="mt-5 flex flex-wrap gap-2">
              <Button type="button" variant="secondary" onClick={addRecord}><Plus size={16} /> Add</Button>
              <Button type="button" variant="secondary" onClick={deleteRecord}><Trash2 size={16} /> Delete</Button>
            </div>
          </Card>
          <Card>
            <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <h2 className="text-xl font-bold">JSON editor</h2>
                  <p className="text-sm text-[var(--muted)]">Validation is performed before saving local changes.</p>
                </div>
                <div className="flex flex-wrap gap-2">
                  <Button type="button" variant="secondary" onClick={() => setPreviewOpen(true)}><Eye size={16} /> Preview</Button>
                  <Button type="button" variant="secondary" onClick={() => navigator.clipboard.writeText(JSON.stringify(store[activeKey] ?? activeData, null, 2))}><Copy size={16} /> Copy</Button>
                  <Button type="button" variant="secondary" onClick={saveToDisk}><Download size={16} /> Export</Button>
                  <Button type="button" variant="secondary" onClick={saveCurrentToProject}><Save size={16} /> Write file</Button>
                </div>
              </div>
              <textarea
                className="min-h-[520px] rounded-md border border-[var(--line)] bg-[#111827] p-4 font-mono text-sm leading-6 text-[#e5e7eb] outline-none"
                spellCheck={false}
                {...register("json", { required: true })}
              />
              {errors.json ? <p className="text-sm font-semibold text-red-600">JSON requis</p> : null}
              <Button type="submit"><Save size={17} /> Save local edits</Button>
            </form>
          </Card>
        </div>
      </div>
      <Modal open={previewOpen} title="Preview JSON" onClose={() => setPreviewOpen(false)}>
        <pre className="max-h-[60vh] overflow-auto rounded-md bg-black/90 p-4 text-xs leading-5 text-white">
          {JSON.stringify(store[activeKey] ?? activeData, null, 2)}
        </pre>
      </Modal>
      {toast ? (
        <div className="fixed bottom-5 right-5 z-50">
          <Toast message={toast} />
        </div>
      ) : null}
      <div className="mt-6 flex items-center gap-2 text-sm font-semibold text-[var(--muted)]">
        <Check size={16} className="text-[var(--brand)]" />
        Local-only admin: écriture directe possible en local, aucun admin livré aux visiteurs sur GitHub Pages.
      </div>
    </Container>
  );
}
