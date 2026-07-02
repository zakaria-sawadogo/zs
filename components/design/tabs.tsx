"use client";

import { useState } from "react";
import { cn } from "@/utils/cn";

export function Tabs({ tabs }: { tabs: Array<{ label: string; content: React.ReactNode }> }) {
  const [active, setActive] = useState(0);

  return (
    <div>
      <div className="mb-6 flex flex-wrap gap-2">
        {tabs.map((tab, index) => (
          <button
            key={tab.label}
            onClick={() => setActive(index)}
            className={cn(
              "rounded-md border px-4 py-2 text-sm font-semibold transition",
              active === index ? "border-[var(--brand)] bg-[var(--brand)] text-white" : "border-[var(--line)] bg-[var(--panel)]"
            )}
          >
            {tab.label}
          </button>
        ))}
      </div>
      {tabs[active]?.content}
    </div>
  );
}
