// Who builds on Overture without us: independent adopters, folded into the
// same deployments table /impact/ renders everything else from (see
// data/deployments.ts's `independentAdopters` mapping).
//
// Replaces `adopters` in data/platforms.ts (three entries, no links, one too
// vague to tell what was claimed), removed rather than kept beside this one
// — two lists of adopters is the drift this data layer exists to prevent.
//
// **Every entry is linked, as a constraint, not a nicety**: the claim is
// that other institutions chose this independently, worth nothing on our
// word alone. No organization is named without a public source; where the
// source is the organization's own words, they're quoted, not paraphrased.
// Unsourced claims don't go on the page, however true.
//
// Narrowed on 2026-08-12 to the two cases with the clearest, most durable
// evidence: a third party's own procurement documents naming the framework,
// and a partner organization actively developing its own fork. A wider list
// of ten repositories this page used to cite read as padding next to those
// two, not corroboration.

export type DependentSource = {
  /** What the reader is about to open, not the bare URL. */
  label: string;
  href: string;
};

export type IndependentAdopter = {
  id: string;
  name: string;
  /** The institution behind it, when the name alone does not say. */
  institution?: string;
  where: string;
  /**
   * Launch year, where publicly announced. Absent is meaningful, not a gap
   * to fill by inference: CQDG's evidence is a commit history, not a
   * launch, so it stays undated; AGARI's remaining source (after its launch
   * announcement was dropped) is a tender, not a launch, so it's undated
   * too. Both sort last as a result.
   */
  launched?: string;
  /** Which Overture components this adopter is documented as running. */
  uses?: string;
  /**
   * What they built and why it counts. Written to be read on its own; the
   * sources under it are how a reader checks it, not where the claim lives.
   */
  body: string;
  /**
   * The organization's own words, where they have described the dependency
   * themselves. This is the strongest form the evidence takes, so it is a field
   * rather than something buried in `body`.
   */
  quote?: string;
  /** Who said it, for the quote. */
  quoteSource?: string;
  sources: DependentSource[];
};

/**
 * The two cases with the clearest, most durable third-party evidence of the
 * ten this page used to cite. CQDG first, AGARI second: both are undated
 * (see `launched` above), and the deployment table's stable sort means
 * array order breaks the tie.
 */
export const independentAdopters: IndependentAdopter[] = [
  {
    id: "ferlab",
    name: "CQDG",
    institution: "Ferlab, CHU Sainte-Justine",
    where: "Montréal, Canada",
    uses: "Dictionary Manager (Lectern), Search (Arranger)",
    body: "Ferlab's data platform for the Centre québécois de données génomiques, built on active forks of Lectern and Arranger it upgraded and patched into 2026.",
    sources: [
      {
        label: "Ferlab-Ste-Justine/lectern",
        href: "https://github.com/Ferlab-Ste-Justine/lectern",
      },
      {
        label: "Ferlab-Ste-Justine/arranger",
        href: "https://github.com/Ferlab-Ste-Justine/arranger",
      },
    ],
  },
  {
    id: "agari",
    name: "AGARI",
    institution: "Africa CDC",
    where: "Continent-wide, Africa",
    uses: "Overture components, deployed on their own Kubernetes cluster",
    body: "Africa CDC's continent-wide pathogen genomics resource, launched November 2025 across four member states with the African Society for Laboratory Medicine and SANBI.",
    quote:
      "leverages the overture.bio framework and extends other functionalities … data storage services were drawn from the Overture.Bio and CanCOGen VirusSeq software collections",
    quoteSource:
      "ASLM RFP No. ASLM/ACDC/AGARI/01/28/25",
    sources: [
      {
        label: "ASLM request for proposals (PDF)",
        href: "https://aslm.org/wp-content/uploads/2025/01/RFP-FOR-CONSULTANCY-FOR-CONSULTANCY-FOR-ENHANCING-AND-UPGRADING-THE-FUNCTIONALITY-OF-AGARI-RFP-No.-ASLM-ACDC-AGARI-01-28-25.pdf",
      },
    ],
  },
];
