import React, { useState } from "react";
import { useLocation } from "@docusaurus/router";
import SearchBar from "@theme/SearchBar";
import Link from "./Link";
import {
  HOME_PATH,
  IMPACT_PATH,
  PRODUCTS_PATH,
  COLLABORATE_PATH,
} from "../constants/pages";
import {
  DOCUMENTATION_LINK,
  OVERTURE_GITHUB_LINK,
} from "../constants/externalLinks";

const LOGO = "/img/marketing/chrome/overture_logo.svg";

// Three items plus two actions. `Documentation` moved into the actions
// group since it leaves the site; `Support` dropped out entirely and became
// "Support forum" in the footer's Connect column.
//
// No `About`: it was the one item that scrolled the page a visitor was
// already on rather than navigating, since /about-us/ was removed. "Who
// are these people" is answered by that band and by the footer's Our
// story, both via `ABOUT_BAND` in constants/pages.ts. Don't re-add it
// without a real route to point at.
//
// Every label left here points at the page it names.
const navLinks = [
  { name: "Products", url: PRODUCTS_PATH },
  { name: "Impact", url: IMPACT_PATH },
  { name: "Collaboration", url: COLLABORATE_PATH },
];

// Both leave the site, so both carry the external-link icon. No `Get
// Started` beside them: it read as a second call to action, and the docs
// quickstart it pointed at is already one click away via `Docs`.
const navActions = [
  { name: "Docs", url: DOCUMENTATION_LINK },
  { name: "GitHub", url: OVERTURE_GITHUB_LINK },
];

/**
 * The marketing site's own navigation.
 *
 * The documentation navbar (Develop, Deploy, Use, Community) is the wrong
 * navigation for these pages, and showing it made the two sites look like one.
 * The megamenu this could have carried is already unreachable elsewhere on
 * the site, and the mobile menu needs nothing more than a single piece of
 * state to open and close.
 *
 * Docusaurus renders the navbar outside the content wrapper that carries
 * `.marketing`, so this brings its own — as a wrapper, not a second class on
 * `<nav>`, since the compiled selector `.marketing .NavHeader` needs both
 * classes on separate elements.
 */
export default function MarketingNavbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { pathname } = useLocation();
  const closeMenu = () => setMobileMenuOpen(false);
  const openClass = mobileMenuOpen ? "is-active" : "";

  // `MarketingNavbar` alongside `marketing` so the wrapper can be styled at
  // all: everything in styles/ compiles nested inside `.marketing`, which
  // cannot select the element that carries that class. The sticky rule is
  // therefore the one marketing rule written at the top level of index.scss.
  return (
    <div className="marketing MarketingNavbar">
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
              aria-controls="navMenu"
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
                  {/* The same external-link glyph the documentation navbar
                      uses (@docusaurus/theme-classic's IconExternalLink).
                      Decorative: `Link` already opens external URLs in a new
                      tab; the icon would read as punctuation to a screen
                      reader. */}
                  <svg
                    width="13.5"
                    height="13.5"
                    viewBox="0 0 24 24"
                    className="nav-action__icon"
                    aria-hidden="true"
                  >
                    <path
                      fill="currentColor"
                      d="M21 13v10h-21v-19h12v2h-10v15h17v-8h2zm3-12h-10.988l4.035 4-6.977 7.07 2.828 2.828 6.977-7.07 4.125 4.172v-11z"
                    />
                  </svg>
                </Link>
              ))}
              {/* The same Algolia search and index the documentation navbar
                  carries — one build, so a marketing visitor can search the
                  docs without crossing over first. Trailing, matching where
                  the documentation navbar's own search box sits. */}
              <div className="navbar-item nav-link navbar-search">
                <SearchBar />
              </div>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}
