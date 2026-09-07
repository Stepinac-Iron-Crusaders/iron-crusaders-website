import { useAuth } from "../../contexts/AuthContext";

export function TopBar() {
  const { profile, role, signOut } = useAuth();
  const roleLabel = role === "admin" ? "Admin" : role === "team_lead" ? "Team Lead" : "Member";

  return (
    <div className="flex items-center justify-between border-b border-zinc-800 bg-zinc-950 px-6 py-3">
      <div className="flex items-center gap-3 lg:hidden">
        <span className="font-mono text-[10px] font-bold uppercase tracking-[0.16em] text-red-500">
          Iron Crusaders
        </span>
        <span className="font-mono text-[10px] uppercase text-zinc-600">
          {roleLabel}
        </span>
      </div>

      <div className="hidden lg:block" />

      <div className="flex items-center gap-4">
        <span className="text-xs text-zinc-500">
          {profile?.full_name || profile?.email}
        </span>
        <button
          type="button"
          onClick={signOut}
          className="border border-zinc-700 bg-zinc-900 px-4 py-2 font-mono text-[10px] font-bold uppercase tracking-[0.12em] text-zinc-300 transition-colors hover:border-zinc-600 hover:text-white"
        >
          Sign Out
        </button>
      </div>
    </div>
  );
}
