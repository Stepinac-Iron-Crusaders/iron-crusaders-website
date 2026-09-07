const COLORS: Record<string, string> = {
  todo: "bg-zinc-800 text-zinc-300 border-zinc-700",
  in_progress: "bg-blue-950/50 text-blue-400 border-blue-800",
  done: "bg-emerald-950/50 text-emerald-400 border-emerald-800",
};

const LABELS: Record<string, string> = {
  todo: "To Do",
  in_progress: "In Progress",
  done: "Done",
};

export function StatusBadge({ status }: { status: string }) {
  const cls = COLORS[status] ?? COLORS.todo;
  return (
    <span
      className={`inline-flex items-center border px-2.5 py-0.5 font-mono text-[10px] font-bold uppercase tracking-[0.12em] ${cls}`}
    >
      {LABELS[status] ?? status}
    </span>
  );
}
