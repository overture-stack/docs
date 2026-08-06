// Marketing routes, as Docusaurus generates them from src/pages/.
//
// The Gatsby version built these with proper-url-join; Docusaurus emits a
// trailing slash for a directory route, and onBrokenLinks: "throw" checks every
// one of them at build time, so they are written out literally.

export const ABOUT_US_PATH = "/about-us/";
export const ACKNOWLEDGEMENTS_PATH = "/acknowledgements/";
export const CASE_STUDIES_PATH = "/case-studies/";
// No COMMUNITY_PATH: the Gatsby /community/ page rendered nothing but a title
// and a keywords meta tag, and /community is already the routeBasePath of the
// community documentation plugin instance in this build. See .dev/roadmap.md.
export const GETTING_STARTED_PATH = "/getting-started/";
export const PRIVACY_PATH = "/privacy/";
export const PRODUCTS_PATH = "/products/";
export const SERVICES_PATH = "/services/";
export const TERMS_PATH = "/terms-conditions/";
export const HOME_PATH = "/";

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
