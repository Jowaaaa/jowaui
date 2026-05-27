import React from "react";

export type BannerVariant = "info" | "success" | "warning" | "danger";

export interface BannerProps {
  /** Visual style and icon variant (default: "info") */
  variant?: BannerVariant;
  /** Main banner message content */
  children: React.ReactNode;
  /** Optional action element (e.g. a button) rendered to the right of the content */
  action?: React.ReactNode;
  /** When true, renders a dismiss button (default: false) */
  dismissible?: boolean;
  /** Callback fired when the dismiss button is clicked */
  onDismiss?: () => void;
  /** Additional CSS class applied to the banner root */
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
