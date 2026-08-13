// Marketing routes, as Docusaurus generates them from src/pages/.
//
// Docusaurus emits a trailing slash for a directory route, and
// onBrokenLinks: "throw" checks every one of them at build time, so they are
// written out literally.

// No ABOUT_US_PATH: /about-us/ is gone. Everything it said is the "What we
// do" band on the home page, where the footer's Our story and the 301 from
// the old address both land. `ABOUT_BAND` is that destination, written once
// so the two can't drift; the fragment is the `id` on the band's own H2 in
// HomeCollaborate.tsx, so an inbound link arrives at the content, not the
// top of the page. The footer is now the only navigation pointing here;
// the `id` stays load-bearing for the redirect regardless.
export const ABOUT_BAND = "/home/#collaborate-heading";
// No COMMUNITY_PATH: /community is already the routeBasePath of the community
// documentation plugin instance in this build, and the marketing page that
// used to sit there rendered nothing but a title and a keywords meta tag.
//
// No FUNDING_PATH and no PUBLICATIONS_PATH. /about/funding/ and
// /impact/publications/ are retired: their content's maintained version lives
// in `docs/community-docs/`, and both routes now redirect cross-host. The
// footer's Impact column links `OVERTURE_DOCUMENTATION_FUNDING` and
// `OVERTURE_DOCUMENTATION_CITING` in constants/externalLinks.ts instead.
export const PRIVACY_PATH = "/privacy/";
export const PRODUCTS_PATH = "/products/";

// The /impact/ section, the successor to /case-studies/ and one route
// rather than five: the four platform pages that lived under it are
// retired, their write-ups on the hub itself. No per-platform paths here:
// the replacement addresses are `IMPACT_PATH` plus a `Platform.id`
// fragment, written in data/platforms.ts next to the ids they depend on.
// Those ids keep their older camelCase spellings, which is what makes
// inbound fragment links still land.
export const IMPACT_PATH = "/impact/";
// /services/ became /collaborate/, page and address both. The old route no
// longer exists here, so it owes a 301 in whatever Netlify config stage 3
// produces.
export const COLLABORATE_PATH = "/collaborate/";
export const TERMS_PATH = "/terms-conditions/";
// `/` is the documentation homepage in this build, so the marketing home sits
// at /home/ until stage 3 gives the marketing build its own root.
export const HOME_PATH = "/home/";

// Eleven retired routes, all owed a redirect (rules in
// `website/netlify/marketing-redirects.toml`, staged for stage 3); this
// list is the same set, kept beside the paths:
//
//   /getting-started/      -> the docs quickstart, cross-host
//   /acknowledgements/     -> the docs funding page, cross-host
//   /services/             -> COLLABORATE_PATH
//   /case-studies/         -> IMPACT_PATH
//   /about-us/             -> ABOUT_BAND
//   /about/funding/        -> the docs funding page, cross-host
//   /impact/publications/  -> the docs citing-us page, cross-host
//   /impact/icgc-argo/     -> IMPACT_PATH + #icgcargo
//   /impact/imicroseq/     -> IMPACT_PATH + #virusseq
//   /impact/ihcc/          -> IMPACT_PATH + #ihcc
//   /impact/hcmi/          -> IMPACT_PATH + #humanCancerModels
//
// The last four are the platform pages, retired when the hub absorbed their
// write-ups. Each one's fragment is the id on the write-up it moved into, so
// these land on the same content at a new address.
//
// /acknowledgements/ pointed at /about/funding/ until that page was retired
// too, so it now goes where its successor went rather than chaining through a
// route that no longer exists.
//
// /case-studies/ carries fragments: browsers preserve `#icgcargo` across a 301
// and the hub keeps the matching ids, which is the whole mechanism. Nothing
// 404s in production meanwhile, because the Gatsby site serves overture.bio
// until stage 3.

/** Every route that renders as part of the marketing site. */
export const MARKETING_PATHS = [
  HOME_PATH,
  COLLABORATE_PATH,
  IMPACT_PATH,
  PRIVACY_PATH,
  PRODUCTS_PATH,
  TERMS_PATH,
];


// No `productsAnchors` and no `caseStudyAnchors`: both existed for the home
// page's links into other pages' fragments, removed when the component
// catalogue became one link to /products/ and the carousel became three
// cards linking to /impact/ write-ups. The ids themselves stay in the
// markup (listed in data/components.ts and data/platforms.ts) since cards,
// external links and the /case-studies/ redirect still land on them.
// Removing the anchor-collection calls cleared six broken-anchor warnings
// the build had carried: Docusaurus can't verify ids on JSX pages anyway,
// so now nothing asks it to.
