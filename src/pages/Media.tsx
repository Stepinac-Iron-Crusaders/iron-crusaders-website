import { Link } from "react-router-dom";
import { PlaceholderImage } from "../components/PlaceholderImage";

export default function Media() {
  return (
    <>
      <section className="border-b border-zinc-800 bg-zinc-950">
        <div className="mx-auto max-w-[1280px] px-4 py-12 lg:px-8 lg:py-16">
          <div className="flex flex-wrap items-center gap-2 font-mono text-[11px] uppercase tracking-[0.14em] text-zinc-500">
            <Link to="/" className="hover:text-white">Home</Link>
            <span className="text-zinc-700">/</span>
            <span className="text-zinc-300">Media</span>
          </div>
          <div className="mt-6 flex flex-wrap items-end justify-between gap-6">
            <div>
              <div className="mb-3 flex items-center gap-3">
                <span className="h-px w-8 bg-zinc-700" aria-hidden="true" />
                <span className="font-mono text-xs font-semibold uppercase tracking-[0.16em] text-zinc-500">Photos • Videos • Press</span>
              </div>
              <h1 className="text-[36px] font-black uppercase tracking-[-0.02em] text-white sm:text-[52px]">Media</h1>
              <p className="mt-3 max-w-[48ch] text-sm leading-relaxed text-zinc-400">Reveal videos, match footage, pit photos — every season documented. Replace placeholders with your real assets.</p>
            </div>
            <div className="flex gap-2">
              <a href="https://www.instagram.com/stepinacrobotics/" target="_blank" rel="noreferrer" className="bg-gradient-to-br from-purple-600 via-pink-600 to-orange-500 px-5 py-3 text-xs font-bold uppercase tracking-[0.12em] text-white hover:opacity-90">Instagram →</a>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-zinc-800 bg-zinc-900">
        <div className="mx-auto max-w-[1280px] px-4 py-10 lg:px-8 lg:py-12">
          <h2 className="font-mono text-xs font-bold uppercase tracking-[0.12em] text-white">Featured Videos</h2>
          <div className="mt-6 grid gap-6 lg:grid-cols-[1.5fr_1fr]">
            <div className="border border-zinc-800 bg-zinc-950">
              <PlaceholderImage label="FEATURED — 2025 REVEAL VIDEO THUMBNAIL PLACEHOLDER (16:9)" className="aspect-video border-0 border-b border-zinc-800" />
              <div className="p-5">
                <h3 className="text-sm font-black uppercase tracking-wide text-white">2025 Reveal — Crusader Mk. VII</h3>
                <p className="mt-1 font-mono text-xs text-zinc-500">YouTube • 2:14 • 12K views • Music: Licensed</p>
                <a href="#" className="mt-3 inline-flex text-xs font-semibold uppercase tracking-[0.1em] text-zinc-300 hover:text-white">Watch →</a>
              </div>
            </div>
            <div className="grid gap-6">
              {[
                "2024 REVEAL — ARIA (2:02)",
                "HUDSON VALLEY FINALS MATCH 3",
                "OUTREACH — MINI-BOT FINALS",
              ].map((l) => (
                <div key={l} className="border border-zinc-800 bg-zinc-950">
                  <PlaceholderImage label={l} className="aspect-video border-0 border-b border-zinc-800" />
                  <div className="px-4 py-3 font-mono text-[11px] uppercase tracking-wide text-zinc-500">{l}</div>
                </div>
              ))}
            </div>
          </div>

          <h2 className="mt-12 font-mono text-xs font-bold uppercase tracking-[0.12em] text-white">Photo Galleries</h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              "Build Season — Week 3",
              "Pit • Hudson Valley",
              "NYC Regional Day 2",
              "Outreach — Mini-Bots",
              "Swerve Calibration",
              "Laser & Print Farm",
              "Team Photo 2025",
              "Alumni Return Night",
            ].map((g) => (
              <div key={g} className="group border border-zinc-800 bg-zinc-950">
                <PlaceholderImage label={g} className="aspect-[4/3] border-0 border-b border-zinc-800" />
                <div className="p-4">
                  <div className="text-xs font-bold uppercase tracking-wide text-white">{g}</div>
                  <div className="font-mono text-[11px] text-zinc-500">24 photos • 2025</div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-10 border border-zinc-800 bg-zinc-950 p-6">
            <h3 className="text-xs font-black uppercase tracking-[0.12em] text-white">Press & Links</h3>
            <ul className="mt-4 space-y-3 text-sm">
              <li className="flex justify-between border-b border-zinc-800 pb-3"><span className="text-zinc-300">LoHud — “Stepinac engineers aim for NYC blue banner”</span><span className="font-mono text-xs text-zinc-500">Feb 2025</span></li>
              <li className="flex justify-between border-b border-zinc-800 pb-3"><span className="text-zinc-300">FRC Top 25 — Reefscape Week 2 recap (match video)</span><span className="font-mono text-xs text-zinc-500">Mar 2025</span></li>
              <li className="flex justify-between"><span className="text-zinc-300">Stepinac Magazine — Alumni spotlight</span><span className="font-mono text-xs text-zinc-500">Aug 2025</span></li>
            </ul>
          </div>
        </div>
      </section>
    </>
  );
}
