import React from "react";

export type AvatarSize = "sm" | "md" | "lg" | "xl";

export interface AvatarProps extends React.HTMLAttributes<HTMLSpanElement> {
  src?: string;
  alt?: string;
  initials?: string;
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
