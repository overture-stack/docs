// The seven Overture components, and the grouping the products page is built on.
//
// The Collect / Explore / Control grouping and the functional names come from
// the component diagram in .dev/referenceMaterial/. .dev/ia-proposal.md
// § Decided fixes the house style: functional name first, codename beside it,
// written as "Tabular Submission (Lyric)". Never the codename alone, and never
// the codename first.
//
// This file is the reason the products page stopped being seven near-identical
// JSX sections: the page is now a list renderer and the content is data. Anything
// else that needs to name a component reads from here rather than restating it.

import {
  ARRANGER_DOCS_LINK,
  KEYCLOAK_DEPLOY_LINK,
  LECTERN_DOCS_LINK,
  LYRIC_DOCS_LINK,
  MAESTRO_DOCS_LINK,
  SCORE_DOCS_LINK,
  SONG_DOCS_LINK,
  STAGE_DOCS_LINK,
} from "../constants/externalLinks";

export type ComponentGroupId = "collect" | "explore";

export type OvertureComponent = {
  /**
   * Anchor id, and the lower-cased codename.
   *
   * `/products/#song` and its six siblings predate this rewrite and are linked
   * from outside the site, so they survive it. Nothing inside the site links to
   * them any more: the phase 4 home reorder dropped the component catalogue
   * that did.
   */
  id: string;
  /** What the component does, which is how the diagram labels it. */
  name: string;
  /** What the repository is called, which is how people search for it. */
  codename: string;
  /** One sentence. The docs site owns the detail; this owns the orientation. */
  summary: string;
  /** One link per row, to the docs page. See .dev/ia-proposal.md. */
  docs: string;
  group: ComponentGroupId;
};

export const components: OvertureComponent[] = [
  {
    id: "lectern",
    name: "Dictionary Manager",
    codename: "Lectern",
    summary:
      "Defines and version-tracks the data dictionaries a platform validates submissions against.",
    docs: LECTERN_DOCS_LINK,
    group: "collect",
  },
  {
    id: "lyric",
    name: "Tabular Submission",
    codename: "Lyric",
    summary:
      "Validates and commits tabular submissions against a dictionary, keeping every change auditable.",
    docs: LYRIC_DOCS_LINK,
    group: "collect",
  },
  {
    id: "song",
    name: "File Manager",
    codename: "Song",
    summary:
      "Catalogs file metadata across repositories, assigning global identifiers and controlling what gets published.",
    docs: SONG_DOCS_LINK,
    group: "collect",
  },
  {
    id: "score",
    name: "File Transfer",
    codename: "Score",
    summary:
      "Moves large files to and from cloud storage, with resumable transfers and BAM/CRAM slicing.",
    docs: SCORE_DOCS_LINK,
    group: "collect",
  },
  {
    id: "maestro",
    name: "Indexing Service",
    codename: "Maestro",
    // Maestro's own README now names both File Manager (Song) and Tabular
    // Submission (Lyric) as sources it indexes, not File Manager alone —
    // confirmed there 2026-08-10, not just trimmed for length.
    summary:
      "Indexes metadata from File Manager and Tabular Submission repositories into one searchable index.",
    docs: MAESTRO_DOCS_LINK,
    group: "explore",
  },
  {
    id: "arranger",
    name: "Search",
    codename: "Arranger",
    // Arranger's own README now supports OpenSearch as well as Elasticsearch
    // (previously Elasticsearch-only here) — confirmed there 2026-08-10.
    summary:
      "Builds a search API and matching UI components from any Elasticsearch or OpenSearch index.",
    docs: ARRANGER_DOCS_LINK,
    group: "explore",
  },
  {
    id: "stage",
    name: "Portal UI",
    codename: "Stage",
    summary:
      "A React framework for a data portal's front end, themed and extended per deployment.",
    docs: STAGE_DOCS_LINK,
    group: "explore",
  },
];

export type ComponentGroup = {
  id: ComponentGroupId | "control";
  title: string;
  /** The one line that says why these components belong together. */
  blurb: string;
};

/**
 * Collect and Explore each hold components. Control holds none, deliberately:
 * it is the band the diagram draws around the other two rather than a service
 * we ship, so the page renders it as prose.
 */
