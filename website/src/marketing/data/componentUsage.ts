/**
 * Which HeroDiagram components each LogoCarousel platform uses. Five of the
 * nine (ICGC-ARGO, iMicroSeq, Kids First, IHCC, HCMI) started from each
 * platform's "How was Overture used?" list in caseStudies.tsx (component
 * names there are functional, e.g. "File Manager (Song)"; matched to
 * data/components.ts's ids by codename); Stage on those same five plus the
 * remaining four (OHCRN, PCGL, ICGC 25K, GDC), which have no such list
 * anywhere in the codebase, came directly from the developer 2026-08-10.
 * Not guessed at either way: this is factual content about real
 * deployments.
 *
 * ICGC-ARGO's case study also names a generic "access and authorization"
 * capability; excluded here. It isn't Control (an unshipped, distinct
 * component confirmed with the developer — see data/heroDiagram.ts) or any
 * other real component: caseStudies.tsx's own note says the line names the
 * capability because the component that used to provide it, Ego, is
 * discontinued, and nothing sourced says what replaced it there. Control
 * itself, still in development, is being built for iMicroSeq and OHCRN
 * specifically (confirmed with the developer 2026-08-10) — the one place a
 * platform here is mapped to a component before that component has shipped.
 */
export const componentUsage: Record<string, string[]> = {
  icgcargo: ["song", "score", "maestro", "arranger", "stage"],
  virusseq: ["score", "song", "maestro", "arranger", "lectern", "lyric", "control"],
  kidsFirst: ["song", "score", "arranger"],
  ihcc: ["arranger", "stage"],
  humanCancerModels: ["arranger", "stage"],
  ohcrn: ["arranger", "control"],
  pcgl: ["song", "score", "lectern", "lyric"],
  icgc25k: ["song", "score", "arranger", "maestro", "stage"],
  gdc: ["maestro", "arranger", "stage"],
};
