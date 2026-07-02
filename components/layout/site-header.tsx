"use client";

import Link from "next/link";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { Container } from "@/components/design/container";
import { ThemeToggle } from "@/components/layout/theme-toggle";
import { LanguageToggle } from "@/components/layout/language-toggle";
import settings from "@/data/settings.json";
import { isAdminEnabled } from "@/lib/paths";

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const adminEnabled = isAdminEnabled();

  return (
    <header className="sticky top-0 z-40 border-b border-[var(--line)] bg-[var(--background)]/95 backdrop-blur">
      <Container className="flex min-h-14 items-center justify-between gap-4">
        <Link href="/" className="font-serif text-lg font-bold tracking-normal text-[var(--ink)]">
          Dr Zakaria Sawadogo
        </Link>
        <nav className="hidden items-center gap-4 lg:flex">
          {settings.navigation.map((item) => (
            <Link className="text-[13px] font-semibold text-[var(--muted)] transition hover:text-[var(--foreground)]" href={item.href} key={item.href}>
              {item.label}
            </Link>
          ))}
          {adminEnabled ? (
            <Link className="text-[13px] font-semibold text-[var(--muted)] transition hover:text-[var(--foreground)]" href="/admin">
              Admin
            </Link>
          ) : null}
        </nav>
        <div className="flex items-center gap-2">
          <LanguageToggle />
          <ThemeToggle />
          <button className="inline-flex size-10 items-center justify-center rounded-md border border-[var(--line)] lg:hidden" onClick={() => setOpen(!open)} aria-label="Toggle navigation">
            {open ? <X size={19} /> : <Menu size={19} />}
          </button>
        </div>
      </Container>
      {open ? (
        <div className="border-t border-[var(--line)] bg-[var(--background)] lg:hidden">
          <Container className="grid gap-1 py-4">
            {settings.navigation.map((item) => (
              <Link className="rounded-md px-3 py-2 text-sm font-semibold hover:bg-black/5 dark:hover:bg-white/10" href={item.href} key={item.href} onClick={() => setOpen(false)}>
                {item.label}
              </Link>
            ))}
            {adminEnabled ? (
              <Link className="rounded-md px-3 py-2 text-sm font-semibold hover:bg-black/5 dark:hover:bg-white/10" href="/admin" onClick={() => setOpen(false)}>
                Admin
              </Link>
            ) : null}
          </Container>
        </div>
      ) : null}
    </header>
  );
}
