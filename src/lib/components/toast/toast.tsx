import React, {
  createContext, useContext, useCallback, useReducer, useEffect, useRef,
} from "react";
import { createPortal } from "react-dom";

/* ── Types ───────────────────────────────────────────────────────────────── */
export type ToastVariant = "info" | "success" | "warning" | "danger";
export type ToastPosition = "top-right" | "top-left" | "top-center" | "bottom-right" | "bottom-left" | "bottom-center";

export interface ToastItem {
  id: string;
  title?: string;
  message: string;
  variant?: ToastVariant;
  duration?: number; // ms — 0 = persistent
}

interface ToastState { toasts: ToastItem[] }
type ToastAction =
  | { type: "ADD"; toast: ToastItem }
  | { type: "REMOVE"; id: string };

const ICONS: Record<ToastVariant, string> = {
  info: "ℹ", success: "✓", warning: "⚠", danger: "✕",
};

/* ── Context ─────────────────────────────────────────────────────────────── */
interface ToastCtx {
  toast: (item: Omit<ToastItem, "id">) => string;
  dismiss: (id: string) => void;
}
const ToastContext = createContext<ToastCtx | null>(null);

function reducer(state: ToastState, action: ToastAction): ToastState {
  switch (action.type) {
    case "ADD":    return { toasts: [...state.toasts, action.toast] };
    case "REMOVE": return { toasts: state.toasts.filter((t) => t.id !== action.id) };
  }
}

/* ── Provider ────────────────────────────────────────────────────────────── */
export interface ToastProviderProps {
  children: React.ReactNode;
  position?: ToastPosition;
  defaultDuration?: number;
}

export const ToastProvider: React.FC<ToastProviderProps> = ({
  children,
  position = "top-right",
  defaultDuration = 4000,
}) => {
  const [state, dispatch] = useReducer(reducer, { toasts: [] });

  const toast = useCallback((item: Omit<ToastItem, "id">): string => {
    const id = Math.random().toString(36).slice(2);
    dispatch({ type: "ADD", toast: { ...item, id, duration: item.duration ?? defaultDuration } });
    return id;
  }, [defaultDuration]);

  const dismiss = useCallback((id: string) => {
    dispatch({ type: "REMOVE", id });
  }, []);

  return (
    <ToastContext.Provider value={{ toast, dismiss }}>
      {children}
      {createPortal(
        <div className={`jowa-toast-region jowa-toast-region--${position}`} aria-live="polite" aria-atomic="false">
          {state.toasts.map((t) => (
            <ToastCard key={t.id} item={t} onDismiss={dismiss} />
          ))}
        </div>,
        document.body,
      )}
    </ToastContext.Provider>
  );
};

/* ── Individual toast card ───────────────────────────────────────────────── */
const ToastCard: React.FC<{ item: ToastItem; onDismiss: (id: string) => void }> = ({ item, onDismiss }) => {
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (item.duration && item.duration > 0) {
      timerRef.current = setTimeout(() => onDismiss(item.id), item.duration);
    }
    return () => { if (timerRef.current) clearTimeout(timerRef.current); };
  }, [item.id, item.duration, onDismiss]);

  const variant = item.variant ?? "info";

  return (
    <div
      className={`jowa-toast jowa-toast--${variant}`}
      role="alert"
      aria-live="assertive"
    >
      <span className="jowa-toast__icon" aria-hidden="true">{ICONS[variant]}</span>
      <div className="jowa-toast__body">
        {item.title && <p className="jowa-toast__title">{item.title}</p>}
        <p className="jowa-toast__message">{item.message}</p>
      </div>
      <button
        className="jowa-toast__close"
        onClick={() => onDismiss(item.id)}
        aria-label="Dismiss notification"
      >
        ✕
      </button>
    </div>
  );
};

/* ── Hook ────────────────────────────────────────────────────────────────── */
export function useToast(): ToastCtx {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error("useToast must be used inside <ToastProvider>");
  return ctx;
}

ToastProvider.displayName = "ToastProvider";
