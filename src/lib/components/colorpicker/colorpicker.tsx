import React from "react";

export interface ColorPickerProps {
  /** Visible label rendered above the control */
  label?: string;
  /** Validation error message; replaces hint and applies error styling */
  error?: string;
  /** Helper text shown below the control when there is no error */
  hint?: string;
  /** Controlled hex color value (e.g. "#3b82f6") */
  value?: string;
  /** Initial hex color value for uncontrolled usage (default: "#3b82f6") */
  defaultValue?: string;
  /** Disables all interaction when true (default: false) */
  disabled?: boolean;
  /** Callback fired with the new hex string whenever the color changes */
  onChange?: (value: string) => void;
  /** Additional CSS class applied to the wrapper */
  className?: string;
  /** HTML id for the text input; auto-derived from label when omitted */
  id?: string;
}

export const ColorPicker = React.forwardRef<HTMLInputElement, ColorPickerProps>(
  (
    {
      label,
      error,
      hint,
      value,
      defaultValue = "#3b82f6",
      disabled = false,
      onChange,
      className = "",
      id,
    },
    ref
  ) => {
    const isControlled: boolean = value !== undefined;
    const [internalValue, setInternalValue] = React.useState<string>(
      defaultValue
    );

    const current: string = isControlled ? (value as string) : internalValue;

    const inputId: string | undefined =
      id ?? (label ? label.toLowerCase().replace(/\s+/g, "-") : undefined);

    const nativeRef = React.useRef<HTMLInputElement>(null);

    const commit = (hex: string): void => {
      if (!isControlled) setInternalValue(hex);
      onChange?.(hex);
    };

    const handleNativeChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
      commit(e.target.value);
    };

    const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
      const raw: string = e.target.value;
      // Accept partial input while typing; only commit valid hex
      if (!isControlled) setInternalValue(raw);
      if (/^#[0-9a-fA-F]{6}$/.test(raw)) {
        onChange?.(raw);
      }
    };

    const handleSwatchClick = (): void => {
      if (!disabled) nativeRef.current?.click();
    };

    const wrapperClasses: string = ["jowa-colorpicker-wrapper", className]
      .filter(Boolean)
      .join(" ");

    return (
      <div className={wrapperClasses}>
        {label && (
          <label htmlFor={inputId} className="jowa-colorpicker-label">
            {label}
          </label>
        )}
        <div
          className={`jowa-colorpicker-control${error ? " jowa-colorpicker-control--error" : ""}${disabled ? " jowa-colorpicker-control--disabled" : ""}`}
        >
          <button
            type="button"
            className={`jowa-colorpicker-swatch${disabled ? " jowa-colorpicker-swatch--disabled" : ""}`}
            style={{ backgroundColor: /^#[0-9a-fA-F]{6}$/.test(current) ? current : "#000000" }}
            onClick={handleSwatchClick}
            disabled={disabled}
            aria-label={`Pick color, current: ${current}`}
          />
          {/* Hidden native color input */}
          <input
            ref={nativeRef}
            type="color"
            value={/^#[0-9a-fA-F]{6}$/.test(current) ? current : "#000000"}
            onChange={handleNativeChange}
            disabled={disabled}
            tabIndex={-1}
            aria-hidden="true"
            className="jowa-colorpicker-native"
          />
          <input
            ref={ref}
            id={inputId}
            type="text"
            className="jowa-colorpicker-input"
            value={current}
            onChange={handleTextChange}
            disabled={disabled}
            maxLength={7}
            placeholder="#000000"
            aria-invalid={!!error}
            aria-describedby={
              error
                ? `${inputId}-error`
                : hint
                ? `${inputId}-hint`
                : undefined
            }
          />
        </div>
        {error && (
          <p id={`${inputId}-error`} className="jowa-colorpicker-error">
            {error}
          </p>
        )}
        {!error && hint && (
          <p id={`${inputId}-hint`} className="jowa-colorpicker-hint">
            {hint}
          </p>
        )}
      </div>
    );
  }
);

ColorPicker.displayName = "ColorPicker";
