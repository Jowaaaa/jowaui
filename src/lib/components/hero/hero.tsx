import React from "react";

export interface HeroProps {
  /** Primary heading content */
  title: React.ReactNode;
  /** Secondary descriptive text rendered below the title */
  subtitle?: React.ReactNode;
  /** Call-to-action buttons or links rendered below the subtitle */
  actions?: React.ReactNode;
  /** Image or visual element displayed alongside the text in split layout */
  media?: React.ReactNode;
  /** Text alignment and layout mode (default: "center"); "left" enables split layout when media is provided */
  align?: "left" | "center";
  /** Additional CSS class applied to the section element */
  className?: string;
}

export const Hero: React.FC<HeroProps> = ({
  title,
  subtitle,
  actions,
  media,
  align = "center",
  className = "",
}) => {
  const classes = [
    "jowa-hero",
    `jowa-hero--${align}`,
    media ? "jowa-hero--split" : "",
    className,
  ].filter(Boolean).join(" ");

  return (
    <section className={classes}>
      <div className="jowa-hero__content">
        <h1 className="jowa-hero__title">{title}</h1>
        {subtitle && <p className="jowa-hero__subtitle">{subtitle}</p>}
        {actions && <div className="jowa-hero__actions">{actions}</div>}
      </div>
      {media && <div className="jowa-hero__media">{media}</div>}
    </section>
  );
};

Hero.displayName = "Hero";
