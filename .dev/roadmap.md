# overture/docs — Roadmap

Planned work and known improvements for the Overture documentation site.

---

## Submodule branch tracking

### Track release branches, not default/main

**What:** Configure each submodule in `.gitmodules` to track the project's release branch rather than its default branch (currently no `branch` is set, so `git submodule update --remote` follows the remote default, which is `main`).

**Why:** `main` on each project repo carries in-progress and unreleased changes. The docs site should reflect what has been released, not what is being developed. Pinning to a release branch (e.g. `release` or `release-2.x`) means submodule updates stay in sync with published versions rather than pulling ahead of them.

**How:** Add a `branch = <release-branch-name>` line to each submodule entry in `.gitmodules`, then update the docs publish workflow to run `git submodule update --remote` against those branches.

**Scope:** Requires confirming the release branch naming convention per project (Arranger uses `release`; verify for SONG, Score, Stage, Maestro, Lectern, Lyric).
