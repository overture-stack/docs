import React, { useState } from "react";
import { useLocation } from "@docusaurus/router";
import SearchBar from "@theme/SearchBar";
import Button from "./Button";
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
  PRELUDE_DOCS_LINK,
} from "../constants/externalLinks";

const LOGO = "/img/marketing/chrome/overture_logo.svg";

// Three items plus three actions, per `ia-proposal.md` § Navigation, replacing
// the five plus two the Gatsby site carried. Two things leave the primary nav
// rather than being renamed: `Documentation` moves right into the actions group,
// since it leaves the site, and `Support` drops out entirely and becomes
// "Support forum" in the footer's Connect column.
//
// `About` has left it too, on the developer's call. It was the one item that did
// not point at the route it names: /about-us/ was removed and the item pointed
// into a band of the home page instead, which is a nav entry that scrolls the
// page a visitor is already on. "Who are these people" is answered by that band
// on arrival and by the footer's Our story, both still `ABOUT_BAND` in
// constants/pages.ts, so nothing that address serves has been lost.
//
// Every label left here points at the page it names.
const navLinks = [
  { name: "Products", url: PRODUCTS_PATH },
  { name: "Impact", url: IMPACT_PATH },
  { name: "Collaborate", url: COLLABORATE_PATH },
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
              {/* The same Algolia search the documentation navbar carries, and
                  the same index: these pages are one build with the docs, so a
                  visitor who arrives on the marketing site can search it from
                  here rather than having to cross over first. It leads the
                  actions group so the row still ends on `Get Started`. */}
              <div className="navbar-item nav-link navbar-search">
                <SearchBar />
              </div>
              {navActions.map((action) => (
                <Link
                  key={action.name}
                  className="navbar-item nav-link nav-action"
                  onClick={closeMenu}
                  to={action.url}
                >
                  {action.name}
                  {/* The same external-link glyph the documentation navbar renders
                      for its own off-site items (GitHub, Support Forum,
                      overture.bio) — see NavbarNavLink/IconExternalLink in
                      @docusaurus/theme-classic. Decorative: `Link` already opens
                      external URLs in a new tab, and the icon would read as
                      punctuation to a screen reader. */}
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
