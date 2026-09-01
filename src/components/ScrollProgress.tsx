import { useLayoutEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "../lib/gsap";

export function ScrollProgress() {
  const barRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const bar = barRef.current;
    if (!bar) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      gsap.set(bar, { scaleX: 0, transformOrigin: "left center", force3D: true });

      gsap.to(bar, {
        scaleX: 1,
        ease: "none",
        scrollTrigger: {
          trigger: document.documentElement,
          start: "top top",
          end: "bottom bottom",
          scrub: 0.35,
        },
      });

      // subtle glow trail
      ScrollTrigger.create({
        start: "top top",
        end: "bottom bottom",
        onUpdate: (self) => {
          const p = self.progress;
          // shift gradient hue slightly or opacity
          gsap.to(bar, {
            opacity: p > 0.02 ? 1 : 0,
            duration: 0.2,
            overwrite: true,
          });
        },
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed left-0 right-0 top-0 z-[60] h-[2px] origin-left"
    >
      <div
        ref={barRef}
        className="h-full w-full bg-gradient-to-r from-red-600 via-red-500 to-orange-500 shadow-[0_0_10px_rgba(220,38,38,0.7)]"
        style={{ transform: "scaleX(0)" }}
      />
      {/* thin track */}
      <div className="absolute inset-0 -z-10 bg-zinc-800/40" />
    </div>
  );
}
