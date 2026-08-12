import React from "react";
import Link from "./Link";
import {
  ABOUT_BAND,
  COLLABORATE_PATH,
  IMPACT_PATH,
  PRIVACY_PATH,
  PRODUCTS_PATH,
  TERMS_PATH,
} from "../constants/pages";
import {
  DOCUMENTATION_LINK,
  DOCS_COMMUNITY,
  EMAIL_LINK,
  NETLIFY_LINK,
  NETLIFY_IMAGE_LINK,
  OICR_LINK,
  OVERTURE_DOCUMENTATION_CITING,
  OVERTURE_DOCUMENTATION_FUNDING,
  OVERTURE_DOCUMENTATION_LICENSING,
  OVERTURE_DOCUMENTATION_TEAM_LINK,
  OVERTURE_GITHUB_LINK,
  OVERTURE_SUPPORT,
} from "../constants/externalLinks";

const OICR_LOGO = "/img/marketing/chrome/oicr_logo.svg";

type FooterLink = { name: string; url: string; external?: boolean };
type FooterColumn = { heading: string; links: FooterLink[] };

/**
 * Four columns, per `ia-proposal.md` § Navigation, replacing the flat list of
 * eight links this carried through phases 1 to 3.
 *
 * The flat list was a holding pattern: Funding, Publications and Support Forum
 * were added to it as the pages they point at arrived, with no way to group
 * them. The columns are what the IA asked for and what makes the difference
 * between a footer and a pile of links.
 *
 * This is now the only navigation to the funding and citation content, and it
 * leaves the site to reach it: see the Impact column. It is also the only route
 * left to `ABOUT_BAND`, since the navbar's About item is gone.
 *
 * `external` drives the arrow, not a URL test: `Link` already decides how to
 * open a link, and marking these by hand keeps the two decisions independent.
 */
const columns: FooterColumn[] = [
  {
    heading: "Platform",
    links: [
      { name: "Products", url: PRODUCTS_PATH },
      { name: "Documentation", url: DOCUMENTATION_LINK, external: true },
      { name: "GitHub", url: OVERTURE_GITHUB_LINK, external: true },
      {
        name: "Software licensing",
        url: OVERTURE_DOCUMENTATION_LICENSING,
        external: true,
      },
    ],
  },
  {
    // Two of these three now leave the site. /impact/publications/ and
    // /about/funding/ were marketing pages holding content whose maintained
    // version is on the docs site under /community/, and keeping a second copy
    // here meant a paper and five grants stated twice. Both pages are gone and
    // these point at the docs, which is why they carry the arrow: "How to cite
    // us" is the docs page's own subject, and it is a clearer label than
    // "Publications" for a link a reader follows to get a citation string.
    heading: "Impact",
    links: [
      { name: "Deployments", url: IMPACT_PATH },
      {
        name: "How to cite us",
        url: OVERTURE_DOCUMENTATION_CITING,
        external: true,
      },
      { name: "Funding", url: OVERTURE_DOCUMENTATION_FUNDING, external: true },
    ],
  },
  {
    heading: "Connect",
    links: [
      { name: "Collaboration", url: COLLABORATE_PATH },
      { name: "Support forum", url: OVERTURE_SUPPORT, external: true },
      { name: "Community", url: DOCS_COMMUNITY, external: true },
      { name: "Contact", url: EMAIL_LINK },
    ],
  },
  {
    heading: "About",
    links: [
      // /about-us/ is gone; the "What we do" band on the home page is what
      // carries what it said. `ABOUT_BAND` in constants/pages.ts is the one
      // spelling of that address, shared with the navbar's About item.
      { name: "Our story", url: ABOUT_BAND },
      { name: "Team", url: OVERTURE_DOCUMENTATION_TEAM_LINK, external: true },
      { name: "OICR", url: OICR_LINK, external: true },
    ],
  },
];

const NetlifyBadge = ({ className }: { className: string }) => (
  <div className={className}>
    <Link to={NETLIFY_LINK}>
      <img src={NETLIFY_IMAGE_LINK} alt="Deploys by Netlify" />
    </Link>
  </div>
);

/**
 * The marketing site's own footer, paired with MarketingNavbar.
 *
 * Wrapped in `.marketing` for the same reason the navbar is: these render
 * outside the page wrapper that carries that class, and without it the styles
 * scoped under it would not reach them.
 */
export default function MarketingFooter() {
  return (
    <div className="marketing">
      <footer className="Footer">
        <div className="footer-white">
          <Link className="footer-white__oicr-logo" to={OICR_LINK}>
            <img src={OICR_LOGO} alt="Ontario Institute for Cancer Research" />
          </Link>

          <nav className="footer-columns" aria-label="Footer">
            {columns.map((column) => (
              <div className="footer-columns__column" key={column.heading}>
                <h2 className="footer-columns__heading">{column.heading}</h2>
                <ul>
                  {column.links.map((link) => (
                    <li key={link.name}>
                      <Link className="footer-columns__link" to={link.url}>
                        {link.name}
                        {link.external && (
                          // Decorative: `Link` already opens external URLs in a
                          // new tab, and the arrow would read as punctuation to
                          // a screen reader.
                          <span
                            className="footer-columns__arrow"
                            aria-hidden="true"
                          >
                            ↗
                          </span>
                        )}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>

          <NetlifyBadge className="netlify-badge-desktop" />
        </div>
        <div className="bg-grey ow:px-2 footer-grey">
          <div className="footer-grey__text ">
            <div className="footer-grey__top-container-mobile">
              <div className="ow:px-2">© {new Date().getFullYear()} Overture.</div>
              <NetlifyBadge className="netlify-badge-mobile" />
            </div>

            {/* Acknowledgements used to repeat here, a second link to a page
                already in the row above. Retired with the page itself. */}
            <div className="ow:px-4 ">
              <Link to={PRIVACY_PATH}>Privacy</Link>
              <span>|</span>
              <Link to={TERMS_PATH}>Terms &amp; Conditions</Link>
            </div>
            <NetlifyBadge className="netlify-badge-tablet" />
          </div>
        </div>
      </footer>
    </div>
  );
}
