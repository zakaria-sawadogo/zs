import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Mail, MapPin } from "lucide-react";
import { Container } from "@/components/design/container";
import { Card } from "@/components/design/card";
import { Badge } from "@/components/design/badge";
import { Button } from "@/components/design/button";
import research from "@/data/research.json";
import publications from "@/data/publications.json";
import projects from "@/data/projects.json";
import profile from "@/data/profile.json";
import experience from "@/data/experience.json";
import education from "@/data/education.json";
import awards from "@/data/awards.json";
import grants from "@/data/grants.json";
import talks from "@/data/talks.json";
import social from "@/data/social.json";
import { withBasePath } from "@/lib/paths";

export default function HomePage() {
  const selectedPublications = publications.slice(0, 6);
  const selectedServices = [
    ...awards.slice(0, 2).map((item) => `${item.year}: ${item.title}`),
    ...talks.slice(0, 2).map((item) => `${item.date.slice(0, 4)}: ${item.title}`)
  ];

  return (
    <Container className="py-10 lg:py-14">
      <section className="grid gap-10 border-b border-[var(--line)] pb-10 lg:grid-cols-[300px_1fr]">
        <aside className="lg:sticky lg:top-20 lg:self-start">
          <div className="overflow-hidden rounded-md border border-[var(--line)] bg-[var(--panel)]">
            <Image
              src={withBasePath(profile.photo)}
              alt={profile.name}
              width={720}
              height={900}
              priority
              className="aspect-[4/5] w-full object-cover"
            />
          </div>
          <div className="mt-5 space-y-2 text-sm text-[var(--muted)]">
            <p className="flex items-start gap-2"><MapPin size={16} className="mt-1 text-[var(--brand)]" /> {profile.institution}</p>
            <p className="flex items-start gap-2"><Mail size={16} className="mt-1 text-[var(--brand)]" /> {profile.email}</p>
          </div>
          <div className="mt-5 flex flex-wrap gap-2">
            {social.slice(0, 4).map((item) => (
              <Link className="academic-link text-sm" href={item.url} key={item.label}>
                {item.label}
              </Link>
            ))}
          </div>
        </aside>

        <div>
          <p className="text-sm font-bold uppercase tracking-[0.16em] text-[var(--brand)]">{profile.title}</p>
          <h1 className="mt-3 font-serif text-4xl font-bold leading-tight text-[var(--ink)] sm:text-5xl">
            {profile.name}
          </h1>
          <p className="mt-3 text-xl font-semibold text-[var(--foreground)]">{profile.headline}</p>
          <p className="mt-6 max-w-3xl whitespace-pre-line leading-8 text-[var(--muted)]">{profile.bio}</p>

          <div className="mt-7 flex flex-wrap gap-3">
            <Button href="/publications" variant="secondary">
              Publications <ArrowRight size={17} />
            </Button>
            <Button href="/research" variant="secondary">
              Research <ArrowRight size={17} />
            </Button>
            <Button href={profile.cvUrl}>
              CV
            </Button>
          </div>

          <div className="mt-9 rounded-md border border-[var(--line)] bg-[var(--soft)] p-5">
            <h2 className="text-lg font-bold text-[var(--ink)]">Research interests</h2>
            <ul className="mt-4 grid gap-2 text-[var(--muted)] sm:grid-cols-2">
              {research.map((item) => (
                <li className="flex gap-2" key={item.slug}>
                  <span className="mt-3 size-1.5 shrink-0 rounded-full bg-[var(--brand)]" />
                  <span>{item.area}: {item.description}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="grid gap-10 py-10 lg:grid-cols-[1fr_320px]">
        <div>
          <div className="mb-5 flex items-end justify-between gap-4 border-b border-[var(--line)] pb-3">
            <h2 className="font-serif text-2xl font-bold text-[var(--ink)]">Selected Recent Publications</h2>
            <Link href="/publications" className="academic-link text-sm">All publications</Link>
          </div>
          <ol className="paper-list grid gap-5">
            {selectedPublications.map((item) => (
                <li className="grid grid-cols-[34px_1fr] gap-3" key={item.title}>
                <div>
                  <Link href={item.pdf || "/publications"} className="academic-link text-base">{item.title}</Link>
                  <p className="mt-1 text-sm text-[var(--muted)]">{item.authors}</p>
                  <p className="mt-1 text-sm text-[var(--muted)]">
                    <strong className="text-[var(--foreground)]">{item.venue}</strong>, {item.year}. DOI: {item.doi}
                  </p>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {item.tags.slice(0, 3).map((tag) => <Badge key={tag}>{tag}</Badge>)}
                    <Badge>{item.citations} citations</Badge>
                  </div>
                </div>
              </li>
            ))}
          </ol>
        </div>

        <aside className="grid gap-5">
          <Card>
            <h2 className="mb-4 text-lg font-bold">Open focus</h2>
            <p className="text-sm leading-7 text-[var(--muted)]">
              Students interested in AI, cybersecurity, Android malware, privacy, and data systems are welcome to send a concise research statement.
            </p>
            <Button href="/contact" variant="secondary" className="mt-4">Contact</Button>
          </Card>
          <Card>
            <h2 className="mb-4 text-lg font-bold">Current projects</h2>
            <div className="grid gap-3">
              {projects.map((project) => (
                <Link href="/projects" className="academic-link text-sm" key={project.title}>{project.title}</Link>
              ))}
            </div>
          </Card>
          <Card>
            <h2 className="mb-4 text-lg font-bold">Service & recognition</h2>
            <ul className="space-y-2 text-sm text-[var(--muted)]">
              {selectedServices.map((item) => <li key={item}>{item}</li>)}
            </ul>
          </Card>
        </aside>
      </section>

      <section className="grid gap-6 border-t border-[var(--line)] py-10 md:grid-cols-3">
        <div>
          <h2 className="font-serif text-2xl font-bold">Experience</h2>
          <ul className="mt-4 space-y-3 text-sm text-[var(--muted)]">
            {experience.map((item) => (
              <li key={item.role}>
                <strong className="text-[var(--foreground)]">{item.role}</strong>, {item.organization} ({item.start}-{item.end})
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h2 className="font-serif text-2xl font-bold">Education</h2>
          <ul className="mt-4 space-y-3 text-sm text-[var(--muted)]">
            {education.map((item) => (
              <li key={item.degree}>
                <strong className="text-[var(--foreground)]">{item.degree}</strong>, {item.institution} ({item.year})
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h2 className="font-serif text-2xl font-bold">Funding</h2>
          <ul className="mt-4 space-y-3 text-sm text-[var(--muted)]">
            {grants.map((item) => (
              <li key={item.title}>
                <strong className="text-[var(--foreground)]">{item.title}</strong>, {item.period}
              </li>
            ))}
          </ul>
        </div>
      </section>
    </Container>
  );
}
