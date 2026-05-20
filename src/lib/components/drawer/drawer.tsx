import React, { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import "./drawer.css";

export type DrawerSide = "left" | "right" | "top" | "bottom";

export interface DrawerProps {
  open: boolean;
  onClose: () => void;
  side?: DrawerSide;
  title?: string;
  width?: string;
  height?: string;
  children: React.ReactNode;
  className?: string;
}

export const Drawer: React.FC<DrawerProps> = ({
  open, onClose, side = "right", title, width, height, children, className,
}) => {
  const drawerRef = useRef<HTMLDivElement>(null);

  // Escape key
  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [open, onClose]);

  // Body scroll lock
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  // Focus trap
  useEffect(() => {
    if (open) drawerRef.current?.focus();
  }, [open]);

  if (!open) return null;

  const sizeStyle: React.CSSProperties = {};
  if (width  && (side === "left"  || side === "right"))  sizeStyle.width  = width;
  if (height && (side === "top"   || side === "bottom"))  sizeStyle.height = height;

  return createPortal(
    <div className="jowa-drawer-overlay" onClick={onClose} aria-hidden="true">
      <div
        ref={drawerRef}
        className={`jowa-drawer jowa-drawer--${side}${className ? ` ${className}` : ""}`}
        style={sizeStyle}
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-label={title}
        tabIndex={-1}
      >
        <div className="jowa-drawer__header">
          {title && <h2 className="jowa-drawer__title">{title}</h2>}
          <button className="jowa-drawer__close" onClick={onClose} aria-label="Close drawer">✕</button>
        </div>
        <div className="jowa-drawer__body">{children}</div>
      </div>
    </div>,
    document.body,
  );
};

Drawer.displayName = "Drawer";
