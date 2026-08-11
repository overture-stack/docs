// What the /impact/ hub shows, in the three tiers .dev/ia-proposal.md defines.
//
// The tiers exist because the reference material distinguishes them and the old
// single list flattened them. Tier 2 is the one that was missing entirely, and
// it is the most persuasive evidence the site has: it is the difference between
// "we built seven things" and "other people choose this".
//
// Figures live in metrics.ts, never here. Card copy is written for scanning; the
// long-form write-up for the four platforms that have one lives in
// caseStudies.tsx, which the hub renders below the cards.

import metrics from "./metrics";
import {
  GDC_LINK,
  HCMIS_PORTAL_LINK,
  ICGC_ARGO_PORTAL_LINK,
  ICGC_LINK,
  IHCC_PORTAL_LINK,
  KIDS_FIRST_LINK,
  VIRUSSEQ_PORTAL_LINK,
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
   * A screenshot of the running portal, absolute path into static/. The same
   * file the platform's case study shows (data/caseStudies.tsx `details`), named
   * here so a band that cites a platform can show it without going through the
   * case study: the home page's capability cards do exactly that.
   *
   * Five platforms carry one, under the historical filename `chart.png`.
   */
  screenshot?: string;
};

const LOGOS = "/img/marketing/case-studies-data";

/**
 * Tier 1: platforms the team builds and runs. Two of the six are listed without
 * a write-up or a portal URL, still waiting on copy; they are listed anyway
 * because the aggregate band claims `7+` and a shorter list under that figure
 * would read as a discrepancy rather than as work in progress.
 *
 * The OICR Drug Discovery Portal was here until 2026-08-11. It is internal to
 * one research group rather than a consortium platform, so it came off the
 * public list.
 */
export const platforms: Platform[] = [
  {
    id: "icgcargo",
    name: "ICGC-ARGO",
    launched: metrics.icgcArgoLaunch.value,
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
    summary: `${metrics.imicroseqPathogenGenomes.value} pathogen genomes and environmental wastewater surveillance, open access, launched as the Canadian VirusSeq Data Portal.`,
    href: `${IMPACT_PATH}#virusseq`,
    portal: VIRUSSEQ_PORTAL_LINK,
    logo: `${LOGOS}/virusseq/logo.png`,
    screenshot: `${LOGOS}/virusseq/chart.png`,
  },
  {
    id: "ihcc",
    name: "IHCC",
    launched: metrics.ihccLaunch.value,
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
    summary:
      "A provincial network linking hereditary cancer research data across Ontario institutions.",
    logo: `${LOGOS}/ohcrn/logo.png`,
  },
  {
    id: "pcgl",
    name: "Pan-Canadian Genome Library",
    summary:
      "A federal genomic infrastructure initiative hosted at McGill, in development.",
    logo: `${LOGOS}/pcgl/logo.png`,
  },
];

export type Adopter = {
  name: string;
  where: string;
  /** Which components they run. Named functionally, per the house style. */
  uses: string;
};

/**
 * Tier 2: organizations building on Overture independently, named in the LOI.
 *
 * No links: these are other institutions' deployments, and the reference
 * material names the organizations rather than URLs. Naming them is the point;
 * guessing at their addresses is not.
 *
 * Not rendered anywhere at the moment — the /impact/ section that listed these
 * was cut. Kept because the list itself is the researched part.
 */
export const adopters: Adopter[] = [
  {
    name: "CHU Sainte-Justine",
    where: "Montréal",
    uses: "Dictionary Manager (Lectern) and Search (Arranger)",
  },
  {
    name: "South African National Bioinformatics Institute",
    where: "Cape Town",
    uses: "Overture components in their own stack",
  },
  {
    name: "InDoc Research",
    where: "Toronto",
    uses: "Search (Arranger)",
  },
];

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
