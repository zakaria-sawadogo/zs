import { Download } from "lucide-react";
import { Section } from "@/components/design/section";
import { Heading } from "@/components/design/heading";
import { Card } from "@/components/design/card";
import { Button } from "@/components/design/button";
import courses from "@/data/courses.json";

export const metadata = { title: "Teaching" };

export default function TeachingPage() {
  return (
    <Section>
      <Heading eyebrow="Teaching" title="Courses, practical work, and downloadable material" />
      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {courses.map((course) => (
          <Card key={course.code}>
            <p className="text-sm font-bold text-[var(--brand)]">{course.code} · {course.semester}</p>
            <h2 className="mt-2 text-2xl font-bold">{course.title}</h2>
            <p className="mt-3 leading-7 text-[var(--muted)]">{course.description}</p>
            <div className="mt-5 flex flex-wrap gap-2">
              {course.materials.map((material) => (
                <Button key={material} href={material} variant="secondary">
                  <Download size={16} /> Material
                </Button>
              ))}
            </div>
          </Card>
        ))}
      </div>
    </Section>
  );
}
