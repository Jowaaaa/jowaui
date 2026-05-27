import React from "react";

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Content rendered in the card header section */
  header?: React.ReactNode;
  /** Content rendered in the card footer section */
  footer?: React.ReactNode;
}

export const Card: React.FC<CardProps> = ({
  header,
  footer,
  children,
  className = "",
  ...props
}) => {
  const classes = ["jowa-card", className].filter(Boolean).join(" ");

  return (
    <div className={classes} {...props}>
      {header && <div className="jowa-card__header">{header}</div>}
      <div className="jowa-card__body">{children}</div>
      {footer && <div className="jowa-card__footer">{footer}</div>}
    </div>
  );
};

Card.displayName = "Card";
