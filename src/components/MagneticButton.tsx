import { useLayoutEffect, useRef } from "react";
import { gsap, prefersReducedMotion } from "../lib/gsap";

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  strength?: number;
  asChild?: boolean;
};

export function MagneticButton({
  children,
  className,
  strength = 0.35,
  ...props
}: Props & { children: React.ReactNode }) {
  const btnRef = useRef<HTMLButtonElement>(null);

  useLayoutEffect(() => {
    const btn = btnRef.current;
    if (!btn) return;
    if (prefersReducedMotion()) return;
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const xTo = gsap.quickTo(btn, "x", { duration: 0.45, ease: "power3.out" });
    const yTo = gsap.quickTo(btn, "y", { duration: 0.45, ease: "power3.out" });

    const onMove = (e: MouseEvent) => {
      const rect = btn.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = (e.clientX - cx) * strength;
      const dy = (e.clientY - cy) * strength;
      xTo(dx);
      yTo(dy);
    };
    const onLeave = () => {
      gsap.to(btn, { x: 0, y: 0, duration: 0.55, ease: "expo.out" });
    };

    btn.addEventListener("mousemove", onMove);
    btn.addEventListener("mouseleave", onLeave);
    return () => {
      btn.removeEventListener("mousemove", onMove);
      btn.removeEventListener("mouseleave", onLeave);
      gsap.killTweensOf(btn);
    };
  }, [strength]);

  return (
    <button ref={btnRef} data-magnetic data-cursor="hover" className={className} {...props}>
      <span className="relative inline-flex items-center justify-center will-change-transform">
        {children}
      </span>
    </button>
  );
}

// Wrapper for <a> / Link that needs magnetic behavior without button semantics
export function MagneticWrap({
  children,
  className,
  strength = 0.32,
}: {
  children: React.ReactNode;
  className?: string;
  strength?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (prefersReducedMotion()) return;
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const xTo = gsap.quickTo(el, "x", { duration: 0.45, ease: "power3.out" });
    const yTo = gsap.quickTo(el, "y", { duration: 0.45, ease: "power3.out" });

    const onMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = (e.clientX - cx) * strength;
      const dy = (e.clientY - cy) * strength;
      xTo(dx);
      yTo(dy);
    };
    const onLeave = () => gsap.to(el, { x: 0, y: 0, duration: 0.6, ease: "expo.out" });

    el.addEventListener("mousemove", onMove);
    el.addEventListener("mouseleave", onLeave);
    return () => {
      el.removeEventListener("mousemove", onMove);
      el.removeEventListener("mouseleave", onLeave);
      gsap.killTweensOf(el);
    };
  }, [strength]);

  return (
    <div ref={ref} data-magnetic className={`inline-flex will-change-transform ${className ?? ""}`}>
      {children}
    </div>
  );
}
