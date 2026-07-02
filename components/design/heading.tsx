import { cn } from "@/utils/cn";

export function Heading({
  eyebrow,
  title,
  text,
  className
}: {
  eyebrow?: string;
  title: string;
  text?: string;
  className?: string;
}) {
  return (
    <div className={cn("mb-10 max-w-3xl", className)}>
      {eyebrow ? <p className="mb-3 text-sm font-bold uppercase tracking-[0.18em] text-[var(--brand)]">{eyebrow}</p> : null}
      <h1 className="text-3xl font-bold leading-tight text-[var(--ink)] sm:text-4xl lg:text-5xl">{title}</h1>
      {text ? <p className="mt-4 text-base leading-8 text-[var(--muted)] sm:text-lg">{text}</p> : null}
    </div>
  );
}
