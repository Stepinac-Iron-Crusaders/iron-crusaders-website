import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { useForm, ValidationError } from "@formspree/react";

type Tier = "Crusader" | "Knight" | "Paladin" | "Squire" | "Ally" | "";

export default function Contact() {
  const [search] = useSearchParams();
  const initialTier = (search.get("tier") as Tier) || "";
  const initialSubject = search.get("subject") || "";

  const [tier, setTier] = useState<Tier>(initialTier);
  const [subject, setSubject] = useState(
    initialTier ? `Sponsorship Interest — ${initialTier} Tier` : initialSubject
  );

  const [state, handleSubmit] = useForm("xgaeojzy");

  useEffect(() => {
    if (initialTier) setTier(initialTier);
    if (initialSubject) setSubject(initialSubject);
    else if (initialTier) setSubject(`Sponsorship Interest — ${initialTier} Tier`);
  }, [initialTier, initialSubject]);

  useEffect(() => {
    if (tier) setSubject(`Sponsorship Interest — ${tier} Tier`);
  }, [tier]);

  return (
    <>
      <section className="border-b border-zinc-800 bg-zinc-950">
        <div className="mx-auto max-w-[1280px] px-4 py-12 lg:px-8 lg:py-16">
          <div className="flex flex-wrap items-center gap-2 font-mono text-[11px] uppercase tracking-[0.14em] text-zinc-500">
            <Link to="/" className="hover:text-white">Home</Link>
            <span className="text-zinc-700">/</span>
            <span className="text-zinc-300">Contact</span>
          </div>
          <div className="mt-6 max-w-2xl">
            <div className="mb-3 flex items-center gap-3">
              <span className="h-px w-8 bg-red-600" aria-hidden="true" />
              <span className="font-mono text-xs font-semibold uppercase tracking-[0.16em] text-red-500">Get in Touch</span>
            </div>
            <h1 className="text-[36px] font-black uppercase tracking-[-0.02em] text-white sm:text-[52px]">Contact</h1>
            <p className="mt-3 text-sm leading-relaxed text-zinc-400">Sponsors, parents, schools — we reply within 24 hours. For joining, use “Student Interest”.</p>
            {tier && (
              <div className="mt-4 inline-flex items-center gap-2 border border-red-900/40 bg-red-950/30 px-3 py-1.5 font-mono text-xs uppercase tracking-wide text-red-300">
                <span className="h-2 w-2 bg-red-500" /> Tier selected: {tier}
                <button type="button" onClick={() => { setTier(""); setSubject(""); }} className="ml-2 text-zinc-400 hover:text-white">× clear</button>
              </div>
            )}
          </div>
        </div>
      </section>

      <section className="bg-zinc-900">
        <div className="mx-auto max-w-[1280px] px-4 py-10 lg:px-8 lg:py-12">
          <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:gap-10">
            <div className="border border-zinc-800 bg-zinc-950 p-6 lg:p-8">
              <h2 className="text-xs font-black uppercase tracking-[0.12em] text-white">Send a Message</h2>
              <p className="mt-3 text-sm leading-relaxed text-zinc-400">
                Fill out the form — it sends via Formspree to <span className="font-mono text-xs text-zinc-300">engineeringclub@stepinac.org</span>. Pick a tier or subject and we’ll route it to the right lead.
              </p>

              {state.succeeded ? (
                <div className="mt-6 border border-emerald-900 bg-emerald-950/30 p-6 text-center">
                  <div className="mx-auto flex h-10 w-10 items-center justify-center bg-emerald-600 text-white">✓</div>
                  <h3 className="mt-3 text-sm font-bold text-white">Thanks — message sent!</h3>
                  <p className="mt-2 text-sm leading-relaxed text-zinc-400">We’ll reply within 24 hours. You can also email us directly at engineeringclub@stepinac.org.</p>
                  <button type="button" onClick={() => window.location.reload()} className="mt-4 border border-zinc-700 bg-zinc-900 px-5 py-2 text-xs font-bold uppercase tracking-[0.12em] text-white hover:bg-zinc-800">Send another →</button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <label className="block">
                      <span className="font-mono text-[11px] uppercase tracking-wide text-zinc-500">Your Name</span>
                      <input name="name" placeholder="Jane Doe" className="mt-1 w-full border border-zinc-800 bg-zinc-900 px-3 py-2.5 text-sm text-white placeholder:text-zinc-500 focus:border-zinc-700 focus:outline-none focus:ring-1 focus:ring-red-600" />
                      <ValidationError prefix="Name" field="name" errors={state.errors} className="mt-1 text-xs text-red-400" />
                    </label>
                    <label className="block">
                      <span className="font-mono text-[11px] uppercase tracking-wide text-zinc-500">Your Email *</span>
                      <input name="email" type="email" required placeholder="you@email.com" className="mt-1 w-full border border-zinc-800 bg-zinc-900 px-3 py-2.5 text-sm text-white placeholder:text-zinc-500 focus:border-zinc-700 focus:outline-none focus:ring-1 focus:ring-red-600" />
                      <ValidationError prefix="Email" field="email" errors={state.errors} className="mt-1 text-xs text-red-400" />
                    </label>
                  </div>

                  <label className="block">
                    <span className="font-mono text-[11px] uppercase tracking-wide text-zinc-500">Sponsorship Tier {tier ? "(auto-filled)" : "(optional)"}</span>
                    <select
                      value={tier}
                      onChange={(e) => setTier(e.target.value as Tier)}
                      className="mt-1 w-full border border-zinc-800 bg-zinc-900 px-3 py-2.5 text-sm text-white focus:border-zinc-700 focus:outline-none focus:ring-1 focus:ring-red-600"
                    >
                      <option value="">— General / No tier —</option>
                      <option value="Crusader">Crusader — $5,000+</option>
                      <option value="Knight">Knight — $2,500</option>
                      <option value="Paladin">Paladin — $1,000</option>
                      <option value="Squire">Squire — $500</option>
                      <option value="Ally">Ally — $250</option>
                    </select>
                  </label>
                  {/* hidden tier field so Formspree receives it */}
                  <input type="hidden" name="tier" value={tier} />

                  <label className="block">
                    <span className="font-mono text-[11px] uppercase tracking-wide text-zinc-500">Subject</span>
                    <input name="_subject" value={subject} onChange={(e) => setSubject(e.target.value)} placeholder="Student Interest, Sponsorship, Outreach Request, Media…" className="mt-1 w-full border border-zinc-800 bg-zinc-900 px-3 py-2.5 text-sm text-white placeholder:text-zinc-500 focus:border-zinc-700 focus:outline-none focus:ring-1 focus:ring-red-600" />
                    <ValidationError prefix="Subject" field="_subject" errors={state.errors} className="mt-1 text-xs text-red-400" />
                    {tier && <span className="mt-1 block font-mono text-[11px] text-zinc-500">Subject auto-set to “Sponsorship Interest — {tier} Tier”.</span>}
                  </label>

                  <label className="block">
                    <span className="font-mono text-[11px] uppercase tracking-wide text-zinc-500">Message *</span>
                    <textarea name="message" required rows={5} placeholder="Tell us about sponsorship, joining, or outreach…" className="mt-1 w-full border border-zinc-800 bg-zinc-900 px-3 py-2.5 text-sm text-white placeholder:text-zinc-500 focus:border-zinc-700 focus:outline-none focus:ring-1 focus:ring-red-600" />
                    <ValidationError prefix="Message" field="message" errors={state.errors} className="mt-1 text-xs text-red-400" />
                  </label>

                  {/* Formspree honeypot / extra */}
                  <input type="hidden" name="_gotcha" style={{ display: "none" }} />

                  <ValidationError errors={state.errors} className="text-xs text-red-400" />

                  <button type="submit" disabled={state.submitting} className="w-full bg-red-600 px-6 py-3.5 text-xs font-bold uppercase tracking-[0.14em] text-white hover:bg-red-700 disabled:opacity-60 active:bg-red-800">
                    {state.submitting ? "Sending…" : "Send Message →"}
                  </button>
                  <p className="text-center font-mono text-[11px] text-zinc-500">Powered by Formspree • or email <a href="mailto:engineeringclub@stepinac.org" className="underline hover:text-white">engineeringclub@stepinac.org</a> directly.</p>
                </form>
              )}
            </div>

            <div className="space-y-6">
              <div className="border border-zinc-800 bg-zinc-950 p-6">
                <h3 className="text-xs font-black uppercase tracking-[0.12em] text-white">Visit Us</h3>
                <p className="mt-3 text-sm leading-relaxed text-zinc-400">
                  Archbishop Stepinac High School<br />
                  950 Mamaroneck Ave<br />
                  White Plains, NY 10605<br />
                  <span className="font-mono text-xs text-zinc-500">Room 112 — Engineering Lab</span>
                </p>
                <div className="mt-4 flex flex-wrap gap-2 font-mono text-xs">
                  <span className="border border-zinc-800 bg-zinc-900 px-3 py-1.5 text-zinc-300">Mon–Sat • See Events</span>
                  <a href="https://maps.google.com/?q=950+Mamaroneck+Ave+White+Plains+NY" target="_blank" rel="noreferrer" className="border border-zinc-700 bg-zinc-900 px-3 py-1.5 text-white hover:bg-zinc-800">Maps →</a>
                </div>
                <div className="mt-6 overflow-hidden border border-zinc-800 bg-zinc-900">
                  <img src={`${import.meta.env.BASE_URL}school.jpg`} alt="Archbishop Stepinac High School building" className="aspect-[16/9] w-full object-cover" />
                  <div className="flex items-center justify-between border-t border-zinc-800 bg-zinc-950 px-3 py-2 font-mono text-[11px] uppercase tracking-wide text-zinc-500">
                    <span>Archbishop Stepinac — White Plains</span>
                    <a href="https://www.google.com/maps/search/?api=1&query=Archbishop%20Stepinac%20High%20School%20950%20Mamaroneck%20Ave%20White%20Plains%20NY%2010605" target="_blank" rel="noreferrer" className="text-zinc-300 hover:text-white">Open in Maps →</a>
                  </div>
                </div>
              </div>

              <div className="border border-zinc-800 bg-zinc-950 p-6">
                <h3 className="text-xs font-black uppercase tracking-[0.12em] text-white">Leads & Faculty</h3>
                <ul className="mt-4 space-y-3 text-sm">
                  <li className="flex justify-between"><span className="text-zinc-300">Mr. Estrella — Faculty Advisor</span><span className="font-mono text-xs text-zinc-500">aestrella@stepinac.org</span></li>
                  <li className="flex justify-between"><span className="text-zinc-300">Joseph Alex — Co-Captain + Founder</span><span className="font-mono text-xs text-zinc-500">josephalex823@stepinac.org</span></li>
                  <li className="flex justify-between"><span className="text-zinc-300">Subash Jonnalagadda — Co-Captain + Founder</span><span className="font-mono text-xs text-zinc-500">sjonnalagadda555@stepinac.org</span></li>
                </ul>
                <div className="mt-4 flex gap-2">
                  <a href="https://www.instagram.com/stepinacrobotics/" target="_blank" rel="noreferrer" className="border border-zinc-800 bg-zinc-900 px-3 py-2 font-mono text-xs uppercase tracking-wide text-zinc-300 hover:text-white">Instagram</a>
                  <a href="https://github.com" target="_blank" rel="noreferrer" className="border border-zinc-800 bg-zinc-900 px-3 py-2 font-mono text-xs uppercase tracking-wide text-zinc-300 hover:text-white">GitHub</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
