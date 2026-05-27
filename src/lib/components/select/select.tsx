import React, { useId } from "react";

export interface SelectOption {
  /** Value submitted on selection */
  value: string;
  /** Human-readable label shown in the dropdown */
  label: string;
  /** Prevents the option from being selected when true */
  disabled?: boolean;
}

export interface SelectProps extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, "size"> {
  /** Visible label rendered above the select */
  label?: string;
  /** Helper text shown below the select when there is no error */
  hint?: string;
  /** Validation error message; applies error styling */
  error?: string;
  /** List of options to render */
  options: SelectOption[];
  /** Disabled placeholder option shown when no value is selected */
  placeholder?: string;
  /** Size variant controlling padding and font size (default: "md") */
  size?: "sm" | "md" | "lg";
}

export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ label, hint, error, options, placeholder, size = "md", className, id, ...props }, ref) => {
    const autoId = useId();
    const inputId = id ?? autoId;

    return (
      <div className={`jowa-select-wrapper${className ? ` ${className}` : ""}`}>
        {label && (
          <label className="jowa-select-label" htmlFor={inputId}>
            {label}
          </label>
        )}
        <div className="jowa-select-control">
          <select
            ref={ref}
            id={inputId}
            className={`jowa-select jowa-select--${size}${error ? " jowa-select--error" : ""}`}
            aria-invalid={!!error}
            aria-describedby={error ? `${inputId}-error` : hint ? `${inputId}-hint` : undefined}
            {...props}
          >
            {placeholder && (
              <option value="" disabled>
                {placeholder}
              </option>
            )}
            {options.map((opt) => (
              <option key={opt.value} value={opt.value} disabled={opt.disabled}>
                {opt.label}
              </option>
            ))}
          </select>
          <span className="jowa-select-chevron" aria-hidden="true">▾</span>
        </div>
        {error && <p id={`${inputId}-error`} className="jowa-select-error">{error}</p>}
        {!error && hint && <p id={`${inputId}-hint`} className="jowa-select-hint">{hint}</p>}
      </div>
    );
  }
);

Select.displayName = "Select";
