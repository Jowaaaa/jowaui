import React, { useEffect, useCallback } from "react";
import { createPortal } from "react-dom";

export interface ModalProps {
  /** Controls modal visibility */
  open: boolean;
  /** Callback fired when the modal should close (Escape key, overlay click, or close button) */
  onClose: () => void;
  /** Optional title rendered in the modal header */
  title?: string;
  /** Modal body content */
  children: React.ReactNode;
  /** Additional CSS class applied to the modal panel */
  className?: string;
  /** Close the modal when the overlay backdrop is clicked (default: true) */
  closeOnOverlayClick?: boolean;
  /** Render the × close button in the top-right corner (default: true) */
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
