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
  PRELUDE_DOCS_LINK,
} from "../constants/externalLinks";

const LOGO = "/img/marketing/chrome/overture_logo.svg";

// Four items plus three actions, per `ia-proposal.md` § Navigation, replacing the
// five plus two the Gatsby site carried. Two things leave the primary nav rather
// than being renamed: `Documentation` moves right into the actions group, since it
// leaves the site, and `Support` drops out entirely and becomes "Support forum" in
// the footer's Connect column.
//
// `Impact`, `Collaborate` and `About` point at the routes that exist today. The IA
// renames all three, but each rename arrives with a page rewrite and a redirect
// rule, which are phases 3 and 4 in `roadmap.md`. The labels are the half that
// depends on neither, so a stage 2 reviewer sees the proposed nav rather than the
// old one. Repoint the URLs when the routes move; these labels are final.
const navLinks = [
  { name: "Products", url: PRODUCTS_PATH },
  { name: "Impact", url: CASE_STUDIES_PATH },
  { name: "Collaborate", url: SERVICES_PATH },
  { name: "About", url: ABOUT_US_PATH },
];

// Two of the three actions. Both leave the site, so both carry the arrow the IA
// writes them with. `Get Started` is the third and the only one rendered as a
// button; it points at the docs quickstart rather than a marketing page, which is
// the handoff that let `/getting-started/` retire.
const navActions = [
  { name: "Docs", url: DOCUMENTATION_LINK },
  { name: "GitHub", url: OVERTURE_GITHUB_LINK },
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
              {navActions.map((action) => (
                <Link
                  key={action.name}
                  className="navbar-item nav-link nav-action"
                  onClick={closeMenu}
                  to={action.url}
                >
                  {action.name}
                  {/* Decorative: `Link` already opens external URLs in a new tab,
                      and the arrow would read as punctuation to a screen reader. */}
                  <span className="nav-action__arrow" aria-hidden="true">
                    ↗
                  </span>
                </Link>
              ))}
              <div className="navbar-item nav-link navbar-buttons">
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
