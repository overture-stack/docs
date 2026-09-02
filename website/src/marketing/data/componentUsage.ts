import { components } from "./components";

/**
 * Which HeroDiagram components each LogoCarousel platform uses. Sourced
 * either from each platform's old case-study list (matched to
 * data/components.ts's ids by codename) or confirmed directly with the
 * developer where no such list exists. Not guessed at either way.
 *
 * ICGC-ARGO's old case study also named a generic "access and
 * authorization" capability; excluded here since it maps to no real
 * component — the one that used to provide it, Ego, is discontinued with
 * no confirmed replacement. Control (unshipped, see data/heroDiagram.ts) is
 * being built for iMicroSeq and OHCRN specifically — the one place a
 * platform is mapped to a component before it's shipped.
 */
export const componentUsage: Record<string, string[]> = {
  // Lectern added 2026-08-12, confirmed by the developer directly — the
  // case study's own list never named it, but an internal deployment
  // record does.
  icgcargo: ["song", "score", "lectern", "maestro", "arranger", "stage"],
  virusseq: ["score", "song", "maestro", "arranger", "lectern", "lyric", "control"],
  kidsFirst: ["song", "score", "arranger"],
  ihcc: ["arranger", "stage"],
  humanCancerModels: ["arranger", "stage"],
  ohcrn: ["arranger", "control"],
  drugDiscovery: ["arranger", "stage"],
  pcgl: ["song", "score", "lectern", "lyric"],
  icgc25k: ["song", "score", "arranger", "maestro", "stage"],
  gdc: ["maestro", "arranger", "stage"],
  // CQDG's own fork list (dependents.ts `uses`), not the developer: Ferlab's
  // repositories are the source, named there.
  ferlab: ["lectern", "arranger"],
};

// Values above are plain strings, not typed against the real component-id
// union (HeroDiagram/LogoCarousel read them just as loosely). This throws
// at module load — build time — if any entry names a component that
// doesn't exist in data/components.ts, instead of silently matching nothing.
const validComponentIds = new Set(components.map((component) => component.id));
for (const [platformId, componentIds] of Object.entries(componentUsage)) {
  for (const componentId of componentIds) {
    if (!validComponentIds.has(componentId)) {
      throw new Error(
        `componentUsage["${platformId}"] names "${componentId}", which is not a component id in data/components.ts`,
      );
    }
  }
}
