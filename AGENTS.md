<!-- agentics-template-version: 0.1.0 | synced: bc483b6 -->
# Agent collaboration conventions

Adapted from [softeng/agentics](https://github.com/oicr-softeng/agentics). This is the comprehensive reference for agents that do not load files on demand. If you are Claude, prefer `CLAUDE.md`: it dispatches to more detailed convention files.

## Interaction parameters
- Ask clarifying questions before making large assumptions about intent
- Surface better alternatives as options; let the user decide
- Push back on bad ideas and identify blind spots before they are baked into code
- Flag scope-adjacent issues verbally, then document them in `.dev/tech-debt.md`

## Critical constraints
- No credentials, secrets, or private URLs in any file: ever
- Do not modify `CLAUDE.md`, `AGENTS.md`, or other instruction files without explicit instruction from the developer: surface suggestions, do not self-edit
- Never use absolute paths in `symlinker.sh` or any generated symlink: they will not deploy correctly on Netlify

## Project notes
- Docusaurus site (`website/`) that aggregates `/docs` content from Overture project repos, tracked as git submodules under `submodules/`
- Only specific submodule doc subfolders are symlinked into `website/docs/` (see `symlinker.sh`); the rest of each submodule is not published
- Submodules currently track each project's default branch (usually `main`), not a release branch: see `.dev/roadmap.md` § Submodule branch tracking
- Content changes to a project's own docs belong in that project's repo, not here: this repo only aggregates and links
- No test suite; `website/package.json` scripts are Docusaurus build/serve/typecheck only

## Session-start signals

A session is a work period: not necessarily a new chat thread. Treat greetings ("good morning", "hi again"), resumption phrases ("let's continue", "back to it", "where were we"), and on-demand requests ("sync up", "refresh context", "re-read your instructions") as session-start signals even mid-thread.

## Starting a session

On a session-start signal, before touching any code or documents:
1. Check whether your agent has a cross-project map available. If it exists, read it for cross-project context and downstream effects (Overture repos this docs site aggregates from).
2. Check whether instruction files changed since your last session file: `git log --oneline -1 -- CLAUDE.md AGENTS.md`. Re-read only changed files.
3. Read `.dev/roadmap.md`: check current focus and any `[in progress]` items.
4. Read `.dev/tech-debt.md`: note `standalone: yes` entries relevant to today's work.
5. Read the most recent 1-2 files in `.dev/sessions/` for context on recent work and open threads (`ls .dev/sessions | sort | tail -2`).
6. softeng team member -> apply Canadian English spelling and softeng conventions from your agent's global context.

## Session file identity

Each session's log lives in its own file under `.dev/sessions/`, named `YYYY-MM-DDTHHMMSS.md`, keyed by contributor and day: this avoids merge conflicts when several people work the project the same day. Find today's file by listing `.dev/sessions/` for today's date prefix and checking authorship (git log for committed files, working-tree presence for uncommitted ones). Extend your own file if one exists for today; otherwise create a new one.

## Keeping `.dev/` current

At session start, do a quick staleness pass on `roadmap.md` and `tech-debt.md`: mark completed items done, close resolved entries.

Update `.dev/roadmap.md` or `.dev/tech-debt.md` within the same session whenever a roadmap item's status changes, a tech-debt entry is resolved, or a meaningful decision is made.

After any meaningful unit of work: content aggregated, symlink added, roadmap updated, docs changed: add or extend the dated entry in today's `.dev/sessions/` file. Do not wait for a "session over" signal. Do not log conversational activity (discussions, PR reviews with no local changes, waiting states).

When `.dev/` documents are updated, remind the developer to commit them: this history matters for avoiding double work across sessions.

## Session file entry format

One lean context sentence (what + why), a blank line, then one bullet per file or logical group of changes. No date header (the filename carries it). No prose paragraphs. Separator in bullets is `: ` (colon-space); no em dashes or space-hyphen-space connectors.

```
[One sentence: what the work was and why.]

- `path/to/file`, `path/to/other`: what changed; decision or constraint if non-obvious
- `path/to/file`: what changed
```

## Tech-debt entry format

```
[short description of the issue]
standalone: yes | no
context: [roadmap item reference or brief note: required when standalone: no]
```

`standalone: yes`: can be picked up freely. `standalone: no`: blocked on or coupled to roadmap work; read the context note before touching it. Separate the issue from the fix even in this minimal form.

## Code style

**Comments:** write none by default. Add one only when the WHY is non-obvious: a hidden constraint, subtle invariant, workaround for a specific bug. Never explain WHAT the code does; never reference the current task or callers.

**Scope:** stick to stated scope. Surface weaknesses verbally, then log in `.dev/tech-debt.md`. Three similar lines is better than a premature abstraction.

**Search before writing:** before implementing something new, search the codebase for existing patterns.

**Library awareness:** when a well-established library would do more thorough work than a hand-rolled solution, surface it as an option with a brief explanation. Let the developer decide.

**Checking in:** check in before non-trivial direction changes; not on mechanical steps.

**Property ordering:** alphabetize properties in config objects and YAML/JSON files at all nesting levels: prevents silent duplicate key overwrites and keeps additions consistent.

**Language:** Canadian English (`-our`, `-re`, `-ize`, `-yze`). Flag typos and language issues when spotted: don't fix silently.

**Dashes:** never use em dashes, en dashes, double hyphens, or space-hyphen-space as sentence connectors. Use a colon or semicolon instead; hyphens remain fine for compound words and numeric ranges.

## Security

Be aware of the current OWASP Top 10 (verify the current edition at https://owasp.org/www-project-top-ten/). This is a public documentation site; the main relevant surface is dependency management (Docusaurus and its plugins) and not exposing private URLs or credentials in published content.

## Convention placement and propagation

Conventions live at one of three levels: always ask which level is correct:

- **Project-specific**: applies to this project only; goes in `CLAUDE.md` or `.dev/tech-debt.md`
- **Global**: applies to all the developer's projects; belongs in your agent's global context
- **Shareable**: could benefit other teams; flag as a potential PR to the agentics repo

## Initialization

If no project memory exists for you in this project yet:
1. Check whether a cross-project map is accessible.
2. Ask: "What best describes your primary work on this project?": developer / bioinformatician / AI engineering / general (or describe it).
3. Ask: "Are you part of the softeng team?": if yes, apply softeng conventions from your agent's global context.
4. Ask: "Do you already have agent conventions for this project?": if yes, treat these conventions as supplementary; defer to your existing setup on conflicts.
5. Ask: "Would you like me to suggest when conventions could be useful beyond this project?": record as `propagation_suggestions: yes | no`.
Record all answers in project memory. Do not ask again.
