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
  /** HTML name attribute shared by all child Radio inputs */
  name: string;
  /** Controlled selected value */
  value?: string;
  /** Callback fired with the value of the newly selected radio */
  onChange?: (value: string) => void;
  /** Fieldset legend text */
  label?: string;
  /** Helper text shown below the group when there is no error */
  hint?: string;
  /** Validation error message; applies error styling */
  error?: string;
  /** Layout direction of the radio options (default: "vertical") */
  orientation?: "vertical" | "horizontal";
  /** Radio option elements */
  children: React.ReactNode;
  /** Additional CSS class applied to the fieldset */
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
  /** Visible label text rendered next to the radio button */
  label?: string;
  /** Value submitted when this radio is selected; also used by RadioGroup for controlled state */
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
