import React, { useId } from "react";

export interface SwitchProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type" | "size"> {
  /** Visible label text rendered next to the toggle */
  label?: string;
  /** Helper text shown below the switch */
  hint?: string;
  /** Side on which the label is rendered relative to the toggle (default: "right") */
  labelPosition?: "left" | "right";
  /** Size variant controlling the toggle dimensions (default: "md") */
  size?: "sm" | "md" | "lg";
}

export const Switch = React.forwardRef<HTMLInputElement, SwitchProps>(
  ({ label, hint, labelPosition = "right", size = "md", className, id, ...props }, ref) => {
    const autoId = useId();
    const inputId = id ?? autoId;

    return (
      <div className={`jowa-switch-wrapper${className ? ` ${className}` : ""}`}>
        <label className={`jowa-switch-label jowa-switch-label--${labelPosition}`} htmlFor={inputId}>
          {label && labelPosition === "left" && (
            <span className="jowa-switch-text">{label}</span>
          )}
          <span className={`jowa-switch jowa-switch--${size}`}>
            <input
              ref={ref}
              type="checkbox"
              role="switch"
              id={inputId}
              className="jowa-switch__input"
              {...props}
            />
            <span className="jowa-switch__track" aria-hidden="true">
              <span className="jowa-switch__thumb" />
            </span>
          </span>
          {label && labelPosition === "right" && (
            <span className="jowa-switch-text">{label}</span>
          )}
        </label>
        {hint && <p className="jowa-switch-hint">{hint}</p>}
      </div>
    );
  }
);

Switch.displayName = "Switch";
