import { useEffect, useRef, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";

type DropdownKey = "robots" | "team" | "more" | null;

const NAV = {
  robots: [
    { label: "Current Robot", to: "/robots/current" },
    { label: "Past Robots", to: "/robots/past" },
    { label: "Robot Archive", to: "/robots/archive" },
  ],
  team: [
    { label: "About Us", to: "/team/about" },
    { label: "Students", to: "/team/students" },
    { label: "Mentors", to: "/team/mentors" },
    { label: "Leadership", to: "/team/leadership" },
  ],
  more: [
    { label: "Outreach", to: "/outreach" },
    { label: "Events", to: "/events" },
    { label: "Awards", to: "/awards" },
    { label: "Media", to: "/media" },
    { label: "Resources", to: "/resources" },
    { label: "Contact", to: "/contact" },
  ],
};

function Chevron({ open }: { open: boolean }) {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 12 12"
      fill="none"
      aria-hidden="true"
      className={`transition-transform duration-200 ${open ? "rotate-180" : ""}`}
    >
      <path
        d="M2.5 4.2L6 7.7L9.5 4.2"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="square"
        strokeLinejoin="miter"
      />
    </svg>
  );
}

export function Header() {
  const [openDropdown, setOpenDropdown] = useState<DropdownKey>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileAccordions, setMobileAccordions] = useState<Record<string, boolean>>({});
  const headerRef = useRef<HTMLElement>(null);
  const location = useLocation();

  const isRobotsActive = location.pathname.startsWith("/robots");
  const isTeamActive = location.pathname.startsWith("/team");
  const isMoreActive = ["/outreach", "/events", "/awards", "/media", "/resources", "/contact"].some((p) => location.pathname.startsWith(p));

  // close dropdowns on click outside, route change, esc
  useEffect(() => {
    function onClickOutside(e: MouseEvent) {
      if (headerRef.current && !headerRef.current.contains(e.target as Node)) {
        setOpenDropdown(null);
      }
    }
    function onEsc(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setOpenDropdown(null);
        setMobileOpen(false);
      }
    }
    document.addEventListener("mousedown", onClickOutside);
    document.addEventListener("keydown", onEsc);
    return () => {
      document.removeEventListener("mousedown", onClickOutside);
      document.removeEventListener("keydown", onEsc);
    };
  }, []);

  // close dropdowns on nav
  useEffect(() => {
    setOpenDropdown(null);
    setMobileOpen(false);
  }, [location.pathname]);

  // lock scroll when mobile menu open
  useEffect(() => {
    if (mobileOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const toggleMobileAccordion = (key: string) =>
    setMobileAccordions((prev) => ({ ...prev, [key]: !prev[key] }));

  return (
    <header
      ref={headerRef}
      className="sticky top-0 z-50 border-b border-zinc-800 bg-zinc-950/95 backdrop-blur supports-[backdrop-filter]:bg-zinc-950/80"
    >
      <div className="mx-auto flex max-w-[1280px] items-center justify-between px-4 py-4 lg:px-8">
        {/* LEFT */}
        <div className="flex flex-col gap-2">
          {/* Social row */}
          <div className="flex items-center gap-3">
            <a
              href="https://x.com"
              target="_blank"
              rel="noreferrer"
              aria-label="X (Twitter)"
              className="text-zinc-500 transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-600 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M4 4l16 16M20 4L4 20" />
              </svg>
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noreferrer"
              aria-label="Instagram"
              className="text-zinc-500 transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-600 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
                <rect x="3" y="3" width="18" height="18" rx="4" />
                <circle cx="12" cy="12" r="4" />
                <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
              </svg>
            </a>
            <a
              href="https://youtube.com"
              target="_blank"
              rel="noreferrer"
              aria-label="YouTube"
              className="text-zinc-500 transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-600 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950"
            >
              <svg width="16" height="14" viewBox="0 0 24 16" fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden="true">
                <rect x="1.5" y="1.5" width="21" height="13" rx="2.5" />
                <path d="M10 5.2l5 2.8-5 2.8z" fill="currentColor" stroke="none" />
              </svg>
            </a>
            <a
              href="https://github.com"
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub"
              className="text-zinc-500 transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-600 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
                <path d="M12 2a10 10 0 0 0-3.16 19.49c.5.1.68-.22.68-.48v-1.7c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.9-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.9 1.52 2.34 1.08 2.91.83.1-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.94 0-1.1.39-1.99 1.03-2.69-.1-.25-.45-1.26.1-2.64 0 0 .84-.27 2.75 1.02A9.3 9.3 0 0 1 12 6.8a9.3 9.3 0 0 1 2.5.34c1.91-1.3 2.75-1.02 2.75-1.02.55 1.38.2 2.39.1 2.64.64.7 1.03 1.59 1.03 2.69 0 3.84-2.34 4.68-4.57 4.93.36.31.68.92.68 1.85v2.74c0 .26.18.58.69.48A10 10 0 0 0 12 2z" />
              </svg>
            </a>
          </div>

          {/* Wordmark */}
          <Link to="/" className="group inline-flex items-center gap-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-600 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950">
            <img src={`${import.meta.env.BASE_URL}logo.png`} alt="Iron Crusaders logo" className="h-10 w-10 shrink-0 object-contain md:h-11 md:w-11" />
            <div>
              <div className="font-sans text-[22px] font-black uppercase leading-none tracking-[0.02em] text-white md:text-[26px]">
                Iron Crusaders
              </div>
              <div className="mt-1 font-mono text-[10px] font-medium uppercase tracking-[0.18em] text-zinc-500 md:text-[11px]">
                Archbishop Stepinac High School
              </div>
            </div>
          </Link>
        </div>

        {/* RIGHT - Desktop nav */}
        <nav className="hidden items-center gap-1 lg:flex" aria-label="Primary">
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              `relative px-3 py-2 text-xs font-semibold uppercase tracking-[0.14em] transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-600 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950 ${isActive ? "text-white after:absolute after:bottom-0 after:left-3 after:right-3 after:h-[2px] after:bg-red-600 after:content-['']" : "text-zinc-400"}`
            }
          >
            Home
          </NavLink>

          {/* Robots dropdown */}
          <div className="relative">
            <button
              type="button"
              aria-expanded={openDropdown === "robots"}
              aria-haspopup="menu"
              onClick={() => setOpenDropdown(openDropdown === "robots" ? null : "robots")}
              className={`flex items-center gap-1.5 px-3 py-2 text-xs font-semibold uppercase tracking-[0.14em] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-600 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950 ${isRobotsActive ? "text-white" : "text-zinc-400 hover:text-white"}`}
            >
              Robots <Chevron open={openDropdown === "robots"} />
            </button>
            {openDropdown === "robots" && (
              <div
                role="menu"
                className="animate-fade-in absolute left-0 top-full mt-2 min-w-[220px] border border-zinc-800 bg-zinc-900 py-2 shadow-xl"
              >
                {NAV.robots.map((item) => (
                  <Link
                    key={item.to}
                    role="menuitem"
                    to={item.to}
                    className="block px-4 py-2.5 text-xs font-medium uppercase tracking-wide text-zinc-300 hover:bg-zinc-800 hover:text-white focus-visible:bg-zinc-800 focus-visible:text-white focus-visible:outline-none"
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* The Team dropdown */}
          <div className="relative">
            <button
              type="button"
              aria-expanded={openDropdown === "team"}
              aria-haspopup="menu"
              onClick={() => setOpenDropdown(openDropdown === "team" ? null : "team")}
              className={`flex items-center gap-1.5 px-3 py-2 text-xs font-semibold uppercase tracking-[0.14em] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-600 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950 ${isTeamActive ? "text-white" : "text-zinc-400 hover:text-white"}`}
            >
              The Team <Chevron open={openDropdown === "team"} />
            </button>
            {openDropdown === "team" && (
              <div
                role="menu"
                className="animate-fade-in absolute left-0 top-full mt-2 min-w-[220px] border border-zinc-800 bg-zinc-900 py-2 shadow-xl"
              >
                {NAV.team.map((item) => (
                  <Link
                    key={item.to}
                    role="menuitem"
                    to={item.to}
                    className="block px-4 py-2.5 text-xs font-medium uppercase tracking-wide text-zinc-300 hover:bg-zinc-800 hover:text-white focus-visible:bg-zinc-800 focus-visible:text-white focus-visible:outline-none"
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            )}
          </div>

          <NavLink
            to="/newsletter"
            className={({ isActive }) =>
              `px-3 py-2 text-xs font-semibold uppercase tracking-[0.14em] transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-600 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950 ${isActive ? "text-white" : "text-zinc-400"}`
            }
          >
            Newsletter
          </NavLink>

          <Link
            to="/sponsors"
            className="ml-2 bg-red-600 px-5 py-2.5 text-xs font-bold uppercase tracking-[0.14em] text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-red-700 hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950 active:translate-y-0 active:bg-red-800"
          >
            Sponsor Us
          </Link>

          {/* More dropdown */}
          <div className="relative ml-1">
            <button
              type="button"
              aria-expanded={openDropdown === "more"}
              aria-haspopup="menu"
              onClick={() => setOpenDropdown(openDropdown === "more" ? null : "more")}
              className={`flex items-center gap-1.5 px-3 py-2 text-xs font-semibold uppercase tracking-[0.14em] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-600 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950 ${isMoreActive ? "text-white" : "text-zinc-400 hover:text-white"}`}
            >
              More <Chevron open={openDropdown === "more"} />
            </button>
            {openDropdown === "more" && (
              <div
                role="menu"
                className="animate-fade-in absolute right-0 top-full mt-2 min-w-[220px] border border-zinc-800 bg-zinc-900 py-2 shadow-xl"
              >
                {NAV.more.map((item) => (
                  <Link
                    key={item.to}
                    role="menuitem"
                    to={item.to}
                    className="block px-4 py-2.5 text-xs font-medium uppercase tracking-wide text-zinc-300 hover:bg-zinc-800 hover:text-white focus-visible:bg-zinc-800 focus-visible:text-white focus-visible:outline-none"
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            )}
          </div>
        </nav>

        {/* Mobile hamburger */}
        <button
          type="button"
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileOpen}
          aria-controls="mobile-nav"
          onClick={() => setMobileOpen(!mobileOpen)}
          className="inline-flex h-10 w-10 items-center justify-center border border-zinc-800 bg-zinc-900 text-white transition-colors hover:bg-zinc-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-600 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950 lg:hidden"
        >
          <span className="sr-only">Toggle menu</span>
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="square"
            aria-hidden="true"
            className="transition-transform duration-200"
          >
            {mobileOpen ? (
              <path d="M6 6l12 12M18 6L6 18" />
            ) : (
              <>
                <path d="M3 6h18" />
                <path d="M3 12h18" />
                <path d="M3 18h18" />
              </>
            )}
          </svg>
        </button>
      </div>

      {/* Mobile panel - dropdown */}
      <div
        id="mobile-nav"
        className={`overflow-hidden border-t border-zinc-800 bg-zinc-900 lg:hidden ${mobileOpen ? "max-h-[90vh] overflow-y-auto" : "max-h-0"} transition-all duration-300 ease-out`}
        aria-hidden={!mobileOpen}
      >
        <nav className="flex flex-col px-4 py-6" aria-label="Mobile">
          <Link
            to="/"
            className={`border-l-2 px-4 py-3 text-xs font-bold uppercase tracking-[0.14em] ${location.pathname === "/" ? "border-red-600 bg-zinc-800 text-white" : "border-transparent text-zinc-400 hover:text-white"}`}
          >
            Home
          </Link>

          {/* Mobile Accordions */}
          {[
            { key: "m-robots", label: "Robots", items: NAV.robots },
            { key: "m-team", label: "The Team", items: NAV.team },
          ].map((section) => (
            <div key={section.key} className="border-b border-zinc-800">
              <button
                type="button"
                onClick={() => toggleMobileAccordion(section.key)}
                aria-expanded={!!mobileAccordions[section.key]}
                className="flex w-full items-center justify-between px-4 py-3 text-xs font-semibold uppercase tracking-[0.14em] text-zinc-300 hover:text-white focus-visible:outline-none focus-visible:bg-zinc-800"
              >
                {section.label}
                <Chevron open={!!mobileAccordions[section.key]} />
              </button>
              <div className={`${mobileAccordions[section.key] ? "block" : "hidden"} bg-zinc-950 px-4 pb-3 pt-1`}>
                {section.items.map((it) => (
                  <Link key={it.to} to={it.to} className="block py-2.5 text-xs font-medium uppercase tracking-wide text-zinc-400 hover:text-white">
                    {it.label}
                  </Link>
                ))}
              </div>
            </div>
          ))}

          <Link
            to="/newsletter"
            className={`border-b border-zinc-800 px-4 py-3 text-xs font-semibold uppercase tracking-[0.14em] ${location.pathname === "/newsletter" ? "text-white" : "text-zinc-300 hover:text-white"}`}
          >
            Newsletter
          </Link>

          <div className="border-b border-zinc-800">
            <button
              type="button"
              onClick={() => toggleMobileAccordion("m-more")}
              aria-expanded={!!mobileAccordions["m-more"]}
              className="flex w-full items-center justify-between px-4 py-3 text-xs font-semibold uppercase tracking-[0.14em] text-zinc-300 hover:text-white focus-visible:outline-none focus-visible:bg-zinc-800"
            >
              More
              <Chevron open={!!mobileAccordions["m-more"]} />
            </button>
            <div className={`${mobileAccordions["m-more"] ? "block" : "hidden"} bg-zinc-950 px-4 pb-3 pt-1`}>
              {NAV.more.map((it) => (
                <Link key={it.to} to={it.to} className="block py-2.5 text-xs font-medium uppercase tracking-wide text-zinc-400 hover:text-white">
                  {it.label}
                </Link>
              ))}
            </div>
          </div>

          <Link
            to="/sponsors"
            className="mt-6 bg-red-600 px-5 py-3 text-center text-xs font-bold uppercase tracking-[0.14em] text-white transition-colors hover:bg-red-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white active:bg-red-800"
          >
            Sponsor Us
          </Link>

          {/* mobile social row duplicate for completeness */}
          <div className="mt-6 flex items-center gap-4 border-t border-zinc-800 pt-6">
            <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-zinc-500">Follow us</span>
            <div className="flex gap-3">
              <a href="https://x.com" aria-label="X" className="text-zinc-500 hover:text-white">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
                  <path d="M4 4l16 16M20 4L4 20" />
                </svg>
              </a>
              <a href="https://instagram.com" aria-label="Instagram" className="text-zinc-500 hover:text-white">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
                  <rect x="3" y="3" width="18" height="18" rx="4" />
                  <circle cx="12" cy="12" r="4" />
                </svg>
              </a>
              <a href="https://youtube.com" aria-label="YouTube" className="text-zinc-500 hover:text-white">
                <svg width="16" height="14" viewBox="0 0 24 16" fill="none" stroke="currentColor" strokeWidth="1.4">
                  <rect x="1.5" y="1.5" width="21" height="13" rx="3" />
                  <path d="M10 5.2l5 2.8-5 2.8z" fill="currentColor" stroke="none" />
                </svg>
              </a>
              <a href="https://github.com" aria-label="GitHub" className="text-zinc-500 hover:text-white">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
                  <path d="M12 2a10 10 0 0 0-3.16 19.49c.5.1.68-.22.68-.48v-1.7c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.9-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.9 1.52 2.34 1.08 2.91.83.1-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.94 0-1.1.39-1.99 1.03-2.69-.1-.25-.45-1.26.1-2.64 0 0 .84-.27 2.75 1.02A9.3 9.3 0 0 1 12 6.8a9.3 9.3 0 0 1 2.5.34c1.91-1.3 2.75-1.02 2.75-1.02.55 1.38.2 2.39.1 2.64.64.7 1.03 1.59 1.03 2.69 0 3.84-2.34 4.68-4.57 4.93.36.31.68.92.68 1.85v2.74c0 .26.18.58.69.48A10 10 0 0 0 12 2z" />
                </svg>
              </a>
            </div>
          </div>
        </nav>
      </div>
    </header>
  );
}
