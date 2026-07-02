"use client";

import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import { Card } from "@/components/design/card";
import { Badge } from "@/components/design/badge";
import { Button } from "@/components/design/button";
import type { Publication } from "@/types/site";

export function PublicationExplorer({ publications }: { publications: Publication[] }) {
  const [query, setQuery] = useState("");
  const [year, setYear] = useState("All");
  const years = ["All", ...Array.from(new Set(publications.map((item) => String(item.year))))];
  const filtered = useMemo(() => {
    return publications.filter((item) => {
      const matchesQuery = `${item.title} ${item.authors} ${item.venue} ${item.tags.join(" ")}`.toLowerCase().includes(query.toLowerCase());
      const matchesYear = year === "All" || String(item.year) === year;
      return matchesQuery && matchesYear;
    });
  }, [publications, query, year]);

  return (
    <div>
      <div className="mb-8 grid gap-3 rounded-lg border border-[var(--line)] bg-[var(--panel)] p-4 md:grid-cols-[1fr_180px]">
        <label className="flex items-center gap-2 rounded-md border border-[var(--line)] px-3">
          <Search size={18} className="text-[var(--muted)]" />
          <input className="min-h-11 flex-1 bg-transparent outline-none" placeholder="Search publications" value={query} onChange={(event) => setQuery(event.target.value)} />
        </label>
        <select className="rounded-md border border-[var(--line)] bg-transparent px-3" value={year} onChange={(event) => setYear(event.target.value)}>
          {years.map((item) => (
            <option key={item}>{item}</option>
          ))}
        </select>
      </div>
      <div className="grid gap-5">
        {filtered.map((item) => (
          <Card key={item.title}>
            <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
              <div>
                <div className="mb-3 flex flex-wrap gap-2">
                  <Badge>{item.year}</Badge>
                  <Badge>{item.type}</Badge>
                  <Badge>{item.citations} citations</Badge>
                </div>
                <h2 className="text-2xl font-bold text-[var(--ink)]">{item.title}</h2>
                <p className="mt-2 text-sm font-semibold text-[var(--muted)]">{item.authors}</p>
                <p className="mt-1 text-sm text-[var(--muted)]">{item.venue} · DOI: {item.doi}</p>
                <p className="mt-4 leading-7 text-[var(--muted)]">{item.abstract}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {item.tags.map((tag) => (
                    <Badge key={tag}>{tag}</Badge>
                  ))}
                </div>
              </div>
              <div className="flex min-w-40 flex-wrap gap-2 lg:justify-end">
                <Button href={item.pdf} variant="secondary">PDF</Button>
                <Button href={item.code || "#"} variant="secondary">Code</Button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
