import React from "react";

export interface TimelineItem {
  id: string | number;
  title: string;
  description?: string;
  timestamp?: string;
  icon?: React.ReactNode;
  variant?: "default" | "success" | "danger" | "warning" | "info";
}

export interface TimelineProps {
  items: TimelineItem[];
  className?: string;
}

export const Timeline = React.forwardRef<HTMLOListElement, TimelineProps>(
  ({ items, className }, ref) => {
    const classes = ["jowa-timeline", className].filter(Boolean).join(" ");

    return (
      <ol ref={ref} className={classes}>
        {items.map((item, index) => {
          const dotClasses = [
            "jowa-timeline__dot",
            item.variant && item.variant !== "default"
              ? `jowa-timeline__dot--${item.variant}`
              : null,
          ]
            .filter(Boolean)
            .join(" ");

          return (
            <li key={item.id} className="jowa-timeline__item">
              <div className="jowa-timeline__track">
                <div className={dotClasses}>
                  {item.icon ? (
                    <span className="jowa-timeline__dot-icon" aria-hidden="true">
                      {item.icon}
                    </span>
                  ) : null}
                </div>
                {index < items.length - 1 && (
                  <div className="jowa-timeline__connector" aria-hidden="true" />
                )}
              </div>
              <div className="jowa-timeline__content">
                <p className="jowa-timeline__title">{item.title}</p>
                {item.description && (
                  <p className="jowa-timeline__description">{item.description}</p>
                )}
                {item.timestamp && (
                  <time className="jowa-timeline__timestamp">{item.timestamp}</time>
                )}
              </div>
            </li>
          );
        })}
      </ol>
    );
  }
);

Timeline.displayName = "Timeline";
