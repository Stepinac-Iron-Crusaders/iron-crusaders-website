import { useLayoutEffect, useRef } from "react";
import { gsap, prefersReducedMotion } from "../lib/gsap";

export function TiltCard({
  children,
  className,
  intensity = 8,
}: {
  children: React.ReactNode;
  className?: string;
  intensity?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (prefersReducedMotion()) return;
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const onMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      gsap.to(el, {
        rotateY: x * intensity,
        rotateX: -y * intensity,
        duration: 0.5,
        ease: "power2.out",
        transformPerspective: 900,
        transformOrigin: "center",
      });
    };
    const onLeave = () => {
      gsap.to(el, {
        rotateY: 0,
        rotateX: 0,
        duration: 0.7,
        ease: "expo.out",
      });
    };
    const onEnter = () => {
      gsap.to(el, { scale: 1.015, duration: 0.35, ease: "power2.out" });
    };

    el.addEventListener("mousemove", onMove);
    el.addEventListener("mouseleave", onLeave);
    el.addEventListener("mouseenter", onEnter);

    return () => {
      el.removeEventListener("mousemove", onMove);
      el.removeEventListener("mouseleave", onLeave);
      el.removeEventListener("mouseenter", onEnter);
      gsap.killTweensOf(el);
    };
  }, [intensity]);

  return (
    <div
      ref={ref}
      className={className}
      style={{ transformStyle: "preserve-3d" } as React.CSSProperties}
    >
      {children}
    </div>
  );
}
