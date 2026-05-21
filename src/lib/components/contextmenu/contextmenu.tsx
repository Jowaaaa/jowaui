import React, { useCallback, useEffect, useRef, useState } from "react";
import ReactDOM from "react-dom";

export interface ContextMenuItem {
  id: string;
  label: string;
  icon?: React.ReactNode;
  disabled?: boolean;
  danger?: boolean;
  separator?: never;
}

export interface ContextMenuSeparator {
  separator: true;
  id: string;
}

export type ContextMenuEntry = ContextMenuItem | ContextMenuSeparator;

export interface ContextMenuProps {
  items: ContextMenuEntry[];
  onSelect?: (id: string) => void;
  children: React.ReactNode;
  className?: string;
}

interface Position {
  x: number;
  y: number;
}

export const ContextMenu: React.FC<ContextMenuProps> = ({
  items,
  onSelect,
  children,
  className = "",
}) => {
  const [position, setPosition] = useState<Position | null>(null);
  const [focusedIndex, setFocusedIndex] = useState<number>(-1);
  const menuRef = useRef<HTMLUListElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const menuItems = items.filter(
    (item): item is ContextMenuItem => !("separator" in item && item.separator)
  );

  const interactiveItems = items.filter(
    (item): item is ContextMenuItem =>
      !("separator" in item && item.separator) && !item.disabled
  );

  const close = useCallback((): void => {
    setPosition(null);
    setFocusedIndex(-1);
  }, []);

  const handleContextMenu = useCallback(
    (e: React.MouseEvent): void => {
      e.preventDefault();
      // Clamp to viewport
      const menuWidth = 200;
      const menuHeight = items.length * 36;
      const x = Math.min(e.clientX, window.innerWidth - menuWidth - 8);
      const y = Math.min(e.clientY, window.innerHeight - menuHeight - 8);
      setPosition({ x, y });
      setFocusedIndex(0);
    },
    [items.length]
  );

  const handleSelect = useCallback(
    (id: string): void => {
      onSelect?.(id);
      close();
    },
    [onSelect, close]
  );

  // Close on outside click or scroll
  useEffect((): (() => void) => {
    if (!position) return () => undefined;

    const handleClick = (e: MouseEvent): void => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        close();
      }
    };
    const handleScroll = (): void => close();

    document.addEventListener("mousedown", handleClick);
    document.addEventListener("scroll", handleScroll, true);
    return (): void => {
      document.removeEventListener("mousedown", handleClick);
      document.removeEventListener("scroll", handleScroll, true);
    };
  }, [position, close]);

  // Focus first item when menu opens
  useEffect((): void => {
    if (position && menuRef.current) {
      const firstItem = menuRef.current.querySelector<HTMLElement>(
        '[role="menuitem"]:not([aria-disabled="true"])'
      );
      firstItem?.focus();
    }
  }, [position]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent): void => {
      if (!position) return;

      const navigable = items
        .map((item, i) => ({ item, i }))
        .filter(
          ({ item }) =>
            !("separator" in item && item.separator) &&
            !(item as ContextMenuItem).disabled
        );

      const currentNavIndex = navigable.findIndex(({ i }) => i === focusedIndex);

      if (e.key === "Escape") {
        e.preventDefault();
        close();
      } else if (e.key === "ArrowDown") {
        e.preventDefault();
        const next = navigable[(currentNavIndex + 1) % navigable.length];
        if (next) setFocusedIndex(next.i);
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        const prev =
          navigable[(currentNavIndex - 1 + navigable.length) % navigable.length];
        if (prev) setFocusedIndex(prev.i);
      } else if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        const focused = items[focusedIndex];
        if (
          focused &&
          !("separator" in focused && focused.separator) &&
          !(focused as ContextMenuItem).disabled
        ) {
          handleSelect((focused as ContextMenuItem).id);
        }
      }
    },
    [position, items, focusedIndex, close, handleSelect]
  );

  // Sync DOM focus when focusedIndex changes
  useEffect((): void => {
    if (!menuRef.current || focusedIndex < 0) return;
    const el = menuRef.current.querySelectorAll<HTMLElement>('[role="menuitem"]')[
      focusedIndex
    ];
    el?.focus();
  }, [focusedIndex]);

  const menu = position
    ? ReactDOM.createPortal(
        <ul
          ref={menuRef}
          role="menu"
          className="jowa-contextmenu"
          style={{ top: position.y, left: position.x }}
          onKeyDown={handleKeyDown}
        >
          {items.map((entry, i) => {
            if ("separator" in entry && entry.separator) {
              return (
                <li key={entry.id} role="separator" className="jowa-contextmenu-separator" />
              );
            }
            const item = entry as ContextMenuItem;
            const itemClasses = [
              "jowa-contextmenu-item",
              item.danger ? "jowa-contextmenu-item--danger" : "",
              item.disabled ? "jowa-contextmenu-item--disabled" : "",
            ]
              .filter(Boolean)
              .join(" ");

            return (
              <li key={item.id} role="none">
                <button
                  role="menuitem"
                  className={itemClasses}
                  aria-disabled={item.disabled}
                  tabIndex={item.disabled ? -1 : 0}
                  onClick={(): void => {
                    if (!item.disabled) handleSelect(item.id);
                  }}
                >
                  {item.icon && (
                    <span className="jowa-contextmenu-icon" aria-hidden="true">
                      {item.icon}
                    </span>
                  )}
                  {item.label}
                </button>
              </li>
            );
          })}
        </ul>,
        document.body
      )
    : null;

  void menuItems;
  void interactiveItems;

  return (
    <div
      ref={wrapperRef}
      className={className || undefined}
      onContextMenu={handleContextMenu}
    >
      {children}
      {menu}
    </div>
  );
};

ContextMenu.displayName = "ContextMenu";
