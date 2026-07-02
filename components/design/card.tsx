import type { ReactNode } from "react";
import { cn } from "@/utils/cn";

export function Card({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div className={cn("rounded-lg border border-[var(--line)] bg-[var(--panel)] p-6 shadow-sm", className)}>
      {children}
    </div>
  );
}
