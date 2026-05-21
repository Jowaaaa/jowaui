import React, { useId, createContext, useContext } from "react";

/* ── Context for RadioGroup ────────────────────────────────────────────────── */
interface RadioGroupCtx {
  name: string;
  value?: string;
  onChange?: (value: string) => void;
}
const RadioGroupContext = createContext<RadioGroupCtx | null>(null);

/* ── RadioGroup ─────────────────────────────────────────────────────────────── */
export interface RadioGroupProps {
  name: string;
  value?: string;
  onChange?: (value: string) => void;
  label?: string;
  hint?: string;
  error?: string;
  orientation?: "vertical" | "horizontal";
  children: React.ReactNode;
  className?: string;
}

export const RadioGroup: React.FC<RadioGroupProps> = ({
  name, value, onChange, label, hint, error, orientation = "vertical", children, className,
}) => {
  const id = useId();
  return (
    <RadioGroupContext.Provider value={{ name, value, onChange }}>
      <fieldset
        className={`jowa-radio-group jowa-radio-group--${orientation}${className ? ` ${className}` : ""}`}
        aria-describedby={error ? `${id}-error` : hint ? `${id}-hint` : undefined}
      >
        {label && <legend className="jowa-radio-group__legend">{label}</legend>}
        <div className="jowa-radio-group__options">{children}</div>
        {error && <p id={`${id}-error`} className="jowa-radio-error">{error}</p>}
        {!error && hint && <p id={`${id}-hint`} className="jowa-radio-hint">{hint}</p>}
      </fieldset>
    </RadioGroupContext.Provider>
  );
};

/* ── Radio ─────────────────────────────────────────────────────────────────── */
export interface RadioProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type" | "name"> {
  label?: string;
  value: string;
}

export const Radio = React.forwardRef<HTMLInputElement, RadioProps>(
  ({ label, value, className, id, ...props }, ref) => {
    const autoId = useId();
    const inputId = id ?? autoId;
    const ctx = useContext(RadioGroupContext);

    const isChecked = ctx ? ctx.value === value : props.checked;
    const handleChange = ctx
      ? () => ctx.onChange?.(value)
      : props.onChange;

    return (
      <label className={`jowa-radio-label${className ? ` ${className}` : ""}`} htmlFor={inputId}>
        <input
          ref={ref}
          type="radio"
          id={inputId}
          name={ctx?.name}
          value={value}
          checked={isChecked}
          onChange={handleChange}
          className="jowa-radio"
          {...props}
        />
        <span className="jowa-radio-dot" aria-hidden="true" />
        {label && <span className="jowa-radio-text">{label}</span>}
      </label>
    );
  }
);

Radio.displayName = "Radio";
RadioGroup.displayName = "RadioGroup";
