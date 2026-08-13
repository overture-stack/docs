// Every figure the marketing site publishes, in one place.
//
// The site's numbers went stale because they were typed into JSX once, while the
// numbers that actually matter are maintained in program reporting that never
// flowed back. Pages read from here; nothing hardcodes a figure.
//
// `source` names where the figure originates, not whichever document last quoted
// it. Keep it that way: a document name goes out of date faster than the team
// that owns the number, and this file compiles into the public bundle, so it
// must not name internal or unannounced material.
//
// Reconciled against program reporting on 2026-08-07. Figures marked
// `verified: null` predate that pass and were carried forward from the Gatsby
// site with no traceable source; they are the backlog, not the standard.

export type Metric = {
  /** The figure exactly as it should be published, rounding included. */
  value: string;
  /** Who owns this number, so the next person knows who to ask. */
  source: string;
  /** ISO date this was last checked against its source. Null means never. */
  verified: string | null;
  /** What it counts, where the label alone would be ambiguous. */
  note?: string;
};

const metrics = {
  // Platform-wide
  activePlatforms: {
    value: "7+",
    source: "OICR Genome Informatics program",
    verified: "2026-08-07",
    note: "Platforms the team builds and runs, excluding lineage deployments such as Kids First.",
  },
  stableReleaseHistory: {
    value: "11 years",
    source: "Overture component release histories",
    verified: "2026-08-13",
    note: "Counted from Score's first tag, 2015-07-06, to the most recent release. Was published as `8+ years` until 2026-08-11, which was an understatement rather than a different measurement: nothing sourced said where the eight came from, and the git histories put it at eleven. Each component follows independent semantic versioning. This span still anchors on Score's git tag rather than a container, since no registry retains history that far back, a different question from `releaseTags` below, which counts confirmed publishes rather than the oldest surviving evidence of development.",
  },
  releaseTags: {
    value: "309",
    source: "Overture component registries (npm, GHCR, Docker Hub) and merged release-branch history",
    verified: "2026-08-13",
    note: "Confirmed published releases across the seven components: npm versions, container image tags, or a merged release-branch build where that is a component's actual mechanism, checked per component against its own registry rather than counted from git tags. Rebuilt 2026-08-13 from `675` (raw git tags): tagging turned out to be unreliable across this org in both directions, some components keep shipping containers for years after their last tag (Score, Maestro, Stage) while others' raw tag counts include junk markers, packaging-mirror tags, or a monorepo's still-prerelease sub-packages (Song, Arranger). 309 is lower than 675 because it counts what actually shipped, not every tag ever pushed; it is higher than GitHub's curated Releases pages, which undercount badly and would show none at all for Lectern and Lyric. data/distribution.ts holds the per-component breakdown and the reasoning specific to each.",
  },
  firstDeployment: {
    value: "2016",
    source: "OICR Genome Informatics program",
    verified: "2026-08-07",
    note: "HCMI, the earliest platform still running.",
  },
  teamSize: {
    value: "19",
    source: "OICR Genome Informatics program",
    verified: "2026-08-07",
    note: "Core software engineering team.",
  },
  activeGrants: {
    value: "3",
    source: "OICR Genome Informatics program",
    verified: "2026-08-11",
    note: "Grants funding platform development today: the Digital Research Alliance of Canada (2026 to 2028), CIHR through PCGL (2023 to 2028) and the US National Cancer Institute (2021 to 2026). Counts competitively awarded grants only, so the Government of Ontario operational funding that supports the team is excluded, as is the concluded 2020 to 2024 COVID-19 genomic data infrastructure funding. Recount against docs/community-docs/02-funding.md, which lists all of them: the NCI award ends in 2026, so this figure changes before the next verification is due.",
  },
  annualEngagements: {
    value: "eight",
    source: "OICR Genome Informatics program",
    verified: "2026-08-07",
    note: "Stakeholder engagements a year: platform demonstrations, needs assessments and technical guidance. An average, rounded down from the sixteen named engagements the program tracks.",
  },

  // Distribution and independent adoption. Collected 2026-08-11 for an
  // internal evidence review, and published here because every one of them
  // is checkable from a public source: /impact/ renders each figure next to
  // the link it came from, which is the rule that section is built on.
  //
  // These are live counters, unlike the launch years below them. They will move.
  // Re-read them from the sources named here rather than adjusting them upward
  // by guesswork.
  externalProjects: {
    value: "2",
    source: "Africa CDC / ASLM, Ferlab",
    verified: "2026-08-12",
    note: "Organizations outside OICR that have documented, in their own tender or commit history, that they build on an Overture component: AGARI (Africa CDC) and CQDG (Ferlab). Counted from data/dependents.ts. Narrowed from a wider list of ten repositories on 2026-08-12, on the developer's instruction, to the two with the clearest and most durable evidence.",
  },
  npmDownloads: {
    value: "48,854",
    source: "api.npmjs.org",
    verified: "2026-08-09",
    note: "Downloads across all thirteen @overture-stack packages in the twelve months to 2026-08-09. Verified against the registry API rather than the web UI. data/distribution.ts holds the per-package breakdown this totals.",
  },
  npmPackages: {
    value: "13",
    source: "npm registry",
    verified: "2026-08-09",
    note: "Published packages under the @overture-stack scope.",
  },
  containerPulls: {
    value: "611,411",
    source: "Docker Hub",
    verified: "2026-08-11",
    note: "Cumulative pulls of the seven components' images on Docker Hub, led by Lectern, Song and Score. Docker Hub is the historical registry: current distribution is the GitHub Container Registry, which publishes no pull count, so this figure stops growing at the point distribution moved and understates total use rather than overstating it.",
  },
  docsVisitors: {
    value: "8,703",
    source: "Matomo analytics on overture.bio and docs.overture.bio",
    verified: "2026-08-11",
    note: "Unique visitors since 2024: 2,546 in 2024, 3,791 in 2025, 2,366 to mid-2026. The one figure on /impact/ that a reader cannot check for themselves, since the analytics are ours; the page says so beside it rather than presenting it like the linked figures around it.",
  },
  docsCountries: {
    value: "46+",
    source: "Matomo analytics on overture.bio and docs.overture.bio",
    verified: "2026-08-11",
    note: "Countries those visitors came from. Same caveat as `docsVisitors`.",
  },

  // Launch years, one per platform the team builds and runs. Added for the
  // /impact/ hub, which dates every card. iMicroSeq's is further down, with the
  // rest of that platform's figures.
  icgcArgoLaunch: {
    value: "2019",
    source: "OICR Genome Informatics program",
    verified: "2026-08-07",
  },
  ihccLaunch: {
    value: "2020",
    source: "OICR Genome Informatics program",
    verified: "2026-08-07",
  },
  hcmiLaunch: {
    value: "2016",
    source: "OICR Genome Informatics program",
    verified: "2026-08-07",
    note: "The earliest platform still running, so this is also `firstDeployment`.",
  },
  ohcrnLaunch: {
    value: "2025",
    source: "OICR Genome Informatics program",
    verified: "2026-08-07",
  },
  ddpLaunch: {
    value: "2025",
    source: "OICR Genome Informatics program",
    verified: "2026-08-07",
  },
  pcglLaunch: {
    value: "2026",
    source: "OICR Genome Informatics program",
    verified: "2026-08-12",
    note: "This file deliberately had no PCGL entry until 2026-08-12, on the grounds that the launch was in the future and another institution's date to announce. The developer confirmed the submission portal is live and that launching it was our own directive, so the card dates it like every other platform rather than reading `In development`.",
  },

  // ICGC-ARGO
  icgcArgoParticipants: {
    value: "100,000+",
    source: "ICGC-ARGO Data Platform",
    verified: "2026-08-07",
    note: "Participants with molecular and longitudinal health data. Replaces the 63,116 committed donors the site published from 2021 to 2026.",
  },
  icgcArgoPrograms: {
    value: "27",
    source: "ICGC-ARGO Data Platform",
    verified: "2026-08-07",
  },
  icgcArgoCountries: {
    value: "15",
    source: "ICGC-ARGO Data Platform",
    verified: "2026-08-07",
  },
  // `icgcArgoRegisteredUsers` was here, published as `3,500+` from 2026-08-07 to
  // 2026-08-12: the /impact/ aggregate band's user figure, and a bullet in the
  // ICGC-ARGO write-up. Removed on the developer's instruction, not edited.
  //
  // An internal review flagged this figure as contested between two
  // internal sources, and there was no second platform to reconcile it
  // against: the platforms other institutions own and run do not report
  // their user counts, so there was never an honest
  // platform-wide total to put in its place either. The band runs on npm
  // downloads instead, which is a distribution figure a reader can check rather
  // than a user figure only we can assert.
  //
  // The value is recorded here rather than in the git history alone so that
  // whoever resolves the disagreement knows what was published while it stood.

  // iMicroSeq, published as VirusSeq until 2026-08-07
  imicroseqPathogenGenomes: {
    value: "600,000+",
    source: "iMicroSeq",
    verified: "2026-08-07",
  },
  imicroseqClinicalSamples: {
    value: "~650,000",
    source: "iMicroSeq",
    verified: "2026-08-07",
  },
  imicroseqWastewaterRecords: {
    value: "~170,000",
    source: "iMicroSeq",
    verified: "2026-08-07",
    note: "Environmental wastewater surveillance records.",
  },
  imicroseqLaunch: {
    value: "2021",
    source: "iMicroSeq",
    verified: "2026-08-07",
  },

  // OICR Drug Discovery Portal. This site already publishes all three, in
  // docs/use-docs/ai-assisted-data-discovery/01-testing-environment.md, which
  // describes the demo instance's sample as a slice of this portal and gives the
  // upstream totals it was drawn from. They are lifted here rather than restated
  // there so the home page reads them the same way every other figure is read.
  ddpRecords: {
    value: "~405 million",
    source: "OICR Drug Discovery Portal",
    verified: "2026-07-27",
    note: "Records across gene correlations, mutations, expression profiles and protein interactions.",
  },
  ddpGenes: {
    value: "~20,000",
    source: "OICR Drug Discovery Portal",
    verified: "2026-07-27",
  },
  ddpCancerTypes: {
    value: "32",
    source: "OICR Drug Discovery Portal",
    verified: "2026-07-27",
    note: "Datasets are related by gene (HUGO symbol), so a list filtered in one catalogue can be refined against the others.",
  },

  // Carried forward from the Gatsby site. No traceable source, so they are
  // published as-is and flagged rather than quietly re-stated as current.
  hcmiCancerModels: {
    value: "275",
    source: "Unverified: carried forward from the Gatsby site",
    verified: null,
    note: "Unique cancer models across 25 primary sites.",
  },
  ihccCohorts: {
    value: "70",
    source: "Unverified: carried forward from the Gatsby site",
    verified: null,
    note: "Participating cohorts across 39 countries.",
  },
  kidsFirstParticipants: {
    value: "30.5k",
    source: "Unverified: carried forward from the Gatsby site",
    verified: null,
    note: "Kids First is lineage rather than a platform the team runs, and still needs moving to that tier.",
  },
} satisfies Record<string, Metric>;

/** Every figure name a caller can look up on `metrics`. */
export type MetricKey = keyof typeof metrics;

export default metrics;
