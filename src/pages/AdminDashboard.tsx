import { useEffect, useState, useCallback } from "react";
import { useSearchParams } from "react-router-dom";
import { DashboardLayout } from "../components/portal/DashboardLayout";
import { StatCard } from "../components/portal/StatCard";
import { EmptyState } from "../components/portal/EmptyState";
import { Modal } from "../components/portal/Modal";
import { ConfirmDialog } from "../components/portal/ConfirmDialog";
import {
  listMembers,
  listTeams,
  createTeam,
  renameTeam,
  deleteTeam,
  listRecentActivity,
  sendPasswordResetLink,
  adminAction,
} from "../lib/db";
import type { Profile, Team } from "../lib/db";

export default function AdminDashboard() {
  const [searchParams, setSearchParams] = useSearchParams();
  const tab = searchParams.get("tab") ?? "overview";

  const [members, setMembers] = useState<Profile[]>([]);
  const [teams, setTeams] = useState<Team[]>([]);
  const [activity, setActivity] = useState<any[]>([]);

  // Modals
  const [showCreateTeam, setShowCreateTeam] = useState(false);
  const [showCreateMember, setShowCreateMember] = useState(false);
  const [newMember, setNewMember] = useState({ email: "", password: "", full_name: "", role: "member" });
  const [newTeamName, setNewTeamName] = useState("");
  const [newTeamDesc, setNewTeamDesc] = useState("");
  const [editTeam, setEditTeam] = useState<Team | null>(null);
  const [editTeamName, setEditTeamName] = useState("");
  const [confirmDelete, setConfirmDelete] = useState<Team | null>(null);
  const [error, setError] = useState("");

  const load = useCallback(async () => {
    try {
      const [m, t, a] = await Promise.all([
        listMembers().catch(() => []),
        listTeams().catch(() => []),
        listRecentActivity(30).catch(() => []),
      ]);
      setMembers(m);
      setTeams(t);
      setActivity(a);
    } catch {
      // partial data acceptable
    }
  }, []);

  useEffect(() => { load(); }, [load]);

  const handleCreateTeam = async () => {
    if (!newTeamName.trim()) return;
    try {
      await createTeam(newTeamName.trim(), newTeamDesc.trim());
      setNewTeamName("");
      setNewTeamDesc("");
      setShowCreateTeam(false);
      await load();
    } catch (e: any) {
      setError(e.message ?? "Failed to create team");
    }
  };

  const handleRenameTeam = async () => {
    if (!editTeam || !editTeamName.trim()) return;
    try {
      await renameTeam(editTeam.id, editTeamName.trim());
      setEditTeam(null);
      await load();
    } catch (e: any) {
      setError(e.message ?? "Failed to rename team");
    }
  };

  const handleDeleteTeam = async () => {
    if (!confirmDelete) return;
    try {
      await deleteTeam(confirmDelete.id);
      setConfirmDelete(null);
      await load();
    } catch (e: any) {
      setError(e.message ?? "Failed to delete team");
    }
  };

  const handleToggleActive = async (m: Profile) => {
    try {
      await adminAction({ action: "toggle-active", target_user_id: m.id, active: !m.is_active });
      await load();
    } catch (e: any) {
      setError(e.message ?? "Failed to update member");
    }
  };

  const handleSetRole = async (m: Profile, role: string) => {
    try {
      await adminAction({ action: "set-role", target_user_id: m.id, role });
      await load();
    } catch (e: any) {
      setError(e.message ?? "Failed to update role");
    }
  };

  const handleResetPassword = async (email: string) => {
    try {
      await sendPasswordResetLink(email);
    } catch (e: any) {
      setError(e.message ?? "Failed to send reset link");
    }
  };

  const handleCreateMember = async () => {
    if (!newMember.email.trim() || !newMember.password.trim()) return;
    try {
      await adminAction({
        action: "create-user",
        email: newMember.email.trim(),
        password: newMember.password,
        full_name: newMember.full_name.trim(),
        role: newMember.role,
      });
      setNewMember({ email: "", password: "", full_name: "", role: "member" });
      setShowCreateMember(false);
      await load();
    } catch (e: any) {
      setError(e.message ?? "Failed to create member");
    }
  };

  return (
    <DashboardLayout>
      {error && (
        <div className="mb-6 border border-red-900/60 bg-red-950/30 px-4 py-3">
          <p className="font-mono text-xs text-red-400">{error}</p>
          <button type="button" onClick={() => setError("")} className="mt-2 font-mono text-[10px] uppercase text-red-500 hover:text-red-400">dismiss</button>
        </div>
      )}

      {/* Tab Nav */}
      <div className="mb-8 flex gap-1 border-b border-zinc-800">
        {(["overview", "members", "teams", "activity"] as const).map((t) => (
          <button
            key={t}
            type="button"
            onClick={() => setSearchParams({ tab: t })}
            className={`px-5 py-3 font-mono text-[10px] font-bold uppercase tracking-[0.12em] transition-colors border-b-2 ${
              tab === t
                ? "border-red-600 text-white"
                : "border-transparent text-zinc-500 hover:text-zinc-300"
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      {/* OVERVIEW */}
      {tab === "overview" && (
        <div>
          <h2 className="mb-6 text-2xl font-black uppercase tracking-[-0.02em] text-white">Overview</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <StatCard label="Total Members" value={members.length} />
            <StatCard label="Active Teams" value={teams.length} />
            <StatCard label="Active Members" value={members.filter((m) => m.is_active).length} accent />
            <StatCard label="Disabled" value={members.filter((m) => !m.is_active).length} />
          </div>
          <div className="mt-8">
            <h3 className="mb-4 font-mono text-xs font-bold uppercase tracking-[0.12em] text-zinc-400">Recent Activity</h3>
            {activity.length === 0 ? (
              <EmptyState title="No activity yet" description="Actions will appear here once members start using the portal." />
            ) : (
              <div className="space-y-2">
                {activity.slice(0, 10).map((a: any) => (
                  <div key={a.id} className="flex items-center gap-3 border border-zinc-800 bg-zinc-950 px-4 py-3">
                    <span className="font-mono text-[10px] uppercase text-zinc-600">{a.action}</span>
                    <span className="text-xs text-zinc-400">{a.entity_type} #{a.entity_id}</span>
                    <span className="ml-auto font-mono text-[10px] text-zinc-700">
                      {new Date(a.created_at).toLocaleString()}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* MEMBERS */}
      {tab === "members" && (
        <div>
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-2xl font-black uppercase tracking-[-0.02em] text-white">Members</h2>
            <button
              type="button"
              onClick={() => setShowCreateMember(true)}
              className="bg-red-600 px-5 py-2.5 font-mono text-[10px] font-bold uppercase tracking-[0.12em] text-white transition-colors hover:bg-red-700"
            >
              + Add Member
            </button>
          </div>
          {members.length === 0 ? (
            <EmptyState
              title="No members"
              description="Add your first team member."
              action={
                <button
                  type="button"
                  onClick={() => setShowCreateMember(true)}
                  className="bg-red-600 px-5 py-2.5 font-mono text-[10px] font-bold uppercase text-white hover:bg-red-700"
                >
                  Add Member
                </button>
              }
            />
          ) : (
            <div className="space-y-2">
              {members.map((m) => (
                <div key={m.id} className="flex items-center gap-4 border border-zinc-800 bg-zinc-950 px-5 py-4">
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-bold text-white">{m.full_name || m.email}</p>
                    <p className="font-mono text-[10px] uppercase text-zinc-600">{m.email}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <select
                      value={m.role}
                      onChange={(e) => handleSetRole(m, e.target.value)}
                      className="border border-zinc-700 bg-zinc-900 px-2 py-1.5 font-mono text-[10px] uppercase text-zinc-300 focus:border-red-600 focus:outline-none"
                    >
                      <option value="member">Member</option>
                      <option value="team_lead">Team Lead</option>
                      <option value="admin">Admin</option>
                    </select>
                    <button
                      type="button"
                      onClick={() => handleToggleActive(m)}
                      className={`border px-3 py-1.5 font-mono text-[10px] font-bold uppercase tracking-[0.12em] ${
                        m.is_active
                          ? "border-zinc-700 bg-zinc-900 text-zinc-300 hover:border-red-800 hover:text-red-400"
                          : "border-emerald-800 bg-emerald-950/50 text-emerald-400 hover:bg-emerald-900/50"
                      }`}
                    >
                      {m.is_active ? "Deactivate" : "Activate"}
                    </button>
                    <button
                      type="button"
                      onClick={() => handleResetPassword(m.email)}
                      className="border border-zinc-700 bg-zinc-900 px-3 py-1.5 font-mono text-[10px] font-bold uppercase tracking-[0.12em] text-zinc-300 transition-colors hover:border-zinc-600 hover:text-white"
                    >
                      Reset PW
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* TEAMS */}
      {tab === "teams" && (
        <div>
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-2xl font-black uppercase tracking-[-0.02em] text-white">Teams</h2>
            <button
              type="button"
              onClick={() => setShowCreateTeam(true)}
              className="bg-red-600 px-5 py-2.5 font-mono text-[10px] font-bold uppercase tracking-[0.12em] text-white transition-colors hover:bg-red-700"
            >
              + New Team
            </button>
          </div>
          {teams.length === 0 ? (
            <EmptyState
              title="No teams"
              description="Create your first team to get started."
              action={
                <button
                  type="button"
                  onClick={() => setShowCreateTeam(true)}
                  className="bg-red-600 px-5 py-2.5 font-mono text-[10px] font-bold uppercase tracking-[0.12em] text-white hover:bg-red-700"
                >
                  Create Team
                </button>
              }
            />
          ) : (
            <div className="space-y-2">
              {teams.map((t) => (
                <div key={t.id} className="flex items-center gap-4 border border-zinc-800 bg-zinc-950 px-5 py-4">
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-bold text-white">{t.name}</p>
                    {t.description && <p className="mt-1 text-xs text-zinc-500">{t.description}</p>}
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => { setEditTeam(t); setEditTeamName(t.name); }}
                      className="border border-zinc-700 bg-zinc-900 px-3 py-1.5 font-mono text-[10px] font-bold uppercase tracking-[0.12em] text-zinc-300 transition-colors hover:border-zinc-600 hover:text-white"
                    >
                      Rename
                    </button>
                    <button
                      type="button"
                      onClick={() => setConfirmDelete(t)}
                      className="border border-zinc-700 bg-zinc-900 px-3 py-1.5 font-mono text-[10px] font-bold uppercase tracking-[0.12em] text-red-400 transition-colors hover:border-red-800 hover:bg-red-950/50"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* ACTIVITY */}
      {tab === "activity" && (
        <div>
          <h2 className="mb-6 text-2xl font-black uppercase tracking-[-0.02em] text-white">Activity Log</h2>
          {activity.length === 0 ? (
            <EmptyState title="No activity" description="Audit log entries will appear here." />
          ) : (
            <div className="space-y-2">
              {activity.map((a: any) => (
                <div key={a.id} className="flex items-center gap-4 border border-zinc-800 bg-zinc-950 px-5 py-4">
                  <span className="shrink-0 font-mono text-[10px] font-bold uppercase text-red-500">{a.action}</span>
                  <span className="text-xs text-zinc-400">{a.entity_type} #{a.entity_id}</span>
                  {a.details && (
                    <span className="text-[11px] text-zinc-600 truncate">{JSON.stringify(a.details)}</span>
                  )}
                  <span className="ml-auto shrink-0 font-mono text-[10px] text-zinc-700">
                    {new Date(a.created_at).toLocaleString()}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Create Team Modal */}
      <Modal open={showCreateTeam} onClose={() => setShowCreateTeam(false)} title="Create Team">
        <div className="space-y-4">
          <div>
            <label className="mb-2 block font-mono text-[10px] font-bold uppercase tracking-[0.12em] text-zinc-500">Team Name</label>
            <input
              type="text"
              value={newTeamName}
              onChange={(e) => setNewTeamName(e.target.value)}
              className="w-full border border-zinc-700 bg-zinc-950 px-4 py-2.5 text-sm text-white outline-none focus:border-red-600"
              placeholder="e.g. Build Team"
              autoFocus
            />
          </div>
          <div>
            <label className="mb-2 block font-mono text-[10px] font-bold uppercase tracking-[0.12em] text-zinc-500">Description</label>
            <input
              type="text"
              value={newTeamDesc}
              onChange={(e) => setNewTeamDesc(e.target.value)}
              className="w-full border border-zinc-700 bg-zinc-950 px-4 py-2.5 text-sm text-white outline-none focus:border-red-600"
              placeholder="Optional"
            />
          </div>
          <div className="flex justify-end gap-3 pt-2">
            <button type="button" onClick={() => setShowCreateTeam(false)} className="border border-zinc-700 bg-zinc-950 px-5 py-2.5 font-mono text-[10px] font-bold uppercase tracking-[0.12em] text-zinc-300 hover:text-white">Cancel</button>
            <button type="button" onClick={handleCreateTeam} className="bg-red-600 px-5 py-2.5 font-mono text-[10px] font-bold uppercase tracking-[0.12em] text-white hover:bg-red-700">Create</button>
          </div>
        </div>
      </Modal>

      {/* Edit Team Modal */}
      <Modal open={!!editTeam} onClose={() => setEditTeam(null)} title="Rename Team">
        <div className="space-y-4">
          <div>
            <label className="mb-2 block font-mono text-[10px] font-bold uppercase tracking-[0.12em] text-zinc-500">Team Name</label>
            <input
              type="text"
              value={editTeamName}
              onChange={(e) => setEditTeamName(e.target.value)}
              className="w-full border border-zinc-700 bg-zinc-950 px-4 py-2.5 text-sm text-white outline-none focus:border-red-600"
              autoFocus
            />
          </div>
          <div className="flex justify-end gap-3 pt-2">
            <button type="button" onClick={() => setEditTeam(null)} className="border border-zinc-700 bg-zinc-950 px-5 py-2.5 font-mono text-[10px] font-bold uppercase tracking-[0.12em] text-zinc-300 hover:text-white">Cancel</button>
            <button type="button" onClick={handleRenameTeam} className="bg-red-600 px-5 py-2.5 font-mono text-[10px] font-bold uppercase tracking-[0.12em] text-white hover:bg-red-700">Save</button>
          </div>
        </div>
      </Modal>

      {/* Confirm Delete */}
      <ConfirmDialog
        open={!!confirmDelete}
        title="Delete Team"
        message={`Are you sure you want to delete "${confirmDelete?.name}"? This is a soft-delete; the team will be deactivated.`}
        confirmLabel="Delete"
        onConfirm={handleDeleteTeam}
        onCancel={() => setConfirmDelete(null)}
        danger
      />

      {/* Create Member Modal */}
      <Modal open={showCreateMember} onClose={() => setShowCreateMember(false)} title="Add Member">
        <div className="space-y-4">
          <div>
            <label className="mb-2 block font-mono text-[10px] font-bold uppercase tracking-[0.12em] text-zinc-500">Email</label>
            <input
              type="email"
              value={newMember.email}
              onChange={(e) => setNewMember({ ...newMember, email: e.target.value })}
              className="w-full border border-zinc-700 bg-zinc-950 px-4 py-2.5 text-sm text-white outline-none focus:border-red-600"
              placeholder="member@example.com"
              autoFocus
            />
          </div>
          <div>
            <label className="mb-2 block font-mono text-[10px] font-bold uppercase tracking-[0.12em] text-zinc-500">Password</label>
            <input
              type="password"
              value={newMember.password}
              onChange={(e) => setNewMember({ ...newMember, password: e.target.value })}
              className="w-full border border-zinc-700 bg-zinc-950 px-4 py-2.5 text-sm text-white outline-none focus:border-red-600"
              placeholder="Min 6 characters"
            />
          </div>
          <div>
            <label className="mb-2 block font-mono text-[10px] font-bold uppercase tracking-[0.12em] text-zinc-500">Full Name</label>
            <input
              type="text"
              value={newMember.full_name}
              onChange={(e) => setNewMember({ ...newMember, full_name: e.target.value })}
              className="w-full border border-zinc-700 bg-zinc-950 px-4 py-2.5 text-sm text-white outline-none focus:border-red-600"
              placeholder="Jane Smith"
            />
          </div>
          <div>
            <label className="mb-2 block font-mono text-[10px] font-bold uppercase tracking-[0.12em] text-zinc-500">Role</label>
            <select
              value={newMember.role}
              onChange={(e) => setNewMember({ ...newMember, role: e.target.value })}
              className="w-full border border-zinc-700 bg-zinc-950 px-4 py-2.5 text-sm text-white outline-none focus:border-red-600"
            >
              <option value="member">Member</option>
              <option value="team_lead">Team Lead</option>
              <option value="admin">Admin</option>
            </select>
          </div>
          <div className="flex justify-end gap-3 pt-2">
            <button type="button" onClick={() => setShowCreateMember(false)} className="border border-zinc-700 bg-zinc-950 px-5 py-2.5 font-mono text-[10px] font-bold uppercase tracking-[0.12em] text-zinc-300 hover:text-white">Cancel</button>
            <button type="button" onClick={handleCreateMember} className="bg-red-600 px-5 py-2.5 font-mono text-[10px] font-bold uppercase tracking-[0.12em] text-white hover:bg-red-700">Create</button>
          </div>
        </div>
      </Modal>
    </DashboardLayout>
  );
}
