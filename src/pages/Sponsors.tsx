import { Link } from "react-router-dom";
import { PlaceholderImage } from "../components/PlaceholderImage";
import SponsorsGrid from "../components/SponsorsGrid";
import { SPONSORS, TIERS } from "../data/sponsors";

export default function Sponsors() {
  return (
    <>
      <section className="relative overflow-hidden border-b border-zinc-800 bg-zinc-950">
        <div aria-hidden="true" className="absolute left-0 right-0 top-0 h-px bg-gradient-to-r from-transparent via-red-600/40 to-transparent" />
        <div className="mx-auto max-w-[1280px] px-4 py-12 lg:px-8 lg:py-16">
          <div className="flex flex-wrap items-center gap-2 font-mono text-[11px] uppercase tracking-[0.14em] text-zinc-500">
            <Link to="/" className="hover:text-white">
              Home
            </Link>
            <span className="text-zinc-700">/</span>
            <span className="text-zinc-300">Sponsors</span>
          </div>
          <div className="mt-6 grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-12">
            <div>
              <div className="mb-3 flex items-center gap-3">
                <span className="h-px w-8 bg-red-600" aria-hidden="true" />
                <span className="font-mono text-xs font-semibold uppercase tracking-[0.16em] text-red-500">Partners • 501(c)(3) Tax-Deductible</span>
              </div>
              <h1 className="text-[36px] font-black uppercase leading-[0.9] tracking-[-0.03em] text-white sm:text-[52px]">
                Sponsor
                <br />
                <span className="text-zinc-500">Us</span>
              </h1>
              <p className="mt-4 max-w-[48ch] text-[15px] leading-relaxed text-zinc-400">
                Every dollar goes to materials, machining, travel, and outreach — directly into student learning. Join 18 companies and families funding the 2025–26 season.
              </p>
              <div className="mt-6 flex gap-3">
                <Link to="/contact?subject=Sponsorship" className="bg-red-600 px-7 py-3.5 text-xs font-bold uppercase tracking-[0.14em] text-white hover:bg-red-700">
                  Sponsor via Form →
                </Link>
                <button
                  type="button"
                  onClick={() => document.getElementById("tiers")?.scrollIntoView({ behavior: "smooth" })}
                  className="border border-zinc-700 bg-zinc-900 px-7 py-3.5 text-xs font-bold uppercase tracking-[0.14em] text-white hover:bg-zinc-800"
                >
                  View Tiers
                </button>
              </div>
              <p className="mt-4 font-mono text-[11px] uppercase tracking-wide text-zinc-600">W-9 + receipt on request • Contact: engineeringclub@stepinac.org</p>
            </div>
            <div className="border border-zinc-800 bg-zinc-900 p-6">
              <h3 className="text-xs font-black uppercase tracking-[0.12em] text-white">Where Your Gift Goes</h3>
              <div className="mt-4 space-y-4">
                {[
                  { label: "Robot Materials & Fab", pct: 38, cost: "$12k" },
                  { label: "Travel & Regionals", pct: 32, cost: "$10k" },
                  { label: "Tools & Shop", pct: 15, cost: "$4.5k" },
                  { label: "Outreach & STEM", pct: 15, cost: "$4.5k" },
                ].map((r) => (
                  <div key={r.label}>
                    <div className="flex justify-between font-mono text-xs">
                      <span className="text-zinc-400">{r.label}</span>
                      <span className="font-bold text-white">{r.cost}</span>
                    </div>
                    <div className="mt-1 h-1.5 bg-zinc-800">
                      <div className="h-full bg-red-600" style={{ width: `${r.pct}%` }} />
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-6 border-t border-zinc-800 pt-4 text-center font-mono text-xs text-zinc-500">Season budget ~$31k • Transparent accounting</div>
            </div>
          </div>
        </div>
      </section>

      <section id="tiers" className="border-b border-zinc-800 bg-zinc-900">
        <div className="mx-auto max-w-[1280px] px-4 py-12 lg:px-8 lg:py-14">
          <h2 className="text-[28px] font-black uppercase tracking-[-0.02em] text-white">Sponsorship Tiers</h2>
          <p className="mt-2 text-sm text-zinc-400">All tiers include website listing and thank-you social post. Higher tiers stack all lower perks.</p>
          <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-5">
            {TIERS.map((t) => (
              <div key={t.name} className="flex flex-col border border-zinc-800 bg-zinc-950">
                <div className={`px-5 py-3 text-center font-mono text-xs font-black uppercase tracking-[0.12em] ${t.accent}`}>{t.name} • {t.price}</div>
                <div className="flex-1 p-6">
                  <ul className="space-y-2">
                    {t.perks.map((p) => (
                      <li key={p} className="flex gap-2 text-sm text-zinc-300"><span className="mt-2 h-1 w-1 shrink-0 bg-red-600" /> {p}</li>
                    ))}
                  </ul>
                </div>
                <div className="p-6 pt-0">
                  <Link
                    to={`/contact?tier=${encodeURIComponent(t.name)}`}
                    className="block w-full border border-zinc-700 bg-zinc-900 py-3 text-center text-xs font-bold uppercase tracking-[0.12em] text-white hover:bg-zinc-800"
                  >
                    Choose {t.name}
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-zinc-800 bg-zinc-950">
        <div className="mx-auto max-w-[1280px] px-4 py-12 lg:px-8 lg:py-14">
          <div className="mx-auto max-w-2xl border border-zinc-800 bg-zinc-900 p-6 text-center lg:p-8">
            <h2 className="text-sm font-black uppercase tracking-[0.08em] text-white">Ready to Sponsor?</h2>
            <p className="mt-2 text-sm leading-relaxed text-zinc-400">Email us with the subject "Sponsorship — (tier)" and we'll follow up within 24 hours with a W-9, receipt, and next steps.</p>
            <Link to="/contact?subject=Sponsorship%20%E2%80%94%20Tier%20Inquiry" className="mt-6 inline-flex bg-red-600 px-8 py-3.5 text-xs font-bold uppercase tracking-[0.14em] text-white hover:bg-red-700">Contact via Form →</Link>
          </div>
        </div>
      </section>

      <section className="border-b border-zinc-800 bg-zinc-950">
        <div className="mx-auto max-w-[1280px] px-4 py-12 lg:px-8 lg:py-14">
          <h2 className="text-center font-mono text-xs font-bold uppercase tracking-[0.12em] text-zinc-500">Our Sponsors</h2>
          <div className="mt-8">
            <SponsorsGrid sponsors={SPONSORS} />
          </div>
          <div className="mt-10 flex flex-col items-center gap-3">
            <p className="text-sm text-zinc-400">Want to see your logo here next season?</p>
            <Link to="/contact?tier=Crusader" className="inline-flex bg-white px-8 py-3 text-xs font-black uppercase tracking-[0.14em] text-zinc-900">Become a Sponsor</Link>
          </div>
        </div>
      </section>

      <section className="bg-zinc-900">
        <div className="mx-auto max-w-[1280px] px-4 py-8 lg:px-8">
          <PlaceholderImage label="SPONSOR BANNER & ROBOT LOGO PREVIEW PLACEHOLDER" className="aspect-[3/1]" />
        </div>
      </section>
    </>
  );
}
