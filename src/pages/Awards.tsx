import { Link } from "react-router-dom";

const AWARDS = [
  { year: 2025, event: "Hudson Valley Regional", award: "Regional Finalists", detail: "Alliance 2 — Captain. Strong auto + endgame." },
  { year: 2025, event: "Hudson Valley Regional", award: "Industrial Design Award", detail: "Sponsored by General Motors — robust mechanism design." },
  { year: 2025, event: "NYC Regional", award: "Creativity Award", detail: "Carbon fiber arm with active wrist — judges’ pick." },
  { year: 2024, event: "Hudson Valley Regional", award: "Excellence in Engineering", detail: "Precision elevator + swerve stack." },
  { year: 2024, event: "NYC Regional", award: "Innovation in Control", detail: "Vision + state estimation with PhotonVision." },
  { year: 2023, event: "NYC Regional", award: "Autonomous Award", detail: "PathPlanner 3-piece auto — 98% in quals." },
  { year: 2019, event: "Hudson Valley Regional", award: "Quality Award", detail: "Sponsored by Motorola — fit, finish, and wiring." },
  { year: 2018, event: "Hudson Valley Regional", award: "Rookie Inspiration", detail: "Community growth in first FRC season." },
];

export default function Awards() {
  return (
    <>
      <section className="border-b border-zinc-800 bg-zinc-950">
        <div className="mx-auto max-w-[1280px] px-4 py-12 lg:px-8 lg:py-16">
          <div className="flex flex-wrap items-center gap-2 font-mono text-[11px] uppercase tracking-[0.14em] text-zinc-500">
            <Link to="/" className="hover:text-white">Home</Link>
            <span className="text-zinc-700">/</span>
            <span className="text-zinc-300">Awards</span>
          </div>
          <div className="mt-6 max-w-3xl">
            <div className="mb-3 flex items-center gap-3">
              <span className="h-px w-8 bg-red-600" aria-hidden="true" />
              <span className="font-mono text-xs font-semibold uppercase tracking-[0.16em] text-red-500">Recognition</span>
            </div>
            <h1 className="text-[36px] font-black uppercase tracking-[-0.02em] text-white sm:text-[52px]">Awards</h1>
            <p className="mt-4 text-sm leading-relaxed text-zinc-400">Hardware matters, but awards measure process: design rigor, controls innovation, and team sustainability. 18+ banners and technical awards since 2018.</p>
          </div>
          <div className="mt-6 flex gap-2">
            <span className="border border-zinc-800 bg-zinc-900 px-3 py-2 font-mono text-xs text-white">18+ Awards</span>
            <span className="border border-zinc-800 bg-zinc-900 px-3 py-2 font-mono text-xs text-zinc-400">3 Regionals won as finalist</span>
          </div>
        </div>
      </section>

      <section className="bg-zinc-900">
        <div className="mx-auto max-w-[1280px] px-4 py-10 lg:px-8 lg:py-12">
          <div className="overflow-hidden border border-zinc-800">
            <div className="hidden md:block">
              <div className="grid grid-cols-[80px_190px_1fr_1.2fr] bg-zinc-950 px-5 py-3 font-mono text-[11px] uppercase tracking-[0.12em] text-zinc-500">
                <span>Year</span>
                <span>Event</span>
                <span>Award</span>
                <span>Detail</span>
              </div>
              {AWARDS.map((a, i) => (
                <div key={i} className="grid grid-cols-[80px_190px_1fr_1.2fr] items-center bg-zinc-950 px-5 py-4 text-sm hover:bg-zinc-900 divide-x divide-zinc-800">
                  <span className="font-mono text-xs font-bold text-white">{a.year}</span>
                  <span className="px-4 text-zinc-300">{a.event}</span>
                  <span className="px-4 font-semibold text-white">{a.award}</span>
                  <span className="px-4 text-zinc-400">{a.detail}</span>
                </div>
              ))}
            </div>
            <div className="grid gap-4 md:hidden bg-zinc-950 p-4">
              {AWARDS.map((a, i) => (
                <div key={i} className="border border-zinc-800 bg-zinc-900 p-4">
                  <div className="flex items-center gap-2">
                    <span className="bg-red-600 px-2 py-1 font-mono text-[11px] font-bold text-white">{a.year}</span>
                    <span className="font-mono text-xs text-zinc-400">{a.event}</span>
                  </div>
                  <div className="mt-2 text-sm font-bold text-white">{a.award}</div>
                  <div className="text-sm text-zinc-400">{a.detail}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-8 border border-zinc-800 bg-zinc-950 p-6 text-center">
            <p className="font-mono text-xs uppercase tracking-[0.12em] text-zinc-500">Goal 2026</p>
            <p className="mx-auto mt-2 max-w-[52ch] text-sm leading-relaxed text-zinc-300">Blue banner. Engineering Excellence is the target metric — repeatable autos, clean pit, and Gracious Professionalism that judges remember.</p>
          </div>
        </div>
      </section>
    </>
  );
}
