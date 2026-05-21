import React from "react";

export interface HeroProps {
  title: React.ReactNode;
  subtitle?: React.ReactNode;
  actions?: React.ReactNode;
  media?: React.ReactNode;
  align?: "left" | "center";
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
