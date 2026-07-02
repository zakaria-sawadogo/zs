import Link from "next/link";
import { Mail } from "lucide-react";
import { Container } from "@/components/design/container";
import { Button } from "@/components/design/button";
import profile from "@/data/profile.json";
import settings from "@/data/settings.json";

export function SiteFooter() {
  return (
    <footer className="border-t border-[var(--line)] bg-[var(--panel)]">
      <Container className="grid gap-10 py-12 lg:grid-cols-[1.2fr_1fr_1fr]">
        <div>
          <h2 className="text-2xl font-bold text-[var(--ink)]">{profile.name}</h2>
          <p className="mt-3 max-w-md leading-7 text-[var(--muted)]">{profile.shortBio}</p>
          <Button className="mt-5" href="/contact" variant="secondary">
            <Mail size={17} /> Contact
          </Button>
        </div>
        <div>
          <h3 className="mb-4 font-bold">Navigation</h3>
          <div className="grid gap-2">
            {settings.navigation.map((item) => (
              <Link className="text-sm text-[var(--muted)] hover:text-[var(--foreground)]" href={item.href} key={item.href}>
                {item.label}
              </Link>
            ))}
          </div>
        </div>
        <div>
          <h3 className="mb-4 font-bold">Newsletter</h3>
          <form className="flex gap-2">
            <input aria-label="Email" className="min-w-0 flex-1 rounded-md border border-[var(--line)] bg-transparent px-3 py-2" placeholder="email@example.com" />
            <Button type="submit">Join</Button>
          </form>
          <p className="mt-6 text-sm text-[var(--muted)]">© {new Date().getFullYear()} {profile.name}. All rights reserved.</p>
        </div>
      </Container>
    </footer>
  );
}
