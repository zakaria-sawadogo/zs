import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { Hero } from "@/components/public/hero";
import { Section } from "@/components/design/section";
import { Heading } from "@/components/design/heading";
import { Card } from "@/components/design/card";
import { Badge } from "@/components/design/badge";
import { Button } from "@/components/design/button";
import { Reveal } from "@/components/public/reveal";
import research from "@/data/research.json";
import publications from "@/data/publications.json";
import projects from "@/data/projects.json";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Section>
        <Heading eyebrow="Research Focus" title="Secure, intelligent systems for real institutions" text="The research program connects artificial intelligence, security, privacy, and data science with practical digital transformation needs." />
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {research.slice(0, 6).map((item, index) => (
            <Reveal key={item.slug} delay={index * 0.04}>
              <Card className="h-full">
                <Image src={item.image} alt="" width={520} height={300} className="mb-5 aspect-video w-full rounded-md object-cover" />
                <h3 className="text-xl font-bold text-[var(--ink)]">{item.area}</h3>
                <p className="mt-3 leading-7 text-[var(--muted)]">{item.description}</p>
              </Card>
            </Reveal>
          ))}
        </div>
      </Section>
      <Section className="bg-[var(--panel)]">
        <Heading eyebrow="Selected Work" title="Recent publications and projects" />
        <div className="grid gap-6 lg:grid-cols-2">
          <Card>
            <Badge>{publications[0].year}</Badge>
            <h3 className="mt-4 text-2xl font-bold">{publications[0].title}</h3>
            <p className="mt-3 leading-7 text-[var(--muted)]">{publications[0].abstract}</p>
            <Button href="/publications" variant="secondary" className="mt-5">
              Publications <ArrowRight size={17} />
            </Button>
          </Card>
          <Card>
            <Badge>{projects[0].status}</Badge>
            <h3 className="mt-4 text-2xl font-bold">{projects[0].title}</h3>
            <p className="mt-3 leading-7 text-[var(--muted)]">{projects[0].description}</p>
            <Button href="/projects" variant="secondary" className="mt-5">
              Projects <ArrowRight size={17} />
            </Button>
          </Card>
        </div>
      </Section>
    </>
  );
}
