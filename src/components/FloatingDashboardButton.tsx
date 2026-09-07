import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

export function FloatingDashboardButton() {
  const { user, role } = useAuth();

  const path = !user
    ? "/team/portal/login"
    : role === "admin"
      ? "/team/portal/admin"
      : role === "team_lead"
        ? "/team/portal/lead"
        : "/team/portal/member";

  const label = !user
    ? "Sign In"
    : role === "admin"
      ? "Admin Dashboard"
      : role === "team_lead"
        ? "Team Lead"
        : "My Dashboard";

  return (
    <Link
      to={path}
      className="fixed bottom-6 right-6 z-50 flex items-center gap-2 bg-red-600 px-5 py-3 text-xs font-bold uppercase tracking-[0.14em] text-white shadow-[0_4px_20px_rgba(220,38,38,0.4)] transition-all duration-200 hover:bg-red-700 hover:shadow-[0_8px_30px_rgba(220,38,38,0.5)] hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950"
      aria-label={label}
    >
      <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
        {user ? (
          <path d="M2 13V3h12v10H2zM6 7v6M10 5v8M14 1h-2M4 1H2" strokeLinecap="round" />
        ) : (
          <>
            <rect x="1" y="5" width="14" height="9" rx="1" />
            <path d="M5 5V3a3 3 0 016 0v2" />
          </>
        )}
      </svg>
      {label}
    </Link>
  );
}
