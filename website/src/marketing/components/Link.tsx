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

  return (
    <DocusaurusLink {...props} to={to}>
      {children}
    </DocusaurusLink>
  );
}
