import type { MetadataRoute } from "next";
import settings from "@/data/settings.json";

export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/"
    },
    sitemap: `${settings.siteUrl}/sitemap.xml`
  };
}
