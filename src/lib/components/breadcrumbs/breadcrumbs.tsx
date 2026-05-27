import React from "react";

export interface BreadcrumbItem {
  /** Display text for the breadcrumb link */
  label: string;
  /** Navigation URL; omit for the current (last) item */
  href?: string;
}

export interface BreadcrumbsProps {
  /** Ordered list of breadcrumb items from root to current page */
  items: BreadcrumbItem[];
  /** Element rendered between items (default: "/") */
  separator?: React.ReactNode;
  /** Additional CSS class applied to the nav element */
  className?: string;
}

export const Breadcrumbs: React.FC<BreadcrumbsProps> = ({
  items,
  separator = "/",
  className = "",
}) => {
  const classes = ["jowa-breadcrumbs", className].filter(Boolean).join(" ");

  return (
    <nav aria-label="Breadcrumb" className={classes}>
      <ol className="jowa-breadcrumbs__list">
        {items.map((item, i) => {
          const isLast = i === items.length - 1;
          return (
            <li key={i} className="jowa-breadcrumbs__item">
              {isLast ? (
                <span className="jowa-breadcrumbs__current" aria-current="page">
                  {item.label}
                </span>
              ) : (
                <>
                  <a href={item.href ?? "#"} className="jowa-breadcrumbs__link">
                    {item.label}
                  </a>
                  <span className="jowa-breadcrumbs__sep" aria-hidden="true">
                    {separator}
                  </span>
                </>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

Breadcrumbs.displayName = "Breadcrumbs";
