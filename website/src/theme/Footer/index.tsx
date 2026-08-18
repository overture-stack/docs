import React from "react";
import Footer from "@theme-original/Footer";
import MarketingFooter from "@site/src/marketing/components/MarketingFooter";
import useIsMarketingSite from "@site/src/marketing/useIsMarketingSite";

/**
 * The footer half of the same split. See src/theme/Navbar/index.tsx.
 *
 * A marketing navbar over the documentation footer would still read as one
 * site, which is the thing this is meant to fix.
 */
export default function FooterWrapper(
  props: React.ComponentProps<typeof Footer>,
): React.JSX.Element {
  const isMarketing = useIsMarketingSite();

  return isMarketing ? <MarketingFooter /> : <Footer {...props} />;
}
