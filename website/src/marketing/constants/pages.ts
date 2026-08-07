// Marketing routes, as Docusaurus generates them from src/pages/.
//
// The Gatsby version built these with proper-url-join; Docusaurus emits a
// trailing slash for a directory route, and onBrokenLinks: "throw" checks every
// one of them at build time, so they are written out literally.

export const ABOUT_US_PATH = "/about-us/";
// No COMMUNITY_PATH: the Gatsby /community/ page rendered nothing but a title
// and a keywords meta tag, and /community is already the routeBasePath of the
// community documentation plugin instance in this build. See .dev/roadmap.md.
export const FUNDING_PATH = "/about/funding/";
export const PRIVACY_PATH = "/privacy/";
export const PRODUCTS_PATH = "/products/";
export const PUBLICATIONS_PATH = "/impact/publications/";

// The /impact/ section, added in rebuild phase 3. It is the successor to
// /case-studies/, which stays live until phase 4 rewires the home page and
// writes the redirect. The slugs here are kebab-case and are not the anchor ids
// on the hub: those keep the older camelCase spellings so today's fragment
// links survive, and live in data/platforms.ts.
export const IMPACT_PATH = "/impact/";
export const ICGC_ARGO_PATH = `${IMPACT_PATH}icgc-argo/`;
export const IMICROSEQ_PATH = `${IMPACT_PATH}imicroseq/`;
export const IHCC_PATH = `${IMPACT_PATH}ihcc/`;
export const HCMI_PATH = `${IMPACT_PATH}hcmi/`;
// /services/ became /collaborate/ in rebuild phase 4, page and address both.
// The old route no longer exists here, so it owes a 301 in whatever Netlify
// config stage 3 produces, per the table in .dev/ia-proposal.md.
export const COLLABORATE_PATH = "/collaborate/";
export const TERMS_PATH = "/terms-conditions/";
// `/` is the documentation homepage in this build, so the marketing home sits
// at /home/ until stage 3 gives the marketing build its own root.
export const HOME_PATH = "/home/";

// Four retired routes, all owed a redirect. The rules are written out in
// `website/netlify/marketing-redirects.toml`, staged for the Netlify site stage
// 3 creates; this list is the same set, kept beside the paths:
//
//   /getting-started/  -> the docs quickstart, cross-host   (phase 1)
//   /acknowledgements/ -> FUNDING_PATH                      (phase 1)
//   /services/         -> COLLABORATE_PATH                  (phase 4)
//   /case-studies/     -> IMPACT_PATH                       (phase 4)
//
// The last one carries fragments: browsers preserve `#icgcargo` across a 301
// and the hub keeps the matching ids, which is the whole mechanism. Nothing
// 404s in production meanwhile, because the Gatsby site serves overture.bio
// until stage 3.

/** Every route that renders as part of the marketing site. */
export const MARKETING_PATHS = [
  HOME_PATH,
  ABOUT_US_PATH,
  COLLABORATE_PATH,
  FUNDING_PATH,
  IMPACT_PATH,
  ICGC_ARGO_PATH,
  IMICROSEQ_PATH,
  IHCC_PATH,
  HCMI_PATH,
  PRIVACY_PATH,
  PRODUCTS_PATH,
  PUBLICATIONS_PATH,
  TERMS_PATH,
];


// No `productsAnchors` and no `caseStudyAnchors`. Both existed for the home
// page's links into other pages' fragments, and the phase 4 reorder removed the
// last of those: the component catalogue became one link to /products/, and the
// carousel became three cards linking to /impact/<platform>/ pages. The ids
// themselves stay in the markup, because external links and the /case-studies/
// redirect still land on them; they are listed in data/components.ts and
// data/platforms.ts, next to the content they belong to.
//
// Removing them is what cleared the six broken-anchor warnings the build had
// carried since stage 1. Docusaurus does not collect ids from JSX pages, so it
// could never verify those links; now nothing asks it to.
