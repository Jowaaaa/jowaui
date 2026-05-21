import React from "react";
import "./banner.css";

export type BannerVariant = "info" | "success" | "warning" | "danger";

export interface BannerProps {
  variant?: BannerVariant;
  children: React.ReactNode;
  action?: React.ReactNode;
  dismissible?: boolean;
  onDismiss?: () => void;
  className?: string;
}

const icons: Record<BannerVariant, string> = {
  info: "ℹ",
  success: "✓",
  warning: "⚠",
  danger: "✕",
};

export const Banner: React.FC<BannerProps> = ({
  variant = "info",
  children,
  action,
  dismissible = false,
  onDismiss,
  className = "",
}) => {
  const classes = ["jowa-banner", `jowa-banner--${variant}`, className]
    .filter(Boolean)
    .join(" ");

  return (
    <div role="status" aria-live="polite" className={classes}>
      <span className="jowa-banner-icon" aria-hidden="true">
        {icons[variant]}
      </span>
      <div className="jowa-banner-content">{children}</div>
      {action && <div className="jowa-banner-action">{action}</div>}
      {dismissible && (
        <button
          className="jowa-banner-dismiss"
          onClick={onDismiss}
          aria-label="Dismiss banner"
        >
          ✕
        </button>
      )}
    </div>
  );
};

Banner.displayName = "Banner";
