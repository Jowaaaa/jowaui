export interface FooterLink {
  /** Display text for the link */
  label: string;
  /** Navigation URL */
  href: string;
}

export interface FooterLinkGroup {
  /** Section heading rendered above the links */
  heading: string;
  /** Links belonging to this group */
  links: FooterLink[];
}

export interface FooterProps {
  /** Brand logo or name rendered in the top-left area */
  brand?: React.ReactNode;
  /** Grouped navigation link sections (default: []) */
  groups?: FooterLinkGroup[];
  /** Content rendered in the bottom bar (e.g. copyright text) */
  bottom?: React.ReactNode;
  /** Additional CSS class applied to the footer element */
  className?: string;
}

import React from "react";

export const Footer: React.FC<FooterProps> = ({
  brand,
  groups = [],
  bottom,
  className = "",
}) => {
  const classes = ["jowa-footer", className].filter(Boolean).join(" ");

  return (
    <footer className={classes}>
      <div className="jowa-footer__inner">
        {brand && <div className="jowa-footer__brand">{brand}</div>}

        {groups.length > 0 && (
          <nav className="jowa-footer__groups" aria-label="Footer navigation">
            {groups.map((group) => (
              <div key={group.heading} className="jowa-footer__group">
                <p className="jowa-footer__group-heading">{group.heading}</p>
                <ul className="jowa-footer__group-links">
                  {group.links.map((link) => (
                    <li key={link.href}>
                      <a href={link.href} className="jowa-footer__link">
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        )}
      </div>

      {bottom && (
        <div className="jowa-footer__bottom">
          {bottom}
        </div>
      )}
    </footer>
  );
};

Footer.displayName = "Footer";
