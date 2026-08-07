import React, { useState } from "react";
import { useLocation } from "@docusaurus/router";
import Button from "./Button";
import Link from "./Link";
import {
  ABOUT_US_PATH,
  CASE_STUDIES_PATH,
  HOME_PATH,
  PRODUCTS_PATH,
  SERVICES_PATH,
} from "../constants/pages";
import {
  DOCUMENTATION_LINK,
  OVERTURE_GITHUB_LINK,
  OVERTURE_SUPPORT,
  PRELUDE_DOCS_LINK,
} from "../constants/externalLinks";

const LOGO = "/img/marketing/chrome/overture_logo.svg";

const navLinks = [
  { name: "Products", url: PRODUCTS_PATH },
  { name: "Documentation", url: DOCUMENTATION_LINK },
  { name: "Case Studies", url: CASE_STUDIES_PATH },
  { name: "Services", url: SERVICES_PATH },
  { name: "About Us", url: ABOUT_US_PATH },
  { name: "Support", url: OVERTURE_SUPPORT },
];

/**
 * The marketing site's own navigation.
 *
 * The documentation navbar (Develop, Deploy, Use, Community) is the wrong
 * navigation for these pages, and showing it made the two sites look like one.
 * This is a plain Bulma navbar rather than a port of the Gatsby `NavBar` class
 * component: the megamenu it carried was already unreachable, and the mobile
 * menu is a single piece of state instead of the `useSSRWorkaround` machinery
 * that Gatsby's rehydration needed.
 *
 * Docusaurus renders the navbar outside the content wrapper that normally
 * carries `.marketing`, so this brings its own. It has to be a wrapping element
 * rather than a second class on the `<nav>`: the styles compile to
 * `.marketing .NavHeader`, a descendant selector, so both classes on one
 * element would match nothing.
 */
export default function MarketingNavbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { pathname } = useLocation();
  const closeMenu = () => setMobileMenuOpen(false);
  const openClass = mobileMenuOpen ? "is-active" : "";

  return (
    <div className="marketing">
      <nav
        className={`NavHeader navbar ${openClass}`}
        aria-label="main navigation"
      >
        <div className={`nav-container ${openClass}`}>
          <div className="navbar-brand">
            <Link
              to={HOME_PATH}
              onClick={closeMenu}
              className="navbar-item navbar-brand-link"
            >
              <img src={LOGO} alt="Overture home" />
            </Link>
            <button
              className={`button navbar-burger ${openClass}`}
              aria-label="Menu"
              aria-expanded={mobileMenuOpen}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <span />
              <span />
              <span />
            </button>
          </div>
          <div className={`navbar-menu ${openClass}`} id="navMenu">
            <div className="navbar-start items-center">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  className={`navbar-item nav-link ${
                    pathname === link.url ? "active-item" : ""
                  }`}
                  onClick={closeMenu}
                  to={link.url}
                >
                  {link.name}
                </Link>
              ))}
            </div>
            <div className="navbar-end ">
              <div className="navbar-item nav-link navbar-buttons">
                <Button
                  link={OVERTURE_GITHUB_LINK}
                  iconAlt=""
                  className="github-button"
                  icon="githubMagenta"
                  size="large"
                  type="secondary"
                >
                  Check us out on GitHub
                </Button>

                {/* Points into the docs rather than at a marketing funnel:
                    /getting-started/ duplicated the documentation and went
                    stale, so rebuild phase 1 retired it. */}
                <Button link={PRELUDE_DOCS_LINK} size="medium" type="primary">
                  Get Started
                </Button>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}
