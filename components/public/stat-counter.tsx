"use client";

import CountUp from "react-countup";

export function StatCounter({ value, label }: { value: number; label: string }) {
  return (
    <div>
      <p className="text-3xl font-bold text-[var(--ink)]">
        <CountUp end={value} enableScrollSpy scrollSpyOnce />+
      </p>
      <p className="mt-1 text-sm font-semibold text-[var(--muted)]">{label}</p>
    </div>
  );
}
