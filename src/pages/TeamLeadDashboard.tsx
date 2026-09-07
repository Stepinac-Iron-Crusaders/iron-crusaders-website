import { useEffect, useState, useCallback } from "react";
import { useSearchParams } from "react-router-dom";
import { DashboardLayout } from "../components/portal/DashboardLayout";
import { StatCard } from "../components/portal/StatCard";
import { TaskCard } from "../components/portal/TaskCard";
import { EmptyState } from "../components/portal/EmptyState";
import { Modal } from "../components/portal/Modal";
import { ConfirmDialog } from "../components/portal/ConfirmDialog";
import {
  listMyTeams,
  listTeamTasks,
  createTask,
  updateTask,
  deleteTask,
  assignTask,
  setTaskStatus,
  listMembers,
} from "../lib/db";
import type { Task, UserTeam, Profile } from "../lib/db";

export default function TeamLeadDashboard() {
  const [searchParams, setSearchParams] = useSearchParams();
  const tab = searchParams.get("tab") ?? "overview";

  const [myTeams, setMyTeams] = useState<UserTeam[]>([]);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [members, setMembers] = useState<Profile[]>([]);

  // Create task modal
  const [showCreate, setShowCreate] = useState(false);
  const [form, setForm] = useState({ title: "", description: "", due_date: "", priority: "medium" });
  const [error, setError] = useState("");

  // Edit task
  const [editTask, setEditTask] = useState<Task | null>(null);
  const [editForm, setEditForm] = useState({ title: "", description: "", due_date: "", priority: "medium", status: "todo" });

  // Assign modal
  const [assignTask_, setAssignTask_] = useState<Task | null>(null);

  // Delete confirm
  const [deleteTarget, setDeleteTarget] = useState<Task | null>(null);

  const load = useCallback(async () => {
    try {
      const [t, m] = await Promise.all([
        listMyTeams().catch(() => []),
        listMembers().catch(() => []),
      ]);
      setMyTeams(t);
      setMembers(m);

      // Load tasks for all teams the user leads
      const allTasks: Task[] = [];
      for (const team of t) {
        if (team.role_in_team === "team_lead") {
          try {
            const tt = await listTeamTasks(team.id);
            allTasks.push(...tt.map((t: any) => ({ ...t, _teamName: team.name })));
          } catch {}
        }
      }
      setTasks(allTasks);
    } catch {}
  }, []);

  useEffect(() => { load(); }, [load]);

  const handleCreate = async () => {
    if (!form.title.trim()) return;
    try {
      await createTask({
        title: form.title.trim(),
        description: form.description.trim(),
        due_date: form.due_date || undefined,
        priority: form.priority,
      });
      setForm({ title: "", description: "", due_date: "", priority: "medium" });
      setShowCreate(false);
      await load();
    } catch (e: any) {
      setError(e.message ?? "Failed to create task");
    }
  };

  const handleEdit = async () => {
    if (!editTask) return;
    try {
      await updateTask(editTask.id, {
        title: editForm.title,
        description: editForm.description,
        due_date: editForm.due_date || null,
        priority: editForm.priority as "low" | "medium" | "high" | "urgent",
        status: editForm.status as "todo" | "in_progress" | "done",
      });
      setEditTask(null);
      await load();
    } catch (e: any) {
      setError(e.message ?? "Failed to update task");
    }
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;
    try {
      await deleteTask(deleteTarget.id);
      setDeleteTarget(null);
      await load();
    } catch (e: any) {
      setError(e.message ?? "Failed to delete task");
    }
  };

  const handleStatusChange = async (taskId: number, status: string) => {
    try {
      await setTaskStatus(taskId, status);
      await load();
    } catch (e: any) {
      setError(e.message ?? "Failed to update status");
    }
  };

  const handleAssign = async (memberId: string) => {
    if (!assignTask_) return;
    try {
      await assignTask(assignTask_.id, memberId);
      setAssignTask_(null);
      await load();
    } catch (e: any) {
      setError(e.message ?? "Failed to assign");
    }
  };

  const leadTeams = myTeams.filter((t) => t.role_in_team === "team_lead");

  return (
    <DashboardLayout>
      {error && (
        <div className="mb-6 border border-red-900/60 bg-red-950/30 px-4 py-3">
          <p className="font-mono text-xs text-red-400">{error}</p>
          <button type="button" onClick={() => setError("")} className="mt-2 font-mono text-[10px] uppercase text-red-500 hover:text-red-400">dismiss</button>
        </div>
      )}

      <div className="mb-8 flex gap-1 border-b border-zinc-800">
        {(["overview", "tasks", "team"] as const).map((t) => (
          <button
            key={t}
            type="button"
            onClick={() => setSearchParams({ tab: t })}
            className={`px-5 py-3 font-mono text-[10px] font-bold uppercase tracking-[0.12em] transition-colors border-b-2 ${
              tab === t ? "border-red-600 text-white" : "border-transparent text-zinc-500 hover:text-zinc-300"
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
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <StatCard label="My Teams" value={leadTeams.length} />
            <StatCard label="Total Tasks" value={tasks.length} />
            <StatCard label="In Progress" value={tasks.filter((t) => t.status === "in_progress").length} accent />
          </div>
          <div className="mt-8">
            <h3 className="mb-4 font-mono text-xs font-bold uppercase tracking-[0.12em] text-zinc-400">Recent Tasks</h3>
            {tasks.length === 0 ? (
              <EmptyState title="No tasks" description="Create tasks to get started." />
            ) : (
              <div className="space-y-3">
                {tasks.slice(0, 5).map((t) => (
                  <TaskCard
                    key={t.id}
                    task={t}
                    onStatusChange={handleStatusChange}
                    showActions={false}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* TASKS */}
      {tab === "tasks" && (
        <div>
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-2xl font-black uppercase tracking-[-0.02em] text-white">Tasks</h2>
            <button
              type="button"
              onClick={() => setShowCreate(true)}
              className="bg-red-600 px-5 py-2.5 font-mono text-[10px] font-bold uppercase tracking-[0.12em] text-white transition-colors hover:bg-red-700"
            >
              + New Task
            </button>
          </div>
          {tasks.length === 0 ? (
            <EmptyState
              title="No tasks"
              description="Create your first task."
              action={
                <button type="button" onClick={() => setShowCreate(true)} className="bg-red-600 px-5 py-2.5 font-mono text-[10px] font-bold uppercase text-white hover:bg-red-700">
                  Create Task
                </button>
              }
            />
          ) : (
            <div className="space-y-3">
              {tasks.map((t) => (
                <TaskCard
                  key={t.id}
                  task={t}
                  onStatusChange={handleStatusChange}
                  onEdit={(task) => {
                    setEditTask(task);
                    setEditForm({
                      title: task.title,
                      description: task.description ?? "",
                      due_date: task.due_date ?? "",
                      priority: task.priority,
                      status: task.status,
                    });
                  }}
                  onDelete={setDeleteTarget}
                />
              ))}
            </div>
          )}
        </div>
      )}

      {/* TEAM */}
      {tab === "team" && (
        <div>
          <h2 className="mb-6 text-2xl font-black uppercase tracking-[-0.02em] text-white">Team Members</h2>
          {leadTeams.length === 0 ? (
            <EmptyState title="No team assignments" description="You are not assigned as a lead for any teams." />
          ) : (
            leadTeams.map((team) => (
              <div key={team.id} className="mb-6">
                <h3 className="mb-3 font-mono text-xs font-bold uppercase tracking-[0.12em] text-zinc-400">{team.name}</h3>
                <div className="space-y-2">
                  {members.map((m) => (
                    <div key={m.id} className="flex items-center gap-4 border border-zinc-800 bg-zinc-950 px-5 py-3">
                      <div className="min-w-0 flex-1">
                        <p className="text-sm text-white">{m.full_name || m.email}</p>
                        <p className="font-mono text-[10px] uppercase text-zinc-600">{m.email}</p>
                      </div>
                      <span className="font-mono text-[10px] uppercase text-zinc-500">{m.role}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {/* Create Task Modal */}
      <Modal open={showCreate} onClose={() => setShowCreate(false)} title="Create Task">
        <div className="space-y-4">
          <div>
            <label className="mb-2 block font-mono text-[10px] font-bold uppercase tracking-[0.12em] text-zinc-500">Title</label>
            <input type="text" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} className="w-full border border-zinc-700 bg-zinc-950 px-4 py-2.5 text-sm text-white outline-none focus:border-red-600" autoFocus />
          </div>
          <div>
            <label className="mb-2 block font-mono text-[10px] font-bold uppercase tracking-[0.12em] text-zinc-500">Description</label>
            <textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} className="w-full border border-zinc-700 bg-zinc-950 px-4 py-2.5 text-sm text-white outline-none focus:border-red-600" rows={3} />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="mb-2 block font-mono text-[10px] font-bold uppercase tracking-[0.12em] text-zinc-500">Due Date</label>
              <input type="date" value={form.due_date} onChange={(e) => setForm({ ...form, due_date: e.target.value })} className="w-full border border-zinc-700 bg-zinc-950 px-4 py-2.5 text-sm text-white outline-none focus:border-red-600" />
            </div>
            <div>
              <label className="mb-2 block font-mono text-[10px] font-bold uppercase tracking-[0.12em] text-zinc-500">Priority</label>
              <select value={form.priority} onChange={(e) => setForm({ ...form, priority: e.target.value })} className="w-full border border-zinc-700 bg-zinc-950 px-4 py-2.5 text-sm text-white outline-none focus:border-red-600">
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
                <option value="urgent">Urgent</option>
              </select>
            </div>
          </div>
          <div className="flex justify-end gap-3 pt-2">
            <button type="button" onClick={() => setShowCreate(false)} className="border border-zinc-700 bg-zinc-950 px-5 py-2.5 font-mono text-[10px] font-bold uppercase text-zinc-300 hover:text-white">Cancel</button>
            <button type="button" onClick={handleCreate} className="bg-red-600 px-5 py-2.5 font-mono text-[10px] font-bold uppercase text-white hover:bg-red-700">Create</button>
          </div>
        </div>
      </Modal>

      {/* Edit Task Modal */}
      <Modal open={!!editTask} onClose={() => setEditTask(null)} title="Edit Task">
        <div className="space-y-4">
          <div>
            <label className="mb-2 block font-mono text-[10px] font-bold uppercase tracking-[0.12em] text-zinc-500">Title</label>
            <input type="text" value={editForm.title} onChange={(e) => setEditForm({ ...editForm, title: e.target.value })} className="w-full border border-zinc-700 bg-zinc-950 px-4 py-2.5 text-sm text-white outline-none focus:border-red-600" autoFocus />
          </div>
          <div>
            <label className="mb-2 block font-mono text-[10px] font-bold uppercase tracking-[0.12em] text-zinc-500">Description</label>
            <textarea value={editForm.description} onChange={(e) => setEditForm({ ...editForm, description: e.target.value })} className="w-full border border-zinc-700 bg-zinc-950 px-4 py-2.5 text-sm text-white outline-none focus:border-red-600" rows={3} />
          </div>
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="mb-2 block font-mono text-[10px] font-bold uppercase tracking-[0.12em] text-zinc-500">Status</label>
              <select value={editForm.status} onChange={(e) => setEditForm({ ...editForm, status: e.target.value })} className="w-full border border-zinc-700 bg-zinc-950 px-4 py-2.5 text-sm text-white outline-none focus:border-red-600">
                <option value="todo">To Do</option>
                <option value="in_progress">In Progress</option>
                <option value="done">Done</option>
              </select>
            </div>
            <div>
              <label className="mb-2 block font-mono text-[10px] font-bold uppercase tracking-[0.12em] text-zinc-500">Priority</label>
              <select value={editForm.priority} onChange={(e) => setEditForm({ ...editForm, priority: e.target.value })} className="w-full border border-zinc-700 bg-zinc-950 px-4 py-2.5 text-sm text-white outline-none focus:border-red-600">
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
                <option value="urgent">Urgent</option>
              </select>
            </div>
            <div>
              <label className="mb-2 block font-mono text-[10px] font-bold uppercase tracking-[0.12em] text-zinc-500">Due Date</label>
              <input type="date" value={editForm.due_date} onChange={(e) => setEditForm({ ...editForm, due_date: e.target.value })} className="w-full border border-zinc-700 bg-zinc-950 px-4 py-2.5 text-sm text-white outline-none focus:border-red-600" />
            </div>
          </div>
          <div className="flex justify-end gap-3 pt-2">
            <button type="button" onClick={() => setEditTask(null)} className="border border-zinc-700 bg-zinc-950 px-5 py-2.5 font-mono text-[10px] font-bold uppercase text-zinc-300 hover:text-white">Cancel</button>
            <button type="button" onClick={handleEdit} className="bg-red-600 px-5 py-2.5 font-mono text-[10px] font-bold uppercase text-white hover:bg-red-700">Save</button>
          </div>
        </div>
      </Modal>

      {/* Assign Member Modal */}
      <Modal open={!!assignTask_} onClose={() => setAssignTask_(null)} title="Assign Member">
        <div className="space-y-2">
          {members.length === 0 ? (
            <p className="text-sm text-zinc-500">No members available.</p>
          ) : (
            members.map((m) => (
              <button
                key={m.id}
                type="button"
                onClick={() => handleAssign(m.id)}
                className="flex w-full items-center gap-3 border border-zinc-800 bg-zinc-950 px-4 py-3 text-left transition-colors hover:border-zinc-700 hover:bg-zinc-900"
              >
                <div>
                  <p className="text-sm text-white">{m.full_name || m.email}</p>
                  <p className="font-mono text-[10px] uppercase text-zinc-600">{m.email}</p>
                </div>
              </button>
            ))
          )}
        </div>
      </Modal>

      {/* Confirm Delete */}
      <ConfirmDialog
        open={!!deleteTarget}
        title="Delete Task"
        message={`Delete "${deleteTarget?.title}"?`}
        confirmLabel="Delete"
        onConfirm={handleDelete}
        onCancel={() => setDeleteTarget(null)}
        danger
      />
    </DashboardLayout>
  );
}
