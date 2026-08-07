// Data structure to represent the case studies.
// We iterate over the cases, and render their content.
//
// Rendered twice as of rebuild phase 3: by /case-studies/, which is the flat
// page this file was written for, and by the four platform pages under
// /impact/, which pick one entry each by slug. /case-studies/ retires in phase
// 4 and this becomes the impact section's alone.
//
// The "How was Overture used?" lists name components functionally with the
// codename beside them, which is the house style fixed in .dev/ia-proposal.md
// and applies to any page describing which parts a platform uses.
// data/components.ts holds the canonical pairing; keep these in step with it.
// The one exception is the ICGC-ARGO authorization line, which named Ego. Ego
// is discontinued and nothing sourced says what handles that there now, so the
// line names the capability rather than guessing at a component.

import React from "react";
import Link from "../components/Link";
import { P2 } from "../components/Typography";
import metrics from "./metrics";
import {
  ICGC_ARGO_LINK,
  ICGC_ARGO_PORTAL_LINK,
  VIRUSSEQ_PORTAL_LINK,
  KIDS_FIRST_LINK,
  IHCC_LINK,
  IHCC_PORTAL_LINK,
  HCMIS_LINK,
  HCMIS_PORTAL_LINK,
} from "../constants/externalLinks";

const ASSETS = "/img/marketing/case-studies-data";

export type CaseStudyData = {
  title: string;
  slug: string;
  portalLink: string;
  /** Cloned by CaseStudy to add a class, so it has to accept one. */
  description: React.ReactElement<{ className?: string }>;
  /** Absolute path into static/. Missing for the one study with no logo. */
  logo?: string;
  /**
   * Three lists, in the order the pages render them: the headline facts, the
   * per-component "How was Overture used?" breakdown, and the single-paragraph
   * summary the home page carousel shows.
   */
  listItems: [string[], Record<string, string>[], string[]];
  clientLink: string;
  details: { title: string; description: string; screenshot: string }[];
};

