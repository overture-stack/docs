// What the /impact/ hub shows, in three fixed tiers.
//
// The tiers exist because platforms genuinely differ by who runs them, and the old
// single list flattened them. Tier 2 is the one that was missing entirely, and
// it is the most persuasive evidence the site has: it is the difference between
// "we built seven things" and "other people choose this".
//
// Figures live in metrics.ts, never here. Card copy is written for scanning; the
// long-form write-up four platforms once had lived in caseStudies.tsx, which
// the hub rendered below the cards. Removed 2026-08-12 (see the note on `id`
// below) — data/caseStudies.tsx and components/CaseStudy were deleted with it.

import metrics from "./metrics";
import {
  GDC_LINK,
  HCMIS_PORTAL_LINK,
  ICGC_ARGO_PORTAL_LINK,
  ICGC_LINK,
  IHCC_PORTAL_LINK,
  IMICROSEQ_PORTAL_LINK,
  KIDS_FIRST_LINK,
  OHCRN_PORTAL_LINK,
  PCGL_PORTAL_LINK,
} from "../constants/externalLinks";
import { IMPACT_PATH } from "../constants/pages";

export type Platform = {
  /**
   * Anchor id on the hub, and the same slug the case study has carried since
   * the Gatsby site. `/case-studies/#icgcargo` and its siblings are linked from
   * the home page and from outside; the 301 to `/impact/` keeps the fragment,
   * so these ids are what makes those links still land. On the hub the id sits
   * on the write-up when there is one, and on the card when there is not.
   */
  id: string;
  name: string;
  /** Launch year. Absent while a platform has no public date. */
  launched?: string;
  /**
   * Who leads the platform, and where it runs. Both from the deployment table
   * in the RSMF Phase 2 supporting evidence, added 2026-08-12 so a card says
   * whose platform it is rather than only what it holds. Four of the six are
   * led by someone other than us, which is the fact these two fields exist to
   * make visible: a page that lists six platforms without naming their leads
   * reads as a portfolio of ours.
   */
  institution?: string;
  /** `multi-national` where a consortium spans several. */
  country?: string;
  /** One line, for scanning. The page carries the argument. */
  summary: string;
  /**
   * Where this platform is written up: `/impact/` plus its own anchor. Only the
   * four with a write-up carry one. It is the address for links from other
   * pages; the hub itself links to the bare fragment instead, since going
   * through the router to reach the page already open scrolls nowhere.
   *
   * The build warns that these four anchors are broken. They are not: the ids
   * are in the emitted HTML. Docusaurus does not collect ids from JSX pages, so
   * it cannot see any anchor on a marketing page, which is the same reason the
   * footer's `/home/#collaborate-heading` is on that list on every page.
   */
  href?: string;
  /** The live deployment, off-site. */
  portal?: string;
  /** Absolute path into static/. Only the four that carry one. */
  logo?: string;
  /**
   * A screenshot of the running portal, absolute path into static/. Named
   * here (rather than only on the now-deleted case study) so a band that
   * cites a platform can show it directly: the home page's capability cards
   * do exactly that.
   *
   * Five platforms carry one, under the historical filename `chart.png`.
   */
  screenshot?: string;
};

const LOGOS = "/img/marketing/case-studies-data";

/**
 * Tier 1: platforms the team builds and runs. Six of the seven carry a portal
 * URL as of 2026-08-12, when the developer confirmed OHCRN's and PCGL's: those
 * two were the only cards in this tier that linked nowhere until then.
 *
 * The OICR Drug Discovery Portal came off this list on 2026-08-11, as internal
 * to one research group rather than a consortium platform, and went back on
 * 2026-08-12 on the developer's instruction. Being one group's platform is the
 * reason it is here, not the reason it was not: every other entry is a
 * consortium or a province, so a list without it reads as though these
 * components only pay off at that size. Its card and the home page capability
 * that cites it both say whose portal it is and that access is internal, so it
 * is not published as though a reader could go and open it.
 *
 * With it back the list is seven, which is what `metrics.activePlatforms` has
 * claimed throughout and what the six-card list has been quietly contradicting.
 */
