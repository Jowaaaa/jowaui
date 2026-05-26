import React, { useState } from "react";

export interface SidebarItem {
  label: string;
  href?: string;
  icon?: React.ReactNode;
  active?: boolean;
  onClick?: () => void;
}

export interface SidebarGroup {
  heading?: string;
  items: SidebarItem[];
}

export interface SidebarProps {
  groups: SidebarGroup[];
  header?: React.ReactNode;
  footer?: React.ReactNode;
  collapsed?: boolean;
  defaultCollapsed?: boolean;
  onCollapsedChange?: (collapsed: boolean) => void;
  className?: string;
}

export const Sidebar: React.FC<SidebarProps> = ({
  groups,
  header,
  footer,
  collapsed: collapsedProp,
  defaultCollapsed = false,
  onCollapsedChange,
  className = "",
}) => {
  const [internalCollapsed, setInternalCollapsed] = useState(defaultCollapsed);

  const isControlled = collapsedProp !== undefined;
  const collapsed = isControlled ? collapsedProp : internalCollapsed;

  const toggle = () => {
    const next = !collapsed;
    if (!isControlled) setInternalCollapsed(next);
    onCollapsedChange?.(next);
  };

  const classes = [
    "jowa-sidebar",
    collapsed ? "jowa-sidebar--collapsed" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <aside className={classes} aria-label="Sidebar navigation">
      <div className="jowa-sidebar__toggle-bar">
        <button
          className="jowa-sidebar__toggle"
          onClick={toggle}
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          title={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          <svg
            className="jowa-sidebar__toggle-icon"
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            aria-hidden="true"
          >
            {collapsed ? (
              <path d="M6 3l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            ) : (
              <path d="M10 3L5 8l5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            )}
          </svg>
        </button>
      </div>

      {header && <div className="jowa-sidebar__header">{header}</div>}

      <nav className="jowa-sidebar__nav">
        {groups.map((group, gi) => (
          <div key={gi} className="jowa-sidebar__group">
            {group.heading && !collapsed && (
              <p className="jowa-sidebar__group-heading">{group.heading}</p>
            )}
            <ul className="jowa-sidebar__list">
              {group.items.map((item, ii) => {
                const Tag = item.href ? "a" : "button";
                return (
                  <li key={ii}>
                    <Tag
                      href={item.href}
                      onClick={item.onClick}
                      className={[
                        "jowa-sidebar__item",
                        item.active ? "jowa-sidebar__item--active" : "",
                      ]
                        .filter(Boolean)
                        .join(" ")}
                      aria-current={item.active ? "page" : undefined}
                      title={collapsed ? item.label : undefined}
                    >
                      {item.icon && (
                        <span className="jowa-sidebar__icon">{item.icon}</span>
                      )}
                      {!collapsed && (
                        <span className="jowa-sidebar__label">{item.label}</span>
                      )}
                    </Tag>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </nav>

      {footer && <div className="jowa-sidebar__footer">{footer}</div>}
    </aside>
  );
};

Sidebar.displayName = "Sidebar";
