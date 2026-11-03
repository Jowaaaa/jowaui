import React, { useId, useState } from "react";

export interface NavbarLink {
  /** Display text for the navigation link */
  label: string;
  /** Navigation URL */
  href: string;
}

export interface NavbarProps {
  /** Brand title text — shown when no logoSrc is provided */
  title?: string;
  /** URL of the logo image */
  logoSrc?: string;
  /** Alt text for the logo image (default: "Logo") */
  logoAlt?: string;
  /** Navigation links */
  links?: NavbarLink[];
  /** Slot for extra content on the right (e.g. buttons, avatar) */
  actions?: React.ReactNode;
  /** Additional CSS class applied to the nav element */
  className?: string;
  /** Inline styles applied to the nav element */
  style?: React.CSSProperties;
}

export const Navbar: React.FC<NavbarProps> = ({
  title = "MyBrand",
  logoSrc,
  logoAlt = "Logo",
  links,
  actions,
  className = "",
  style,
}) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuId = useId();
  const navLinks = links ?? [];
  const hasLinks = navLinks.length > 0;

  return (
    <nav
      className={["jowa-navbar", className].filter(Boolean).join(" ")}
      style={style}
    >
      <a className="jowa-navbar__brand" href="/">
        {logoSrc ? (
          <img src={logoSrc} alt={logoAlt} />
        ) : (
          <span>{title}</span>
        )}
      </a>

      {hasLinks && (
        <>
          <button
            type="button"
            className="jowa-navbar__menu-toggle"
            aria-controls={menuId}
            aria-expanded={menuOpen}
            aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
            onClick={() => setMenuOpen((open) => !open)}
          >
            <span aria-hidden="true" className="jowa-navbar__menu-icon">
              <span />
              <span />
              <span />
            </span>
          </button>

          <ul
            id={menuId}
            className={["jowa-navbar__links", menuOpen ? "jowa-navbar__links--open" : ""]
              .filter(Boolean)
              .join(" ")}
          >
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  className="jowa-navbar__link"
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </>
      )}

      {actions && <div className="jowa-navbar__actions">{actions}</div>}
    </nav>
  );
};

Navbar.displayName = "Navbar";
