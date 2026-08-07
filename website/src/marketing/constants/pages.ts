// Marketing routes, as Docusaurus generates them from src/pages/.
//
// The Gatsby version built these with proper-url-join; Docusaurus emits a
// trailing slash for a directory route, and onBrokenLinks: "throw" checks every
// one of them at build time, so they are written out literally.

export const ABOUT_US_PATH = "/about-us/";
export const CASE_STUDIES_PATH = "/case-studies/";
// No COMMUNITY_PATH: the Gatsby /community/ page rendered nothing but a title
// and a keywords meta tag, and /community is already the routeBasePath of the
// community documentation plugin instance in this build. See .dev/roadmap.md.
export const FUNDING_PATH = "/about/funding/";
export const PRIVACY_PATH = "/privacy/";
export const PRODUCTS_PATH = "/products/";
export const PUBLICATIONS_PATH = "/impact/publications/";
export const SERVICES_PATH = "/services/";
export const TERMS_PATH = "/terms-conditions/";
// `/` is the documentation homepage in this build, so the marketing home sits
// at /home/ until stage 3 gives the marketing build its own root.
export const HOME_PATH = "/home/";

// Retired in rebuild phase 1 (2026-08-07). Both still need a redirect entry in
// whatever Netlify config stage 3 produces, per the table in .dev/ia-proposal.md:
// /getting-started/ goes cross-host to the docs quickstart, /acknowledgements/
// to FUNDING_PATH. Nothing 404s in production meanwhile, because the Gatsby site
// still serves overture.bio until stage 3.

/** Every route that renders as part of the marketing site. */
export const MARKETING_PATHS = [
  HOME_PATH,
  ABOUT_US_PATH,
  CASE_STUDIES_PATH,
  FUNDING_PATH,
  PRIVACY_PATH,
  PRODUCTS_PATH,
  PUBLICATIONS_PATH,
  SERVICES_PATH,
  TERMS_PATH,
];

export const caseStudyAnchors = {
  icgcargo: `${CASE_STUDIES_PATH}#icgcargo`,
  virusseq: `${CASE_STUDIES_PATH}#virusseq`,
  kidsFirst: `${CASE_STUDIES_PATH}#kidsFirst`,
  ihcc: `${CASE_STUDIES_PATH}#ihcc`,
  humanCancerModels: `${CASE_STUDIES_PATH}#humanCancerModels`,
};

// One entry per section the products page actually renders.
export const productsAnchors = {
  song: `${PRODUCTS_PATH}#song`,
  score: `${PRODUCTS_PATH}#score`,
  maestro: `${PRODUCTS_PATH}#maestro`,
  arranger: `${PRODUCTS_PATH}#arranger`,
  lectern: `${PRODUCTS_PATH}#lectern`,
  lyric: `${PRODUCTS_PATH}#lyric`,
  stage: `${PRODUCTS_PATH}#stage`,
};
