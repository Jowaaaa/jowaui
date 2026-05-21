import React from "react";

export interface StatCardProps {
  /** Main metric label */
  label: string;
  /** Primary value to display */
  value: string | number;
  /** Optional secondary unit or description */
  unit?: string;
  /** Change indicator (e.g. "+12%" or "-3.4%") */
  change?: string;
  /** Direction of the change */
  trend?: "up" | "down" | "neutral";
  /** Icon or visual element in the top-right slot */
  icon?: React.ReactNode;
  /** Inline chart slot (e.g. <Sparkline />) */
  chart?: React.ReactNode;
  className?: string;
}

const TREND_ICONS = {
  up:      "↑",
  down:    "↓",
  neutral: "→",
} as const;

export const StatCard: React.FC<StatCardProps> = ({
  label,
  value,
  unit,
  change,
  trend = "neutral",
  icon,
  chart,
  className,
}) => (
  <div className={`jowa-statcard${className ? ` ${className}` : ""}`}>
    <div className="jowa-statcard__header">
      <span className="jowa-statcard__label">{label}</span>
      {icon && <span className="jowa-statcard__icon">{icon}</span>}
    </div>

    <div className="jowa-statcard__value-row">
      <span className="jowa-statcard__value">{value}</span>
      {unit && <span className="jowa-statcard__unit">{unit}</span>}
    </div>

    <div className="jowa-statcard__footer">
      {change && (
        <span className={`jowa-statcard__change jowa-statcard__change--${trend}`}>
          <span className="jowa-statcard__trend-icon" aria-hidden="true">{TREND_ICONS[trend]}</span>
          {change}
        </span>
      )}
      {chart && <span className="jowa-statcard__chart">{chart}</span>}
    </div>
  </div>
);

StatCard.displayName = "StatCard";
