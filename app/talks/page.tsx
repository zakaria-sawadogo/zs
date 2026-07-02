import { Calendar, MapPin } from "lucide-react";
import { Section } from "@/components/design/section";
import { Heading } from "@/components/design/heading";
import { Card } from "@/components/design/card";
import { Button } from "@/components/design/button";
import talks from "@/data/talks.json";

export const metadata = { title: "Talks" };

export default function TalksPage() {
  return (
    <Section>
      <Heading eyebrow="Talks" title="Conference talks and invited lectures" />
      <div className="grid gap-5">
        {talks.map((talk) => (
          <Card key={talk.title}>
            <h2 className="text-2xl font-bold">{talk.title}</h2>
            <p className="mt-2 font-semibold text-[var(--muted)]">{talk.event}</p>
            <div className="mt-4 flex flex-wrap gap-4 text-sm text-[var(--muted)]">
              <span className="inline-flex items-center gap-2"><Calendar size={16} /> {talk.date}</span>
              <span className="inline-flex items-center gap-2"><MapPin size={16} /> {talk.location}</span>
            </div>
            <Button href={talk.slides} variant="secondary" className="mt-5">Slides</Button>
          </Card>
        ))}
      </div>
    </Section>
  );
}
