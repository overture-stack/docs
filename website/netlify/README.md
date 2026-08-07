# Netlify configuration, staged

Nothing in this directory is live. It holds configuration the **marketing** Netlify site will need at stage 3 of the overture.bio port, kept in version control so it does not have to be rediscovered in another repository.

## Why it is not a `netlify.toml`

Netlify reads `netlify.toml` from a site's base directory, which for this repository is `website/`. This directory is one level below that and the file is named differently, so Netlify ignores it.

That is deliberate. **This repository has no `netlify.toml` today**: `docs.overture.bio` is configured through the Netlify UI, and committing a live config file would move the build command, publish directory and environment out from under a site that is currently working. Whoever sets up the second site should copy these rules into that site's own configuration rather than promoting this file into one.

## What is here

- **`marketing-redirects.toml`** — every redirect the `overture.bio` host owes. Two groups:
  1. The twelve `/documentation/*` rules, lifted verbatim from the Gatsby site's `netlify.toml` when `website-legacy/` was deleted on 2026-08-07. These URLs were public for years and each section is sent to its nearest equivalent on the docs site.
  2. The four routes the rebuild retired: `/getting-started/`, `/acknowledgements/`, `/services/` and `/case-studies/`.

## The part a redirect cannot do

`/case-studies/#icgcargo` and its siblings are linked from outside the site. Browsers do not send the fragment to the server, so no redirect rule can move it. What makes those links land on the right card is that the `/impact/` hub keeps the same ids on its platform cards. That is the mechanism; the redirect only gets the visitor to the right page.

## Related

- `.dev/roadmap.md` § Stage 3, for what else that stage has to write (a sitemap and `robots.txt` under the canonical host, and the apex versus `www` decision).
- `src/marketing/constants/pages.ts`, which lists the same retired routes beside the path constants.
