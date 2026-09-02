import { lineage, platforms } from "./platforms";
import { IMPACT_PATH } from "../constants/pages";

export type PartnerLogo = {
  id: string;
  icon: string;
  name: string;
  href?: string;
  /**
   * When each platform ran: "Since 2019", "2007-2024", "In development".
   * Not currently rendered (LogoCarousel dropped the line to finish above
   * the fold); kept as the record.
   */
  date?: string;
  /** Start year, for ordering only (most recent first). Absent (in development) sorts first. */
  startYear?: number;
  /** A sentence or two on what Overture makes possible there, shown in LogoCarousel's tooltip. */
  impact?: string;
};

function platformLogo(
  id: string,
  opts: { date?: string; startYear?: number; impact?: string } = {},
): PartnerLogo {
  const platform = platforms.find((p) => p.id === id);
  if (platform) {
    if (!platform.logo) {
      throw new Error(`partnerLogos: platform "${id}" has no logo`);
    }
    return {
      id: platform.id,
      icon: platform.logo,
      name: platform.name,
      // /impact/'s own row, carrying `?highlight={id}` — the same param
      // heroDiagram.ts and impact/index.tsx's Runs icons use into
      // /products/ — rather than `platform.href`'s plain fragment, so every
      // logo gets the persistent `ImpactTable__highlight` on arrival, not
      // just a `:target` flash.
      href: `${IMPACT_PATH}?highlight=${platform.id}#${platform.id}`,
      date: opts.date ?? (platform.launched ? `Since ${platform.launched}` : undefined),
      startYear: opts.startYear ?? (platform.launched ? Number(platform.launched) : undefined),
      // `platform.summary` (already "one line, for scanning" per
      // platforms.ts), not a case study's longer paragraph — this is a
      // scanning context too.
      impact: opts.impact ?? platform.summary,
    };
  }

  const lineageEntry = lineage.find((p) => p.id === id);
  if (!lineageEntry || !lineageEntry.logo) {
    throw new Error(`partnerLogos: no logo data for "${id}"`);
  }
  return {
    id: lineageEntry.id,
    icon: lineageEntry.logo,
    name: lineageEntry.name,
    href: lineageEntry.link,
    date: opts.date,
    startYear: opts.startYear,
    impact: opts.impact ?? lineageEntry.summary,
  };
}

/**
 * Who runs Overture, scrolling in LogoCarousel: most recent start year to
 * oldest, with a missing year still handled since the next platform added
 * may be announced before it launches.
 *
 * The lineage dates (ICGC 25K, GDC, Kids First) don't read "Since Y": these
 * are no longer what the team runs there, so "since" would wrongly read as
 * ongoing. "Originally Y" marks a starting point without that overstatement;
 * ICGC 25K's "2007-2024" is a closed range, which has no such problem.
 *
 * `impact` (LogoCarousel's tooltip) defaults to the platform/lineage
 * `summary`, not a case study's longer paragraph — too long for a tooltip.
 * Pass `{ impact: "..." }` to `platformLogo()` for purpose-built copy per
 * platform.
 */
export const partnerLogos: PartnerLogo[] = [
  // No entry here currently needs the sort's no-start-year branch (every
  // platform below has a startYear); kept for whichever is added next
  // without one.
  platformLogo("pcgl"), // 2026
  platformLogo("ohcrn"), // 2025
  platformLogo("virusseq"), // 2021
  platformLogo("ihcc"), // 2020
  platformLogo("icgcargo"), // 2019
  platformLogo("humanCancerModels"), // 2016
  platformLogo("icgc25k", { startYear: 2007, date: "2007–2024" }),
  platformLogo("gdc", { startYear: 2016, date: "Originally 2016" }),
  platformLogo("kidsFirst", { startYear: 2018, date: "Originally 2018" }),
].sort((a, b) => {
  if (a.startYear === undefined) return b.startYear === undefined ? 0 : -1;
  if (b.startYear === undefined) return 1;
  return b.startYear - a.startYear;
});
