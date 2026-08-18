import useDocusaurusContext from "@docusaurus/useDocusaurusContext";

/**
 * Whether this build is the marketing site rather than the documentation site.
 *
 * One repository produces both. `docusaurus.config.ts` reads `OVERTURE_SITE`
 * and puts the answer in `customFields.site`, which is the only thing that
 * differs between them at runtime: the marketing build serves overture.bio and
 * contains only the pages under src/marketing/pages/, the documentation build
 * serves docs.overture.bio and contains no marketing routes at all.
 *
 * This replaced a route-based check. While a single build served both sites,
 * the swizzled Navbar and Footer had to compare the current route against a
 * list of marketing paths; now that each build holds one site's routes, asking
 * the build is both simpler and correct for routes the list never covered,
 * such as 404s.
 */
export default function useIsMarketingSite(): boolean {
  const { siteConfig } = useDocusaurusContext();

  return siteConfig.customFields?.site === "marketing";
}
