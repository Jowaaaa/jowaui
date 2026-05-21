import React from "react";

export interface NumberInputProps {
  label?: string;
  error?: string;
  hint?: string;
  value?: number;
  defaultValue?: number;
  min?: number;
  max?: number;
  step?: number;
  disabled?: boolean;
  onChange?: (value: number) => void;
  className?: string;
  id?: string;
}

export const NumberInput = React.forwardRef<HTMLInputElement, NumberInputProps>(
  (
    {
      label,
      error,
      hint,
      value,
      defaultValue,
      min,
      max,
      step = 1,
      disabled = false,
      onChange,
      className = "",
      id,
    },
    ref
  ) => {
    const isControlled: boolean = value !== undefined;
    const [internalValue, setInternalValue] = React.useState<number>(
      defaultValue ?? 0
    );

    const current: number = isControlled ? (value as number) : internalValue;

    const inputId: string | undefined =
      id ?? (label ? label.toLowerCase().replace(/\s+/g, "-") : undefined);

    const clamp = (v: number): number => {
      let result: number = v;
      if (min !== undefined) result = Math.max(min, result);
      if (max !== undefined) result = Math.min(max, result);
      return result;
    };

    const commit = (v: number): void => {
      const clamped: number = clamp(v);
      if (!isControlled) setInternalValue(clamped);
      onChange?.(clamped);
    };

    const handleDecrement = (): void => commit(current - step);
    const handleIncrement = (): void => commit(current + step);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
      const parsed: number = parseFloat(e.target.value);
      if (!isNaN(parsed)) commit(parsed);
    };

    const atMin: boolean = min !== undefined && current <= min;
    const atMax: boolean = max !== undefined && current >= max;

    const wrapperClasses: string = ["jowa-numberinput-wrapper", className]
      .filter(Boolean)
      .join(" ");

    return (
      <div className={wrapperClasses}>
        {label && (
          <label htmlFor={inputId} className="jowa-numberinput-label">
            {label}
          </label>
        )}
        <div className={`jowa-numberinput-control${error ? " jowa-numberinput-control--error" : ""}${disabled ? " jowa-numberinput-control--disabled" : ""}`}>
          <button
            type="button"
            className="jowa-numberinput-btn jowa-numberinput-btn--dec"
            onClick={handleDecrement}
            disabled={disabled || atMin}
            aria-label="Decrement"
            tabIndex={0}
          >
            −
          </button>
          <input
            ref={ref}
            id={inputId}
            type="number"
            className="jowa-numberinput-field"
            value={current}
            min={min}
            max={max}
            step={step}
            disabled={disabled}
            onChange={handleInputChange}
            aria-invalid={!!error}
            aria-describedby={
              error
                ? `${inputId}-error`
                : hint
                ? `${inputId}-hint`
                : undefined
            }
          />
          <button
            type="button"
            className="jowa-numberinput-btn jowa-numberinput-btn--inc"
            onClick={handleIncrement}
            disabled={disabled || atMax}
            aria-label="Increment"
            tabIndex={0}
          >
            +
          </button>
        </div>
        {error && (
          <p id={`${inputId}-error`} className="jowa-numberinput-error">
            {error}
          </p>
        )}
        {!error && hint && (
          <p id={`${inputId}-hint`} className="jowa-numberinput-hint">
            {hint}
          </p>
        )}
      </div>
    );
  }
);

NumberInput.displayName = "NumberInput";
