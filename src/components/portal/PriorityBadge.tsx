const COLORS: Record<string, string> = {
  low: "bg-zinc-800 text-zinc-400 border-zinc-700",
  medium: "bg-yellow-950/50 text-yellow-400 border-yellow-800",
  high: "bg-orange-950/50 text-orange-400 border-orange-800",
  urgent: "bg-red-950/50 text-red-400 border-red-800",
};

export function PriorityBadge({ priority }: { priority: string }) {
  const cls = COLORS[priority] ?? COLORS.low;
  return (
    <span
      className={`inline-flex items-center border px-2.5 py-0.5 font-mono text-[10px] font-bold uppercase tracking-[0.12em] ${cls}`}
    >
      {priority}
    </span>
  );
}
