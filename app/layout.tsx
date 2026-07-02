import type { Metadata } from "next";
import "@/styles/globals.css";
import { ThemeProvider } from "@/components/layout/theme-provider";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { LanguageRuntime } from "@/components/layout/language-runtime";
import settings from "@/data/settings.json";

export const metadata: Metadata = {
  metadataBase: new URL(settings.siteUrl),
  title: {
    default: settings.seo.title,
    template: `%s | ${settings.seo.name}`
  },
  description: settings.seo.description,
  keywords: settings.seo.keywords,
  authors: [{ name: settings.seo.name }],
  openGraph: {
    title: settings.seo.title,
    description: settings.seo.description,
    url: settings.siteUrl,
    siteName: settings.seo.name,
    locale: "en_US",
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: settings.seo.title,
    description: settings.seo.description
  },
  robots: {
    index: true,
    follow: true
  }
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: settings.seo.name,
    jobTitle: "Lecturer & Researcher",
    affiliation: "École Polytechnique de Ouagadougou",
    url: settings.siteUrl,
    knowsAbout: settings.seo.keywords
  };

  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <SiteHeader />
          <main>{children}</main>
          <SiteFooter />
          <LanguageRuntime />
        </ThemeProvider>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
        />
      </body>
    </html>
  );
}
