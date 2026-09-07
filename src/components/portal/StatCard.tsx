type Props = {
  label: string;
  value: string | number;
  sub?: string;
  accent?: boolean;
};

export function StatCard({ label, value, sub, accent = false }: Props) {
  return (
    <div
      className={`border p-5 ${
        accent
          ? "border-red-800 bg-red-950/30"
          : "border-zinc-800 bg-zinc-950"
      }`}
    >
      <p className="font-mono text-[10px] font-bold uppercase tracking-[0.14em] text-zinc-500">
        {label}
      </p>
      <p
        className={`mt-2 text-3xl font-black uppercase tracking-tight ${
          accent ? "text-red-400" : "text-white"
        }`}
      >
        {value}
      </p>
      {sub && <p className="mt-1 text-xs text-zinc-600">{sub}</p>}
    </div>
  );
}
