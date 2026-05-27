import React from "react";

export type BadgeVariant = "primary" | "success" | "warning" | "danger" | "neutral";

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  /** Color variant applied to the badge (default: "neutral") */
  variant?: BadgeVariant;
}

export const Badge: React.FC<BadgeProps> = ({
  variant = "neutral",
  className = "",
  children,
  ...props
}) => {
  const classes = ["jowa-badge", `jowa-badge--${variant}`, className]
    .filter(Boolean)
    .join(" ");

  return (
    <span className={classes} {...props}>
      {children}
    </span>
  );
};

Badge.displayName = "Badge";
