import { Download } from "lucide-react";
import { Section } from "@/components/design/section";
import { Heading } from "@/components/design/heading";
import { Card } from "@/components/design/card";
import { Button } from "@/components/design/button";
import { Timeline } from "@/components/design/timeline";
import profile from "@/data/profile.json";
import experience from "@/data/experience.json";
import education from "@/data/education.json";

export const metadata = { title: "CV" };

export default function CvPage() {
  return (
    <Section>
      <Heading eyebrow="CV" title="Academic curriculum vitae" text={profile.shortBio} />
      <Button href={profile.cvUrl}><Download size={18} /> Download PDF CV</Button>
      <div className="mt-10 grid gap-8 lg:grid-cols-2">
        <Card><h2 className="mb-5 text-2xl font-bold">Experience</h2><Timeline items={experience} /></Card>
        <Card><h2 className="mb-5 text-2xl font-bold">Education</h2><Timeline items={education} /></Card>
      </div>
    </Section>
  );
}
