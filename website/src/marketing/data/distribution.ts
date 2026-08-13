// How far the code travels, and how long it has been travelling: the two
// sections at the foot of /impact/.
//
// Before this, the page argued reach only through named platforms, which
// undercounts by construction — a platform has to be big enough for us to
// know about, while the registries count everyone.
//
// Totals live in data/metrics.ts with the rest of the site's figures; the
// breakdowns are here because they're tables, not headline figures.
//
// Every row carries its own link, like data/dependents.ts: registry pages
// are the source, not a dashboard of ours.
//
// Release counting uses each component's confirmed publish history (npm
// versions, container tags, or a release-branch build, whichever is its
// real mechanism) checked against the registry directly, not inferred from
// git tags: tagging practice varies too much across the org for a bare tag
// count to be reliable. `firstRelease` still reads from a git tag for most
// components, since no registry retains history that far back; see each
// row's own note.

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

/** Every package published under the @overture-stack npm scope. */
export const NPM_SCOPE_LINK = "https://www.npmjs.com/search?q=%40overture-stack";
/** The org's Docker Hub image listing. */
export const DOCKER_HUB_LINK = "https://hub.docker.com/u/overture";
/** The org's GitHub Container Registry package listing. */
export const GHCR_PACKAGES_LINK =
  "https://github.com/orgs/overture-stack/packages";

/** The npm registry page for one @overture-stack package, by its unscoped name. */
export function npmPackageLink(name: string): string {
  return `https://www.npmjs.com/package/@overture-stack/${name}`;
}

export type ComponentRelease = {
  /** Matches data/components.ts's id, so the two cannot drift on naming. */
  id: string;
  /** Functional name, then codename, the house style fixed in ia-proposal.md. */
  name: string;
  codename: string;
  /**
   * Where the release count's evidence lives: a GHCR container page or an npm
   * package page, per component. Stage is the one exception, still linked to
   * its git tags page; see its row for why.
   */
  tagsHref: string;
  /**
   * ISO date of the earliest verified release. Sourced from a git tag for
   * every component except Lyric: no registry retains history back that far,
   * so the tag is the only surviving evidence. Each row notes where its own
   * first *published artifact* evidence begins, when that's later.
   */
  firstRelease: string;
  /** The first release's evidence: a tag page, or a merged PR where neither a tag nor a Release exists. */
  firstReleaseHref: string;
  /**
   * Confirmed published releases: npm versions, container image tags, or
   * merged release-branch builds, whichever is this component's real
   * mechanism. Not a git tag count; see the file-level note above.
   */
  tags: string;
  /** Most recent confirmed release, with its month. */
  latest: string;
  /**
   * Where "latest" points to: a GitHub Release, a git tag, an npm package, or
   * the merged PR that shipped it when none of those exist. See each row's own
   * note for which and why.
   */
  latestHref: string;
  contributors: string;
  /**
   * GitHub's own contributor graph for the default branch, with an explicit
   * `?from=` (the repo's creation date) and `?to=` (today) so the graph covers
   * its full history: without a range, GitHub's UI silently windows the graph
   * to a shorter recent period and undercounts.
   */
  contributorsHref: string;
};

