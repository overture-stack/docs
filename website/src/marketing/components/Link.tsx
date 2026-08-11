import React from "react";
import DocusaurusLink from "@docusaurus/Link";

/**
 * Replaces the Gatsby site's LinkHelper.
 *
 * The original wrapped `gatsby`'s Link, joined internal URLs with
 * proper-url-join, and hand-rolled smooth scrolling for same-page hashes
 * because Gatsby's router did not do it. Docusaurus's Link handles internal
 * routing and hash targets itself, so all that is left is the one behaviour
 * worth keeping: external links open in a new tab, safely.
 */
export type LinkProps = React.ComponentProps<typeof DocusaurusLink> & {
  to?: string;
};

export default function Link({ to = "", children, ...props }: LinkProps) {
  const isExternal = /^\b(http|mailto)/.test(to);

  if (isExternal) {
    return (
      <a {...props} href={to} target="_blank" rel="noopener noreferrer">
        {children}
      </a>
    );
  }

  if (!to) {
    // Was `<a name="...">` in the Gatsby markup: an anchor with no destination.
    return <a {...props}>{children}</a>;
  }

  // A hash on its own is a target on the page already open, so hand it to the
  // browser rather than to the router: react-router resolves a bare hash
  // against the current path and pushes a new history entry, which lands on the
  // same page without scrolling anywhere. Docusaurus's Link is for changing
  // route, and this is not one. (The home page's "Get Started" button is the
  // first thing here to need it.)
  if (to.startsWith("#")) {
    return (
      <a {...props} href={to}>
        {children}
      </a>
    );
  }

  return (
    <DocusaurusLink {...props} to={to}>
      {children}
    </DocusaurusLink>
  );
}
