import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
  type ReactNode,
} from "react";
import type { User as SupabaseUser } from "@supabase/supabase-js";
import { supabase } from "../lib/supabaseClient";
import type { Profile, Team, UserTeam, Role } from "../lib/supabaseClient";

type AuthContextType = {
  user: SupabaseUser | null;
  profile: Profile | null;
  teams: UserTeam[];
  role: Role;
  isActive: boolean;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<{ error: Error | null }>;
  signOut: () => Promise<void>;
  refreshProfile: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<SupabaseUser | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [teams, setTeams] = useState<UserTeam[]>([]);
  const [loading, setLoading] = useState(true);

  const loadProfileAndTeams = useCallback(async () => {
    const {
      data: { user: u },
    } = await supabase.auth.getUser();
    setUser(u ?? null);

    if (!u) {
      setProfile(null);
      setTeams([]);
      return;
    }

    // Role/profile come from the DATABASE (source of truth), never localStorage.
    const { data: prof, error: profErr } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", u.id)
      .maybeSingle();
    setProfile(prof ?? null);

    // Resolve this user's teams via the many-to-many team_members table.
    const { data: memberships } = await supabase
      .from("team_members")
      .select("team_id, role_in_team, joined_at")
      .eq("user_id", u.id);

    const teamIds = (memberships ?? []).map((m) => m.team_id);
    let teamsList: Team[] = [];
    if (teamIds.length) {
      const { data: t } = await supabase
        .from("teams")
        .select("*")
        .in("id", teamIds);
      teamsList = t ?? [];
    }
    setTeams(
      (memberships ?? []).map((m) => {
        const t = teamsList.find((x) => String(x.id) === String(m.team_id));
        return { ...(t ?? ({ id: m.team_id } as Team)), role_in_team: m.role_in_team, joined_at: m.joined_at };
      }),
    );

    if (profErr) {
      // Profile not yet created (migration trigger missing). Keep state null
      // so the UI can prompt an admin bootstrap rather than crashing.
      setProfile(null);
    }
  }, []);

  useEffect(() => {
    const init = async () => {
      await loadProfileAndTeams();
      setLoading(false);
    };
    init();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(() => {
      // Re-resolve whenever the session changes.
      loadProfileAndTeams().catch(() => {});
    });
    return () => subscription.unsubscribe();
  }, [loadProfileAndTeams]);

  const signIn = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({
      email: email.trim(),
      password,
    });
    if (!error) {
      // signInWithPassword updates the session; onAuthStateChange reloads the
      // profile + teams. Reload immediately for snappier UX.
      await loadProfileAndTeams();
    }
    return { error: error ? new Error(error.message) : null };
  };

  const signOut = async () => {
    await supabase.auth.signOut();
    setUser(null);
    setProfile(null);
    setTeams([]);
  };

  const role: Role = profile?.role ?? "member";
  const isActive = profile?.is_active ?? true;

  return (
    <AuthContext.Provider
      value={{
        user,
        profile,
        teams,
        role,
        isActive,
        loading,
        signIn,
        signOut,
        refreshProfile: loadProfileAndTeams,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}

export function useRole(): Role {
  const { role } = useAuth();
  return role;
}

export function useTeams(): UserTeam[] {
  const { teams } = useAuth();
  return teams;
}

// Convenience: the dashboard path for the current user's role.
export function useRoleDashboardPath(): string {
  const { role } = useAuth();
  return role === "admin"
    ? "/team/portal/admin"
    : role === "team_lead"
      ? "/team/portal/lead"
      : "/team/portal/member";
}
