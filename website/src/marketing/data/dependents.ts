// Who builds on Overture without us: the tier .dev/ia-proposal.md § /impact/ Hub
// called "arguably the most persuasive evidence on the whole site", and which
// has rendered nowhere since that page was written.
//
// It replaces `adopters` in data/platforms.ts, which was three entries, no
// links, and one of them ("Overture components in their own stack") vague enough
// that a reader could not tell what was being claimed. That export is gone
// rather than kept beside this one: two lists of adopters is exactly the drift
// this data layer exists to prevent.
//
// **Every entry here is linked, and that is a constraint rather than a
// nicety.** The claim being made is that other institutions chose this
// independently, which is worth nothing if the reader has to take our word for
// it. So: no organization is named without a public source a reader can open,
// and where the source is an organization's own words about their own system,
// those words are quoted rather than paraphrased. Anything we cannot source this
// way does not go on the page, however true we believe it to be.
//
// Sourced from the RSMF Phase 2 supporting-evidence submission, §2 and §4,
// collected 2026-08-11. Narrowed on 2026-08-12, on the developer's instruction,
// to the two cases with the clearest, most durable evidence: a funding body's
// own procurement documents naming the framework, and a partner organization
// actively developing its own fork rather than carrying an old one. The wider
// list of ten repositories this page used to cite read as padding next to
// those two, not as corroborating evidence.

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
   * Launch year, where the organization has announced one publicly. Added
   * 2026-08-12, when /impact/ started ordering every deployment by recency
   * rather than by whose it is: without it these two rows sort to the foot of
   * the table by default rather than because nothing is known about them.
   *
   * Absent is meaningful and is not a gap to fill by inference. CQDG has no
   * launch announcement of Ferlab's fork to date it by, and the evidence there
   * is a commit history rather than a launch, so it stays undated and sorts
   * last. AGARI lost its dated source the same way on 2026-08-12, when its
   * launch announcement was dropped from `sources`: the remaining source is a
   * tender, not a launch, so it is undated too now.
   */
  launched?: string;
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
 * The two cases where a third party has documented the dependency themselves,
 * in their own tender or commit history, with the clearest and most durable
 * evidence of the ten this page used to cite.
 *
 * CQDG first, AGARI second: both are undated now (see the note on `launched`
 * above) and the deployment table's sort is stable, so array order is what
 * breaks the tie. AGARI moved to the foot of that tie on 2026-08-12, on the
 * developer's instruction.
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
