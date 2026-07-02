import { Section } from "@/components/design/section";
import { Heading } from "@/components/design/heading";
import { Card } from "@/components/design/card";

export const metadata = { title: "Blog" };

export default function BlogPage() {
  return (
    <Section>
      <Heading eyebrow="Blog" title="Notes on AI, cybersecurity, and data systems" text="Editorial entries can be added later as JSON or Markdown content while keeping the static deployment model." />
      <Card>
        <h2 className="text-2xl font-bold">Coming soon</h2>
        <p className="mt-3 leading-7 text-[var(--muted)]">This space is prepared for research notes, teaching updates, and technical reflections.</p>
      </Card>
    </Section>
  );
}
