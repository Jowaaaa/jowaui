import React, { useId } from "react";
import "./switch.css";

export interface SwitchProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type" | "size"> {
  label?: string;
  hint?: string;
  labelPosition?: "left" | "right";
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
