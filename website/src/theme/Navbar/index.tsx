import React from "react";
import Navbar from "@theme-original/Navbar";
import MarketingNavbar from "@site/src/marketing/components/MarketingNavbar";
import useIsMarketingSite from "@site/src/marketing/useIsMarketingSite";

/**
 * One repository builds two sites, so it carries two navbars.
 *
 * The marketing build gets the overture.bio navigation; the documentation
 * build gets the navbar configured in docusaurus.config.ts, untouched.
 */
export default function NavbarWrapper(
  props: React.ComponentProps<typeof Navbar>,
): React.JSX.Element {
  const isMarketing = useIsMarketingSite();

  return isMarketing ? <MarketingNavbar /> : <Navbar {...props} />;
}
