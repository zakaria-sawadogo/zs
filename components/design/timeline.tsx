export function Timeline({
  items
}: {
  items: Array<{ title?: string; role?: string; degree?: string; organization?: string; institution?: string; start?: string; end?: string; year?: string; summary?: string; details?: string }>;
}) {
  return (
    <div className="space-y-6 border-l border-[var(--line)] pl-6">
      {items.map((item, index) => (
        <article className="relative" key={`${item.title ?? item.role ?? item.degree}-${index}`}>
          <span className="absolute -left-[31px] top-1 size-3 rounded-full bg-[var(--brand)]" />
          <p className="text-sm font-semibold text-[var(--brand)]">{item.year ?? `${item.start} - ${item.end}`}</p>
          <h3 className="mt-1 text-xl font-bold text-[var(--ink)]">{item.title ?? item.role ?? item.degree}</h3>
          <p className="text-sm text-[var(--muted)]">{item.organization ?? item.institution}</p>
          <p className="mt-3 leading-7 text-[var(--muted)]">{item.summary ?? item.details}</p>
        </article>
      ))}
    </div>
  );
}
