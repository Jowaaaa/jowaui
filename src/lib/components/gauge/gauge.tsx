import React from "react";
import "./gauge.css";

export interface GaugeProps {
  /** Value between 0 and max */
  value: number;
  /** Maximum value (default: 100) */
  max?: number;
  /** Size in px (default: 120) */
  size?: number;
  /** Stroke width (default: 10) */
  strokeWidth?: number;
  /** Label shown in center */
  label?: string;
  /** Color variant */
  variant?: "primary" | "success" | "warning" | "danger";
  className?: string;
}

export const Gauge: React.FC<GaugeProps> = ({
  value,
  max = 100,
  size = 120,
  strokeWidth = 10,
  label,
  variant = "primary",
  className,
}) => {
  const pct = Math.max(0, Math.min(1, value / max));
  const r = (size - strokeWidth) / 2;
  const cx = size / 2;
  const cy = size / 2;

  // Gauge spans 270° starting from 135° (bottom-left → bottom-right)
  const startAngle = 135;
  const sweepAngle = 270;
  const circumference = Math.PI * 2 * r;
  const arcLen = (sweepAngle / 360) * circumference;
  const fillLen = pct * arcLen;

  const toRad = (deg: number) => (deg * Math.PI) / 180;
  const startX = cx + r * Math.cos(toRad(startAngle));
  const startY = cy + r * Math.sin(toRad(startAngle));
  const endAngle = startAngle + sweepAngle;
  const endX = cx + r * Math.cos(toRad(endAngle));
  const endY = cy + r * Math.sin(toRad(endAngle));

  const describeArc = (sweep: number) => {
    if (sweep <= 0) return "";
    const a = Math.min(sweep, 359.99);
    const ex = cx + r * Math.cos(toRad(startAngle + a));
    const ey = cy + r * Math.sin(toRad(startAngle + a));
    const lg = a > 180 ? 1 : 0;
    return `M ${startX.toFixed(2)} ${startY.toFixed(2)} A ${r} ${r} 0 ${lg} 1 ${ex.toFixed(2)} ${ey.toFixed(2)}`;
  };

  const displayPct = Math.round(pct * 100);

  return (
    <span
      className={`jowa-gauge jowa-gauge--${variant}${className ? ` ${className}` : ""}`}
      role="meter"
      aria-valuenow={value}
      aria-valuemin={0}
      aria-valuemax={max}
      aria-label={label ?? `${displayPct}%`}
    >
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        {/* Track */}
        <path
          className="jowa-gauge__track"
          d={describeArc(sweepAngle)}
          strokeWidth={strokeWidth}
          fill="none"
          strokeLinecap="round"
        />
        {/* Fill */}
        {pct > 0 && (
          <path
            className="jowa-gauge__fill"
            d={describeArc(pct * sweepAngle)}
            strokeWidth={strokeWidth}
            fill="none"
            strokeLinecap="round"
          />
        )}
        {/* Center text */}
        <text className="jowa-gauge__value" x={cx} y={cy} textAnchor="middle" dominantBaseline="middle">
          {displayPct}%
        </text>
        {label && (
          <text className="jowa-gauge__label" x={cx} y={cy + 16} textAnchor="middle" dominantBaseline="middle">
            {label}
          </text>
        )}
      </svg>
    </span>
  );
};

Gauge.displayName = "Gauge";
