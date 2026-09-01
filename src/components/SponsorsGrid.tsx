import type { Sponsor } from "../data/sponsors";
import { getLogoClass } from "../data/sponsors";

export default function SponsorsGrid({ sponsors }: { sponsors: Sponsor[] }) {
  return (
    <div className="mt-8 flex flex-wrap items-center justify-center gap-6">
      {sponsors.map((s) => (
        <div key={s.name} data-sponsor-item className="flex items-center justify-center p-1">
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
