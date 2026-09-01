import { Link } from "react-router-dom";

export function Footer() {
  return (
    <footer className="border-t border-zinc-800 bg-zinc-950">
      <div className="mx-auto max-w-[1280px] px-4 py-12 lg:px-8">
        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr] lg:gap-16">
          <div>
            <div className="text-lg font-black uppercase tracking-[0.02em] text-white">Iron Crusaders</div>
            <div className="mt-1 font-mono text-[11px] uppercase tracking-[0.14em] text-zinc-500">Archbishop Stepinac High School • FIRST Robotics</div>
            <p className="mt-4 max-w-[36ch] text-sm leading-relaxed text-zinc-400">
              A student-led FRC team engineering competitive robots and community impact in White Plains, New York.
            </p>
            <div className="mt-6 flex gap-3">
              {[
                { label: "Instagram", href: "https://www.instagram.com/stepinacrobotics/" },
                { label: "GitHub", href: "https://github.com/Stepinac-Iron-Crusaders" },
              ].map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={s.label}
                  className="inline-flex h-9 w-9 items-center justify-center border border-zinc-800 bg-zinc-900 text-zinc-500 transition-colors hover:border-zinc-700 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-600 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950"
                >
                  {s.label === "Instagram" ? (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
                      <rect x="3" y="3" width="18" height="18" rx="4" />
                      <circle cx="12" cy="12" r="4" />
                      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
                    </svg>
                  ) : (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
                      <path d="M12 2a10 10 0 0 0-3.16 19.49c.5.1.68-.22.68-.48v-1.7c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.9-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.9 1.52 2.34 1.08 2.91.83.1-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.94 0-1.1.39-1.99 1.03-2.69-.1-.25-.45-1.26.1-2.64 0 0 .84-.27 2.75 1.02A9.3 9.3 0 0 1 12 6.8a9.3 9.3 0 0 1 2.5.34c1.91-1.3 2.75-1.02 2.75-1.02.55 1.38.2 2.39.1 2.64.64.7 1.03 1.59 1.03 2.69 0 3.84-2.34 4.68-4.57 4.93.36.31.68.92.68 1.85v2.74c0 .26.18.58.69.48A10 10 0 0 0 12 2z" />
                    </svg>
                  )}
                </a>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-xs font-bold uppercase tracking-[0.14em] text-white">Explore</h3>
            <ul className="mt-4 space-y-2.5 text-sm text-zinc-400">
              {[
                { label: "Robots", to: "/robots/current" },
                { label: "The Team", to: "/team/about" },
                { label: "Outreach", to: "/outreach" },
                { label: "Awards", to: "/awards" },
                { label: "Media", to: "/media" },
                { label: "Contact", to: "/contact" },
              ].map((link) => (
                <li key={link.label}>
                  <Link to={link.to} className="transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-600">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-bold uppercase tracking-[0.14em] text-white">Contact</h3>
            <ul className="mt-4 space-y-2.5 text-sm text-zinc-400">
              <li>950 Mamaroneck Ave</li>
              <li>White Plains, NY 10605</li>
              <li className="pt-2">
                <a href="mailto:engineeringclub@stepinac.org" className="text-zinc-300 underline decoration-zinc-700 underline-offset-4 hover:text-white hover:decoration-zinc-300">
                  engineeringclub@stepinac.org
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-zinc-800 pt-6 text-center sm:flex-row sm:text-left">
          <p className="font-mono text-xs text-zinc-500">© {new Date().getFullYear()} Iron Crusaders • Archbishop Stepinac High School. All rights reserved.</p>
          <p className="font-mono text-[11px] uppercase tracking-wide text-zinc-600">Built for competition • Designed for community</p>
        </div>
      </div>
    </footer>
  );
}
