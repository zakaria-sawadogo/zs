import { Section } from "@/components/design/section";
import { Heading } from "@/components/design/heading";
import { Card } from "@/components/design/card";
import { Badge } from "@/components/design/badge";
import students from "@/data/students.json";

export const metadata = { title: "Students" };

export default function StudentsPage() {
  return (
    <Section>
      <Heading eyebrow="Students" title="Current and former supervisees" />
      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {students.map((student) => (
          <Card key={student.name}>
            <Badge>{student.status}</Badge>
            <h2 className="mt-4 text-2xl font-bold">{student.name}</h2>
            <p className="mt-2 font-semibold text-[var(--muted)]">{student.program}</p>
            <p className="mt-4 leading-7 text-[var(--muted)]">{student.topic}</p>
          </Card>
        ))}
      </div>
    </Section>
  );
}
