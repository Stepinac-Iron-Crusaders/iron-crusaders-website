import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AnimatedPage } from "../components/AnimatedPage";
import { supabase } from "../lib/supabaseClient";

type Profile = {
  id: string;
  full_name: string;
  email: string;
  role: "admin" | "lead" | "member";
  active: boolean;
  created_at: string;
};

type Team = {
  id: number;
  name: string;
  description: string | null;
};

export default function AdminDashboard() {
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [teams, setTeams] = useState<Team[]>([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadData = async () => {
    setLoading(true);
    setError("");

    const [profilesResult, teamsResult] = await Promise.all([
      supabase
        .from("profiles")
        .select("id, full_name, email, role, active, created_at")
        .order("full_name"),

      supabase
        .from("teams")
        .select("id, name, description")
        .order("name"),
    ]);

    if (profilesResult.error) {
      setError(profilesResult.error.message);
      setLoading(false);
      return;
    }

    if (teamsResult.error) {
      setError(teamsResult.error.message);
      setLoading(false);
      return;
    }

    setProfiles(profilesResult.data ?? []);
    setTeams(teamsResult.data ?? []);
    setLoading(false);
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    window.location.href = "#/team/portal/login";
  };

  const admins = profiles.filter((p) => p.role === "admin");
  const leads = profiles.filter((p) => p.role === "lead");
  const members = profiles.filter((p) => p.role === "member");
  const inactive = profiles.filter((p) => !p.active);

  return (
    <AnimatedPage>
      <div className="min-h-screen bg-zinc-950">

        {/* Header */}
        <section className="border-b border-zinc-800 bg-zinc-950">
          <div className="mx-auto max-w-[1400px] px-4 py-10 lg:px-8">

            <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-center">

              <div>
                <div className="mb-3 flex items-center gap-3">
                  <span className="h-px w-8 bg-red-600" />

                  <span className="font-mono text-xs font-semibold uppercase tracking-[0.16em] text-red-500">
                    Iron Crusaders
                  </span>
                </div>

                <h1 className="text-4xl font-black uppercase tracking-[-0.03em] text-white">
                  Admin Portal
                </h1>

                <p className="mt-2 text-sm text-zinc-500">
                  Manage team members, teams, tasks, and permissions.
                </p>
              </div>

              <div className="flex gap-3">
                <Link
                  to="/team/portal/dashboard"
                  className="border border-zinc-700 bg-zinc-900 px-5 py-3 font-mono text-[10px] font-bold uppercase tracking-[0.12em] text-zinc-400 transition-colors hover:border-zinc-600 hover:text-white"
                >
                  Team Portal
                </Link>

                <button
                  onClick={handleLogout}
                  className="bg-red-600 px-5 py-3 font-mono text-[10px] font-bold uppercase tracking-[0.12em] text-white transition-colors hover:bg-red-700"
                >
                  Sign Out
                </button>
              </div>

            </div>
          </div>
        </section>

        {/* Main */}
        <main className="mx-auto max-w-[1400px] px-4 py-10 lg:px-8">

          {error && (
            <div className="mb-8 border border-red-900/60 bg-red-950/30 px-5 py-4">
              <p className="font-mono text-xs text-red-400">
                {error}
              </p>
            </div>
          )}

          {/* Statistics */}
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">

            <StatCard
              label="Total Members"
              value={profiles.length}
            />

            <StatCard
              label="Administrators"
              value={admins.length}
            />

            <StatCard
              label="Team Leads"
              value={leads.length}
            />

            <StatCard
              label="Teams"
              value={teams.length}
            />

          </div>

          {/* Management */}
          <div className="mt-10 grid gap-8 lg:grid-cols-2">

            {/* Members */}
            <section className="border border-zinc-800 bg-zinc-900">

              <div className="flex items-center justify-between border-b border-zinc-800 px-6 py-5">
                <div>
                  <h2 className="text-lg font-black uppercase text-white">
                    Team Members
                  </h2>

                  <p className="mt-1 text-xs text-zinc-600">
                    {members.length} members
                  </p>
                </div>

                <button
                  className="bg-red-600 px-4 py-2 font-mono text-[10px] font-bold uppercase tracking-[0.1em] text-white hover:bg-red-700"
                  disabled
                  title="User creation will be enabled in the next step."
                >
                  + Add Member
                </button>
              </div>

              <div className="divide-y divide-zinc-800">

                {loading ? (
                  <LoadingRow />
                ) : profiles.length === 0 ? (
                  <EmptyRow text="No profiles found." />
                ) : (
                  profiles.map((profile) => (
                    <div
                      key={profile.id}
                      className="flex items-center justify-between gap-4 px-6 py-4"
                    >
                      <div className="min-w-0">
                        <p className="truncate text-sm font-bold text-white">
                          {profile.full_name}
                        </p>

                        <p className="truncate font-mono text-[10px] text-zinc-600">
                          {profile.email}
                        </p>
                      </div>

                      <div className="flex shrink-0 items-center gap-3">

                        <span
                          className={`font-mono text-[9px] font-bold uppercase tracking-[0.1em] ${
                            profile.role === "admin"
                              ? "text-red-500"
                              : profile.role === "lead"
                              ? "text-blue-400"
                              : "text-zinc-500"
                          }`}
                        >
                          {profile.role}
                        </span>

                        <span
                          className={`h-2 w-2 rounded-full ${
                            profile.active
                              ? "bg-green-500"
                              : "bg-zinc-700"
                          }`}
                          title={profile.active ? "Active" : "Inactive"}
                        />

                      </div>
                    </div>
                  ))
                )}

              </div>
            </section>

            {/* Teams */}
            <section className="border border-zinc-800 bg-zinc-900">

              <div className="flex items-center justify-between border-b border-zinc-800 px-6 py-5">

                <div>
                  <h2 className="text-lg font-black uppercase text-white">
                    Teams
                  </h2>

                  <p className="mt-1 text-xs text-zinc-600">
                    {teams.length} teams
                  </p>
                </div>

                <button
                  className="bg-red-600 px-4 py-2 font-mono text-[10px] font-bold uppercase tracking-[0.1em] text-white hover:bg-red-700"
                  disabled
                  title="Team creation will be enabled in a later step."
                >
                  + Add Team
                </button>

              </div>

              <div className="divide-y divide-zinc-800">

                {loading ? (
                  <LoadingRow />
                ) : teams.length === 0 ? (
                  <EmptyRow text="No teams created yet." />
                ) : (
                  teams.map((team) => (
                    <div
                      key={team.id}
                      className="px-6 py-5"
                    >
                      <p className="text-sm font-bold uppercase text-white">
                        {team.name}
                      </p>

                      {team.description && (
                        <p className="mt-1 text-xs text-zinc-600">
                          {team.description}
                        </p>
                      )}
                    </div>
                  ))
                )}

              </div>
            </section>

          </div>

          {/* Coming management sections */}
          <section className="mt-8 border border-zinc-800 bg-zinc-900">

            <div className="border-b border-zinc-800 px-6 py-5">
              <h2 className="text-lg font-black uppercase text-white">
                Administration
              </h2>

              <p className="mt-1 text-xs text-zinc-600">
                Additional management tools
              </p>
            </div>

            <div className="grid gap-px bg-zinc-800 sm:grid-cols-2 lg:grid-cols-4">

              <AdminAction
                title="User Management"
                description="Create, deactivate, and manage accounts."
              />

              <AdminAction
                title="Team Assignments"
                description="Assign members to one or more teams."
              />

              <AdminAction
                title="Task Management"
                description="Create and oversee team tasks."
              />

              <AdminAction
                title="Audit & Security"
                description="Review important account activity."
              />

            </div>

          </section>

          {/* Inactive */}
          {inactive.length > 0 && (
            <section className="mt-8 border border-zinc-800 bg-zinc-900">

              <div className="border-b border-zinc-800 px-6 py-5">
                <h2 className="text-lg font-black uppercase text-white">
                  Inactive Accounts
                </h2>

                <p className="mt-1 text-xs text-zinc-600">
                  {inactive.length} inactive account
                  {inactive.length === 1 ? "" : "s"}
                </p>
              </div>

              <div className="divide-y divide-zinc-800">
                {inactive.map((profile) => (
                  <div
                    key={profile.id}
                    className="px-6 py-4"
                  >
                    <p className="text-sm font-bold text-zinc-400">
                      {profile.full_name}
                    </p>

                    <p className="font-mono text-[10px] text-zinc-700">
                      {profile.email}
                    </p>
                  </div>
                ))}
              </div>

            </section>
          )}

        </main>
      </div>
    </AnimatedPage>
  );
}


function StatCard({
  label,
  value,
}: {
  label: string;
  value: number;
}) {
  return (
    <div className="border border-zinc-800 bg-zinc-900 p-6">
      <p className="font-mono text-[10px] font-bold uppercase tracking-[0.12em] text-zinc-600">
        {label}
      </p>

      <p className="mt-3 text-4xl font-black text-white">
        {value}
      </p>
    </div>
  );
}


function AdminAction({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="bg-zinc-900 p-6">
      <p className="text-sm font-bold uppercase text-white">
        {title}
      </p>

      <p className="mt-2 text-xs leading-5 text-zinc-600">
        {description}
      </p>
    </div>
  );
}


function LoadingRow() {
  return (
    <div className="px-6 py-8">
      <p className="font-mono text-[10px] uppercase tracking-[0.12em] text-zinc-700">
        Loading...
      </p>
    </div>
  );
}


function EmptyRow({ text }: { text: string }) {
  return (
    <div className="px-6 py-8">
      <p className="font-mono text-[10px] uppercase tracking-[0.12em] text-zinc-700">
        {text}
      </p>
    </div>
  );
}
