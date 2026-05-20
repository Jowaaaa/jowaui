import React from "react";
import "./sparkline.css";

export interface SparklineProps {
  /** Data values to plot */
  data: number[];
  /** Width of the SVG */
  width?: number;
  /** Height of the SVG */
  height?: number;
  /** Show a filled area under the line */
  filled?: boolean;
  /** Color — defaults to primary token */
  color?: string;
  /** Show a dot on the last data point */
  showLastDot?: boolean;
  className?: string;
}

function normalize(values: number[], width: number, height: number) {
  const min = Math.min(...values);
  const max = Math.max(...values);
  const range = max - min || 1;
  const pad = 3;
  return values.map((v, i) => ({
    x: (i / (values.length - 1)) * (width - pad * 2) + pad,
    y: height - pad - ((v - min) / range) * (height - pad * 2),
  }));
}

export const Sparkline: React.FC<SparklineProps> = ({
  data,
  width = 120,
  height = 36,
  filled = true,
  color,
  showLastDot = true,
  className,
}) => {
  if (!data || data.length < 2) return null;

  const pts = normalize(data, width, height);
  const linePath = pts.map((p, i) => `${i === 0 ? "M" : "L"} ${p.x.toFixed(2)} ${p.y.toFixed(2)}`).join(" ");
  const areaPath = `${linePath} L ${pts[pts.length - 1].x.toFixed(2)} ${height} L ${pts[0].x.toFixed(2)} ${height} Z`;
  const last = pts[pts.length - 1];

  const colorStyle = color ? { "--jowa-sparkline-color": color } as React.CSSProperties : undefined;

  return (
    <svg
      className={`jowa-sparkline${className ? ` ${className}` : ""}`}
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      aria-hidden="true"
      style={colorStyle}
    >
      {filled && (
        <path className="jowa-sparkline__area" d={areaPath} />
      )}
      <path className="jowa-sparkline__line" d={linePath} />
      {showLastDot && (
        <circle className="jowa-sparkline__dot" cx={last.x} cy={last.y} r={3} />
      )}
    </svg>
  );
};

Sparkline.displayName = "Sparkline";
