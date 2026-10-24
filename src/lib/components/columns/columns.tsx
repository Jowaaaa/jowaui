import React from "react";

export interface ColumnsProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Number of columns in the layout. */
  count?: number;
  /** Gap between columns. */
  gap?: string;
}

export const Columns: React.FC<ColumnsProps> = ({ count = 3, gap = "24px", className = "", children, style, ...props }) => {
  const safeCount = Math.max(1, Math.min(6, Number(count) || 1));
  const classes = ["jowa-columns", className].filter(Boolean).join(" ");

  return (
    <div className={classes} style={{ ...style, gridTemplateColumns: `repeat(${safeCount}, minmax(0, 1fr))`, gap }} {...props}>
      {children}
    </div>
  );
};

Columns.displayName = "Columns";

export const Column: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ className = "", children, ...props }) => (
  <div className={["jowa-column", className].filter(Boolean).join(" ")} {...props}>{children}</div>
);

Column.displayName = "Column";
