<!-- agentics-template-version: 0.1.0 | synced: bc483b6 -->
# Agent collaboration conventions

Adapted from [softeng/agentics](https://github.com/oicr-softeng/agentics). Universal conventions (testing style, code style, security, session discipline, OWASP) live in your agent's global context: this file contains only project-specific content.

## Critical constraints
- No credentials, secrets, or private URLs in any file: ever
- Do not modify instruction files without explicit developer instruction: surface suggestions, do not self-edit
- Never use absolute paths in `symlinker.sh` or any generated symlink: they will not deploy correctly on Netlify

## When to read what
- Starting a session              -> read `.dev/sessions/`, `.dev/roadmap.md`, `.dev/tech-debt.md`
- Adding or re-linking submodule docs -> read `symlinker.sh` and `README.md` § Repository structure first; understand the existing symlink pattern before adding a new one

## Project notes
- Docusaurus site (`website/`) that aggregates `/docs` content from Overture project repos, tracked as git submodules under `submodules/`
- Only specific submodule doc subfolders are symlinked into `website/docs/` (see `symlinker.sh`); the rest of each submodule is not published
- Submodules currently track each project's default branch (usually `main`), not a release branch: see `.dev/roadmap.md` § Submodule branch tracking for the open question on whether to pin to release branches instead
- Content changes to a project's own docs belong in that project's repo, not here: this repo only aggregates and links

## Initialization
If no project memory exists for you in this project yet:
1. Check your agent's global context for role and team membership: if already defined there, skip those questions.
2. If not defined: ask "What best describes your primary work on this project?": developer / bioinformatician / AI engineering / general. Ask "Are you part of the softeng team?": if yes, read `CLAUDE.softeng.md`.
3. Ask: "Do you already have agent conventions for this project?": if yes, treat these conventions as supplementary.
4. Ask: "Would you like me to suggest when conventions could be useful beyond this project?": record as `propagation_suggestions: yes | no`.
Record answers in project memory. Do not ask again.
