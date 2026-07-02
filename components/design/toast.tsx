export function Toast({ message }: { message: string }) {
  return <div className="rounded-md border border-[var(--line)] bg-[var(--panel)] px-4 py-3 text-sm shadow-lg">{message}</div>;
}
