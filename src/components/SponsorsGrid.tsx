export type Sponsor = {
  name: string;
  tier?: string;
  logo?: string | null;
};

const DEFAULT_LOGO_SIZES: Record<string, string> = {
  Crusader: "max-h-28",
  Knight: "max-h-20",
  Paladin: "max-h-16",
  Squire: "max-h-12",
  Ally: "max-h-10",
};

const getLogoClass = (tier?: string) => {
  if (!tier) return DEFAULT_LOGO_SIZES.Ally;
  return DEFAULT_LOGO_SIZES[tier] ?? DEFAULT_LOGO_SIZES.Ally;
};

export default function SponsorsGrid({ sponsors }: { sponsors: Sponsor[] }) {
  return (
    <div className="mt-8 flex flex-wrap items-center justify-center gap-6">
      {sponsors.map((s) => (
        <div key={s.name} className="flex items-center justify-center p-1">
          {s.logo ? (
            <img
              src={s.logo}
              alt={s.name}
              title={s.name}
              className={`${getLogoClass(s.tier)} object-contain`}
              style={{ width: "auto" }}
            />
          ) : (
            <span className="font-mono text-[11px] font-medium uppercase tracking-[0.12em] text-zinc-500">
              {s.name}
            </span>
          )}
        </div>
      ))}
    </div>
  );
}
