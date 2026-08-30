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
                { label: "X", href: "https://x.com" },
                { label: "Instagram", href: "https://www.instagram.com/stepinacrobotics/" },
                { label: "YouTube", href: "https://youtube.com" },
                { label: "GitHub", href: "https://github.com" },
              ].map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={s.label}
                  className="inline-flex h-9 w-9 items-center justify-center border border-zinc-800 bg-zinc-900 text-zinc-500 transition-colors hover:border-zinc-700 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-600 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950"
                >
                  <span className="font-mono text-[10px] font-bold uppercase">{s.label[0]}</span>
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
