import React from "react";
import Navbar from "@theme-original/Navbar";
import MarketingNavbar from "@site/src/marketing/components/MarketingNavbar";
import useIsMarketingRoute from "@site/src/marketing/useIsMarketingRoute";

/**
 * One build serves two sites, so it serves two navbars.
 *
 * Marketing routes get the overture.bio navigation; everything else gets the
 * documentation navbar configured in docusaurus.config.ts, untouched.
 */
export default function NavbarWrapper(
  props: React.ComponentProps<typeof Navbar>,
): React.JSX.Element {
  const isMarketing = useIsMarketingRoute();

  return isMarketing ? <MarketingNavbar /> : <Navbar {...props} />;
}
