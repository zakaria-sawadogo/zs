import { cn } from "@/utils/cn";

export function Badge({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-md border border-[var(--line)] bg-black/[0.03] px-2.5 py-1 text-xs font-semibold text-[var(--muted)] dark:bg-white/5",
        className
      )}
    >
      {children}
    </span>
  );
}
