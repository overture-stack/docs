// Every figure the marketing site publishes, in one place.
//
// The site's numbers went stale because they were typed into JSX once, while the
// numbers that actually matter are maintained in program reporting that never
// flowed back. Pages read from here; nothing hardcodes a figure. See
// .dev/ia-proposal.md § One source for the numbers.
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

/**
 * A figure goes stale after six months, matching the documentation-currency
 * cadence in .dev/roadmap.md § Parked, so one refresh covers both.
 */
export const MAX_VERIFIED_AGE_MONTHS = 6;

const metrics = {
  // Platform-wide
  activePlatforms: {
    value: "seven",
    source: "OICR Genome Informatics program",
    verified: "2026-08-07",
    note: "Platforms the team builds and runs, excluding lineage deployments such as Kids First.",
  },
  stableReleaseHistory: {
    value: "8+ years",
    source: "Overture component release histories",
    verified: "2026-08-07",
    note: "Applies to the mature components; each follows independent semantic versioning.",
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
  icgcArgoRegisteredUsers: {
    value: "3,500+",
    source: "ICGC-ARGO Data Platform",
    verified: "2026-08-07",
    note: "Registered users, a subset of whom are approved for controlled-access data.",
  },

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
    note: "Kids First is lineage rather than a platform the team runs; phase 3 moves it to that tier.",
  },
} satisfies Record<string, Metric>;

export type MetricKey = keyof typeof metrics;

/**
 * Every figure that has gone stale, or was never verified at all.
 *
 * Nothing calls this yet. It is here so that wiring it into the pre-commit
 * build gate, which .dev/roadmap.md § Known issues still lists as open, is a
 * one-line job rather than a design task.
 */
export function findStaleMetrics(now: Date): MetricKey[] {
  const cutoff = new Date(now);
  cutoff.setMonth(cutoff.getMonth() - MAX_VERIFIED_AGE_MONTHS);

  return (Object.keys(metrics) as MetricKey[]).filter((key) => {
    const { verified } = metrics[key];
    return verified === null || new Date(verified) < cutoff;
  });
}

export default metrics;