export const groups: ComponentGroup[] = [
  {
    id: "collect",
    title: "Collect",
    blurb:
      "Getting data in and keeping it describable. A dictionary defines what the platform accepts, and the submission, metadata and transfer services hold you to it.",
  },
  {
    id: "explore",
    title: "Explore",
    blurb:
      "Making what you collected findable. Distributed metadata becomes one index, the index becomes a search API, and the API becomes a portal people can use.",
  },
  {
    id: "control",
    title: "Control",
    blurb:
      "Access and authorization sit around both groups rather than inside them. Every component delegates to Keycloak, so a deployment applies its own institution's identity rules across the whole stack, and an Overture provider extension adds API keys for command line and programmatic access.",
  },
];

export function componentsIn(group: ComponentGroupId): OvertureComponent[] {
  return components.filter((component) => component.group === group);
}

export const CONTROL_DOCS_LINK = KEYCLOAK_DEPLOY_LINK;

export type AdjacentProject = {
  name: string;
  /** Who maintains it. An evaluator reads this as the governance question. */
  maintainer: string;
  link: string;
  /** What it is, in its own terms rather than ours. */
  what: string;
  /** Where it is the better choice. Conceding this is the point of the section. */
  stronger: string;
};

/**
 * The three projects that occupy adjacent space, adapted from the landscape
 * answer in .dev/referenceMaterial/P1-loi-form.md § 3.3.
 *
 * One deliberate change from that source, per .dev/ia-proposal.md: the LOI
 * argues that *Canadian* platforms on Gen3 inherit US-oriented governance. The
 * general and more useful form of the same fact is that any institution outside
 * the US does, so that is what ships here. The site does not make a national
 * argument.
 */
export const adjacentProjects: AdjacentProject[] = [
  {
    name: "Gen3",
    maintainer: "University of Chicago, Center for Translational Data Science",
    link: "https://gen3.org/",
    what: "The closest functional analog: an open-source microservice stack for building data commons. It is built around United States research infrastructure, developed under NIH funding and deployed primarily across NIH data commons, so an institution outside the US inherits a stack governed by and oriented toward US priorities. The two projects share history. The Overture team worked with the Chicago group on the original Genomic Data Commons, and Gen3 built on Overture's search API service.",
    stronger:
      "Stronger if your platform belongs inside the NIH data commons ecosystem and has to interoperate with it.",
  },
  {
    name: "cBioPortal",
    maintainer: "Memorial Sloan Kettering, with multi-institutional contributors",
    link: "https://www.cbioportal.org/",
    what: "A cancer-specific visualization and analysis application: one integrated tool for exploring genomic and clinical data across cancer cohorts, rather than a set of composable parts for assembling platforms across research domains.",
    stronger:
      "Stronger if what you need is cancer cohort analysis working today, not a platform to build on.",
  },
  {
    name: "Globus",
    maintainer: "University of Chicago",
    link: "https://www.globus.org/",
    what: "A widely used research data transfer and sharing service, free for non-profits at the basic tier with paid tiers above it. Its central management infrastructure is operated by a US institution and Globus Connect Server v5 is distributed under a proprietary license. It does not carry the metadata management, access control or portal layers a full platform needs.",
    stronger:
      "Stronger at high-volume transfer between established institutional endpoints, which is the problem it was built for.",
  },
];

export type Distinction = {
  title: string;
  text: string;
};

/**
 * What Overture is, stated as the three pillars the home page also uses, so the
 * two pages make the same argument in the same words. See .dev/ia-proposal.md
 * finding 8.
 */
export const distinctions: Distinction[] = [
  {
    title: "Modular",
    text: "Each component has one narrow responsibility and can be deployed alone or as the full stack. The same parts serve a single lab and a multi-institution consortium, across genomics, pathogen surveillance, clinical and drug-discovery data.",
  },
  {
    title: "Open",
    text: "Every component is freely available and documented under an open-source license. There is no commercial tier, no gated feature set, and nothing to migrate off if your funding changes.",
  },
  {
    title: "Yours to host",
    text: "Overture runs on infrastructure you control, in the jurisdiction your data has to stay in. Nothing depends on a service we operate, which is what makes a platform outlive the grant that started it.",
  },
];
