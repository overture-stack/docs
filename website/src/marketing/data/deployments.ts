// Every deployment there is, ours and other people's, as one list: what
// /impact/ renders as `#platforms`, and the single source /products/ inverts
// to answer "who uses this component". Moved out of impact/index.tsx on
// 2026-08-12 for that second reader.
//
// Building the reverse lookup (`usedBy` below) from this array rather than
// from componentUsage.ts's full key set is what keeps a component's "Used by"
// list honest: componentUsage also carries entries for lineage platforms
// (kidsFirst, icgc25k, gdc) that are no longer rendered as a row anywhere on
// the site, and those must never surface on /products/ as a link with nothing
// on the other end of it.

import type { ReactNode } from "react";
import { componentUsage } from "./componentUsage";
import { independentAdopters } from "./dependents";
import { platforms } from "./platforms";

/**
 * The id on /impact/'s Deployments section heading. Named here, rather than
 * only as a literal `id="platforms"` in impact/index.tsx, because
 * ComponentTable's "Used by" column also needs it: a component used by more
 * than one deployment collapses to "N deployments" (see `usedBy` below) and
 * links here — as `IMPACT_PATH?used-by={componentId}#{DEPLOYMENTS_ANCHOR}`,
 * carrying the component id so impact/index.tsx can highlight every matching
 * row on arrival, not just scroll to the section — there being no single row
 * among several for a bare fragment to point at instead.
 */
export const DEPLOYMENTS_ANCHOR = "platforms";

export type DeploymentLink = { label: string; href: string };

export type DeploymentRow = {
  id: string;
  /** Every row carries one; it is the anchor /impact/ places on its `<tr>`. */
  anchorId: string;
  name: string;
  /**
   * The deployment itself: the running portal for a platform, and for the two
   * rows that are not ours, the first of the sources documenting them, since
   * neither publishes a portal we can send a reader to. The name is a link to
   * it. Absent only where there is nowhere to go, which today is the Drug
   * Discovery Portal, whose access is internal.
   */
  href?: string;
  institution?: string;
  where?: string;
  /** Launch year. Absent on a deployment with no public date, which sorts last. */
  since?: string;
  summary: ReactNode;
  /**
   * Component ids, not a rendered string: /impact/'s Runs cell is a row of
   * icons that each link to their component on /products/, and /products/'s
   * "Used by" cell (`usedBy` below) is this same field read the other way.
   */
  runs: string[];
  /** Absolute path into static/. Drives /impact/'s hover preview; most rows have none. */
  screenshot?: string;
  links: DeploymentLink[];
};

/**
 * One table, two kinds of row, consolidated on 2026-08-12 on the developer's
 * instruction: the site used to argue "other people chose this" and "we built
 * seven things" in two separate card grids, and a reader had to already know to
 * look for the distinction.
 *
 * Sorted by launch year, most recent first, with the undated at the foot. That
 * is the only thing deciding order now: the rows that are not ours carried an
 * `Independent` badge and sat above the rest until the same day, and both went
 * on the developer's instruction. The Led by column still names the institution
 * behind every row, which is where a reader now sees that AGARI is Africa CDC's
 * and CQDG is Ferlab's.
 *
 * `Number()` on the year rather than a string compare, so a four-digit year is
 * ordered as a number and not by its first character. Ties hold their source
 * order, `Array.prototype.sort` being stable.
 */
export const deploymentRows: DeploymentRow[] = [
  ...independentAdopters.map(
    (adopter): DeploymentRow => ({
      id: `beyond-${adopter.id}`,
      anchorId: adopter.id,
      name: adopter.name,
      // The first source, which is the closest thing to "the deployment" these
      // two have: AGARI's launch announcement and Ferlab's own repository.
      href: adopter.sources[0]?.href,
      institution: adopter.institution,
      where: adopter.where,
      since: adopter.launched,
      summary: adopter.body,
      runs: componentUsage[adopter.id] ?? [],
      links: adopter.sources,
    }),
  ),
  ...platforms.map((platform): DeploymentRow => {
    const links: DeploymentLink[] = [];
    if (platform.portal) {
      links.push({ label: "Visit the platform", href: platform.portal });
    }
    return {
      id: `platform-${platform.id}`,
      anchorId: platform.id,
      name: platform.name,
      href: platform.portal,
      institution: platform.institution,
      where: platform.country,
      since: platform.launched,
      summary: platform.summary,
      runs: componentUsage[platform.id] ?? [],
      screenshot: platform.screenshot,
      links,
    };
  }),
].sort((a, b) => {
  if (!a.since) return b.since ? 1 : 0;
  if (!b.since) return -1;
  return Number(b.since) - Number(a.since);
});

/**
 * The deployments that run a given component, for /products/'s "Used by"
 * column. Reads `deploymentRows` rather than componentUsage.ts directly, so a
 * component can never come back with a deployment that has no anchor for the
 * link to land on — see the note at the top of this file.
 */
export function usedBy(
  componentId: string,
): { name: string; anchorId: string }[] {
  return deploymentRows
    .filter((row) => row.runs.includes(componentId))
    .map((row) => ({ name: row.name, anchorId: row.anchorId }));
}
