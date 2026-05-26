import React, { useEffect, useRef, useCallback } from "react";
import { createPortal } from "react-dom";

export type ConfirmDialogVariant = "danger" | "warning" | "default";

export interface ConfirmDialogProps {
  open: boolean;
  onConfirm: () => void;
  onCancel: () => void;
  title: string;
  description?: string;
  confirmLabel?: string;
  cancelLabel?: string;
  variant?: ConfirmDialogVariant;
  className?: string;
}

const DangerIcon: React.FC = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <circle cx="12" cy="12" r="10" fill="currentColor" opacity="0.15" />
    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.5" />
    <path d="M12 7v5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    <circle cx="12" cy="16.5" r="1" fill="currentColor" />
  </svg>
);

const WarningIcon: React.FC = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" fill="currentColor" opacity="0.15" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
    <path d="M12 9v4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    <circle cx="12" cy="16.5" r="1" fill="currentColor" />
  </svg>
);

const InfoIcon: React.FC = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <circle cx="12" cy="12" r="10" fill="currentColor" opacity="0.15" />
    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.5" />
    <path d="M12 11v5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    <circle cx="12" cy="7.5" r="1" fill="currentColor" />
  </svg>
);

const ICONS: Record<ConfirmDialogVariant, React.FC> = {
  danger: DangerIcon,
  warning: WarningIcon,
  default: InfoIcon,
};

export const ConfirmDialog = React.forwardRef<HTMLDivElement, ConfirmDialogProps>(
  (
    {
      open,
      onConfirm,
      onCancel,
      title,
      description,
      confirmLabel = "Confirm",
      cancelLabel = "Cancel",
      variant = "default",
      className,
    },
    ref
  ) => {
    const cancelRef = useRef<HTMLButtonElement>(null);
    const confirmRef = useRef<HTMLButtonElement>(null);

    const handleKeyDown = useCallback(
      (e: KeyboardEvent) => {
        if (e.key === "Escape") {
          onCancel();
          return;
        }
        if (e.key === "Tab") {
          e.preventDefault();
          const focused = document.activeElement;
          if (focused === cancelRef.current) {
            confirmRef.current?.focus();
          } else {
            cancelRef.current?.focus();
          }
        }
      },
      [onCancel]
    );

    useEffect(() => {
      if (!open) return;
      cancelRef.current?.focus();
      document.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
      return () => {
        document.removeEventListener("keydown", handleKeyDown);
        document.body.style.overflow = "";
      };
    }, [open, handleKeyDown]);

    if (!open) return null;

    const Icon = ICONS[variant];

    const panelClasses = [
      "jowa-confirmdialog__panel",
      `jowa-confirmdialog--${variant}`,
      className,
    ]
      .filter(Boolean)
      .join(" ");

    const confirmBtnClasses = [
      "jowa-btn",
      variant === "danger"
        ? "jowa-btn--danger"
        : variant === "warning"
        ? "jowa-btn--warning"
        : "jowa-btn--primary",
      "jowa-btn--md",
    ].join(" ");

    return createPortal(
      <div
        className="jowa-confirmdialog"
        role="alertdialog"
        aria-modal="true"
        aria-labelledby="jowa-confirmdialog-title"
        aria-describedby={description ? "jowa-confirmdialog-desc" : undefined}
        onClick={onCancel}
      >
        <div
          ref={ref}
          className={panelClasses}
          onClick={(e: React.MouseEvent) => e.stopPropagation()}
        >
          <div className="jowa-confirmdialog__icon">
            <Icon />
          </div>
          <h2 id="jowa-confirmdialog-title" className="jowa-confirmdialog__title">
            {title}
          </h2>
          {description && (
            <p id="jowa-confirmdialog-desc" className="jowa-confirmdialog__description">
              {description}
            </p>
          )}
          <div className="jowa-confirmdialog__actions">
            <button
              ref={cancelRef}
              className="jowa-btn jowa-btn--outline jowa-btn--md"
              onClick={onCancel}
            >
              {cancelLabel}
            </button>
            <button
              ref={confirmRef}
              className={confirmBtnClasses}
              onClick={onConfirm}
            >
              {confirmLabel}
            </button>
          </div>
        </div>
      </div>,
      document.body
    );
  }
);

ConfirmDialog.displayName = "ConfirmDialog";
