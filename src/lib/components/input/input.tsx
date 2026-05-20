import React from "react";
import "./input.css";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  hint?: string;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, hint, id, className = "", ...props }, ref) => {
    const inputId = id ?? (label ? label.toLowerCase().replace(/\s+/g, "-") : undefined);
    const inputClasses = ["jowa-input", error ? "jowa-input--error" : "", className]
      .filter(Boolean)
      .join(" ");

    return (
      <div className="jowa-input-wrapper">
        {label && (
          <label htmlFor={inputId} className="jowa-input-label">
            {label}
          </label>
        )}
        <input ref={ref} id={inputId} className={inputClasses} {...props} />
        {error && <p className="jowa-input-error">{error}</p>}
        {!error && hint && <p className="jowa-input-hint">{hint}</p>}
      </div>
    );
  }
);

Input.displayName = "Input";
