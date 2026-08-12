// How far the code travels, and how long it has been travelling: the two
// sections at the foot of /impact/.
//
// Nothing on this site published a download, a pull count or a release history
// before 2026-08-12. The page argued reach entirely through named platforms,
// which undercounts by construction: a platform has to be big enough for us to
// know about it before it can appear, and the registries count everyone.
//
// Sourced from the RSMF Phase 2 supporting-evidence submission, §5 and §6.
// Totals live in data/metrics.ts with the rest of the site's figures, so a
// reader of that file sees every number the site publishes in one place; the
// breakdowns are here because they are tables rather than headline figures.
//
// **Every row carries its own link**, for the same reason data/dependents.ts
// does: these are the numbers a reviewer is most likely to want to check, and a
// figure with no source beside it is the kind of claim this site is trying to
// stop making. Registry pages are the source, not a dashboard of ours.

export type NpmPackage = {
  /** Bare package name; the scope is added when it is rendered. */
  name: string;
  /** Downloads in the twelve months to 2026-08-09, as printed. */
  downloads: string;
};

/**
 * All thirteen published packages, most downloaded first. Every one of them, not
 * a top five: the long tail is the more interesting half of this table, because
 * it says the packages are being taken individually rather than as one bundle.
 *
 * `metrics.npmDownloads` is the total. Keep the two in step.
 */
export const npmPackages: NpmPackage[] = [
  { name: "sqon-builder", downloads: "8,837" },
  { name: "arranger-components", downloads: "6,703" },
  { name: "lectern-client", downloads: "5,252" },
  { name: "lyric", downloads: "4,973" },
  { name: "arranger-charts", downloads: "4,792" },
  { name: "lectern-validation", downloads: "4,448" },
  { name: "lyric-data-model", downloads: "4,387" },
  { name: "lectern-dictionary", downloads: "4,369" },
  { name: "arranger-server", downloads: "1,732" },
  { name: "lectern-ui", downloads: "1,601" },
  { name: "arranger-graphql-router", downloads: "627" },
  { name: "sqon", downloads: "570" },
  { name: "arranger-types", downloads: "563" },
];

export const NPM_SCOPE_LINK = "https://www.npmjs.com/search?q=%40overture-stack";
export const DOCKER_HUB_LINK = "https://hub.docker.com/u/overture";
export const GHCR_PACKAGES_LINK =
  "https://github.com/orgs/overture-stack/packages";

export function npmPackageLink(name: string): string {
  return `https://www.npmjs.com/package/@overture-stack/${name}`;
}

export type ComponentRelease = {
  /** Matches data/components.ts's id, so the two cannot drift on naming. */
  id: string;
  /** Functional name, then codename, the house style fixed in ia-proposal.md. */
  name: string;
  codename: string;
  /** The repository's tags page, which is where the count came from. */
  tagsHref: string;
  /** ISO date of the first tagged release. */
  firstRelease: string;
  /** The first tag itself, linked from the date. */
  firstReleaseHref: string;
  /** Version tags in the git history, as printed. */
  tags: string;
  /** Most recent release, with its month. */
  latest: string;
  /**
   * Where "latest" points to. Usually the matching git tag; for Lyric no git
   * tag matches the published version (its npm releases have run ahead of its
   * tags), so this points at the npm package instead.
   */
  latestHref: string;
  contributors: string;
  /** GitHub's own contributor graph for the default branch. */
  contributorsHref: string;
};

/**
 * Seven components, in the order they were first released. Oldest first, because
 * the argument this table makes is longevity and the first column is the one
 * carrying it.
 *
 * Counts are of git tags, not of GitHub Releases. The distinction matters and
 * the page states it: Releases pages are curated and would show none at all for
 * Lectern and Lyric and two for Arranger, against 38, 15 and 407 real tags.
 *
 * Contributor counts are GitHub's own, per repository, on the default branch.
 * **Do not total this column.** People appear in several of these repositories,
 * so the sum double-counts and would be a fabricated figure; the site publishes
 * the column and no total, which is why `metrics.ts` has no entry for one.
 */
