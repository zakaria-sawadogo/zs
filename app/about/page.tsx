import { Section } from "@/components/design/section";
import { Heading } from "@/components/design/heading";
import { Card } from "@/components/design/card";
import { Badge } from "@/components/design/badge";
import { Timeline } from "@/components/design/timeline";
import profile from "@/data/profile.json";
import experience from "@/data/experience.json";
import education from "@/data/education.json";
import awards from "@/data/awards.json";

export const metadata = { title: "About" };

export default function AboutPage() {
  return (
    <Section>
      <Heading eyebrow="About" title="Biography, academic path, and responsibilities" text={profile.bio} />
      <div className="grid gap-8 lg:grid-cols-[1fr_0.85fr]">
        <div className="space-y-10">
          <div>
            <h2 className="mb-5 text-2xl font-bold">Experience</h2>
            <Timeline items={experience} />
          </div>
          <div>
            <h2 className="mb-5 text-2xl font-bold">Education</h2>
            <Timeline items={education} />
          </div>
        </div>
        <div className="space-y-5">
          <Card>
            <h2 className="mb-4 text-xl font-bold">Skills</h2>
            <div className="flex flex-wrap gap-2">
              {profile.skills.map((skill) => <Badge key={skill}>{skill}</Badge>)}
            </div>
          </Card>
          <Card>
            <h2 className="mb-4 text-xl font-bold">Responsibilities</h2>
            <ul className="space-y-3 text-[var(--muted)]">
              {profile.responsibilities.map((item) => <li key={item}>{item}</li>)}
            </ul>
          </Card>
          <Card>
            <h2 className="mb-4 text-xl font-bold">Awards</h2>
            <div className="space-y-4">
              {awards.map((item) => (
                <div key={item.title}>
                  <p className="font-bold">{item.title}</p>
                  <p className="text-sm text-[var(--muted)]">{item.organization} · {item.year}</p>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </Section>
  );
}
