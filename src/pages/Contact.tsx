import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";

type Tier = "Crusader" | "Knight" | "Paladin" | "Squire" | "Ally" | "";

export default function Contact() {
  const [search] = useSearchParams();
  const initialTier = (search.get("tier") as Tier) || "";
  const initialSubject = search.get("subject") || "";

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [tier, setTier] = useState<Tier>(initialTier);
  const [subject, setSubject] = useState(initialSubject || (initialTier ? `Sponsorship Interest — ${initialTier} Tier` : ""));
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [error, setError] = useState("");

  useEffect(() => {
    if (initialTier) setTier(initialTier);
    if (initialSubject) setSubject(initialSubject);
    else if (initialTier) setSubject(`Sponsorship Interest — ${initialTier} Tier`);
  }, [initialTier, initialSubject]);

  useEffect(() => {
    if (tier) setSubject(`Sponsorship Interest — ${tier} Tier`);
  }, [tier]);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    if (!name.trim() || !email.trim() || !message.trim()) {
      setError("Please fill in name, email, and message.");
      setStatus("error");
      return;
    }
    setStatus("sending");
    const apiBase = import.meta.env.VITE_API_URL?.replace(/\/$/, "") || "";
    const url = apiBase ? `${apiBase}/api/send` : "/api/send";
    try {
      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: name.trim(), email: email.trim(), subject: subject.trim(), message: message.trim(), tier: tier || undefined }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data?.error || `Failed (${res.status})`);
      setStatus("success");
      setName("");
      setEmail("");
      setMessage("");
      if (!tier) setSubject("");
    } catch (err: any) {
      setError(err?.message || "Failed to send. Try emailing engineeringclub@stepinac.org directly.");
      setStatus("error");
    }
  }

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
                Fill out the form — it sends via Resend to <span className="font-mono text-xs text-zinc-300">engineeringclub@stepinac.org</span>. Choose a subject so we route it to the right lead.
              </p>

              <form onSubmit={onSubmit} className="mt-6 space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <label className="block">
                    <span className="font-mono text-[11px] uppercase tracking-wide text-zinc-500">Your Name *</span>
                    <input value={name} onChange={(e) => setName(e.target.value)} required placeholder="Jane Doe" className="mt-1 w-full border border-zinc-800 bg-zinc-900 px-3 py-2.5 text-sm text-white placeholder:text-zinc-500 focus:border-zinc-700 focus:outline-none focus:ring-1 focus:ring-red-600" />
                  </label>
                  <label className="block">
                    <span className="font-mono text-[11px] uppercase tracking-wide text-zinc-500">Your Email *</span>
                    <input value={email} onChange={(e) => setEmail(e.target.value)} required type="email" placeholder="you@email.com" className="mt-1 w-full border border-zinc-800 bg-zinc-900 px-3 py-2.5 text-sm text-white placeholder:text-zinc-500 focus:border-zinc-700 focus:outline-none focus:ring-1 focus:ring-red-600" />
                  </label>
                </div>

                <label className="block">
                  <span className="font-mono text-[11px] uppercase tracking-wide text-zinc-500">Sponsorship Tier {tier ? "(auto-filled)" : "(optional)"}</span>
                  <select value={tier} onChange={(e) => setTier(e.target.value as Tier)} className="mt-1 w-full border border-zinc-800 bg-zinc-900 px-3 py-2.5 text-sm text-white focus:border-zinc-700 focus:outline-none focus:ring-1 focus:ring-red-600">
                    <option value="">— General / No tier —</option>
                    <option value="Crusader">Crusader — $5,000+</option>
                    <option value="Knight">Knight — $2,500</option>
                    <option value="Paladin">Paladin — $1,000</option>
                    <option value="Squire">Squire — $500</option>
                    <option value="Ally">Ally — $250</option>
                  </select>
                </label>

                <label className="block">
                  <span className="font-mono text-[11px] uppercase tracking-wide text-zinc-500">Subject</span>
                  <input value={subject} onChange={(e) => setSubject(e.target.value)} placeholder="Student Interest, Sponsorship, Outreach Request, Media…" className="mt-1 w-full border border-zinc-800 bg-zinc-900 px-3 py-2.5 text-sm text-white placeholder:text-zinc-500 focus:border-zinc-700 focus:outline-none focus:ring-1 focus:ring-red-600" />
                  {tier && <span className="mt-1 block font-mono text-[11px] text-zinc-500">Subject auto-set to “Sponsorship Interest — {tier} Tier”.</span>}
                </label>

                <label className="block">
                  <span className="font-mono text-[11px] uppercase tracking-wide text-zinc-500">Message *</span>
                  <textarea value={message} onChange={(e) => setMessage(e.target.value)} required rows={5} placeholder="Tell us about sponsorship, joining, or outreach…" className="mt-1 w-full border border-zinc-800 bg-zinc-900 px-3 py-2.5 text-sm text-white placeholder:text-zinc-500 focus:border-zinc-700 focus:outline-none focus:ring-1 focus:ring-red-600" />
                </label>

                {status === "success" && <div className="border border-emerald-900 bg-emerald-950/30 px-3 py-2 text-sm text-emerald-300">Sent — we’ll reply within 24 hours.</div>}
                {status === "error" && <div className="border border-red-900 bg-red-950/30 px-3 py-2 text-sm text-red-300">{error}</div>}

                <button type="submit" disabled={status === "sending"} className="w-full bg-red-600 px-6 py-3.5 text-xs font-bold uppercase tracking-[0.14em] text-white hover:bg-red-700 disabled:opacity-60 active:bg-red-800">
                  {status === "sending" ? "Sending…" : "Send Message →"}
                </button>
                <p className="text-center font-mono text-[11px] text-zinc-500">Powered by Resend • or email <a href="mailto:engineeringclub@stepinac.org" className="underline hover:text-white">engineeringclub@stepinac.org</a> directly.</p>
              </form>
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
                <div className="mt-6 aspect-[16/9] border border-zinc-800 bg-zinc-900 flex items-center justify-center font-mono text-[11px] uppercase tracking-wide text-zinc-600">
                  [ Map Embed Placeholder — Google Maps iframe ]
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
