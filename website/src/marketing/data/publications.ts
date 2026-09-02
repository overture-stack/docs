// The peer-reviewed record, rendered by /impact/.
//
// Not a citation page: `06-citing-us.md` on the documentation site is
// canonical for that, and the footer links it. What was missing — the plain
// statement that the platform has been through peer review at all — lived
// nowhere on this site after /impact/publications/ was retired. Seven
// entries is a section; not worth a page again.
//
// Four of the seven are third-party work, not ours, deliberately: an
// independent account of a platform built on Arranger, a review citing
// Overture among data portal platforms, and two papers in unrelated fields
// (agricultural phenomics, genomic privacy architecture) that cite the
// platform paper itself, are evidence our own platform paper can't be.
//
// The platform paper's link lives in `GIGASCIENCE_PAPER_LINK`
// (constants/externalLinks.ts) instead, since the home page's "What we do"
// band cites it too. `publications` still opens with it via `platformPaper`
// below, so the list a reader sees is complete.

import { GIGASCIENCE_PAPER_LINK } from "../constants/externalLinks";

export type Publication = {
  id: string;
  /** First author and `et al.`, matching how the paper is cited. */
  authors: string;
  title: string;
  venue: string;
  /** Absent for the one paper that has no publication year yet. */
  year?: string;
  /**
   * The full DOI URL, or the paper's own address when it has no DOI. Absent
   * only for work that is not published: nothing in this list is rendered
   * without either a link or a stated reason there is none.
   */
  href?: string;
  /** The DOI as printed, e.g. `10.1093/gigascience/giaf038`. */
  doi?: string;
  /** Where `doi` would be, for work that is not published yet. */
  status?: string;
  /** Why this paper is on a page about impact rather than in a bibliography. */
  relevance: string;
};

const platformPaper: Publication = {
  id: "gigascience",
  authors: "Shiell M, Bajari R, Andric D, et al.",
  title: "Overture: an open-source genomics data platform",
  venue: "GigaScience",
  year: "2025",
  href: GIGASCIENCE_PAPER_LINK,
  doi: "10.1093/gigascience/giaf038",
  relevance:
    "The platform paper: peer reviewed, open access, 38 authors. Start here.",
};

export const publications: Publication[] = [
  platformPaper,
  {
    id: "virusseq",
    authors: "Gill EE, Jia B, Murall CL, et al.",
    title: "The Canadian VirusSeq Data Portal and Duotang",
    venue: "Microbial Genomics",
    year: "2024",
    href: "https://doi.org/10.1099/mgen.0.001293",
    doi: "10.1099/mgen.0.001293",
    relevance:
      "An independent account of Canada's national SARS-CoV-2 portal, written by the team that ran it and built on Search (Arranger).",
  },
  {
    id: "argodictionary",
    authors: "Nahal-Bose HK, Lichter P, Weber U, et al.",
    title: "The ICGC ARGO data dictionary",
    venue: "Scientific Data",
    year: "2025",
    href: "https://doi.org/10.1038/s41597-025-06068-4",
    doi: "10.1038/s41597-025-06068-4",
    relevance:
      "The dictionary standard Dictionary Manager (Lectern) serves at ICGC-ARGO.",
  },
  {
    id: "fairportals",
    authors: "Speir ML, Teh WK, Perry MD, et al.",
    title: "Making genomic data FAIR through effective Data Portals",
    venue: "Scientific Data",
    year: "2025",
    href: "https://doi.org/10.1038/s41597-025-06142-x",
    doi: "10.1038/s41597-025-06142-x",
    relevance:
      "A third-party review of the field that cites Overture among the data portal platforms it surveys.",
  },
  {
    id: "fairphenomics",
    authors: "Callwood JB, Celebioglu B, Gladman N, et al.",
    title:
      "The need for robust, FAIR phenomic databases supporting agricultural efficiency and resiliency",
    venue: "Science and Public Policy",
    year: "2025",
    href: "https://doi.org/10.1093/scipol/scaf039",
    doi: "10.1093/scipol/scaf039",
    relevance:
      "A policy paper on FAIR agricultural phenomic data infrastructure that cites the platform paper.",
  },
  {
    id: "genomicprivacy",
    authors: "Xiong Y, Mao Y, Yu M, et al.",
    title:
      "A Distributed Architecture for Privacy-Preserving Management, Authorization, and Secure Update of Genomic Data",
    venue: "Proc. 2025 Intl. Conf. on Health Informatization and Data Analytics",
    year: "2025",
    href: "https://doi.org/10.1145/3759972.3760189",
    doi: "10.1145/3759972.3760189",
    relevance:
      "A privacy-preserving genomic data architecture proposal that cites the platform paper.",
  },
  {
    // No DOI to link, listed and labelled anyway: evidence the components
    // here are still producing peer-reviewed work, a different claim from
    // the six above it. Not offered as a citation; the page says so.
    id: "dictionaryviewer",
    authors: "Shiell M, Ashraf S, Luc E, et al.",
    title:
      "The Overture Dictionary Viewer: transforming machine-readable Lectern schemas into accessible, interactive displays for any data model",
    venue: "Pending",
    status: "Pending",
    relevance:
      "A component-level paper on Dictionary Manager (Lectern), under review and carrying no DOI yet.",
  },
];

export default publications;
