import { createContext, useCallback, useContext, useState } from "react";
import type { ReactNode } from "react";
type SoonerToastType = "success" | "error" | "warning" | "info";

interface SoonerToast {
  id: string;
  type: SoonerToastType;
  message: string;
}

interface SoonerToastContextValue {
  showToast: (message: string, type?: SoonerToastType) => void;
}

const SoonerToastContext = createContext<SoonerToastContextValue | null>(null);

export function SoonerToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<SoonerToast[]>([]);

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  }, []);

  const showToast = useCallback((message: string, type: SoonerToastType = "success") => {
    const id = `${Date.now()}-${Math.random().toString(16).slice(2)}`;
    setToasts((prev) => [{ id, type, message }, ...prev]);

    window.setTimeout(() => {
      removeToast(id);
    }, 3200);
  }, [removeToast]);

  return (
    <SoonerToastContext.Provider value={{ showToast }}>
      {children}

      <div className="fixed inset-x-0 top-5 z-50 flex justify-center px-4 pointer-events-none">
        <div className="w-full max-w-xl flex flex-col gap-3">
          {toasts.map((toast) => (
            <div
              key={toast.id}
              className={`pointer-events-auto rounded-3xl border px-5 py-4 shadow-2xl backdrop-blur-xl bg-slate-950/95 border-white/10 text-white flex items-start gap-4 transition duration-300 ease-out ${
                toast.type === "success"
                  ? "border-emerald-400/30 bg-emerald-500/10"
                  : toast.type === "error"
                  ? "border-rose-400/30 bg-rose-500/10"
                  : toast.type === "warning"
                  ? "border-amber-400/30 bg-amber-500/10"
                  : "border-sky-400/30 bg-sky-500/10"
              }`}
            >
              <div className="space-y-1 flex-1">
                <p className="text-[11px] uppercase tracking-[0.3em] text-slate-400">
                  {toast.type}
                </p>
                <p className="text-sm font-medium text-slate-100">{toast.message}</p>
              </div>
              <button
                type="button"
                onClick={() => removeToast(toast.id)}
                className="text-slate-300 hover:text-white"
              >
                ✕
              </button>
            </div>
          ))}
        </div>
      </div>
    </SoonerToastContext.Provider>
  );
}

export function useSoonerToast() {
  const context = useContext(SoonerToastContext);
  if (!context) {
    throw new Error("useSoonerToast must be used within a SoonerToastProvider");
  }
  return context;
}
