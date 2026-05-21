import React from "react";

export type AlertVariant = "info" | "success" | "warning" | "danger";

export interface AlertProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: AlertVariant;
  title?: string;
  onClose?: () => void;
}

const icons: Record<AlertVariant, string> = {
  info: "ℹ",
  success: "✓",
  warning: "⚠",
  danger: "✕",
};

export const Alert: React.FC<AlertProps> = ({
  variant = "info",
  title,
  onClose,
  children,
  className = "",
  ...props
}) => {
  const classes = ["jowa-alert", `jowa-alert--${variant}`, className]
    .filter(Boolean)
    .join(" ");

  return (
    <div role="alert" className={classes} {...props}>
      <span className="jowa-alert__icon" aria-hidden="true">
        {icons[variant]}
      </span>
      <div className="jowa-alert__content">
        {title && <p className="jowa-alert__title">{title}</p>}
        {children && <div className="jowa-alert__body">{children}</div>}
      </div>
      {onClose && (
        <button
          className="jowa-alert__close"
          onClick={onClose}
          aria-label="Dismiss alert"
        >
          ✕
        </button>
      )}
    </div>
  );
};

Alert.displayName = "Alert";
