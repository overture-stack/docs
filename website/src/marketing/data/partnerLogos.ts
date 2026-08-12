import { lineage, platforms } from "./platforms";
import { IMPACT_PATH } from "../constants/pages";

export type PartnerLogo = {
  id: string;
  icon: string;
  name: string;
  href?: string;
  /**
   * When each platform ran: "Since 2019", "2007-2024", "In development".
   * LogoCarousel showed this under the logo until 2026-08-11, when the band was
   * cut down to finish above the fold; kept as the record (and as the wording to
   * put back if the line returns), not currently rendered anywhere.
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
      // `platform.href` only exists for the four platforms with a
      // case-study write-up (`IMPACT_PATH` plus their own anchor — see the
      // field's own comment in platforms.ts); OHCRN and PCGL have neither, so
      // without this fallback they linked to the bare `/impact/` page rather
      // than their own row. Building the identical `IMPACT_PATH#<id>`
      // address by hand for them lands there exactly like the other four
      // already do, and `:target` (_impact.scss) flashes the row on
      // arrival — the same cue a single-deployment "Used by" link on
      // /products/ gives (ComponentTable.tsx).
      href: platform.href ?? `${IMPACT_PATH}#${platform.id}`,
      date: opts.date ?? (platform.launched ? `Since ${platform.launched}` : undefined),
      startYear: opts.startYear ?? (platform.launched ? Number(platform.launched) : undefined),
      // `platform.summary`, not the case study's own long-form paragraph:
      // that field's own comment in platforms.ts says it's "one line, for
      // scanning" — this is a scanning context, same as the OHCRN/PCGL
      // entries below, which never had a case study to pull a longer
      // paragraph from in the first place and were the length this was
      // measured against.
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
 * Who runs Overture, scrolling in LogoCarousel below the hero: most recent
 * start year to oldest. Every entry has one as of 2026-08-12; the sort still
 * handles a missing year, since the next platform added may well be announced
 * before it launches. EU CanCan (removed 2026-08-10) had neither a confirmed
 * relationship to Overture nor a date, so it isn't here rather than being
 * guessed into a position.
 *
 * The lineage dates (ICGC 25K, GDC, Kids First) don't read "Since Y": these
 * are no longer what the team runs there (that's the whole distinction
 * between `platforms.ts` and `lineage`), so "since" would read as
 * still-ongoing when it isn't. GDC and Kids First specifically used
 * Overture components in their first renditions, but both diverged enough
 * since — still largely the same stack, heavily customized — that the
 * developer no longer considers what runs there today "an Overture
 * component" (2026-08-10); "Originally Y" marks a starting point without
 * that overstatement, which a bare year doesn't. ICGC 25K's "2007-2024" is a
 * closed range rather than a single year, which doesn't have the same
 * problem: the range itself already says the period is over.
 *
 * `impact` (LogoCarousel's tooltip) defaults to the platform/lineage
 * `summary` used everywhere else on the site, rather than new text, for
 * now — deliberately not the longer paragraph each case study's own page
 * carries, which read fine as a page's opening paragraph and far too long
 * as a hover tooltip. Pass `{ impact: "..." }` to `platformLogo()` to write
 * something purpose-built instead, per platform, whenever there's real
 * impact copy to put there. `[NEEDS: impact statements]` in
 * .dev/roadmap.md tracks which ones are still borrowed text.
 */
export const partnerLogos: PartnerLogo[] = [
  // PCGL read "In development" with no start year until 2026-08-12, when the
  // developer confirmed its submission portal is live and that launching it was
  // our own directive. It has a launch year in metrics.ts now, so it sorts with
  // the rest rather than ahead of them, and no entry here needs the
  // no-start-year branch of the sort below any more.
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
