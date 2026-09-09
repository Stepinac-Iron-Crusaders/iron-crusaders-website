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
      aria-label={label}
      className="group fixed bottom-6 right-6 z-50 flex h-12 w-12 items-center justify-center rounded-full bg-red-600 text-white shadow-[0_4px_20px_rgba(220,38,38,0.4)] transition-all duration-300 ease-out hover:h-12 hover:w-auto hover:rounded-full hover:px-5 hover:gap-2 hover:shadow-[0_8px_30px_rgba(220,38,38,0.5)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950"
    >
      <svg
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        className="shrink-0"
      >
        {user ? (
          <path d="M2 13V3h12v10H2zM6 7v6M10 5v8M14 1h-2M4 1H2" strokeLinecap="round" />
        ) : (
          <>
            <rect x="1" y="5" width="14" height="9" rx="1" />
            <path d="M5 5V3a3 3 0 016 0v2" />
          </>
        )}
      </svg>
      <span className="hidden whitespace-nowrap text-xs font-bold uppercase tracking-[0.14em] group-hover:inline">
        {label}
      </span>
    </Link>
  );
}
