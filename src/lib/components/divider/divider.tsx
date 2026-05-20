import React from "react";
import "./divider.css";

export interface DividerProps {
  label?: string;
  orientation?: "horizontal" | "vertical";
  className?: string;
}

export const Divider: React.FC<DividerProps> = ({
  label,
  orientation = "horizontal",
  className = "",
}) => {
  const classes = [
    "jowa-divider",
    `jowa-divider--${orientation}`,
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div role="separator" aria-orientation={orientation} className={classes}>
      {label && orientation === "horizontal" && (
        <span className="jowa-divider__label">{label}</span>
      )}
    </div>
  );
};

Divider.displayName = "Divider";
