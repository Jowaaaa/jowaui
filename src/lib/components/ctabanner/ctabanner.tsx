import React from "react";

export interface CtaBannerProps {
  /** Primary heading content */
  title: React.ReactNode;
  /** Supporting content rendered below the title */
  description?: React.ReactNode;
  /** Call-to-action buttons or links */
  actions?: React.ReactNode;
  /** Optional visual displayed alongside the content */
  media?: React.ReactNode;
  /** Content alignment (default: "left") */
  align?: "left" | "center";
  /** Additional CSS class applied to the section element */
  className?: string;
}

export const CtaBanner: React.FC<CtaBannerProps> = ({
  title,
  description,
  actions,
  media,
  align = "left",
  className = "",
}) => {
  const classes = [
    "jowa-cta-banner",
    `jowa-cta-banner--${align}`,
    media ? "jowa-cta-banner--has-media" : "",
    className,
  ].filter(Boolean).join(" ");

  return (
    <section className={classes}>
      <div className="jowa-cta-banner__content">
        <h2 className="jowa-cta-banner__title">{title}</h2>
        {description && <p className="jowa-cta-banner__description">{description}</p>}
        {actions && <div className="jowa-cta-banner__actions">{actions}</div>}
      </div>
      {media && <div className="jowa-cta-banner__media">{media}</div>}
    </section>
  );
};

CtaBanner.displayName = "CtaBanner";
