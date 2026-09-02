// Every deployment there is, ours and other people's, as one list: what
// /impact/ renders as `#platforms`, and what /products/ inverts to answer
// "who uses this component".
//
// The reverse lookup (`usedBy` below) reads from this array, not
// componentUsage.ts's full key set: componentUsage also carries lineage
// platforms (kidsFirst, icgc25k, gdc) that render no row anywhere, and those
// must never surface on /products/ as a link with nothing to land on.

import type { ReactNode } from "react";
import { componentUsage } from "./componentUsage";
import { independentAdopters } from "./dependents";
import { platforms } from "./platforms";

/**
 * The id on /impact/'s Deployments heading. Named here rather than inlined,
 * since ComponentTable's "Used by" column also needs it: a component used
 * by several deployments links to
 * `IMPACT_PATH?used-by={id}#{DEPLOYMENTS_ANCHOR}`, letting impact/index.tsx
 * highlight every matching row rather than just scroll to the section.
 */
export const DEPLOYMENTS_ANCHOR = "platforms";

/** The id on /impact/'s Collaborations heading, the table's other half. */
export const COLLABORATIONS_ANCHOR = "collaborations";

/** A source citation: what the reader is about to open, not the bare URL. */
export type DeploymentLink = { label: string; href: string };

export type DeploymentRow = {
  id: string;
  /** Every row carries one; it is the anchor /impact/ places on its `<tr>`. */
  anchorId: string;
  name: string;
  /**
   * The running portal for a platform; for the two rows that aren't ours,
   * the first source documenting them instead, since neither publishes a
   * portal. Absent only where there's nowhere to go (the Drug Discovery
   * Portal, internal access).
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
  /**
   * Which of /impact/'s two tables the row renders in. Not inferred from
   * which array the row came from: the Drug Discovery Portal is tier-1 data
   * (`platforms`, "we build and run it") but reads as a collaboration
   * alongside AGARI and CQDG rather than as a deployment alongside its six
   * siblings, on the developer's instruction, 2026-09-02.
   */
  table: "deployments" | "collaborations";
};

/**
 * One array, two tables: previously two separate card grids ("other people
 * chose this" vs. "we built seven things"), then one merged table, split
 * again 2026-09-02 into Deployments and Collaborations — see `table` above
 * for what decides which table a row renders in. Kept as one array (rather
 * than two exports) because `usedBy` below and /impact/'s highlight state
 * both need to search every row regardless of which table it renders in.
 *
 * Sorted by launch year, most recent first, undated at the foot — the only
 * thing deciding order within a table now. The Led by column names the
 * institution behind every row instead (AGARI is Africa CDC's, CQDG is
 * Ferlab's).
 *
 * `Number()` on the year, not a string compare, so a four-digit year sorts
 * numerically. Ties hold source order (`Array.prototype.sort` is stable).
 */
export const deploymentRows: DeploymentRow[] = [
  ...independentAdopters.map(
    (adopter): DeploymentRow => ({
      id: `beyond-${adopter.id}`,
      anchorId: adopter.id,
      name: adopter.name,
      // The first source — the closest thing to "the deployment" for these two.
      href: adopter.sources[0]?.href,
      institution: adopter.institution,
      where: adopter.where,
      since: adopter.launched,
      summary: adopter.body,
      runs: componentUsage[adopter.id] ?? [],
      links: adopter.sources,
      table: "collaborations",
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
      table: platform.id === "drugDiscovery" ? "collaborations" : "deployments",
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
