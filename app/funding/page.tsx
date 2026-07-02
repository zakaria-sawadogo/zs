import { Section } from "@/components/design/section";
import { Heading } from "@/components/design/heading";
import { Card } from "@/components/design/card";
import grants from "@/data/grants.json";

export const metadata = { title: "Funding" };

export default function FundingPage() {
  return (
    <Section>
      <Heading eyebrow="Funding" title="Grants and sponsored research" />
      <div className="grid gap-5 md:grid-cols-2">
        {grants.map((grant) => (
          <Card key={grant.title}>
            <p className="text-sm font-bold text-[var(--brand)]">{grant.period}</p>
            <h2 className="mt-2 text-2xl font-bold">{grant.title}</h2>
            <p className="mt-2 text-sm font-semibold text-[var(--muted)]">{grant.funder} · {grant.amount}</p>
            <p className="mt-4 leading-7 text-[var(--muted)]">{grant.summary}</p>
          </Card>
        ))}
      </div>
    </Section>
  );
}
