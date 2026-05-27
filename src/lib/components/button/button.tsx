import React from "react";

export type ButtonVariant = "primary" | "outline" | "danger" | "ghost" | "navbar";
export type ButtonSize = "sm" | "md" | "lg";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** Visual style variant (default: "primary") */
  variant?: ButtonVariant;
  /** Size variant controlling padding and font size (default: "md") */
  size?: ButtonSize;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = "primary", size = "md", className = "", children, ...props }, ref) => {
    const classes = [
      "jowa-btn",
      `jowa-btn--${variant}`,
      `jowa-btn--${size}`,
      className,
    ]
      .filter(Boolean)
      .join(" ");

    return (
      <button ref={ref} className={classes} {...props}>
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";
