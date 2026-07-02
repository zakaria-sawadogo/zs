"use client";

import { ChevronDown } from "lucide-react";
import { useState } from "react";

export function Accordion({ items }: { items: Array<{ title: string; content: React.ReactNode }> }) {
  const [open, setOpen] = useState(0);

  return (
    <div className="divide-y divide-[var(--line)] rounded-lg border border-[var(--line)] bg-[var(--panel)]">
      {items.map((item, index) => (
        <div key={item.title}>
          <button className="flex w-full items-center justify-between p-5 text-left font-bold" onClick={() => setOpen(open === index ? -1 : index)}>
            {item.title}
            <ChevronDown className={open === index ? "rotate-180 transition" : "transition"} size={18} />
          </button>
          {open === index ? <div className="px-5 pb-5 leading-7 text-[var(--muted)]">{item.content}</div> : null}
        </div>
      ))}
    </div>
  );
}
