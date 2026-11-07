import { useEffect, useLayoutEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { AnimatedPage } from "../components/AnimatedPage";
import { gsap } from "../lib/gsap";

const REELS = [
  {
    id: "DemxdWJhhDR",
    url: "https://www.instagram.com/reel/DemxdWJhhDR/",
  },
  {
    id: "DcR-kWGRLyZ",
    url: "https://www.instagram.com/p/DcR-kWGRLyZ/",
  },
  {
    id: "DfLqOMBBfte",
    url: "https://www.instagram.com/p/DfLqOMBBfte/",
  },
];

export default function Media() {
  const containerRef = useRef<HTMLDivElement>(null);

  // Load Instagram embed script and parse widgets on mount
  useEffect(() => {
    type InstagramWindow = Window & {
      instgrm?: { Embeds?: { process: () => void } };
    };

    const processInstagramEmbeds = () => {
      (window as InstagramWindow).instgrm?.Embeds?.process();
    };

    const scriptSrc = "https://www.instagram.com/embed.js";
    const existingScript = document.querySelector<HTMLScriptElement>(
      `script[src="${scriptSrc}"]`
    );

    if (existingScript) {
      if ((window as InstagramWindow).instgrm?.Embeds) {
        processInstagramEmbeds();
      } else {
        existingScript.addEventListener("load", processInstagramEmbeds, { once: true });
      }

      return () => {
        existingScript.removeEventListener("load", processInstagramEmbeds);
      };
    }

    const script = document.createElement("script");
    script.src = scriptSrc;
    script.async = true;
    script.onload = processInstagramEmbeds;
    document.body.appendChild(script);

    return () => {
      script.onload = null;
    };
  }, []);

  useLayoutEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      gsap.from("[data-media-card]", {
        y: 24,
        autoAlpha: 0,
        duration: 0.75,
        stagger: 0.1,
        ease: "power3.out",
      });
    }, container);

    return () => ctx.revert();
  }, []);

  return (
    <AnimatedPage>
      <>
        {/* Header Section */}
        <section className="border-b border-zinc-800 bg-zinc-950">
          <div className="mx-auto max-w-[1280px] px-4 py-12 lg:px-8 lg:py-16">
            <div className="flex flex-wrap items-center gap-2 font-mono text-[11px] uppercase tracking-[0.14em] text-zinc-500">
              <Link to="/" className="hover:text-white">
                Home
              </Link>
              <span className="text-zinc-700">/</span>
              <span className="text-zinc-300">Media</span>
            </div>
            <div className="mt-6 flex flex-wrap items-end justify-between gap-6">
              <div>
                <div className="mb-3 flex items-center gap-3">
                  <span className="h-px w-8 bg-zinc-700" aria-hidden="true" />
                  <span className="font-mono text-xs font-semibold uppercase tracking-[0.16em] text-zinc-500">
                    Photos • Videos • Press
                  </span>
                </div>
                <h1 className="text-[36px] font-black uppercase tracking-[-0.02em] text-white sm:text-[52px]">
                  Media
                </h1>
                <p className="mt-3 max-w-[48ch] text-sm leading-relaxed text-zinc-400">
                  Reveal videos, match footage, pit photos — every season documented.
                </p>
              </div>
              <div className="flex gap-2">
                <a
                  href="https://www.instagram.com/stepinacrobotics/"
                  target="_blank"
                  rel="noreferrer"
                  className="bg-gradient-to-br from-purple-600 via-pink-600 to-orange-500 px-5 py-3 text-xs font-bold uppercase tracking-[0.12em] text-white hover:opacity-90 transition-opacity"
                >
                  Instagram →
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Media Grid Section */}
        <section className="bg-zinc-900" ref={containerRef}>
          <div className="mx-auto max-w-[1280px] px-4 py-16 lg:px-8 lg:py-20">
            <div className="mb-8 flex flex-col gap-2">
              <div className="inline-flex items-center gap-2 font-mono text-xs font-semibold uppercase tracking-[0.16em] text-red-500">
                <span className="h-2 w-2 rounded-full bg-red-600 animate-pulse" />
                Latest Highlights
              </div>
              <h2 className="text-2xl font-black uppercase tracking-tight text-white sm:text-3xl">
                Instagram Posts &amp; Reels
              </h2>
            </div>

            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {REELS.map((reel) => (
                <div
                  key={reel.id}
                  data-media-card
                  className="w-full overflow-hidden rounded-xl border border-zinc-800 bg-white p-2 shadow-xl transition-transform hover:-translate-y-1"
                >
                  <blockquote
                    className="instagram-media"
                    data-instgrm-permalink={reel.url}
                    data-instgrm-version="14"
                    style={{
                      background: "#fff",
                      border: 0,
                      borderRadius: "3px",
                      boxShadow: "0 0 1px 0 rgba(0,0,0,0.5), 0 1px 10px 0 rgba(0,0,0,0.15)",
                      margin: "0 auto",
                      maxWidth: "540px",
                      minWidth: "0",
                      padding: 0,
                      width: "100%",
                    }}
                  >
                    <a
                      href={reel.url}
                      target="_blank"
                      rel="noreferrer"
                      className="block p-6 text-center text-sm font-semibold text-blue-600"
                    >
                      Watch this post on Instagram
                    </a>
                  </blockquote>
                </div>
              ))}
            </div>

            <div className="mt-12 flex justify-center border-t border-zinc-800 pt-8">
              <a
                href="https://www.instagram.com/stepinacrobotics/"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 bg-gradient-to-br from-purple-600 via-pink-600 to-orange-500 px-6 py-3.5 text-xs font-bold uppercase tracking-[0.14em] text-white hover:opacity-90 shadow-lg transition-opacity"
              >
                Follow @stepinacrobotics for more updates →
              </a>
            </div>
          </div>
        </section>
      </>
    </AnimatedPage>
  );
}
