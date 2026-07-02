import { Section } from "@/components/design/section";
import { Heading } from "@/components/design/heading";
import { Timeline } from "@/components/design/timeline";
import awards from "@/data/awards.json";

export const metadata = { title: "Awards" };

export default function AwardsPage() {
  return (
    <Section>
      <Heading eyebrow="Awards" title="Distinctions and recognitions" />
      <Timeline items={awards} />
    </Section>
  );
}
