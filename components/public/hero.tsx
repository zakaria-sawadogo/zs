import Image from "next/image";
import { ArrowRight, Download, Mail } from "lucide-react";
import { Button } from "@/components/design/button";
import { Container } from "@/components/design/container";
import { Badge } from "@/components/design/badge";
import { Reveal } from "@/components/public/reveal";
import { StatCounter } from "@/components/public/stat-counter";
import profile from "@/data/profile.json";
import { withBasePath } from "@/lib/paths";

export function Hero() {
  return (
    <section className="academic-grid overflow-hidden border-b border-[var(--line)]">
      <Container className="grid min-h-[calc(100vh-4rem)] items-center gap-10 py-12 lg:grid-cols-[1.05fr_0.95fr]">
        <Reveal>
          <div>
            <Badge>{profile.institution}</Badge>
            <h1 className="mt-6 max-w-4xl text-4xl font-bold leading-tight text-[var(--ink)] sm:text-6xl">
              {profile.name}
            </h1>
            <p className="mt-4 text-xl font-semibold text-[var(--brand)]">{profile.title}</p>
            <p className="mt-3 text-2xl font-bold text-[var(--ink)]">{profile.headline}</p>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-[var(--muted)]">{profile.bio}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button href="/research">
                Explore Research <ArrowRight size={18} />
              </Button>
              <Button href={profile.cvUrl} variant="secondary">
                <Download size={18} /> CV
              </Button>
              <Button href="/contact" variant="ghost">
                <Mail size={18} /> Contact
              </Button>
            </div>
            <div className="mt-10 grid grid-cols-2 gap-6 sm:grid-cols-4">
              {profile.stats.map((stat) => (
                <StatCounter key={stat.label} {...stat} />
              ))}
            </div>
          </div>
        </Reveal>
        <Reveal delay={0.1}>
          <div className="relative mx-auto aspect-[4/5] w-full max-w-md overflow-hidden rounded-lg border border-[var(--line)] bg-[var(--panel)] shadow-2xl">
            <Image src={withBasePath(profile.photo)} alt={profile.name} fill priority className="object-cover" />
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
