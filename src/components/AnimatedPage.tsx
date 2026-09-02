import { useLayoutEffect, useRef } from "react";
import { gsap } from "../lib/gsap";

type Props = {
  children: React.ReactNode;
  className?: string;
};

export function AnimatedPage({ children, className }: Props) {
  const ref = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const page = ref.current;
    if (!page) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      // --- Hero (first section) entrance ---
      const hero = page.querySelector("section") as HTMLElement | null;
      if (hero) {
        const breadcrumbEl = hero.querySelector("div.flex.flex-wrap.gap-2") as HTMLElement | null;
        const breadcrumb = breadcrumbEl ? breadcrumbEl.querySelectorAll<HTMLElement>("a, span") : hero.querySelectorAll<HTMLElement>("span.font-mono");
        if (breadcrumb.length) {
          gsap.from(breadcrumb, {
            y: 10,
            autoAlpha: 0,
            duration: 0.5,
            stagger: 0.04,
            ease: "power3.out",
            delay: 0.08,
          });
        }

        const h1 = hero.querySelector("h1");
        if (h1) {
          // animate lines if h1 has br or spans, else whole
          gsap.from(h1, {
            y: 22,
            autoAlpha: 0,
            duration: 0.85,
            ease: "expo.out",
            delay: 0.14,
          });
          // also animate inner spans for staggered feel
          const inner = h1.querySelectorAll("span, br");
          if (inner.length > 2) {
            gsap.from(inner, {
              yPercent: 60,
              autoAlpha: 0,
              duration: 0.7,
              stagger: 0.06,
              ease: "power3.out",
              delay: 0.2,
            });
          }
        }

        const heroP = hero.querySelector("p");
        if (heroP) {
          gsap.from(heroP, {
            y: 14,
            autoAlpha: 0,
            duration: 0.65,
            ease: "power3.out",
            delay: 0.28,
          });
        }

        const heroCtas = hero.querySelectorAll<HTMLElement>("a.bg-blue-600, a.bg-red-600, a.bg-white, a.bg-zinc-900, a.border, button");
        if (heroCtas.length) {
          gsap.from(heroCtas, {
            y: 12,
            autoAlpha: 0,
            duration: 0.6,
            stagger: 0.06,
            ease: "back.out(1.2)",
            delay: 0.36,
            clearProps: "transform,opacity",
          });
        }

        // hero image / placeholder parallax (subtle)
        const heroMedia = hero.querySelectorAll<HTMLElement>("img, [role='img']");
        if (heroMedia.length) {
          gsap.from(heroMedia, {
            autoAlpha: 0,
            scale: 1.02,
            duration: 0.9,
            ease: "power3.out",
            delay: 0.3,
          });
          heroMedia.forEach((el) => {
            gsap.to(el, {
              yPercent: -4,
              ease: "none",
              scrollTrigger: {
                trigger: hero,
                start: "top top",
                end: "bottom top",
                scrub: 1.1,
              },
            });
          });
        }

        // thin top accent line grow
        const accent = hero.querySelector<HTMLElement>("[class*='via-red'], [class*='via-blue']");
        if (accent) {
          gsap.from(accent, { scaleX: 0, transformOrigin: "left", duration: 0.8, ease: "expo.out", delay: 0.05 });
        }
      }

      // --- Sections below hero: scroll reveals ---
      const sections = page.querySelectorAll<HTMLElement>("section");
      sections.forEach((section, idx) => {
        if (idx === 0) return; // hero already handled

        const heads = section.querySelectorAll<HTMLElement>("h2, h3");
        const texts = section.querySelectorAll<HTMLElement>("p");
        const cards = section.querySelectorAll<HTMLElement>(".border, [class*='bg-zinc-900'], [class*='bg-zinc-950']");
        const images = section.querySelectorAll<HTMLElement>("img, [role='img']");
        const lists = section.querySelectorAll<HTMLElement>("ul li, ol li");

        // group cards that are direct children of grid
        const gridCards = section.querySelectorAll<HTMLElement>(".grid > div, .grid > a, .flex > div.border");
        const targetCards = gridCards.length ? gridCards : cards;

        if (heads.length) {
          gsap.from(heads, {
            y: 20,
            autoAlpha: 0,
            duration: 0.65,
            stagger: 0.07,
            ease: "power3.out",
            scrollTrigger: {
              trigger: section,
              start: "top 88%",
              once: true,
            },
          });
        }

        if (texts.length) {
          // only animate first few paragraphs to avoid over-animating long text blocks
          const limited = Array.from(texts).slice(0, 4);
          gsap.from(limited, {
            y: 14,
            autoAlpha: 0,
            duration: 0.6,
            stagger: 0.05,
            ease: "power3.out",
            scrollTrigger: {
              trigger: section,
              start: "top 90%",
              once: true,
            },
          });
        }

        if (targetCards.length) {
          // cap to first 12 to avoid heavy
          const capped = Array.from(targetCards).slice(0, 12) as HTMLElement[];
          gsap.from(capped, {
            y: 22,
            autoAlpha: 0,
            duration: 0.65,
            stagger: 0.06,
            ease: "power3.out",
            scrollTrigger: {
              trigger: section,
              start: "top 86%",
              once: true,
            },
          });
        }

        if (images.length && idx !== 0) {
          images.forEach((img) => {
            gsap.from(img, {
              autoAlpha: 0,
              y: 16,
              duration: 0.7,
              ease: "power3.out",
              scrollTrigger: {
                trigger: img,
                start: "top 92%",
                once: true,
              },
            });
            // subtle parallax for images
            gsap.to(img, {
              yPercent: -3,
              ease: "none",
              scrollTrigger: {
                trigger: img,
                start: "top bottom",
                end: "bottom top",
                scrub: 0.9,
              },
            });
          });
        }

        if (lists.length) {
          const cappedList = Array.from(lists).slice(0, 8) as HTMLElement[];
          gsap.from(cappedList, {
            x: -10,
            autoAlpha: 0,
            duration: 0.5,
            stagger: 0.04,
            ease: "power3.out",
            scrollTrigger: {
              trigger: section,
              start: "top 90%",
              once: true,
            },
          });
        }

        // progress bars (sponsors budget, robot performance)
        const bars = section.querySelectorAll<HTMLElement>("[style*='width:']");
        bars.forEach((bar) => {
          const w = (bar as HTMLElement).style.width;
          if (!w || !w.includes("%")) return;
          gsap.from(bar, {
            scaleX: 0,
            transformOrigin: "left",
            duration: 0.9,
            ease: "expo.out",
            scrollTrigger: {
              trigger: section,
              start: "top 88%",
              once: true,
            },
          });
        });
      });

      // --- Generic fade for any remaining [data-reveal] if present ---
      const reveals = page.querySelectorAll<HTMLElement>("[data-reveal], [data-reveal-head], [data-reveal-card]");
      if (reveals.length) {
        // already handled by section loops, but ensure any stray still animates
        reveals.forEach((el) => {
          if ((el as HTMLElement).style.opacity === "0") return;
        });
      }
    }, page);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={ref} className={className ?? "overflow-x-clip"}>
      {children}
    </div>
  );
}
