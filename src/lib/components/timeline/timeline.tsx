import React from "react";

export interface TimelineItem {
  /** Unique identifier for React reconciliation */
  id: string | number;
  /** Primary heading text for the event */
  title: string;
  /** Optional body text providing additional detail */
  description?: string;
  /** Human-readable date/time string rendered below the description */
  timestamp?: string;
  /** Custom icon rendered inside the timeline dot */
  icon?: React.ReactNode;
  /** Color variant applied to the dot (default: "default") */
  variant?: "default" | "success" | "danger" | "warning" | "info";
}

export interface TimelineProps {
  /** Ordered list of timeline events */
  items: TimelineItem[];
  /** Additional CSS class applied to the ordered list */
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
