import React, { useMemo } from "react";

export interface ChartDataPoint {
  label: string;
  value: number;
}

export interface ChartProps {
  data: ChartDataPoint[];
  type?: "bar" | "line";
  height?: number;
  color?: string;
  showGrid?: boolean;
  showLabels?: boolean;
  className?: string;
}

const PAD = { top: 16, right: 16, bottom: 32, left: 40 };

export const Chart: React.FC<ChartProps> = ({
  data,
  type = "bar",
  height = 220,
  color = "var(--jowa-color-primary)",
  showGrid = true,
  showLabels = true,
  className = "",
}) => {
  const width = 480;
  const innerW = width - PAD.left - PAD.right;
  const innerH = height - PAD.top - PAD.bottom;

  const max = useMemo(() => Math.max(...data.map((d) => d.value), 1), [data]);
  const gridLines = 4;

  const xStep = innerW / (data.length || 1);

  const points = data.map((d, i) => ({
    x: PAD.left + xStep * i + xStep / 2,
    y: PAD.top + innerH - (d.value / max) * innerH,
    value: d.value,
    label: d.label,
    barX: PAD.left + xStep * i + xStep * 0.15,
    barW: xStep * 0.7,
    barH: (d.value / max) * innerH,
  }));

  const polyline = points.map((p) => `${p.x},${p.y}`).join(" ");

  const classes = ["jowa-chart", className].filter(Boolean).join(" ");

  return (
    <div className={classes}>
      <svg
        viewBox={`0 0 ${width} ${height}`}
        preserveAspectRatio="xMidYMid meet"
        role="img"
        aria-label="Chart"
        style={{ width: "100%", height }}
      >
        {/* Grid */}
        {showGrid &&
          Array.from({ length: gridLines + 1 }).map((_, i) => {
            const y = PAD.top + (innerH / gridLines) * i;
            const val = Math.round(max - (max / gridLines) * i);
            return (
              <g key={i}>
                <line
                  x1={PAD.left}
                  y1={y}
                  x2={PAD.left + innerW}
                  y2={y}
                  className="jowa-chart__grid-line"
                />
                <text x={PAD.left - 6} y={y + 4} className="jowa-chart__axis-label" textAnchor="end">
                  {val}
                </text>
              </g>
            );
          })}

        {/* Bars */}
        {type === "bar" &&
          points.map((p, i) => (
            <rect
              key={i}
              x={p.barX}
              y={PAD.top + innerH - p.barH}
              width={p.barW}
              height={p.barH}
              fill={color}
              rx={3}
              className="jowa-chart__bar"
            />
          ))}

        {/* Line */}
        {type === "line" && (
          <>
            <polyline
              points={polyline}
              fill="none"
              stroke={color}
              strokeWidth={2.5}
              strokeLinejoin="round"
              strokeLinecap="round"
              className="jowa-chart__line"
            />
            {points.map((p, i) => (
              <circle
                key={i}
                cx={p.x}
                cy={p.y}
                r={4}
                fill={color}
                className="jowa-chart__dot"
              />
            ))}
          </>
        )}

        {/* X labels */}
        {showLabels &&
          points.map((p, i) => (
            <text
              key={i}
              x={p.x}
              y={PAD.top + innerH + 20}
              textAnchor="middle"
              className="jowa-chart__axis-label"
            >
              {p.label}
            </text>
          ))}
      </svg>
    </div>
  );
};

Chart.displayName = "Chart";
