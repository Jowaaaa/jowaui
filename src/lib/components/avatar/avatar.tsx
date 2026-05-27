import React from "react";

export type AvatarSize = "sm" | "md" | "lg" | "xl";

export interface AvatarProps extends React.HTMLAttributes<HTMLSpanElement> {
  /** URL of the avatar image; when provided, renders an <img> */
  src?: string;
  /** Alt text for the image or accessible label for initials (default: "") */
  alt?: string;
  /** Explicit initials to display when no src is given; falls back to first two chars of alt */
  initials?: string;
  /** Size variant controlling width/height (default: "md") */
  size?: AvatarSize;
}

export const Avatar: React.FC<AvatarProps> = ({
  src,
  alt = "",
  initials,
  size = "md",
  className = "",
  ...props
}) => {
  const classes = ["jowa-avatar", `jowa-avatar--${size}`, className]
    .filter(Boolean)
    .join(" ");

  return (
    <span className={classes} {...props}>
      {src ? (
        <img className="jowa-avatar__img" src={src} alt={alt} />
      ) : (
        <span className="jowa-avatar__initials" aria-label={alt}>
          {initials ?? alt.slice(0, 2).toUpperCase()}
        </span>
      )}
    </span>
  );
};

Avatar.displayName = "Avatar";
