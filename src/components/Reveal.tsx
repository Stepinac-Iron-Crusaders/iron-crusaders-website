import { useLayoutEffect, useRef } from "react";
import { gsap, prefersReducedMotion } from "../lib/gsap";

type RevealProps = {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  stagger?: number;
  duration?: number;
  ease?: string;
  triggerStart?: string;
  once?: boolean;
};

export function Reveal({
  children,
  className,
  delay = 0,
  y = 28,
  stagger,
  duration = 0.85,
  ease = "power3.out",
  triggerStart = "top 88%",
  once = true,
}: RevealProps) {
  const ref = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (prefersReducedMotion()) {
      gsap.set(el, { clearProps: "all" });
      return;
    }

    const ctx = gsap.context(() => {
      const targets = stagger
        ? (el.querySelectorAll<HTMLElement>("[data-reveal-child]") as unknown as HTMLElement[])
        : null;

      if (targets && targets.length) {
        gsap.fromTo(
          targets,
          { y, autoAlpha: 0 },
          {
            y: 0,
            autoAlpha: 1,
            duration,
            ease,
            stagger: stagger ?? 0.08,
            delay,
            scrollTrigger: {
              trigger: el,
              start: triggerStart,
              once,
            },
          }
        );
      } else {
        gsap.fromTo(
          el,
          { y, autoAlpha: 0 },
          {
            y: 0,
            autoAlpha: 1,
            duration,
            ease,
            delay,
            scrollTrigger: {
              trigger: el,
              start: triggerStart,
              once,
            },
          }
        );
      }
    }, ref);

    return () => ctx.revert();
  }, [delay, duration, ease, once, stagger, triggerStart, y]);

  return (
    <div ref={ref as React.RefObject<HTMLDivElement>} className={className}>
      {children}
    </div>
  );
}

type SplitTextProps = {
  text: string;
  className?: string;
  stagger?: number;
  delay?: number;
};

export function SplitReveal({
  text,
  className,
  stagger = 0.035,
  delay = 0,
}: SplitTextProps) {
  const ref = useRef<HTMLElement>(null);
  const words = text.split(" ");

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      const chars = el.querySelectorAll<HTMLElement>("[data-word]");
      gsap.fromTo(
        chars,
        { yPercent: 115, autoAlpha: 0, rotateX: -18 },
        {
          yPercent: 0,
          autoAlpha: 1,
          rotateX: 0,
          duration: 0.95,
          ease: "expo.out",
          stagger,
          delay,
          scrollTrigger: {
            trigger: el,
            start: "top 92%",
            once: true,
          },
        }
      );
    }, ref);
    return () => ctx.revert();
  }, [delay, stagger, text]);

  return (
    <div
      ref={ref as React.RefObject<HTMLDivElement>}
      className={className}
      aria-label={text}
      style={{ perspective: 800 } as React.CSSProperties}
    >
      <span aria-hidden="true" className="inline-flex flex-wrap gap-x-[0.24em] overflow-hidden">
        {words.map((w, i) => (
          <span
            key={`${w}-${i}`}
            data-word
            className="inline-block overflow-hidden"
            style={{ display: "inline-block" }}
          >
            <span className="inline-block will-change-transform">{w}</span>
          </span>
        ))}
      </span>
    </div>
  );
}

export function useParallax(ref: React.RefObject<HTMLElement | null>, opts?: { yPercent?: number; scrub?: number }) {
  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (prefersReducedMotion()) return;
    const yPercent = opts?.yPercent ?? -14;
    const scrub = opts?.scrub ?? 1.1;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        { yPercent: 0 },
        {
          yPercent,
          ease: "none",
          scrollTrigger: {
            trigger: el,
            start: "top bottom",
            end: "bottom top",
            scrub,
          },
        }
      );
    });
    return () => ctx.revert();
  }, [opts?.scrub, opts?.yPercent]);
}

export function useRevealBatch(
  rootRef: React.RefObject<HTMLElement | null>,
  selector = "[data-reveal]"
) {
  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    if (prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      const els = root.querySelectorAll<HTMLElement>(selector);
      if (!els.length) return;
      gsap.fromTo(
        els,
        { y: 26, autoAlpha: 0 },
        {
          y: 0,
          autoAlpha: 1,
          duration: 0.8,
          ease: "power3.out",
          stagger: 0.08,
          scrollTrigger: {
            trigger: root,
            start: "top 88%",
            once: true,
          },
        }
      );
    }, root);

    return () => ctx.revert();
  }, [selector]);
}