export const platforms: Platform[] = [
  {
    id: "icgcargo",
    name: "ICGC-ARGO",
    launched: metrics.icgcArgoLaunch.value,
    institution: "International consortium",
    country: "Multi-national",
    summary: `Genomic and clinical data for ${metrics.icgcArgoParticipants.value} participants, harmonized across ${metrics.icgcArgoPrograms.value} programs in ${metrics.icgcArgoCountries.value} countries.`,
    href: `${IMPACT_PATH}#icgcargo`,
    portal: ICGC_ARGO_PORTAL_LINK,
    logo: `${LOGOS}/icgcargo/logo.png`,
    screenshot: `${LOGOS}/icgcargo/chart.png`,
  },
  {
    id: "virusseq",
    name: "iMicroSeq",
    launched: metrics.imicroseqLaunch.value,
    institution: "OICR and a national consortium",
    country: "Canada",
    summary: `${metrics.imicroseqPathogenGenomes.value} pathogen genomes and environmental wastewater surveillance, open access, launched as the Canadian VirusSeq Data Portal.`,
    href: `${IMPACT_PATH}#virusseq`,
    portal: IMICROSEQ_PORTAL_LINK,
    logo: `${LOGOS}/virusseq/logo.png`,
    screenshot: `${LOGOS}/virusseq/chart.png`,
  },
  {
    id: "ihcc",
    name: "IHCC",
    launched: metrics.ihccLaunch.value,
    institution: "International consortium",
    country: "Multi-national",
    summary: `The International Health Cohorts Consortium atlas: ${metrics.ihccCohorts.value} cohorts, most of them a hundred thousand participants or more.`,
    href: `${IMPACT_PATH}#ihcc`,
    portal: IHCC_PORTAL_LINK,
    logo: `${LOGOS}/ihcc/logo.png`,
    screenshot: `${LOGOS}/ihcc/chart.png`,
  },
  {
    id: "humanCancerModels",
    name: "Human Cancer Models Initiative",
    launched: metrics.hcmiLaunch.value,
    institution: "US National Cancer Institute",
    country: "USA",
    summary: `A searchable catalogue of ${metrics.hcmiCancerModels.value} unique cancer models with their genomic and clinical annotation.`,
    href: `${IMPACT_PATH}#humanCancerModels`,
    portal: HCMIS_PORTAL_LINK,
    logo: `${LOGOS}/hcmis/logo.png`,
    screenshot: `${LOGOS}/hcmis/chart.png`,
  },
  {
    id: "ohcrn",
    name: "Ontario Hereditary Cancer Research Network",
    launched: metrics.ohcrnLaunch.value,
    institution: "OICR",
    country: "Canada",
    summary:
      "A provincial network linking hereditary cancer research data across Ontario institutions.",
    portal: OHCRN_PORTAL_LINK,
    logo: `${LOGOS}/ohcrn/logo.png`,
  },
  {
    id: "pcgl",
    name: "Pan-Canadian Genome Library",
    launched: metrics.pcglLaunch.value,
    institution: "McGill University",
    country: "Canada",
    summary:
      "A federal genomic infrastructure initiative for Canadian genomic data, hosted at McGill University.",
    portal: PCGL_PORTAL_LINK,
    logo: `${LOGOS}/pcgl/logo.png`,
  },
  {
    // The one platform on this list that is a single laboratory rather than a
    // consortium, a network or a national programme, which is why the home
    // page's "run a portal at one lab's scale" capability cites it.
    //
    // No `portal`, and that is not a `[NEEDS: URL]` the way OHCRN's and PCGL's
    // were: access is internal to the group today. The reference material says a
    // public release is intended once testing completes, so the field arrives
    // when the portal does, and until then the card links down to nothing
    // off-site rather than to a login wall.
    //
    // `[NEEDS: logo file]` and `[NEEDS: screenshot]`. Its six siblings have
    // both; this one has neither, so its card on /impact/ reads as text and it
    // stays out of the home page logo carousel (data/partnerLogos.ts names its
    // entries one by one, so nothing there breaks by omission).
    id: "drugDiscovery",
    name: "OICR Drug Discovery Portal",
    launched: metrics.ddpLaunch.value,
    institution: "OICR, a single research group",
    country: "Canada",
    summary: `One lab's own cancer genomics portal: ${metrics.ddpRecords.value} records across genes, mutations and protein interactions, mined for drug targets.`,
    href: `${IMPACT_PATH}#drugDiscovery`,
  },
];

// Tier 2, organizations building on Overture independently, was three
// unsourced entries here (`adopters`) that nothing rendered. It is
// data/dependents.ts now: ten organizations, every one of them carrying the
// public source that documents the dependency, and /impact/ renders it. The old
// export is gone rather than left beside the new one, because two lists of the
// same thing is what this data layer exists to prevent.

export type LineagePlatform = {
  id: string;
  name: string;
  summary: string;
  link: string;
  /** Only read by the home page logo carousel; optional because not every
   * lineage project has a usable mark. */
  logo?: string;
};

/**
 * Tier 3: where the components came from. Historical rather than current, so
 * these are never counted as today's deployments.
 *
 * No longer rendered as a section on /impact/ — the home page logo carousel is
 * the only consumer left, via `data/partnerLogos.ts`.
 */
export const lineage: LineagePlatform[] = [
  {
    id: "icgc25k",
    name: "ICGC 25K Data Portal",
    summary:
      "The original International Cancer Genome Consortium portal, and where these components started.",
    link: ICGC_LINK,
    logo: `${LOGOS}/icgc25k/logo.png`,
  },
  {
    id: "gdc",
    name: "NCI Genomic Data Commons",
    summary:
      "Built with the Chicago group. Search (Arranger) came out of this work and was adopted back into Gen3.",
    link: GDC_LINK,
    logo: `${LOGOS}/gdc/logo.svg`,
  },
  {
    id: "kidsFirst",
    name: "Gabriella Miller Kids First",
    summary:
      "A pediatric cancer and birth defect discovery portal built on Overture components, no longer a platform the team runs.",
    link: KIDS_FIRST_LINK,
    logo: `${LOGOS}/kidsfirst/logo.png`,
  },
];
