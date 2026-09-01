import { useLayoutEffect, useRef } from "react";
import { gsap, prefersReducedMotion } from "../lib/gsap";

export function CountUp({
  value,
  className,
  suffix = "",
  duration = 1.4,
}: {
  value: string;
  className?: string;
  suffix?: string;
  duration?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);

  // parse numeric part
  const numeric = parseInt(value.replace(/\D/g, ""), 10);
  const hasPlus = value.includes("+");
  const isText = Number.isNaN(numeric) || value === "N/A" || value === "ROOKIE";

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (isText || prefersReducedMotion()) {
      el.textContent = value;
      return;
    }

    const obj = { n: 0 };
    const ctx = gsap.context(() => {
      gsap.to(obj, {
        n: numeric,
        duration,
        ease: "power2.out",
        scrollTrigger: {
          trigger: el,
          start: "top 92%",
          once: true,
        },
        onUpdate: () => {
          el.textContent = `${Math.round(obj.n)}${hasPlus ? "+" : ""}${suffix}`;
        },
      });
    });

    return () => ctx.revert();
  }, [duration, hasPlus, isText, numeric, suffix, value]);

  if (isText) {
    return <span className={className}>{value}</span>;
  }

  return <span ref={ref} className={className}>0{hasPlus ? "+" : ""}</span>;
}
