import React, { useEffect, useCallback } from "react";
import { createPortal } from "react-dom";

export interface ModalProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  className?: string;
  closeOnOverlayClick?: boolean;
  showCloseButton?: boolean;
}

export const Modal: React.FC<ModalProps> = ({
  open,
  onClose,
  title,
  children,
  className = "",
  closeOnOverlayClick = true,
  showCloseButton = true,
}) => {
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    },
    [onClose]
  );

  useEffect(() => {
    if (!open) return;
    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [open, handleKeyDown]);

  if (!open) return null;

  return createPortal(
    <div
      className="jowa-modal-overlay"
      onClick={closeOnOverlayClick ? onClose : undefined}
      role="dialog"
      aria-modal="true"
      aria-labelledby={title ? "jowa-modal-title" : undefined}
    >
      <div
        className={["jowa-modal", className].filter(Boolean).join(" ")}
        onClick={(e) => e.stopPropagation()}
      >
        {showCloseButton && (
          <button
            className="jowa-modal__close"
            onClick={onClose}
            aria-label="Close modal"
          >
            ✕
          </button>
        )}
        {title && (
          <h2 id="jowa-modal-title" className="jowa-modal__title">
            {title}
          </h2>
        )}
        {children}
      </div>
    </div>,
    document.body
  );
};

Modal.displayName = "Modal";
