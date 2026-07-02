export function Pagination({ page, total, onPage }: { page: number; total: number; onPage: (page: number) => void }) {
  return (
    <div className="flex items-center gap-2">
      {Array.from({ length: total }).map((_, index) => (
        <button
          key={index}
          onClick={() => onPage(index + 1)}
          className={page === index + 1 ? "size-9 rounded-md bg-[var(--brand)] text-white" : "size-9 rounded-md border border-[var(--line)]"}
        >
          {index + 1}
        </button>
      ))}
    </div>
  );
}
