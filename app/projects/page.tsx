import Image from "next/image";
import { Section } from "@/components/design/section";
import { Heading } from "@/components/design/heading";
import { Card } from "@/components/design/card";
import { Badge } from "@/components/design/badge";
import projects from "@/data/projects.json";

export const metadata = { title: "Projects" };

export default function ProjectsPage() {
  return (
    <Section>
      <Heading eyebrow="Projects" title="Applied research and institutional platforms" />
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {projects.map((project) => (
          <Card key={project.title}>
            <Image src={project.image} alt="" width={640} height={360} className="mb-5 aspect-video w-full rounded-md object-cover" />
            <Badge>{project.status}</Badge>
            <h2 className="mt-4 text-2xl font-bold">{project.title}</h2>
            <p className="mt-3 leading-7 text-[var(--muted)]">{project.description}</p>
            <div className="mt-5 flex flex-wrap gap-2">{project.technologies.map((tech) => <Badge key={tech}>{tech}</Badge>)}</div>
            <p className="mt-5 text-sm text-[var(--muted)]">Partners: {project.partners.join(", ")}</p>
            <p className="mt-1 text-sm text-[var(--muted)]">Funding: {project.funding}</p>
          </Card>
        ))}
      </div>
    </Section>
  );
}
