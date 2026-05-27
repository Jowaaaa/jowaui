import React from "react";

export interface DividerProps {
  /** Optional text label centered on a horizontal divider */
  label?: string;
  /** Layout direction of the divider (default: "horizontal") */
  orientation?: "horizontal" | "vertical";
  /** Additional CSS class applied to the divider element */
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
