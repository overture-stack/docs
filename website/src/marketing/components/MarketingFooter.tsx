import React from "react";
import Link from "./Link";
import {
  ABOUT_US_PATH,
  ACKNOWLEDGEMENTS_PATH,
  CASE_STUDIES_PATH,
  PRIVACY_PATH,
  PRODUCTS_PATH,
  SERVICES_PATH,
  TERMS_PATH,
} from "../constants/pages";
import {
  NETLIFY_LINK,
  NETLIFY_IMAGE_LINK,
  OICR_LINK,
  OVERTURE_DOCUMENTATION_LICENSING,
} from "../constants/externalLinks";

const OICR_LOGO = "/img/marketing/chrome/oicr_logo.svg";

const links = [
  { name: "Products", url: PRODUCTS_PATH },
  { name: "About Us", url: ABOUT_US_PATH },
  { name: "Acknowledgements", url: ACKNOWLEDGEMENTS_PATH },
  { name: "Services", url: SERVICES_PATH },
  { name: "Case Studies", url: CASE_STUDIES_PATH },
  { name: "Software Licensing", url: OVERTURE_DOCUMENTATION_LICENSING },
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
 * Declarative, like the Gatsby original: it loops over the links above rather
 * than spelling each one out. Wrapped in `.marketing` for the same reason the
 * navbar is, and with the same descendant-selector caveat.
 */
export default function MarketingFooter() {
  return (
    <div className="marketing">
      <footer className="Footer">
        <div className="footer-white">
          <Link className="footer-white__oicr-logo" to={OICR_LINK}>
            <img src={OICR_LOGO} alt="Ontario Institute for Cancer Research" />
          </Link>
          <div className="footer-white__links-holder">
            <div className="links-container">
              {links.map((link) => (
                <Link
                  className="links-container__link"
                  to={link.url}
                  key={link.name}
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>
          <NetlifyBadge className="netlify-badge-desktop" />
        </div>
        <div className="bg-grey px1 footer-grey">
          <div className="footer-grey__text ">
            <div className="footer-grey__top-container-mobile">
              <div className="px1">© {new Date().getFullYear()} Overture.</div>
              <NetlifyBadge className="netlify-badge-mobile" />
            </div>

            <div className="px2 ">
              <Link to={PRIVACY_PATH}>Privacy</Link>
              <span>|</span>
              <Link to={TERMS_PATH}>Terms &amp; Conditions</Link>
              <span>|</span>
              <Link to={ACKNOWLEDGEMENTS_PATH}>Acknowledgements</Link>
            </div>
            <NetlifyBadge className="netlify-badge-tablet" />
          </div>
        </div>
      </footer>
    </div>
  );
}
