import { useLayoutEffect, useRef } from "react";
import { gsap, prefersReducedMotion, ScrollTrigger } from "../lib/gsap";

export function Marquee({
  text = "IRON CRUSADERS — ENGINEERING • COMPETITION • COMMUNITY — ",
  repeat = 6,
}: {
  text?: string;
  repeat?: number;
}) {
  const trackRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const track = trackRef.current;
    const container = containerRef.current;
    if (!track || !container) return;
    if (prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      const totalWidth = track.scrollWidth / 2;
      const tween = gsap.to(track, {
        x: -totalWidth,
        duration: 22,
        ease: "none",
        repeat: -1,
      });

      // scrub velocity on scroll for premium feel
      ScrollTrigger.create({
        trigger: container,
        start: "top bottom",
        end: "bottom top",
        onUpdate: (self) => {
          const v = Math.abs(self.getVelocity());
          const target = gsap.utils.clamp(0.7, 2.2, 1 + v / 2800);
          gsap.to(tween, { timeScale: target, duration: 0.45, overwrite: true });
        },
      });

      // pause on hover
      track.addEventListener("mouseenter", () => gsap.to(tween, { timeScale: 0.15, duration: 0.4 }));
      track.addEventListener("mouseleave", () => gsap.to(tween, { timeScale: 1, duration: 0.5 }));
    }, container);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative overflow-hidden border-y border-zinc-800 bg-zinc-950 py-3"
      aria-hidden="true"
    >
      <div className="pointer-events-none absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-zinc-950 to-transparent z-10" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-zinc-950 to-transparent z-10" />
      <div
        ref={trackRef}
        className="flex w-max select-none items-center gap-8 whitespace-nowrap"
        style={{ willChange: "transform" }}
      >
        {Array.from({ length: repeat * 2 }).map((_, i) => (
          <span
            key={i}
            className="inline-flex items-center gap-8 font-mono text-[11px] font-bold uppercase tracking-[0.22em] text-zinc-500"
          >
            <span className="h-1 w-1 bg-red-600" />
            {text}
          </span>
        ))}
      </div>
    </div>
  );
}
