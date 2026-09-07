import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

type NavItem = {
  label: string;
  to: string;
  icon: React.ReactNode;
};

const ADMIN_NAV: NavItem[] = [
  {
    label: "Overview",
    to: "/team/portal/admin",
    icon: (
      <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="1" y="1" width="6" height="6" />
        <rect x="9" y="1" width="6" height="6" />
        <rect x="1" y="9" width="6" height="6" />
        <rect x="9" y="9" width="6" height="6" />
      </svg>
    ),
  },
  {
    label: "Members",
    to: "/team/portal/admin?tab=members",
    icon: (
      <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
        <circle cx="8" cy="5" r="3" />
        <path d="M2 15c0-3.3 2.7-6 6-6s6 2.7 6 6" />
      </svg>
    ),
  },
  {
    label: "Teams",
    to: "/team/portal/admin?tab=teams",
    icon: (
      <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M4 14V8M8 14V5M12 14V2" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    label: "Activity",
    to: "/team/portal/admin?tab=activity",
    icon: (
      <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
        <circle cx="8" cy="8" r="6.5" />
        <path d="M8 4v4l3 2" strokeLinecap="round" />
      </svg>
    ),
  },
];

const LEAD_NAV: NavItem[] = [
  {
    label: "Overview",
    to: "/team/portal/lead",
    icon: (
      <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="1" y="1" width="6" height="6" />
        <rect x="9" y="1" width="6" height="6" />
        <rect x="1" y="9" width="6" height="6" />
        <rect x="9" y="9" width="6" height="6" />
      </svg>
    ),
  },
  {
    label: "Tasks",
    to: "/team/portal/lead?tab=tasks",
    icon: (
      <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M3 8l3 3 7-7" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    label: "Team",
    to: "/team/portal/lead?tab=team",
    icon: (
      <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
        <circle cx="8" cy="5" r="3" />
        <path d="M2 15c0-3.3 2.7-6 6-6s6 2.7 6 6" />
      </svg>
    ),
  },
];

const MEMBER_NAV: NavItem[] = [
  {
    label: "My Tasks",
    to: "/team/portal/member",
    icon: (
      <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M3 8l3 3 7-7" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    label: "Schedule",
    to: "/team/portal/member?tab=schedule",
    icon: (
      <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
        <circle cx="8" cy="8" r="6.5" />
        <path d="M8 4v4l3 2" strokeLinecap="round" />
      </svg>
    ),
  },
];

export function Sidebar() {
  const { role, profile, teams } = useAuth();
  const location = useLocation();

  const navItems = role === "admin" ? ADMIN_NAV : role === "team_lead" ? LEAD_NAV : MEMBER_NAV;
  const roleLabel = role === "admin" ? "Admin" : role === "team_lead" ? "Team Lead" : "Member";

  return (
    <aside className="hidden w-56 shrink-0 border-r border-zinc-800 bg-zinc-950 lg:block">
      <div className="flex h-full flex-col">
        {/* Brand */}
        <div className="border-b border-zinc-800 px-5 py-5">
          <Link to="/" className="font-mono text-[10px] font-bold uppercase tracking-[0.16em] text-red-500">
            Iron Crusaders
          </Link>
          <p className="mt-1 text-[10px] font-bold uppercase tracking-[0.12em] text-zinc-600">
            {roleLabel} Dashboard
          </p>
        </div>

        {/* Nav */}
        <nav className="flex-1 space-y-0.5 px-3 py-4">
          {navItems.map((item) => {
            const isActive = location.pathname + location.search === item.to;
            return (
              <Link
                key={item.to}
                to={item.to}
                className={`flex items-center gap-3 px-3 py-2.5 text-xs font-semibold uppercase tracking-[0.12em] transition-colors ${
                  isActive
                    ? "border-l-2 border-red-600 bg-zinc-900 text-white"
                    : "border-l-2 border-transparent text-zinc-400 hover:text-white"
                }`}
              >
                {item.icon}
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Teams */}
        {teams.length > 0 && (
          <div className="border-t border-zinc-800 px-5 py-4">
            <p className="font-mono text-[9px] font-bold uppercase tracking-[0.16em] text-zinc-600">
              Your Teams
            </p>
            <div className="mt-2 space-y-1">
              {teams.map((t) => (
                <p key={t.id} className="text-[11px] text-zinc-500">
                  {t.name}
                </p>
              ))}
            </div>
          </div>
        )}

        {/* User */}
        <div className="border-t border-zinc-800 px-5 py-4">
          <p className="truncate text-xs text-zinc-300">{profile?.full_name || profile?.email}</p>
          <p className="mt-0.5 truncate font-mono text-[10px] uppercase text-zinc-600">{roleLabel}</p>
        </div>
      </div>
    </aside>
  );
}
