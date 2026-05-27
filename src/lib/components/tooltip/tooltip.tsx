import React, { useState } from "react";

export type TooltipPosition = "top" | "bottom" | "left" | "right";

export interface TooltipProps {
  /** Content rendered inside the tooltip bubble */
  content: React.ReactNode;
  /** Preferred position of the tooltip relative to the trigger (default: "top") */
  position?: TooltipPosition;
  /** Element that triggers the tooltip on hover/focus */
  children: React.ReactElement;
}

export const Tooltip: React.FC<TooltipProps> = ({
  content,
  position = "top",
  children,
}) => {
  const [visible, setVisible] = useState(false);

  return (
    <span
      className="jowa-tooltip-wrapper"
      onMouseEnter={() => setVisible(true)}
      onMouseLeave={() => setVisible(false)}
      onFocus={() => setVisible(true)}
      onBlur={() => setVisible(false)}
    >
      {children}
      {visible && (
        <span
          role="tooltip"
          className={`jowa-tooltip jowa-tooltip--${position}`}
        >
          {content}
        </span>
      )}
    </span>
  );
};

Tooltip.displayName = "Tooltip";
