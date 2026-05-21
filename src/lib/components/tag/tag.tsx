import React from "react";

export type TagVariant = "neutral" | "primary" | "success" | "warning" | "danger";

export interface TagProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: TagVariant;
  onRemove?: () => void;
}

export const Tag: React.FC<TagProps> = ({
  variant = "neutral",
  onRemove,
  children,
  className = "",
  ...props
}) => {
  const classes = ["jowa-tag", `jowa-tag--${variant}`, className]
    .filter(Boolean)
    .join(" ");

  return (
    <span className={classes} {...props}>
      {children}
      {onRemove && (
        <button
          className="jowa-tag__remove"
          onClick={onRemove}
          aria-label="Remove"
          type="button"
        >
          ×
        </button>
      )}
    </span>
  );
};

Tag.displayName = "Tag";
