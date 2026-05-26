import React from "react";

export interface MultiSelectOption {
  value: string;
  label: string;
}

export interface MultiSelectProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange"> {
  options: MultiSelectOption[];
  value?: string[];
  defaultValue?: string[];
  onChange?: (value: string[]) => void;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
}

export const MultiSelect = React.forwardRef<HTMLDivElement, MultiSelectProps>(
  (
    {
      options,
      value,
      defaultValue = [],
      onChange,
      placeholder = "Select options…",
      disabled = false,
      className = "",
      ...props
    },
    ref
  ) => {
    const isControlled: boolean = value !== undefined;
    const [internalValue, setInternalValue] = React.useState<string[]>(defaultValue);
    const selectedValues: string[] = isControlled ? (value as string[]) : internalValue;

    const [open, setOpen] = React.useState<boolean>(false);
    const containerRef = React.useRef<HTMLDivElement>(null);

    const toggle = (optionValue: string): void => {
      const next: string[] = selectedValues.includes(optionValue)
        ? selectedValues.filter((v) => v !== optionValue)
        : [...selectedValues, optionValue];
      if (!isControlled) setInternalValue(next);
      onChange?.(next);
    };

    const remove = (optionValue: string, e: React.MouseEvent): void => {
      e.stopPropagation();
      const next: string[] = selectedValues.filter((v) => v !== optionValue);
      if (!isControlled) setInternalValue(next);
      onChange?.(next);
    };

    const selectedOptions: MultiSelectOption[] = options.filter((o) =>
      selectedValues.includes(o.value)
    );

    // Close on outside click
    React.useEffect(() => {
      const handler = (e: MouseEvent): void => {
        if (
          containerRef.current &&
          !containerRef.current.contains(e.target as Node)
        ) {
          setOpen(false);
        }
      };
      document.addEventListener("mousedown", handler);
      return () => document.removeEventListener("mousedown", handler);
    }, []);

    const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>): void => {
      if (e.key === "Escape") setOpen(false);
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        setOpen((prev) => !prev);
      }
    };

    const classes: string = [
      "jowa-multiselect",
      open ? "jowa-multiselect--open" : "",
      disabled ? "jowa-multiselect--disabled" : "",
      className,
    ]
      .filter(Boolean)
      .join(" ");

    return (
      <div
        ref={ref ?? containerRef}
        className={classes}
        {...props}
      >
        <div
          className="jowa-multiselect__input-area"
          role="combobox"
          aria-expanded={open}
          aria-haspopup="listbox"
          tabIndex={disabled ? -1 : 0}
          onClick={() => !disabled && setOpen((prev) => !prev)}
          onKeyDown={handleKeyDown}
        >
          {selectedOptions.length === 0 ? (
            <span className="jowa-multiselect__placeholder">{placeholder}</span>
          ) : (
            selectedOptions.map((option) => (
              <span key={option.value} className="jowa-multiselect__tag">
                {option.label}
                <button
                  type="button"
                  className="jowa-multiselect__tag-remove"
                  aria-label={`Remove ${option.label}`}
                  onClick={(e) => remove(option.value, e)}
                  tabIndex={-1}
                >
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                    <path
                      d="M2 2l8 8M10 2l-8 8"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    />
                  </svg>
                </button>
              </span>
            ))
          )}
          <span className="jowa-multiselect__chevron" aria-hidden="true">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path
                d="M4 6l4 4 4-4"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
        </div>

        {open && (
          <ul className="jowa-multiselect__dropdown" role="listbox" aria-multiselectable="true">
            {options.map((option) => {
              const isSelected: boolean = selectedValues.includes(option.value);
              const optionClasses: string = [
                "jowa-multiselect__option",
                isSelected ? "jowa-multiselect__option--selected" : "",
              ]
                .filter(Boolean)
                .join(" ");

              return (
                <li
                  key={option.value}
                  className={optionClasses}
                  role="option"
                  aria-selected={isSelected}
                  onMouseDown={(e) => {
                    e.preventDefault();
                    toggle(option.value);
                  }}
                >
                  <span className="jowa-multiselect__option-check" aria-hidden="true">
                    {isSelected && (
                      <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                        <path
                          d="M2.5 7l3 3 6-6"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    )}
                  </span>
                  {option.label}
                </li>
              );
            })}
          </ul>
        )}
      </div>
    );
  }
);

MultiSelect.displayName = "MultiSelect";
