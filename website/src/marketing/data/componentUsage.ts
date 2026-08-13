import { components } from "./components";

/**
 * Which HeroDiagram components each LogoCarousel platform uses. Five of the
 * nine (ICGC-ARGO, iMicroSeq, Kids First, IHCC, HCMI) started from each
 * platform's "How was Overture used?" list in the now-deleted caseStudies.tsx
 * (component names there were functional, e.g. "File Manager (Song)"; matched
 * to data/components.ts's ids by codename); Stage on those same five plus the
 * remaining platforms (OHCRN, PCGL, ICGC 25K, GDC, the Drug Discovery
 * Portal), which have no such list anywhere in the codebase, came directly
 * from the developer. Not guessed at either way: this is factual content
 * about real deployments.
 *
 * ICGC-ARGO's case study also named a generic "access and authorization"
 * capability; excluded here. It isn't Control (an unshipped, distinct
 * component confirmed with the developer — see data/heroDiagram.ts) or any
 * other real component: the deleted case study's own note said the line
 * named the capability because the component that used to provide it, Ego,
 * is discontinued, and nothing sourced says what replaced it there. Control
 * itself, still in development, is being built for iMicroSeq and OHCRN
 * specifically (confirmed with the developer 2026-08-10) — the one place a
 * platform here is mapped to a component before that component has shipped.
 */
export const componentUsage: Record<string, string[]> = {
  // Lectern added 2026-08-12, from the developer directly. The case study's own
  // "How was Overture used?" list, which this row started from, never named it;
  // the RSMF Phase 2 supporting-evidence deployment table does, and the
  // developer confirmed it.
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

// Values above are plain strings, not a literal union of real component ids
// (HeroDiagram and LogoCarousel both read them against ids typed just as
// loosely — see ComponentHighlightContext), so a typo'd id would otherwise
// compile cleanly and just silently never match anywhere. This throws at
// module load instead, which is build time: every entry has to name a
// component that actually exists in data/components.ts.
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
