#!/usr/bin/env bash
#
# Regenerates the documentation symlinks under website/docs/ that bring each
# submodule's docs into the Docusaurus site. Run from the repository root:
#
#     ./symlinker.sh
#
# These links MUST match what is committed under website/docs/. If you change
# what the site surfaces, change it here and regenerate — so the script and the
# repo never disagree. (A drifted script silently rebuilds a *different* site.)
#
# Link targets are relative, never absolute: Netlify resolves them at build time
# and absolute paths do not deploy correctly.
#
set -euo pipefail
cd "$(dirname "$0")"

# --- Core software: each links the component's whole docs/ directory ---
#     link path (under website/docs/)                 submodule
core_links=(
  "website/docs/develop-docs/01-Lectern     lectern"
  "website/docs/develop-docs/02-Lyric       lyric"
  "website/docs/develop-docs/03-Song        song"
  "website/docs/develop-docs/04-Score       score"
  "website/docs/develop-docs/05-Maestro     maestro"
  "website/docs/develop-docs/06-Arranger    arranger"
  "website/docs/develop-docs/07-Stage       stage"
)
for entry in "${core_links[@]}"; do
  read -r link comp <<<"$entry"
  rm -rf "$link"
  ln -s "../../../submodules/${comp}/docs/" "$link"
done

# --- Org-level documentation standards (from the .github submodule) ---
#     Re-homed under the Community journey (website/docs/community-docs/) in
#     the Deploy·Build·Use IA migration; the relative target has one fewer
#     ../ than the core_links above because this symlink sits directly under
#     docs/community-docs/, not nested a level deeper like 01-core-software/.
rm -rf "website/docs/community-docs/07-documentation-standards"
ln -s "../../../submodules/.github/standards" "website/docs/community-docs/07-documentation-standards"

echo "Regenerated $(( ${#core_links[@]} + 1 )) doc symlinks under website/."
