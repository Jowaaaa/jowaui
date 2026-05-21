import React from "react";
import "./datepicker.css";

export interface DatePickerProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type"> {
  label?: string;
  error?: string;
  hint?: string;
}

export const DatePicker = React.forwardRef<HTMLInputElement, DatePickerProps>(
  ({ label, error, hint, id, className = "", ...props }, ref) => {
    const inputId = id ?? (label ? label.toLowerCase().replace(/\s+/g, "-") : undefined);
    const inputClasses = ["jowa-datepicker", error ? "jowa-datepicker--error" : "", className]
      .filter(Boolean)
      .join(" ");

    return (
      <div className="jowa-datepicker-wrapper">
        {label && (
          <label htmlFor={inputId} className="jowa-datepicker-label">
            {label}
          </label>
        )}
        <input ref={ref} id={inputId} type="date" className={inputClasses} {...props} />
        {error && <p className="jowa-datepicker-error">{error}</p>}
        {!error && hint && <p className="jowa-datepicker-hint">{hint}</p>}
      </div>
    );
  }
);

DatePicker.displayName = "DatePicker";
