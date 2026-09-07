import { useEffect, useState, useCallback } from "react";
import { useSearchParams } from "react-router-dom";
import { DashboardLayout } from "../components/portal/DashboardLayout";
import { StatCard } from "../components/portal/StatCard";
import { TaskCard } from "../components/portal/TaskCard";
import { EmptyState } from "../components/portal/EmptyState";
import {
  listMyTasks,
  setAssignmentComplete,
  listNotifications,
  listUpcomingSchedule,
} from "../lib/db";
import type { TaskAssignment } from "../lib/db";
import { useAuth } from "../contexts/AuthContext";

export default function MemberDashboard() {
  const [searchParams, setSearchParams] = useSearchParams();
  const tab = searchParams.get("tab") ?? "tasks";
  const { user } = useAuth();

  const [assignments, setAssignments] = useState<(TaskAssignment & { tasks: any })[]>([]);
  const [error, setError] = useState("");

  // Notifications
  const [notifications, setNotifications] = useState<any[]>([]);

  // Schedule
  const [schedule, setSchedule] = useState<any[]>([]);

  const load = useCallback(async () => {
    try {
      const [a, notifData, schedData] = await Promise.all([
        listMyTasks().catch(() => []),
        listNotifications(20).catch(() => []),
        listUpcomingSchedule().catch(() => []),
      ]);
      setAssignments(a);
      setNotifications(notifData);
      setSchedule(schedData);
    } catch {}
  }, []);

  useEffect(() => { load(); }, [load]);

  const handleToggleComplete = async (taskId: number, completed: boolean) => {
    if (!user) return;
    try {
      await setAssignmentComplete(taskId, user.id, !completed);
      await load();
    } catch (e: any) {
      setError(e.message ?? "Failed to update");
    }
  };

  const completedCount = assignments.filter((a) => a.completed).length;
  const pendingCount = assignments.filter((a) => !a.completed).length;

  return (
    <DashboardLayout>
      {error && (
        <div className="mb-6 border border-red-900/60 bg-red-950/30 px-4 py-3">
          <p className="font-mono text-xs text-red-400">{error}</p>
          <button type="button" onClick={() => setError("")} className="mt-2 font-mono text-[10px] uppercase text-red-500 hover:text-red-400">dismiss</button>
        </div>
      )}

      <div className="mb-8 flex gap-1 border-b border-zinc-800">
        {(["tasks", "schedule", "notifications"] as const).map((t) => (
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

      {/* TASKS */}
      {tab === "tasks" && (
        <div>
          <h2 className="mb-6 text-2xl font-black uppercase tracking-[-0.02em] text-white">My Tasks</h2>
          <div className="mb-6 grid gap-4 sm:grid-cols-3">
            <StatCard label="Assigned" value={assignments.length} />
            <StatCard label="Completed" value={completedCount} accent />
            <StatCard label="Pending" value={pendingCount} />
          </div>
          {assignments.length === 0 ? (
            <EmptyState
              title="No tasks assigned"
              description="Your team lead will assign tasks to you here."
            />
          ) : (
            <div className="space-y-3">
              {assignments.map((a) => {
                const task = a.tasks;
                if (!task) return null;
                return (
                  <div key={a.id} className="relative">
                    <TaskCard
                      task={{ ...task, status: a.completed ? "done" : task.status }}
                      showActions={false}
                    />
                    <div className="absolute right-5 top-5">
                      <button
                        type="button"
                        onClick={() => handleToggleComplete(task.id, a.completed)}
                        className={`border px-3 py-1.5 font-mono text-[10px] font-bold uppercase tracking-[0.12em] ${
                          a.completed
                            ? "border-emerald-800 bg-emerald-950/50 text-emerald-400 hover:bg-emerald-900/50"
                            : "border-zinc-700 bg-zinc-900 text-zinc-300 hover:border-zinc-600 hover:text-white"
                        }`}
                      >
                        {a.completed ? "Done" : "Mark Done"}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* SCHEDULE */}
      {tab === "schedule" && (
        <div>
          <h2 className="mb-6 text-2xl font-black uppercase tracking-[-0.02em] text-white">Team Schedule</h2>
          {schedule.length === 0 ? (
            <EmptyState title="No upcoming events" description="Check back later for team events." />
          ) : (
            <div className="space-y-3">
              {schedule.map((event: any) => {
                const date = new Date(event.start_time);
                return (
                  <div key={event.id} className="flex gap-5 border border-zinc-800 bg-zinc-950 p-5">
                    <div className="flex w-20 shrink-0 flex-col items-center justify-center border-r border-zinc-800 pr-5">
                      <span className="font-mono text-xs font-bold text-red-500">
                        {date.toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                      </span>
                      <span className="mt-1 font-mono text-[9px] uppercase text-zinc-600">
                        {date.toLocaleDateString("en-US", { weekday: "long" })}
                      </span>
                    </div>
                    <div className="min-w-0">
                      <h3 className="text-sm font-bold uppercase tracking-wide text-white">{event.title}</h3>
                      <p className="mt-1 text-xs text-zinc-500">
                        {date.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit", hour12: true })}
                      </p>
                      {event.location && (
                        <p className="mt-1 font-mono text-[10px] uppercase text-zinc-700">{event.location}</p>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* NOTIFICATIONS */}
      {tab === "notifications" && (
        <div>
          <h2 className="mb-6 text-2xl font-black uppercase tracking-[-0.02em] text-white">Notifications</h2>
          {notifications.length === 0 ? (
            <EmptyState title="No notifications" description="You're all caught up." />
          ) : (
            <div className="space-y-2">
              {notifications.map((n: any) => (
                <div key={n.id} className={`border px-5 py-4 ${n.read ? "border-zinc-800 bg-zinc-950" : "border-zinc-700 bg-zinc-900"}`}>
                  <p className="text-sm text-white">{n.message}</p>
                  <p className="mt-1 font-mono text-[10px] text-zinc-600">
                    {new Date(n.created_at).toLocaleString()}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </DashboardLayout>
  );
}
