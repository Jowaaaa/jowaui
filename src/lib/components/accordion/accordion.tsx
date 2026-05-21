import React from "react";
import "./accordion.css";

export interface AccordionItem {
  id: string;
  title: string;
  content: React.ReactNode;
  disabled?: boolean;
}

export interface AccordionProps {
  items: AccordionItem[];
  multiple?: boolean;
  defaultOpen?: string[];
  className?: string;
}

export const Accordion: React.FC<AccordionProps> = ({
  items,
  multiple = false,
  defaultOpen = [],
  className = "",
}) => {
  const [openIds, setOpenIds] = React.useState<Set<string>>(new Set(defaultOpen));
  const headerRefs = React.useRef<(HTMLButtonElement | null)[]>([]);

  const toggle = (id: string, disabled?: boolean): void => {
    if (disabled) return;
    setOpenIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        if (!multiple) next.clear();
        next.add(id);
      }
      return next;
    });
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>, index: number, item: AccordionItem): void => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      toggle(item.id, item.disabled);
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      const next = headerRefs.current[index + 1];
      next?.focus();
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      const prev = headerRefs.current[index - 1];
      prev?.focus();
    } else if (e.key === "Home") {
      e.preventDefault();
      headerRefs.current[0]?.focus();
    } else if (e.key === "End") {
      e.preventDefault();
      headerRefs.current[items.length - 1]?.focus();
    }
  };

  const wrapperClasses = ["jowa-accordion", className].filter(Boolean).join(" ");

  return (
    <div className={wrapperClasses}>
      {items.map((item, index) => {
        const isOpen = openIds.has(item.id);
        const headerId = `jowa-accordion-header-${item.id}`;
        const panelId = `jowa-accordion-panel-${item.id}`;
        const itemClasses = [
          "jowa-accordion-item",
          isOpen ? "jowa-accordion-item--open" : "",
          item.disabled ? "jowa-accordion-item--disabled" : "",
        ]
          .filter(Boolean)
          .join(" ");

        return (
          <div key={item.id} className={itemClasses}>
            <button
              ref={(el) => { headerRefs.current[index] = el; }}
              id={headerId}
              className="jowa-accordion-header"
              aria-expanded={isOpen}
              aria-controls={panelId}
              disabled={item.disabled}
              onClick={() => toggle(item.id, item.disabled)}
              onKeyDown={(e) => handleKeyDown(e, index, item)}
              type="button"
            >
              <span>{item.title}</span>
              <svg
                className="jowa-accordion-chevron"
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                aria-hidden="true"
              >
                <path
                  d="M4 6l4 4 4-4"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
            <div
              id={panelId}
              role="region"
              aria-labelledby={headerId}
              className="jowa-accordion-panel"
            >
              <div className="jowa-accordion-content">{item.content}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

Accordion.displayName = "Accordion";
