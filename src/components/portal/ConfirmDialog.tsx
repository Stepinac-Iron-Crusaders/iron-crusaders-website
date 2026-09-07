import { Modal } from "./Modal";

type Props = {
  open: boolean;
  title: string;
  message: string;
  confirmLabel?: string;
  onConfirm: () => void;
  onCancel: () => void;
  danger?: boolean;
};

export function ConfirmDialog({
  open,
  title,
  message,
  confirmLabel = "Confirm",
  onConfirm,
  onCancel,
  danger = false,
}: Props) {
  return (
    <Modal open={open} onClose={onCancel} title={title}>
      <p className="text-sm leading-relaxed text-zinc-400">{message}</p>

      <div className="mt-6 flex justify-end gap-3">
        <button
          type="button"
          onClick={onCancel}
          className="border border-zinc-700 bg-zinc-950 px-5 py-2.5 font-mono text-[10px] font-bold uppercase tracking-[0.12em] text-zinc-300 transition-colors hover:border-zinc-600 hover:text-white"
        >
          Cancel
        </button>
        <button
          type="button"
          onClick={onConfirm}
          className={`px-5 py-2.5 font-mono text-[10px] font-bold uppercase tracking-[0.12em] text-white transition-colors ${
            danger
              ? "bg-red-600 hover:bg-red-700"
              : "bg-zinc-700 hover:bg-zinc-600"
          }`}
        >
          {confirmLabel}
        </button>
      </div>
    </Modal>
  );
}
