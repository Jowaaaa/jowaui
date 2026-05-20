import React from "react";
import "./spinner.css";

export type SpinnerSize = "sm" | "md" | "lg";

export interface SpinnerProps {
  size?: SpinnerSize;
  label?: string;
  className?: string;
}

export const Spinner: React.FC<SpinnerProps> = ({
  size = "md",
  label = "Loading…",
  className = "",
}) => {
  const classes = ["jowa-spinner", `jowa-spinner--${size}`, className]
    .filter(Boolean)
    .join(" ");

  return (
    <span role="status" aria-label={label} className={classes}>
      <span className="jowa-spinner__ring" aria-hidden="true" />
      <span className="jowa-sr-only">{label}</span>
    </span>
  );
};

Spinner.displayName = "Spinner";
