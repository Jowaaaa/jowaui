import React, { useId, useState } from "react";

export interface TabItem {
  value: string;
  label: React.ReactNode;
  content: React.ReactNode;
  disabled?: boolean;
}

export interface TabsProps {
  items: TabItem[];
  defaultValue?: string;
  value?: string;
  onChange?: (value: string) => void;
  variant?: "line" | "pill";
  className?: string;
}

export const Tabs: React.FC<TabsProps> = ({
  items, defaultValue, value: controlledValue, onChange, variant = "line", className,
}) => {
  const id = useId();
  const isControlled = controlledValue !== undefined;
  const [uncontrolled, setUncontrolled] = useState(defaultValue ?? items[0]?.value ?? "");
  const active = isControlled ? controlledValue : uncontrolled;

  const select = (val: string) => {
    if (!isControlled) setUncontrolled(val);
    onChange?.(val);
  };

  // Keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
    const enabledItems = items.filter((i) => !i.disabled);
    const currentEnabled = enabledItems.findIndex((i) => i.value === active);
    if (e.key === "ArrowRight" || e.key === "ArrowDown") {
      e.preventDefault();
      const next = enabledItems[(currentEnabled + 1) % enabledItems.length];
      if (next) select(next.value);
    }
    if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
      e.preventDefault();
      const prev = enabledItems[(currentEnabled - 1 + enabledItems.length) % enabledItems.length];
      if (prev) select(prev.value);
    }
  };

  const activeItem = items.find((i) => i.value === active);

  return (
    <div className={`jowa-tabs jowa-tabs--${variant}${className ? ` ${className}` : ""}`}>
      <div role="tablist" className="jowa-tabs__list" aria-orientation="horizontal">
        {items.map((item, index) => (
          <button
            key={item.value}
            role="tab"
            id={`${id}-tab-${item.value}`}
            aria-controls={`${id}-panel-${item.value}`}
            aria-selected={active === item.value}
            disabled={item.disabled}
            tabIndex={active === item.value ? 0 : -1}
            className={`jowa-tabs__tab${active === item.value ? " jowa-tabs__tab--active" : ""}`}
            onClick={() => !item.disabled && select(item.value)}
            onKeyDown={(e) => handleKeyDown(e, index)}
          >
            {item.label}
          </button>
        ))}
      </div>
      {activeItem && (
        <div
          role="tabpanel"
          id={`${id}-panel-${activeItem.value}`}
          aria-labelledby={`${id}-tab-${activeItem.value}`}
          className="jowa-tabs__panel"
        >
          {activeItem.content}
        </div>
      )}
    </div>
  );
};

Tabs.displayName = "Tabs";