/**
 * Seven components, in the order they were first released. Oldest first, because
 * the argument this table makes is longevity and the first column is the one
 * carrying it.
 *
 * Counts are of confirmed published releases, checked per component against
 * whichever registry it actually ships to, not of git tags, and not of GitHub's
 * curated Releases page either: that page is curated and would show none at all
 * for Lectern and Lyric, one for Stage, and two for Arranger, against real
 * publish histories many times longer. Method varies by component because the
 * mechanism does: Score, Song, Maestro and Stage ship containers; Arranger and
 * Lyric ship npm packages (Arranger's npm history is used instead of its GHCR
 * image, which has been stale since its 2.x line); Lectern ships both. See the
 * file-level note above for the full reasoning, and each row's own comment for
 * the specifics that don't fit in a table cell.
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
    // GHCR's `score-server` image, the current registry; Docker Hub (legacy,
    // frozen since 2023-11) is folded into the count below but not linked here.
    tagsHref: "https://github.com/overture-stack/score/pkgs/container/score-server",
    // Git tag only; no container survives from this far back. Docker Hub's
    // earliest confirmed Score image is 1.1.0, pushed 2018-05-08.
    firstRelease: "2015-07-06",
    firstReleaseHref: "https://github.com/overture-stack/score/releases/tag/0.0.10",
    // 34 distinct published container versions (Docker Hub 1.1.0–5.10.0 union
    // GHCR 5.3.0–5.12.0), not the 102 git tags, ~57 of which have no matching
    // container at all (pre-2018, or other submodule/junk tags in this repo).
    tags: "34",
    // 5.12.0 shipped as a container (GHCR, 2025-08-05) with no git tag at all;
    // CI keeps publishing untagged commit builds past this on `score-client`.
    latest: "5.12.0 (2025-08)",
    latestHref: "https://github.com/overture-stack/score/pull/492",
    contributors: "26",
    contributorsHref:
      "https://github.com/overture-stack/score/graphs/contributors?from=3%2F26%2F2015&to=8%2F13%2F2026",
  },
  {
    id: "song",
    name: "File Manager",
    codename: "Song",
    tagsHref: "https://github.com/overture-stack/song/pkgs/container/song-server",
    // Git tag only; earliest confirmed container is 1.2.0, Docker Hub,
    // 2018-09-28, over a year later.
    firstRelease: "2017-06-07",
    firstReleaseHref: "https://github.com/overture-stack/song/releases/tag/0.0.1",
    // 39 distinct published container versions across legacy Docker Hub
    // (overture/song, overture/song-server) and current GHCR, not the 70 git
    // tags (which mix two renaming eras, docker-packaging mirror tags, and
    // some junk markers with the real release lineage).
    tags: "39",
    // 5.4.0 merged to master 2026-08-12 (the real release ritual here is an
    // `rc/X.Y.Z` branch merge, not a tag push). Its container build was still
    // failing in Jenkins as of 2026-08-13, a known issue that's being fixed,
    // so this links to the merge itself rather than an image that doesn't
    // exist yet. The last confirmed-published container is 5.3.0 (2025-05-30).
    latest: "5.4.0 (2026-08)",
    latestHref: "https://github.com/overture-stack/song/pull/914",
    contributors: "28",
    contributorsHref:
      "https://github.com/overture-stack/song/graphs/contributors?from=4%2F18%2F2017&to=8%2F13%2F2026",
  },
  {
    id: "arranger",
    name: "Search",
    codename: "Arranger",
    // npm, not GHCR: this monorepo's `arranger-server` container has been
    // stale since its 2.x line and never picked up the 3.x npm releases below.
    tagsHref: npmPackageLink("arranger-server"),
    // Git tag only; the first published npm package in this monorepo is
    // arranger-server@3.0.0-beta.1, from 2021-12-10. The pre-2021 unified tag
    // line was never published as an installable package under any name.
    firstRelease: "2017-12-17",
    firstReleaseHref:
      "https://github.com/overture-stack/arranger/releases/tag/v0.0.1-0.0.2.1.0",
    // 134 distinct published npm versions across the Arranger family
    // (arranger-server, -components, -charts, -types, -graphql-router, sqon,
    // sqon-builder), not the 407 git tags, which conflate one legacy unified
    // scheme with several sub-packages that are still prerelease-only.
    tags: "134",
    // arranger-server@3.0.4, npm, 2026-05-13, the newest GA release anywhere
    // in the family. Several sibling packages (search-server, graphql-router,
    // components, sqon, mcp-server) are mid-restructure with `-rc` npm
    // releases as recent as 2026-07-28, but none has gone GA yet.
    latest: "3.0.4 (2026-05)",
    latestHref: `${npmPackageLink("arranger-server")}/v/3.0.4`,
    contributors: "34",
    contributorsHref:
      "https://github.com/overture-stack/arranger/graphs/contributors?from=12%2F14%2F2017&to=8%2F13%2F2026",
  },
  {
    id: "maestro",
    name: "Indexing Service",
    codename: "Maestro",
    tagsHref: "https://github.com/overture-stack/maestro/pkgs/container/maestro",
    firstRelease: "2019-05-22",
    firstReleaseHref: "https://github.com/overture-stack/maestro/releases/tag/0.1.0",
    // 27 confirmed semver-era container releases (Docker Hub, then GHCR) plus
    // 1 for 5.0.0 below: 28. The 27 are the old Java/Maven stack's history,
    // stopping at 4.3.0 (2023-01); dropped the 28th git tag from that era
    // (`4.4.0-SNAPSHOT`), a pre-release marker that was never a real published
    // version.
    tags: "28",
    // The ground-up TypeScript/pnpm/nx rewrite (formerly tracked on a
    // separate `M5-revised` branch, since renamed to `main`, now the repo's
    // default) shipped its first real versioned container, 5.0.0, built from
    // the `release` branch on 2026-08-13. No git tag or GitHub Release exists
    // for it yet, so this links to the version-bump commit itself; `main` is
    // one commit behind and still reads `5.0.0-alpha.1` in its package.json.
    // 4.3.0 (2023-01) was the last release of the old stack, now superseded.
    latest: "5.0.0 (2026-08)",
    latestHref:
      "https://github.com/overture-stack/maestro/commit/49d850ddae64577150d45f43c93290693766e8f3",
    contributors: "14",
    contributorsHref:
      "https://github.com/overture-stack/maestro/graphs/contributors?from=3%2F6%2F2019&to=8%2F13%2F2026",
  },
  {
    id: "lectern",
    name: "Dictionary Manager",
    codename: "Lectern",
    tagsHref: "https://github.com/overture-stack/lectern/pkgs/container/lectern",
    firstRelease: "2019-08-15",
    firstReleaseHref: "https://github.com/overture-stack/lectern/releases/tag/1.1.2",
    // 32 dated release events: the 25-version legacy monolith container line
    // (2019–2023, Docker Hub then GHCR) plus 7 post-split npm/GHCR cuts
    // (six 2.0.0-beta releases and the final 2.0.0), several of which were
    // never git-tagged at all. Not the 38 git tags, which double-count the
    // simultaneous 2.0.0 cut across five separately-tagged packages.
    tags: "32",
    latest: "2.0.0 (2026-04)",
    latestHref:
      "https://github.com/overture-stack/lectern/releases/tag/dictionary-v2.0.0",
    contributors: "19",
    contributorsHref:
      "https://github.com/overture-stack/lectern/graphs/contributors?from=6%2F24%2F2019&to=8%2F13%2F2026",
  },
  {
    id: "stage",
    name: "Portal UI",
    codename: "Stage",
    // The one component still linked to its git tags page rather than a
    // registry: see the note on `tags` below for why.
    tagsHref: "https://github.com/overture-stack/stage/tags",
    firstRelease: "2020-10-15",
    firstReleaseHref: "https://github.com/overture-stack/stage/releases/tag/0.2.0",
    // 15 git tags, kept as the published figure because, unusually among
    // these seven, no *registry* evidence survives for this era at all: GHCR's
    // history for Stage only reaches back to 2024-04-16, well after tagging
    // stopped, so the tags are the only surviving evidence of the versioned
    // era rather than a stand-in for a better number. Real shipping did not
    // stop when tagging did: `main` has continued past 1.1.3 (2022-03) with no
    // version number attached, publishing 35 further untagged GHCR builds since
    // 2024-04, the latest 2026-08-05, continuous per-commit deployment, not a
    // dormant component. Five independent per-client fork branches (iobio,
    // ch_portal, bridgeStage, paperscrape, demo) exist on top of that and are
    // not reflected here.
    tags: "15",
    latest: "1.1.3 (2022-03)",
    latestHref: "https://github.com/overture-stack/stage/releases/tag/1.1.3",
    contributors: "11",
    contributorsHref:
      "https://github.com/overture-stack/stage/graphs/contributors?from=9%2F2%2F2020&to=8%2F13%2F2026",
  },
  {
    id: "lyric",
    name: "Tabular Submission",
    codename: "Lyric",
    tagsHref: npmPackageLink("lyric"),
    // Corrected 2026-08-13: the `1.0.0` tag this used to cite is a red herring,
    // a Jenkinsfile/Dockerfile setup commit, not a release. The first real
    // package, 0.1.0, published to npm and GHCR together on 2024-06-14.
    firstRelease: "2024-06-14",
    firstReleaseHref: "https://github.com/overture-stack/lyric/pull/52",
    // 28 npm versions (0.1.0–0.19.0), matched one-for-one by GHCR container
    // tags, the cleanest release history of the seven. `lyric-data-model`
    // tracks the same version numbers in lockstep, missing only 0.16.1.
    // Superseded the 15 git tags: tagging stopped after 0.8.1 (2025-03), and
    // every release since exists only as a "Release X.Y.Z" PR merged into a
    // long-lived `release` branch, then published, never tagged.
    tags: "28",
    latest: "0.19.0 (2026-07)",
    latestHref: npmPackageLink("lyric"),
    contributors: "8",
    contributorsHref:
      "https://github.com/overture-stack/lyric/graphs/contributors?from=2%2F5%2F2024&to=8%2F13%2F2026",
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
