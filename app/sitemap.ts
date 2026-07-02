import type { MetadataRoute } from "next";
import settings from "@/data/settings.json";

export const dynamic = "force-static";

const routes = [
  "",
  "about",
  "research",
  "publications",
  "projects",
  "teaching",
  "laboratory",
  "funding",
  "students",
  "talks",
  "awards",
  "gallery",
  "downloads",
  "blog",
  "contact",
  "cv"
];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date("2026-07-02");

  return routes.map((route) => ({
    url: `${settings.siteUrl}/${route}`,
    lastModified,
    changeFrequency: route === "" ? "weekly" : "monthly",
    priority: route === "" ? 1 : 0.7
  }));
}
