import React, { useId } from "react";
import "./textarea.css";

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  hint?: string;
  error?: string;
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
