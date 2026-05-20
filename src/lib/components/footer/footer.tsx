export interface FooterLink {
  label: string;
  href: string;
}

export interface FooterLinkGroup {
  heading: string;
  links: FooterLink[];
}

export interface FooterProps {
  brand?: React.ReactNode;
  groups?: FooterLinkGroup[];
  bottom?: React.ReactNode;
  className?: string;
}

import React from "react";
import "./footer.css";

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
