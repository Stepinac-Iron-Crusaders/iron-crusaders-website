import type { ReactNode } from "react";

type Props = {
  icon?: ReactNode;
  title: string;
  description: string;
  action?: ReactNode;
};

export function EmptyState({ icon, title, description, action }: Props) {
  return (
    <div className="border border-zinc-800 bg-zinc-950 p-12 text-center">
      {icon && (
        <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center border border-zinc-800 bg-zinc-900 text-zinc-500">
          {icon}
        </div>
      )}
      <h3 className="font-mono text-xs font-bold uppercase tracking-[0.12em] text-zinc-400">
        {title}
      </h3>
      <p className="mt-2 text-sm text-zinc-600">{description}</p>
      {action && <div className="mt-5">{action}</div>}
    </div>
  );
}
