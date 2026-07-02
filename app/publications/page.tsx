import { Section } from "@/components/design/section";
import { Heading } from "@/components/design/heading";
import { PublicationExplorer } from "@/components/public/publication-explorer";
import publications from "@/data/publications.json";

export const metadata = { title: "Publications" };

export default function PublicationsPage() {
  return (
    <Section>
      <Heading eyebrow="Publications" title="Scholar-style publication index" text="Search by title, venue, author, tag, or filter by year. Each record includes DOI, abstract, PDF, BibTeX, code, video, and citation metadata." />
      <PublicationExplorer publications={publications} />
    </Section>
  );
}
