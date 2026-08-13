// The peer-reviewed record, rendered by /impact/.
//
// This is not a citation page and does not try to be one: `06-citing-us.md` on
// the documentation site is canonical for how to cite Overture, and the footer
// links it. What was missing is the plain statement that the platform has been
// through peer review at all, which a funder or an evaluator looks for first and
// which lived nowhere on this site after /impact/publications/ was retired.
// Five entries is a section; it was never worth a page again.
//
// Sourced from the RSMF Phase 2 supporting-evidence submission, which lists the
// same five. Two of them are third-party work rather than ours, and that is the
// point of including them: an independent account of a platform built on
// Arranger, and a review that cites Overture among data portal platforms, are
// evidence of use in a way that our own platform paper is not.
//
// The platform paper itself is not in this array. It is
// `GIGASCIENCE_PAPER_LINK` in constants/externalLinks.ts, because the home
// page's "What we do" band cites it too, and a link two pages share belongs in
// the shared file. `publications` opens with it regardless, via `platformPaper`
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
    // No DOI, so nothing to link. Listed anyway, and labelled: it is evidence
    // that the components on this site are still producing peer-reviewed work,
    // which is a different claim from the four above it and is worth making. It
    // is not offered as a citation, and the page says so.
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
