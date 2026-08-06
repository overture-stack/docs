import { useLocation } from "@docusaurus/router";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import { MARKETING_PATHS } from "./constants/pages";

/**
 * Whether the route being rendered belongs to the marketing site.
 *
 * One Docusaurus build serves both the documentation and the marketing pages,
 * and they need different navigation: a reader should be able to tell which of
 * the two sites they are on. The swizzled Navbar and Footer use this to decide
 * which chrome to render.
 *
 * Stage 3 splits the two hostnames into separate builds off this repo. This
 * hook keeps working then, since it asks about the route rather than the build.
 */
export default function useIsMarketingRoute(): boolean {
  const { pathname } = useLocation();
  const { siteConfig } = useDocusaurusContext();

  // Strip the site's baseUrl so the comparison works under a path prefix.
  const base = siteConfig.baseUrl.replace(/\/$/, "");
  const route = pathname.startsWith(base) ? pathname.slice(base.length) : pathname;
  const normalized = route.endsWith("/") ? route : `${route}/`;

  return MARKETING_PATHS.includes(normalized);
}
