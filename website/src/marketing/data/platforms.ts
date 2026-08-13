// What the /impact/ hub shows, in three fixed tiers: platforms genuinely
// differ by who runs them, which a flat list used to obscure. Tier 2 (other
// people building on Overture independently) is the most persuasive
// evidence the site has — "we built seven things" vs. "other people choose
// this".
//
// Figures live in metrics.ts, never here. Card copy is written for
// scanning; the long-form write-ups four platforms once had
// (data/caseStudies.tsx, components/CaseStudy) were deleted once nothing
// rendered them.

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
   * Anchor id on the hub, the same slug case studies have carried since the
   * Gatsby site. `/case-studies/#icgcargo` and its siblings are linked from
   * outside; the 301 to `/impact/` keeps the fragment, so these ids are what
   * makes those links still land.
   */
  id: string;
  name: string;
  /** Launch year. Absent while a platform has no public date. */
  launched?: string;
  /**
   * Who leads the platform, and where it runs. Four of the six are led by
   * someone other than us — the fact these two fields exist to make
   * visible, since a page listing six platforms without naming their leads
   * reads as a portfolio of ours.
   */
  institution?: string;
  /** `multi-national` where a consortium spans several. */
  country?: string;
  /** One line, for scanning. The page carries the argument. */
  summary: string;
  /**
   * The address for links from other pages into this platform's row on
   * /impact/; the hub itself links to the bare fragment since routing to
   * the page already open scrolls nowhere. The build warns these anchors
   * are broken — they aren't: Docusaurus can't see anchors on a plain JSX
   * page, the same reason the footer's `/home/#collaborate-heading` is on
   * that list too.
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
 * Tier 1: platforms the team builds and runs, seven total (matching
 * `metrics.activePlatforms`). The OICR Drug Discovery Portal is included
 * specifically because it's one lab's platform, not a consortium's — every
 * other entry is a consortium or a province, and omitting it would read as
 * though these components only pay off at that scale. Its card and the home
 * page capability that cites it both say access is internal, not published
 * as though a reader could open it.
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
    // The one lab-scale platform on this list — why the home page's "run a
    // portal at one lab's scale" capability cites it. No `portal`: access
    // is internal today; the field arrives if that changes. No
    // `logo`/`screenshot` either, unlike its six siblings, so its card
    // reads as text and it stays out of the home page logo carousel
    // (data/partnerLogos.ts names entries one by one, so nothing breaks by
    // omission).
    id: "drugDiscovery",
    name: "OICR Drug Discovery Portal",
    launched: metrics.ddpLaunch.value,
    institution: "OICR, a single research group",
    country: "Canada",
    summary: `One lab's own cancer genomics portal: ${metrics.ddpRecords.value} records across genes, mutations and protein interactions, mined for drug targets.`,
    href: `${IMPACT_PATH}#drugDiscovery`,
  },
];

// Tier 2, organizations building on Overture independently, is
// data/dependents.ts now — sourced and rendered on /impact/, replacing an
// unsourced, unrendered `adopters` export here (removed rather than kept
// beside it, to avoid two lists of the same thing).

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
