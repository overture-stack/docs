# overture/docs — Tech debt

Known issues and design weaknesses. See `AGENTS.md` § Tech-debt entry format.

---

## Pin submodules to release branches instead of tracking main

`.gitmodules` sets no `branch` for any submodule, so `git submodule update --remote` follows each project's default branch (`main`), which carries in-progress and unreleased changes rather than what's actually published.
standalone: no
context: add `branch = <release-branch-name>` per submodule in `.gitmodules` (Arranger uses `release`; confirm naming for SONG, Score, Stage, Maestro, Lectern, Lyric) and update the docs publish workflow to run `git submodule update --remote` against those branches. Blocked on confirming per-project branch names; see `.dev/roadmap.md` § Submodule branch tracking for the full write-up.
