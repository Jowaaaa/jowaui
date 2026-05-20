import React, { useRef, useEffect, useState, useId } from "react";
import "./popover.css";

export type PopoverPlacement = "top" | "bottom" | "left" | "right";

export interface PopoverProps {
  /** The trigger element */
  trigger: React.ReactElement;
  /** Popover content */
  children: React.ReactNode;
  placement?: PopoverPlacement;
  /** Open state (controlled) */
  open?: boolean;
  /** Default open state (uncontrolled) */
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  className?: string;
}

export const Popover: React.FC<PopoverProps> = ({
  trigger, children, placement = "bottom", open: controlledOpen,
  defaultOpen = false, onOpenChange, className,
}) => {
  const isControlled = controlledOpen !== undefined;
  const [uncontrolledOpen, setUncontrolledOpen] = useState(defaultOpen);
  const open = isControlled ? controlledOpen : uncontrolledOpen;
  const id = useId();

  const wrapperRef = useRef<HTMLDivElement>(null);

  const toggle = () => {
    const next = !open;
    if (!isControlled) setUncontrolledOpen(next);
    onOpenChange?.(next);
  };

  const close = () => {
    if (!isControlled) setUncontrolledOpen(false);
    onOpenChange?.(false);
  };

  // Close on outside click
  useEffect(() => {
    if (!open) return;
    const handler = (e: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) close();
    };
    const escape = (e: KeyboardEvent) => { if (e.key === "Escape") close(); };
    document.addEventListener("mousedown", handler);
    document.addEventListener("keydown", escape);
    return () => {
      document.removeEventListener("mousedown", handler);
      document.removeEventListener("keydown", escape);
    };
  }, [open]);

  const triggerEl = React.cloneElement(trigger, {
    "aria-expanded": open,
    "aria-controls": id,
    onClick: (e: React.MouseEvent) => {
      trigger.props.onClick?.(e);
      toggle();
    },
  });

  return (
    <div ref={wrapperRef} className={`jowa-popover-wrapper${className ? ` ${className}` : ""}`}>
      {triggerEl}
      {open && (
        <div
          id={id}
          role="dialog"
          className={`jowa-popover jowa-popover--${placement}`}
        >
          {children}
        </div>
      )}
    </div>
  );
};

Popover.displayName = "Popover";
