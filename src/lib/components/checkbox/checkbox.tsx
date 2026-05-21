import React, { useId } from "react";

export interface CheckboxProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type"> {
  label?: string;
  hint?: string;
  error?: string;
  indeterminate?: boolean;
}

export const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  ({ label, hint, error, indeterminate, className, id, ...props }, ref) => {
    const autoId = useId();
    const inputId = id ?? autoId;

    const internalRef = React.useRef<HTMLInputElement>(null);
    const combinedRef = (node: HTMLInputElement | null) => {
      (internalRef as React.MutableRefObject<HTMLInputElement | null>).current = node;
      if (typeof ref === "function") ref(node);
      else if (ref) (ref as React.MutableRefObject<HTMLInputElement | null>).current = node;
    };

    React.useEffect(() => {
      if (internalRef.current) {
        internalRef.current.indeterminate = !!indeterminate;
      }
    }, [indeterminate]);

    return (
      <div className={`jowa-checkbox-wrapper${className ? ` ${className}` : ""}`}>
        <label className="jowa-checkbox-label" htmlFor={inputId}>
          <input
            ref={combinedRef}
            type="checkbox"
            id={inputId}
            className={`jowa-checkbox${error ? " jowa-checkbox--error" : ""}`}
            aria-invalid={!!error}
            aria-describedby={error ? `${inputId}-error` : hint ? `${inputId}-hint` : undefined}
            {...props}
          />
          <span className="jowa-checkbox-box" aria-hidden="true" />
          {label && <span className="jowa-checkbox-text">{label}</span>}
        </label>
        {error && <p id={`${inputId}-error`} className="jowa-checkbox-error">{error}</p>}
        {!error && hint && <p id={`${inputId}-hint`} className="jowa-checkbox-hint">{hint}</p>}
      </div>
    );
  }
);

Checkbox.displayName = "Checkbox";