export const releaseHistory: ComponentRelease[] = [
  {
    id: "score",
    name: "File Transfer",
    codename: "Score",
    tagsHref: "https://github.com/overture-stack/score/tags",
    firstRelease: "2015-07-06",
    firstReleaseHref: "https://github.com/overture-stack/score/releases/tag/0.0.10",
    tags: "102",
    latest: "5.11.0 (2024-10)",
    latestHref: "https://github.com/overture-stack/score/releases/tag/5.11.0",
    contributors: "26",
    contributorsHref:
      "https://github.com/overture-stack/score/graphs/contributors",
  },
  {
    id: "song",
    name: "File Manager",
    codename: "Song",
    tagsHref: "https://github.com/overture-stack/song/tags",
    firstRelease: "2017-06-07",
    firstReleaseHref: "https://github.com/overture-stack/song/releases/tag/0.0.1",
    tags: "70",
    latest: "5.2.0 (2024-07)",
    latestHref: "https://github.com/overture-stack/song/releases/tag/5.2.0",
    contributors: "28",
    contributorsHref:
      "https://github.com/overture-stack/song/graphs/contributors",
  },
  {
    id: "arranger",
    name: "Search",
    codename: "Arranger",
    tagsHref: "https://github.com/overture-stack/arranger/tags",
    firstRelease: "2017-12-17",
    firstReleaseHref:
      "https://github.com/overture-stack/arranger/releases/tag/v0.0.1-0.0.2.1.0",
    tags: "407",
    latest: "server-v3.0.0 (2025-08)",
    latestHref:
      "https://github.com/overture-stack/arranger/releases/tag/server-v3.0.0",
    contributors: "34",
    contributorsHref:
      "https://github.com/overture-stack/arranger/graphs/contributors",
  },
  {
    id: "maestro",
    name: "Indexing Service",
    codename: "Maestro",
    tagsHref: "https://github.com/overture-stack/maestro/tags",
    firstRelease: "2019-05-22",
    firstReleaseHref: "https://github.com/overture-stack/maestro/releases/tag/0.1.0",
    tags: "28",
    latest: "4.3.0 (2023-01)",
    latestHref: "https://github.com/overture-stack/maestro/releases/tag/4.3.0",
    contributors: "14",
    contributorsHref:
      "https://github.com/overture-stack/maestro/graphs/contributors",
  },
  {
    id: "lectern",
    name: "Dictionary Manager",
    codename: "Lectern",
    tagsHref: "https://github.com/overture-stack/lectern/tags",
    firstRelease: "2019-08-15",
    firstReleaseHref: "https://github.com/overture-stack/lectern/releases/tag/1.1.2",
    tags: "38",
    latest: "2.0.0 (2026-04)",
    latestHref:
      "https://github.com/overture-stack/lectern/releases/tag/dictionary-v2.0.0",
    contributors: "19",
    contributorsHref:
      "https://github.com/overture-stack/lectern/graphs/contributors",
  },
  {
    id: "stage",
    name: "Portal UI",
    codename: "Stage",
    tagsHref: "https://github.com/overture-stack/stage/tags",
    firstRelease: "2020-10-15",
    firstReleaseHref: "https://github.com/overture-stack/stage/releases/tag/0.2.0",
    tags: "15",
    latest: "1.1.3 (2022-03)",
    latestHref: "https://github.com/overture-stack/stage/releases/tag/1.1.3",
    contributors: "11",
    contributorsHref:
      "https://github.com/overture-stack/stage/graphs/contributors",
  },
  {
    id: "lyric",
    name: "Tabular Submission",
    codename: "Lyric",
    tagsHref: "https://github.com/overture-stack/lyric/tags",
    firstRelease: "2024-04-08",
    firstReleaseHref: "https://github.com/overture-stack/lyric/releases/tag/1.0.0",
    tags: "15",
    latest: "0.19.0 (2026-07)",
    latestHref: npmPackageLink("lyric"),
    contributors: "8",
    contributorsHref:
      "https://github.com/overture-stack/lyric/graphs/contributors",
  },
];

/**
 * The container registries, as a short list rather than a table: three figures
 * and a caveat, which a table would only put boxes around.
 *
 * Docker Hub is historical and GHCR is current, which is why the two are counted
 * differently. GHCR publishes tag counts but not pull counts, so there is no
 * single number covering both and the page does not invent one.
 */
export const containerRegistries = [
  {
    id: "lectern",
    label: "Dictionary Manager (Lectern)",
    pulls: "225,229",
  },
  {
    id: "song",
    label: "File Manager (Song), server and client",
    pulls: "184,453",
  },
  {
    id: "score",
    label: "File Transfer (Score)",
    pulls: "126,086",
  },
];

/** Published tags on the current registry, most first. */
export const ghcrTags = [
  { id: "arranger-server", label: "arranger-server", tags: "441" },
  { id: "lectern", label: "lectern", tags: "139" },
  { id: "score-server", label: "score-server", tags: "122" },
  { id: "song-server", label: "song-server", tags: "102" },
  { id: "lyric", label: "lyric", tags: "85" },
];
