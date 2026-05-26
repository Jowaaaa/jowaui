import React from "react";

export interface ComboboxOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface ComboboxProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange"> {
  options: ComboboxOption[];
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
}

export const Combobox = React.forwardRef<HTMLDivElement, ComboboxProps>(
  (
    {
      options,
      value,
      defaultValue = "",
      onChange,
      placeholder = "Search…",
      disabled = false,
      className = "",
      ...props
    },
    ref
  ) => {
    const isControlled: boolean = value !== undefined;
    const [internalValue, setInternalValue] = React.useState<string>(defaultValue);
    const selectedValue: string = isControlled ? (value as string) : internalValue;

    const [query, setQuery] = React.useState<string>("");
    const [open, setOpen] = React.useState<boolean>(false);
    const [highlightedIndex, setHighlightedIndex] = React.useState<number>(-1);

    const inputRef = React.useRef<HTMLInputElement>(null);
    const listRef = React.useRef<HTMLUListElement>(null);
    const containerRef = React.useRef<HTMLDivElement>(null);

    const selectedOption: ComboboxOption | undefined = options.find(
      (o) => o.value === selectedValue
    );

    const filtered: ComboboxOption[] = options.filter((o) =>
      o.label.toLowerCase().includes(query.toLowerCase())
    );

    const handleSelect = (option: ComboboxOption): void => {
      if (option.disabled) return;
      if (!isControlled) setInternalValue(option.value);
      onChange?.(option.value);
      setQuery("");
      setOpen(false);
      setHighlightedIndex(-1);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
      setQuery(e.target.value);
      setOpen(true);
      setHighlightedIndex(-1);
    };

    const handleInputFocus = (): void => {
      setOpen(true);
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>): void => {
      if (!open && (e.key === "ArrowDown" || e.key === "ArrowUp")) {
        setOpen(true);
        return;
      }
      if (e.key === "Escape") {
        setOpen(false);
        setQuery("");
        setHighlightedIndex(-1);
        return;
      }
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setHighlightedIndex((prev) => {
          const next = prev < filtered.length - 1 ? prev + 1 : 0;
          scrollOptionIntoView(next);
          return next;
        });
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setHighlightedIndex((prev) => {
          const next = prev > 0 ? prev - 1 : filtered.length - 1;
          scrollOptionIntoView(next);
          return next;
        });
      } else if (e.key === "Enter") {
        e.preventDefault();
        if (highlightedIndex >= 0 && filtered[highlightedIndex]) {
          handleSelect(filtered[highlightedIndex]);
        }
      }
    };

    const scrollOptionIntoView = (index: number): void => {
      const list = listRef.current;
      if (!list) return;
      const item = list.children[index] as HTMLElement | undefined;
      item?.scrollIntoView({ block: "nearest" });
    };

    // Close on outside click
    React.useEffect(() => {
      const handler = (e: MouseEvent): void => {
        if (
          containerRef.current &&
          !containerRef.current.contains(e.target as Node)
        ) {
          setOpen(false);
          setQuery("");
          setHighlightedIndex(-1);
        }
      };
      document.addEventListener("mousedown", handler);
      return () => document.removeEventListener("mousedown", handler);
    }, []);

    const displayValue: string = open ? query : (selectedOption?.label ?? "");

    const classes: string = [
      "jowa-combobox",
      open ? "jowa-combobox--open" : "",
      disabled ? "jowa-combobox--disabled" : "",
      className,
    ]
      .filter(Boolean)
      .join(" ");

    return (
      <div ref={ref ?? containerRef} className={classes} {...props}>
        <div className="jowa-combobox__input-wrapper">
          <input
            ref={inputRef}
            type="text"
            className="jowa-combobox__input"
            value={displayValue}
            onChange={handleInputChange}
            onFocus={handleInputFocus}
            onKeyDown={handleKeyDown}
            placeholder={placeholder}
            disabled={disabled}
            autoComplete="off"
            role="combobox"
            aria-expanded={open}
            aria-haspopup="listbox"
            aria-autocomplete="list"
          />
          <span className="jowa-combobox__chevron" aria-hidden="true">
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
          <ul
            ref={listRef}
            className="jowa-combobox__dropdown"
            role="listbox"
          >
            {filtered.length === 0 ? (
              <li className="jowa-combobox__no-results" role="option" aria-selected={false}>
                No results found
              </li>
            ) : (
              filtered.map((option, index) => {
                const isSelected: boolean = option.value === selectedValue;
                const isHighlighted: boolean = index === highlightedIndex;
                const optionClasses: string = [
                  "jowa-combobox__option",
                  isSelected ? "jowa-combobox__option--selected" : "",
                  isHighlighted ? "jowa-combobox__option--highlighted" : "",
                  option.disabled ? "jowa-combobox__option--disabled" : "",
                ]
                  .filter(Boolean)
                  .join(" ");

                return (
                  <li
                    key={option.value}
                    className={optionClasses}
                    role="option"
                    aria-selected={isSelected}
                    aria-disabled={option.disabled}
                    onMouseDown={(e) => {
                      e.preventDefault();
                      handleSelect(option);
                    }}
                    onMouseEnter={() => setHighlightedIndex(index)}
                  >
                    {option.label}
                    {isSelected && (
                      <span className="jowa-combobox__check" aria-hidden="true">
                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                          <path
                            d="M2.5 7l3 3 6-6"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </span>
                    )}
                  </li>
                );
              })
            )}
          </ul>
        )}
      </div>
    );
  }
);

Combobox.displayName = "Combobox";