const caseStudies: CaseStudyData[] = [
  {
    title: "ICGC-ARGO",
    slug: "icgcargo",
    portalLink: ICGC_ARGO_PORTAL_LINK,
    description: (
      <P2>
        The <Link to={ICGC_ARGO_LINK}>ICGC ARGO Data Platform platform</Link>{" "}
        builds on the legacy of the ICGC 25K Data Portal by harmonizing
        molecular and high-quality clinical data from global genomics efforts
        into a collective and unified knowledge base. ICGC ARGO will improve
        patient outcomes by enabling discovery through the responsible sharing
        of this curated data set with researchers worldwide.
      </P2>
    ),
    logo: `${ASSETS}/icgcargo/logo.svg`,
    listItems: [
      [
        `${metrics.icgcArgoParticipants.value} participants across ${metrics.icgcArgoPrograms.value} programs representing ${metrics.icgcArgoCountries.value} countries`,
        `${metrics.icgcArgoRegisteredUsers.value} registered users, a subset of whom are approved for controlled-access data`,
        "ICGC DACO governs the responsible sharing of this data for use in research",
      ],
      [
        {
          "File Manager (Song):":
            "Validates all submitted sequence meta(data) against a custom data model",
        },
        {
          "File Transfer (Score):":
            "Manages file transfers and object storage with added SamTools functionalities to help handle large WGS files",
        },
        {
          "Indexing Service (Maestro):":
            "Indexes multiple song repositories into one elastic search instance",
        },
        { "Search (Arranger):": "Facilitates filtering and querying" },
        { "Access and authorization:": "Stateless authentication, applied across the stack" },
      ],
      [
        `ICGC-ARGO harmonizes genomic and clinical data for ${metrics.icgcArgoParticipants.value} participants. With Overture as the backbone of its infrastructure, researchers can search and gain authorized access to data collected across ${metrics.icgcArgoPrograms.value} programs in ${metrics.icgcArgoCountries.value} countries.`,
      ],
    ],
    clientLink: ICGC_ARGO_LINK,
    details: [
      {
        title: "Chart",
        description: "ICGC",
        screenshot: `${ASSETS}/icgcargo/chart.png`,
      },
    ],
  },

  {
    // Renamed from VirusSeq on 2026-08-07. The platform's scope moved with the
    // name, from SARS-CoV-2 sequencing to pathogen genomes and environmental
    // wastewater surveillance, so this is a rewrite rather than a relabel.
    //
    // The slug stays `virusseq` deliberately: it is the anchor id that today's
    // #virusseq links land on, and .dev/ia-proposal.md keeps those ids so
    // existing fragment links survive the move to /impact/. Phase 3 gives the
    // platform its own page at the current name.
    //
    // [NEEDS: logo file] The logo and chart assets below are still VirusSeq
    // branded, so the card currently shows a VirusSeq mark under an iMicroSeq
    // heading. Dropping them instead would render a broken image, so they stay
    // until iMicroSeq artwork exists.
    title: "iMicroSeq",
    slug: "virusseq",
    portalLink: VIRUSSEQ_PORTAL_LINK,
    description: (
      <P2>
        <Link to={VIRUSSEQ_PORTAL_LINK}>iMicroSeq</Link> is an open-access
        Canadian database of microbial sequences and harmonized contextual
        metadata, built on the platform that began as the Canadian VirusSeq Data
        Portal. It harmonizes and validates submissions, automates deposit into
        international databases, and now spans clinical pathogen genomes and
        environmental wastewater surveillance, informing public health decisions,
        outbreak detection, and vaccine and drug development.
      </P2>
    ),
    logo: `${ASSETS}/virusseq/logo.svg`,
    listItems: [
      [
        `${metrics.imicroseqPathogenGenomes.value} pathogen genomes and environmental wastewater data`,
        `${metrics.imicroseqClinicalSamples.value} clinical samples and ${metrics.imicroseqWastewaterRecords.value} environmental wastewater records`,
        "Horizontally scaled with replica Score, Song, and Maestro instances",
      ],
      [
        { "File Transfer (Score):": "Manages file transfers and object storage" },
        {
          "File Manager (Song):":
            "Validates and tracks pathogen sequencing metadata against a custom data model",
        },
        { "Indexing Service (Maestro):": "Indexes sample data for downstream search" },
        {
          "Search (Arranger):":
            "Responsible for all search capabilities, including faceted search and data tables",
        },
        { "Dictionary Manager (Lectern):": "Manages the data dictionaries submissions validate against" },
      ],
      [
        `iMicroSeq is an open-access Canadian database of microbial sequences, launched in ${metrics.imicroseqLaunch.value} as the VirusSeq Data Portal and since broadened to pathogen genomes and wastewater surveillance. Overture's scalable indexing carries ${metrics.imicroseqPathogenGenomes.value} genomes alongside their contextual metadata.`,
      ],
    ],
    clientLink: VIRUSSEQ_PORTAL_LINK,
    details: [
      {
        title: "Chart",
        description: "iMicroSeq chart",
        screenshot: `${ASSETS}/virusseq/chart.png`,
      },
    ],
  },
  {
    title: "Kids First Data Portal",
    slug: "kidsFirst",
    portalLink: KIDS_FIRST_LINK,
    description: (
      <P2>
        The <Link to={KIDS_FIRST_LINK}>Kids First Data Resource Center</Link>{" "}
        brings together clinical and genetic data from pediatric cancer and
        structural birth defect cohorts into a centralized, cloud-based
        discovery portal. We created a collaborative, community focused portal
        that brings together researchers, health professionals, and patients to
        accelerate discoveries that improve the lives of pediatric patients and
        their families.
      </P2>
    ),
    logo: `${ASSETS}/kidsfirst/logo.svg`,
    listItems: [
      [
        "Data collected across distributed 32 projects",
        "1.7 Petabytes, 30.5k Participants, 28k families, 94.9k samples, 187.4k Files",
        "Query and Filter 72 data types with 16 clinical fields",
      ],
      [
        { "File Manager (Song):": "Validation and tracking of genomic metadata" },
        { "File Transfer (Score):": "Managed file transfers and object storage" },
        {
          "Search (Arranger):":
            "With the faceted search and customizable data table, arranger enabled users to filter and query this large dataset efficiently",
        },
      ],
      [
        "Overture's modular architecture enabled us to integrate three microservices into the portal infrastructure. It manages data transfer, validation, and tracking on the back end, while supporting the portal's search API and core user interface.",
      ],
    ],
    clientLink: KIDS_FIRST_LINK,
    details: [
      {
        title: "Chart",
        description: "Kids First Chart",
        screenshot: `${ASSETS}/kidsfirst/chart.png`,
      },
    ],
  },
  {
    title: "IHCC",
    slug: "ihcc",
    portalLink: IHCC_PORTAL_LINK,
    description: (
      <P2>
        The{" "}
        <Link to={IHCC_LINK}>
          International Health Cohorts Consortium (IHCC)
        </Link>{" "}
        is improving clinical care and population health by aggregating large
        genomic data cohorts to help translational researchers uncover the
        biological and genetic factors of disease. With exception to
        underrepresented cohorts & populations, all hosted member cohorts are
        disease-agnostic and have available biospecimens and longitudinal
        follow-up activities. Most notably, hosted member cohorts comprise one
        hundred thousand participants or more.
      </P2>
    ),
    logo: `${ASSETS}/ihcc/logo.svg`,
    listItems: [
      [
        "There are a total of 70 cohorts participating in the study",
        "These cohorts come from 39 different countries around the world",
        "Each cohort provides data across 39 distinct metadata fields",
      ],
      [
        {
          "Search (Arranger):":
            "With Arranger, users are able to filter and query the database through an intuitive UI with a customizable table and faceted search",
        },
      ],
      [
        `IHCC is a global platform hosting genomics data from large cohorts (100k+). The platform leverages the Overtures' Arranger microservice to generate its GraphQL API and front-end portal UI.`,
      ],
    ],
    clientLink: IHCC_LINK,
    details: [
      {
        title: "IHCC",
        description: "IHCC chart",
        screenshot: `${ASSETS}/ihcc/chart.png`,
      },
    ],
  },
  {
    title: "Human Cancer Models Initiative",
    slug: "humanCancerModels",
    logo: `${ASSETS}/hcmis/logo.svg`,
    portalLink: HCMIS_PORTAL_LINK,
    description: (
      <P2>
        The <Link to={HCMIS_LINK}>Human Cancer Models Initiative (HCMI)</Link>{" "}
        is a catalogue of unique cancer models alongside clinical, biospecimen,
        and molecular data. It also includes protocols, consent templates, and
        clinical data forms, making it a comprehensive resource for researchers
        determining which cancer models to use within their studies. The
        ultimate goal of the HCMI is to support translational cancer research
        and improve personalized patient treatment plans.
      </P2>
    ),
    listItems: [
      [
        "275 unique cancer models across 25 Primary sites",
        "All models are annotated with genomic and clinical data",
        "Enabling researchers to browse and shop for innovative cancer models",
      ],
      [
        {
          "Search (Arranger):":
            "Enables search by filtering and querying the database through an intuitive UI",
        },
      ],
      [
        "HCMI provides researchers with a catalogue of unique cancer models and protocols. It uses Overture's Arranger microservice for its GraphQL API and front-end portal UI.",
      ],
    ],
    clientLink: HCMIS_LINK,
    details: [
      {
        title: "HCMIS",
        description: "HCMIS chart",
        screenshot: `${ASSETS}/hcmis/chart.png`,
      },
    ],
  },
];

export default caseStudies;
