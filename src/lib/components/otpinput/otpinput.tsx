import React from "react";

export interface OtpInputProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange"> {
  length?: number;
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  disabled?: boolean;
  className?: string;
  type?: "text" | "number" | "password";
}

export const OtpInput = React.forwardRef<HTMLDivElement, OtpInputProps>(
  (
    {
      length = 6,
      value,
      defaultValue = "",
      onChange,
      disabled = false,
      className = "",
      type = "text",
      ...props
    },
    ref
  ) => {
    const isControlled: boolean = value !== undefined;
    const [internalValue, setInternalValue] = React.useState<string>(
      (defaultValue ?? "").slice(0, length).padEnd(0)
    );
    const currentValue: string = isControlled ? (value as string) : internalValue;

    const [focusedIndex, setFocusedIndex] = React.useState<number>(-1);
    const inputRefs = React.useRef<(HTMLInputElement | null)[]>([]);

    const chars: string[] = Array.from({ length }, (_, i) => currentValue[i] ?? "");

    const updateValue = (next: string): void => {
      if (!isControlled) setInternalValue(next);
      onChange?.(next);
    };

    const handleChange = (index: number, e: React.ChangeEvent<HTMLInputElement>): void => {
      const raw: string = e.target.value;
      // Take only the last typed character (handles autofill edge cases)
      const char: string = raw.slice(-1);
      if (type === "number" && char !== "" && !/^\d$/.test(char)) return;

      const next: string[] = [...chars];
      next[index] = char;
      updateValue(next.join(""));

      if (char && index < length - 1) {
        inputRefs.current[index + 1]?.focus();
      }
    };

    const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>): void => {
      if (e.key === "Backspace") {
        if (chars[index]) {
          // Clear current
          const next: string[] = [...chars];
          next[index] = "";
          updateValue(next.join(""));
        } else if (index > 0) {
          // Move back and clear
          const next: string[] = [...chars];
          next[index - 1] = "";
          updateValue(next.join(""));
          inputRefs.current[index - 1]?.focus();
        }
      } else if (e.key === "ArrowLeft" && index > 0) {
        inputRefs.current[index - 1]?.focus();
      } else if (e.key === "ArrowRight" && index < length - 1) {
        inputRefs.current[index + 1]?.focus();
      }
    };

    const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>): void => {
      e.preventDefault();
      const pasted: string = e.clipboardData.getData("text").slice(0, length);
      if (type === "number" && !/^\d+$/.test(pasted)) return;
      const next: string = pasted.padEnd(0).slice(0, length);
      updateValue(next);
      // Focus last filled or next empty
      const focusTarget: number = Math.min(next.length, length - 1);
      inputRefs.current[focusTarget]?.focus();
    };

    const classes: string = [
      "jowa-otpinput",
      disabled ? "jowa-otpinput--disabled" : "",
      className,
    ]
      .filter(Boolean)
      .join(" ");

    return (
      <div ref={ref} className={classes} role="group" aria-label="One-time password" {...props}>
        {chars.map((char, index) => {
          const isFilled: boolean = char !== "";
          const isFocused: boolean = focusedIndex === index;
          const boxClasses: string = [
            "jowa-otpinput__box",
            isFilled ? "jowa-otpinput__box--filled" : "",
            isFocused ? "jowa-otpinput__box--focused" : "",
          ]
            .filter(Boolean)
            .join(" ");

          return (
            <input
              key={index}
              ref={(el) => {
                inputRefs.current[index] = el;
              }}
              type={type === "password" ? "password" : "text"}
              inputMode={type === "number" ? "numeric" : "text"}
              pattern={type === "number" ? "[0-9]*" : undefined}
              className={boxClasses}
              value={char}
              maxLength={2}
              disabled={disabled}
              autoComplete={index === 0 ? "one-time-code" : "off"}
              aria-label={`Digit ${index + 1} of ${length}`}
              onChange={(e) => handleChange(index, e)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              onPaste={handlePaste}
              onFocus={() => setFocusedIndex(index)}
              onBlur={() => setFocusedIndex(-1)}
            />
          );
        })}
      </div>
    );
  }
);

OtpInput.displayName = "OtpInput";
