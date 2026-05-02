interface DeleteModalProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export function DeleteModal({ open, onClose, onConfirm }: DeleteModalProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4 py-8">
      <div className="w-full max-w-md rounded-[2rem] border border-white/10 bg-slate-950/95 p-6 shadow-2xl shadow-black/40 backdrop-blur-2xl text-white">
        <div className="mb-5">
          <p className="text-xs uppercase tracking-[0.3em] text-cyan-300/80 mb-2">Delete confirmation</p>
          <h2 className="text-2xl font-semibold">Are you sure you want to delete this item?</h2>
          <p className="mt-3 text-sm text-slate-400">This action cannot be undone. The item will be permanently removed from your link wallet.</p>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row sm:justify-end">
          <button
            onClick={onClose}
            className="w-full sm:w-auto rounded-3xl border border-slate-700 bg-slate-900/90 px-5 py-3 text-sm font-semibold text-slate-100 transition hover:bg-slate-800"
          >
            Cancel
          </button>

          <button
            onClick={onConfirm}
            className="w-full sm:w-auto rounded-3xl bg-gradient-to-r from-rose-500 via-fuchsia-500 to-pink-500 px-5 py-3 text-sm font-semibold text-white shadow-xl shadow-rose-500/20 transition hover:from-rose-400 hover:via-fuchsia-400 hover:to-pink-400"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}