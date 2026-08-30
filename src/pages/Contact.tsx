import { Link } from "react-router-dom";

export default function Contact() {
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
          </div>
        </div>
      </section>

      <section className="bg-zinc-900">
        <div className="mx-auto max-w-[1280px] px-4 py-10 lg:px-8 lg:py-12">
          <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:gap-10">
            <div className="border border-zinc-800 bg-zinc-950 p-6 lg:p-8">
              <h2 className="text-xs font-black uppercase tracking-[0.12em] text-white">Send a Message</h2>
              <p className="mt-3 text-sm leading-relaxed text-zinc-400">
                Email us and use one of these subjects so we can route it to the right lead:{" "}
                <span className="font-mono text-xs text-zinc-300">Student Interest</span>,{" "}
                <span className="font-mono text-xs text-zinc-300">Sponsorship</span>,{" "}
                <span className="font-mono text-xs text-zinc-300">Outreach Request</span>, or{" "}
                <span className="font-mono text-xs text-zinc-300">Media</span>.
              </p>
              <div className="mt-6 space-y-3">
                <a
                  href="mailto:engineeringclub@stepinac.org?subject=Iron%20Crusaders%20%E2%80%94%20General%20Inquiry"
                  className="block w-full bg-red-600 px-6 py-3.5 text-center text-xs font-bold uppercase tracking-[0.14em] text-white hover:bg-red-700 active:bg-red-800"
                >
                  Email engineeringclub@stepinac.org →
                </a>
                <p className="text-center font-mono text-[11px] text-zinc-500">We reply within 24 hours.</p>
              </div>
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
                  <a href="https://youtube.com" target="_blank" rel="noreferrer" className="border border-zinc-800 bg-zinc-900 px-3 py-2 font-mono text-xs uppercase tracking-wide text-zinc-300 hover:text-white">YouTube</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
