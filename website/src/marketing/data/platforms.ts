// What the /impact/ hub shows, in the three tiers .dev/ia-proposal.md defines.
//
// The tiers exist because the reference material distinguishes them and the old
// single list flattened them. Tier 2 is the one that was missing entirely, and
// it is the most persuasive evidence the site has: it is the difference between
// "we built seven things" and "other people choose this".
//
// Figures live in metrics.ts, never here. Card copy is written for scanning; the
// long-form content for the four platforms that have their own page still lives
// in caseStudies.tsx, which those pages render.

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
import {
  HCMI_PATH,
  ICGC_ARGO_PATH,
  IHCC_PATH,
  IMICROSEQ_PATH,
} from "../constants/pages";

export type Platform = {
  /**
   * Anchor id on the hub card, and the same slug the case study has carried
   * since the Gatsby site. `/case-studies/#icgcargo` and its siblings are
   * linked from the home page and from outside; the 301 to `/impact/` keeps the
   * fragment, so these ids are what makes those links still land. They are not
   * the page URL, which is `href` below and is kebab-case.
   */
  id: string;
  name: string;
  /** Launch year. Absent while a platform has no public date. */
  launched?: string;
  /** One line, for scanning. The page carries the argument. */
  summary: string;
  /** The platform's own page here, once it has one. */
  href?: string;
  /** The live deployment, off-site. */
  portal?: string;
  /** Absolute path into static/. Only the four that carry one. */
  logo?: string;
  /**
   * Shown on the home page, which has room for three.
   *
   * `[NEEDS: confirmation]` which three. These are the current pick and the
   * reasoning is: the two with verified figures behind them, plus the oldest,
   * which is what carries the longevity claim the proof band makes. Change the
   * flag, not the home page.
   */
  featured?: boolean;
};

const LOGOS = "/img/marketing/case-studies-data";

/**
 * Tier 1: platforms the team builds and runs. Seven, which is the number the
 * aggregate band claims, so all seven are listed even though three are still
 * waiting on copy and a portal URL. Showing four under a "seven platforms"
 * heading would read as a discrepancy rather than as work in progress.
 */
export const platforms: Platform[] = [
  {
    id: "icgcargo",
    name: "ICGC-ARGO",
    launched: metrics.icgcArgoLaunch.value,
    summary: `Genomic and clinical data for ${metrics.icgcArgoParticipants.value} participants, harmonized across ${metrics.icgcArgoPrograms.value} programs in ${metrics.icgcArgoCountries.value} countries.`,
    href: ICGC_ARGO_PATH,
    portal: ICGC_ARGO_PORTAL_LINK,
    logo: `${LOGOS}/icgcargo/logo.svg`,
    featured: true,
  },
  {
    id: "virusseq",
    name: "iMicroSeq",
    launched: metrics.imicroseqLaunch.value,
    summary: `${metrics.imicroseqPathogenGenomes.value} pathogen genomes and environmental wastewater surveillance, open access, launched as the Canadian VirusSeq Data Portal.`,
    href: IMICROSEQ_PATH,
    portal: VIRUSSEQ_PORTAL_LINK,
    // Still the VirusSeq mark, see .dev/roadmap.md § Known issues.
    logo: `${LOGOS}/virusseq/logo.svg`,
    featured: true,
  },
  {
    id: "ihcc",
    name: "IHCC",
    launched: metrics.ihccLaunch.value,
    summary: `The International Health Cohorts Consortium atlas: ${metrics.ihccCohorts.value} cohorts, most of them a hundred thousand participants or more.`,
    href: IHCC_PATH,
    portal: IHCC_PORTAL_LINK,
    logo: `${LOGOS}/ihcc/logo.svg`,
  },
  {
    id: "humanCancerModels",
    name: "Human Cancer Models Initiative",
    launched: metrics.hcmiLaunch.value,
    summary: `A searchable catalogue of ${metrics.hcmiCancerModels.value} unique cancer models with their genomic and clinical annotation.`,
    href: HCMI_PATH,
    portal: HCMIS_PORTAL_LINK,
    logo: `${LOGOS}/hcmis/logo.svg`,
    featured: true,
  },
  {
    id: "ohcrn",
    name: "Ontario Hereditary Cancer Research Network",
    launched: metrics.ohcrnLaunch.value,
    summary:
      "A provincial network linking hereditary cancer research data across Ontario institutions.",
  },
  {
    id: "drug-discovery",
    name: "OICR Drug Discovery Portal",
    launched: metrics.drugDiscoveryLaunch.value,
    summary:
      "The data platform behind OICR's own drug discovery program, run for an internal research group rather than a consortium.",
  },
  {
    id: "pcgl",
    name: "Pan-Canadian Genome Library",
    summary:
      "A federal genomic infrastructure initiative hosted at McGill, in development.",
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
};

/**
 * Tier 3: where the components came from. Historical rather than current, and
 * said plainly, because a reader who recognizes these names should see them
 * claimed as lineage and not as today's deployments.
 *
 * Kids First is here rather than in tier 1. It keeps its `kidsFirst` id so the
 * fragment link from the old case studies page still lands.
 */
export const lineage: LineagePlatform[] = [
  {
    id: "icgc25k",
    name: "ICGC 25K Data Portal",
    summary:
      "The original International Cancer Genome Consortium portal, and where these components started.",
    link: ICGC_LINK,
  },
  {
    id: "gdc",
    name: "NCI Genomic Data Commons",
    summary:
      "Built with the Chicago group. Search (Arranger) came out of this work and was adopted back into Gen3.",
    link: GDC_LINK,
  },
  {
    id: "kidsFirst",
    name: "Gabriella Miller Kids First",
    summary:
      "A pediatric cancer and birth defect discovery portal built on Overture components, no longer a platform the team runs.",
    link: KIDS_FIRST_LINK,
  },
];

/** The three the home page shows. See `Platform.featured`. */
export const featuredPlatforms = platforms.filter((entry) => entry.featured);

/** Tier 1 platforms that have a logo, for the proof band's logo strip. */
export const platformLogos = platforms.filter((entry) => entry.logo);
