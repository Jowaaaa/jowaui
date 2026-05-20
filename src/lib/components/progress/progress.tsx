import React from "react";
import "./progress.css";

export type ProgressVariant = "primary" | "success" | "warning" | "danger";

export interface ProgressProps {
  value: number;
  max?: number;
  variant?: ProgressVariant;
  label?: string;
  showValue?: boolean;
  size?: "sm" | "md" | "lg";
  className?: string;
}

export const Progress: React.FC<ProgressProps> = ({
  value,
  max = 100,
  variant = "primary",
  label,
  showValue = false,
  size = "md",
  className = "",
}) => {
  const pct = Math.min(100, Math.max(0, (value / max) * 100));
  const classes = ["jowa-progress", `jowa-progress--${size}`, className]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={classes}>
      {(label || showValue) && (
        <div className="jowa-progress__header">
          {label && <span className="jowa-progress__label">{label}</span>}
          {showValue && (
            <span className="jowa-progress__value">{Math.round(pct)}%</span>
          )}
        </div>
      )}
      <div
        className="jowa-progress__track"
        role="progressbar"
        aria-valuenow={value}
        aria-valuemin={0}
        aria-valuemax={max}
        aria-label={label}
      >
        <div
          className={`jowa-progress__fill jowa-progress__fill--${variant}`}
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
};

Progress.displayName = "Progress";
