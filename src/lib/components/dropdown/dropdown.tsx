import React, { useState, useRef, useEffect } from "react";

export interface DropdownItem {
  label: string;
  href?: string;
  onClick?: () => void;
  disabled?: boolean;
  divider?: boolean;
}

export interface DropdownProps {
  trigger: React.ReactElement;
  items: DropdownItem[];
  align?: "left" | "right";
  className?: string;
}

export const Dropdown: React.FC<DropdownProps> = ({
  trigger,
  items,
  align = "left",
  className = "",
}) => {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, []);

  const clonedTrigger = React.cloneElement(trigger, {
    onClick: () => setOpen((o) => !o),
    "aria-haspopup": "true",
    "aria-expanded": open,
  });

  const classes = ["jowa-dropdown", className].filter(Boolean).join(" ");
  const menuClasses = [
    "jowa-dropdown__menu",
    `jowa-dropdown__menu--${align}`,
    open ? "jowa-dropdown__menu--open" : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={classes} ref={ref}>
      {clonedTrigger}
      <div className={menuClasses} role="menu">
        {items.map((item, i) => {
          if (item.divider) {
            return <hr key={i} className="jowa-dropdown__divider" />;
          }
          const Tag = item.href ? "a" : "button";
          return (
            <Tag
              key={i}
              role="menuitem"
              href={item.href}
              className={[
                "jowa-dropdown__item",
                item.disabled ? "jowa-dropdown__item--disabled" : "",
              ]
                .filter(Boolean)
                .join(" ")}
              onClick={() => {
                if (item.disabled) return;
                item.onClick?.();
                setOpen(false);
              }}
              tabIndex={item.disabled ? -1 : 0}
              aria-disabled={item.disabled}
            >
              {item.label}
            </Tag>
          );
        })}
      </div>
    </div>
  );
};

Dropdown.displayName = "Dropdown";
