# overture/docs — Roadmap

Planned work and known improvements for the Overture documentation site.

---

## Submodule branch tracking

### Track release branches, not default/main

**What:** Configure each submodule in `.gitmodules` to track the project's release branch rather than its default branch (currently no `branch` is set, so `git submodule update --remote` follows the remote default, which is `main`).

**Why:** `main` on each project repo carries in-progress and unreleased changes. The docs site should reflect what has been released, not what is being developed. Pinning to a release branch (e.g. `release` or `release-2.x`) means submodule updates stay in sync with published versions rather than pulling ahead of them.

**How:** Add a `branch = <release-branch-name>` line to each submodule entry in `.gitmodules`, then update the docs publish workflow to run `git submodule update --remote` against those branches.

**Scope:** Requires confirming the release branch naming convention per project (Arranger uses `release`; verify for SONG, Score, Stage, Maestro, Lectern, Lyric).

---

## Community health files

### Consolidate Code of Conduct across Overture repos

**What:** Confirm one canonical home for the Overture Code of Conduct and remove per-repo duplicates. `CONTRIBUTING.md` in at least one project repo (Arranger) already links to a centralized version at `https://docs.overture.bio/community/code-of-conduct`, but Arranger PR #1083 (`overture-stack/arranger`) added a second, local `code_of_conduct.md` at that repo's root, unrelated to the docs work the PR was otherwise about.

**Why:** Two copies of the same governance document drift silently: an update to one is easy to forget in the other, and a lowercase `code_of_conduct.md` filename also isn't recognized by GitHub's community-profile health check, so it does not even serve as a fallback correctly.

**How:** Decide whether the canonical version should live only on docs.overture.bio (with every project repo's `CONTRIBUTING.md` linking out, no local copy) or as a single shared file referenced via each repo's community health defaults (a `.github` org-default repo, or a per-repo `CODE_OF_CONDUCT.md` kept in lockstep via a shared template). Once decided, remove local duplicates like the one added in arranger#1083 and standardize the pattern going forward.

**Scope:** Audit other Overture repos (Stage, SONG, Score, Maestro, Lectern, Lyric, Usher) for the same duplication before treating this as Arranger-specific.
