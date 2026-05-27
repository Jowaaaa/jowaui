import React from "react";

export interface SkeletonProps {
  /** Shape variant */
  variant?: "text" | "rect" | "circle";
  /** CSS width of the skeleton (number treated as px) */
  width?: string | number;
  /** CSS height of the skeleton (number treated as px) */
  height?: string | number;
  /** Number of text lines to render */
  lines?: number;
  /** Additional CSS class applied to the skeleton element */
  className?: string;
}

export const Skeleton: React.FC<SkeletonProps> = ({
  variant = "rect",
  width,
  height,
  lines = 1,
  className,
}) => {
  if (variant === "text" && lines > 1) {
    return (
      <div className={`jowa-skeleton-lines${className ? ` ${className}` : ""}`}>
        {Array.from({ length: lines }).map((_, i) => (
          <span
            key={i}
            className="jowa-skeleton jowa-skeleton--text"
            style={{ width: i === lines - 1 ? "72%" : "100%" }}
            aria-hidden="true"
          />
        ))}
      </div>
    );
  }

  const style: React.CSSProperties = {};
  if (width)  style.width  = typeof width  === "number" ? `${width}px`  : width;
  if (height) style.height = typeof height === "number" ? `${height}px` : height;

  return (
    <span
      className={`jowa-skeleton jowa-skeleton--${variant}${className ? ` ${className}` : ""}`}
      style={style}
      aria-hidden="true"
    />
  );
};

Skeleton.displayName = "Skeleton";
