import React, { useId } from "react";

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  /** Visible label rendered above the textarea */
  label?: string;
  /** Helper text shown below the textarea when there is no error */
  hint?: string;
  /** Validation error message; applies error styling */
  error?: string;
  /** CSS resize behavior of the textarea (default: "vertical") */
  resize?: "none" | "vertical" | "horizontal" | "both";
}

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ label, hint, error, resize = "vertical", className, id, ...props }, ref) => {
    const autoId = useId();
    const inputId = id ?? autoId;

    return (
      <div className={`jowa-textarea-wrapper${className ? ` ${className}` : ""}`}>
        {label && (
          <label className="jowa-textarea-label" htmlFor={inputId}>
            {label}
          </label>
        )}
        <textarea
          ref={ref}
          id={inputId}
          className={`jowa-textarea${error ? " jowa-textarea--error" : ""}`}
          style={{ resize }}
          aria-invalid={!!error}
          aria-describedby={error ? `${inputId}-error` : hint ? `${inputId}-hint` : undefined}
          {...props}
        />
        {error && <p id={`${inputId}-error`} className="jowa-textarea-error">{error}</p>}
        {!error && hint && <p id={`${inputId}-hint`} className="jowa-textarea-hint">{hint}</p>}
      </div>
    );
  }
);

Textarea.displayName = "Textarea";
