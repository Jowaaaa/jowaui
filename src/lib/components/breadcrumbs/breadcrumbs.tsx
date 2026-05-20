import React from "react";
import "./breadcrumbs.css";

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

export interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  separator?: React.ReactNode;
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
