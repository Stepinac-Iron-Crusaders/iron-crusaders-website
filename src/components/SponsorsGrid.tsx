import { useLayoutEffect, useRef } from "react";
import type { Sponsor } from "../data/sponsors";
import { getLogoClass } from "../data/sponsors";
import { gsap, prefersReducedMotion } from "../lib/gsap";

export default function SponsorsGrid({ sponsors }: { sponsors: Sponsor[] }) {
  const gridRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const grid = gridRef.current;
    if (!grid) return;
    if (prefersReducedMotion()) return;

    const logos = grid.querySelectorAll<HTMLElement>("[data-sponsor-item]");

    const ctx = gsap.context(() => {
      logos.forEach((logo, index) => {
        gsap.to(logo, {
          y: -8,
          duration: 1.8 + (index % 3) * 0.25,
          ease: "sine.inOut",
          yoyo: true,
          repeat: -1,
          delay: index * 0.18,
        });
      });
    }, grid);

    return () => ctx.revert();
  }, [sponsors]);

  return (
    <div
      ref={gridRef}
      className="mt-8 flex flex-wrap items-center justify-center gap-6"
    >
      {sponsors.map((s) => (
        <div
          key={s.name}
          data-sponsor-item
          className="flex items-center justify-center p-1 will-change-transform"
        >
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
