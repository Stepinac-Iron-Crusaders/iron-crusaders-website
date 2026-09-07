import type { Task } from "../../lib/db";
import { StatusBadge } from "./StatusBadge";
import { PriorityBadge } from "./PriorityBadge";

type Props = {
  task: Task;
  onStatusChange?: (taskId: number, status: string) => void;
  onEdit?: (task: Task) => void;
  onDelete?: (task: Task) => void;
  showActions?: boolean;
};

export function TaskCard({ task, onStatusChange, onEdit, onDelete, showActions = true }: Props) {
  const isOverdue =
    task.due_date &&
    task.status !== "done" &&
    new Date(task.due_date) < new Date();

  return (
    <div
      className={`border p-5 transition-colors ${
        isOverdue
          ? "border-red-800/60 bg-red-950/20"
          : "border-zinc-800 bg-zinc-950 hover:border-zinc-700"
      }`}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0 flex-1">
          <h3 className="text-sm font-bold uppercase tracking-wide text-white">
            {task.title}
          </h3>
          {task.description && (
            <p className="mt-1.5 text-xs leading-relaxed text-zinc-500 line-clamp-2">
              {task.description}
            </p>
          )}
        </div>

        <div className="flex shrink-0 items-center gap-2">
          <StatusBadge status={task.status} />
          <PriorityBadge priority={task.priority} />
        </div>
      </div>

      {task.due_date && (
        <p className="mt-3 font-mono text-[10px] uppercase tracking-wide text-zinc-600">
          Due {new Date(task.due_date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
          {isOverdue && " — overdue"}
        </p>
      )}

      {showActions && (
        <div className="mt-4 flex items-center gap-2 border-t border-zinc-800 pt-3">
          {task.status !== "done" && onStatusChange && (
            <>
              {task.status === "todo" && (
                <button
                  type="button"
                  onClick={() => onStatusChange(task.id, "in_progress")}
                  className="border border-zinc-700 bg-zinc-900 px-3 py-1.5 font-mono text-[10px] font-bold uppercase tracking-[0.12em] text-zinc-300 transition-colors hover:border-zinc-600 hover:text-white"
                >
                  Start
                </button>
              )}
              {task.status === "in_progress" && (
                <button
                  type="button"
                  onClick={() => onStatusChange(task.id, "done")}
                  className="border border-emerald-800 bg-emerald-950/50 px-3 py-1.5 font-mono text-[10px] font-bold uppercase tracking-[0.12em] text-emerald-400 transition-colors hover:bg-emerald-900/50"
                >
                  Complete
                </button>
              )}
            </>
          )}
          {onEdit && (
            <button
              type="button"
              onClick={() => onEdit(task)}
              className="border border-zinc-700 bg-zinc-900 px-3 py-1.5 font-mono text-[10px] font-bold uppercase tracking-[0.12em] text-zinc-300 transition-colors hover:border-zinc-600 hover:text-white"
            >
              Edit
            </button>
          )}
          {onDelete && (
            <button
              type="button"
              onClick={() => onDelete(task)}
              className="border border-zinc-700 bg-zinc-900 px-3 py-1.5 font-mono text-[10px] font-bold uppercase tracking-[0.12em] text-red-400 transition-colors hover:border-red-800 hover:bg-red-950/50"
            >
              Delete
            </button>
          )}
        </div>
      )}
    </div>
  );
}
