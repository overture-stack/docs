// Overture Docs + Demo

// docs.overture.bio is the only Overture documentation surface. Its content is
// organized into four audience journeys (develop, deploy, use, community); these
// constants name current routes rather than older ones the docs site still
// redirects, so a visitor takes one hop instead of two.
//
// These stay absolute, cross-host URLs even though the documentation is built
// from this same repo: overture.bio and docs.overture.bio remain separate sites
// (see .dev/roadmap.md, Decisions). onBrokenLinks cannot validate them, which is
// why the Gatsby repo's URL-check script became permanent tooling.
const DOCS = "https://docs.overture.bio";

// The four audience journeys the docs site is organized into. Component
// reference sits under Develop, one path segment per component, capitalized
// (`/develop/Song/overview`).
export const DOCS_DEVELOP = `${DOCS}/develop`;
export const DOCS_DEPLOY = `${DOCS}/deploy`;
export const DOCS_USE = `${DOCS}/use`;
export const DOCS_COMMUNITY = `${DOCS}/community/support`;

export const DOCUMENTATION_LINK = `${DOCS}/`;
export const OVERTURE_GITHUB_LINK = "https://github.com/overture-stack/";
export const OVERTURE_DOCUMENTATION_CONTRIBUTION_LINK = `${DOCS}/community/contribution`;
export const OVERTURE_GITHUB_DISCUSSION_LINK =
  "https://github.com/overture-stack/docs/discussions";
export const OVERTURE_DOCUMENTATION_SUPPORT_LINK = `${DOCS}/community/support`;
// The full roster stays canonical on the docs site; the marketing About page
// links to it rather than copying 400 lines of it.
export const OVERTURE_DOCUMENTATION_TEAM_LINK = `${DOCS}/community/team`;
export const FEATURE_REQUESTS =
  "https://github.com/overture-stack/website/issues/new?assignees=&labels=&projects=&template=Feature_Requests.md";
export const ADMINISTRATION_GUIDES = `${DOCS}/use`;
export const API_REFERENCE_GUIDE = `${DOCS}/develop/api-reference`;
export const DEPLOYMENT_GUIDES = `${DOCS}/deploy/deployment`;
export const DOWNLOAD_GUIDES = `${DOCS}/use/cli-downloads`;
export const SUBMISSION_GUIDES = `${DOCS}/use/cli-submissions`;
export const USER_GUIDES = `${DOCS}/use`;

// Named destinations for the home page's documentation band, one journey per
// column. `contributing` is the Develop journey's own standards page, which is a
// different document from `OVERTURE_DOCUMENTATION_CONTRIBUTION_LINK` above
// (that one is the community journey's guide to contributing documentation).
export const DEVELOP_CONTRIBUTING_LINK = `${DOCS}/develop/contributing`;
export const ARRANGER_MCP_DEPLOY_LINK = `${DOCS}/deploy/deployment/arranger-mcp-server`;
export const AI_DISCOVERY_LINK = `${DOCS}/use/ai-assisted-data-discovery`;
// The workshop has no index page of its own: its Prerequisites page is the
// entry point, which is how the Use journey's own landing page links it.
export const WORKSHOP_DOCS_LINK = `${DOCS}/use/workshop/prerequisites`;
export const OVERTURE_DOCUMENTATION_CORE_SOFTWARE = `${DOCS}/develop`;
export const OVERTURE_DOCUMENTATION_LICENSING = `${DOCS}/community/licensing`;
// Funding and citation, both canonical on the docs site and both linked from the
// footer's Impact column as well as from the home page's "Powered by Overture"
// band. There is no marketing page for either any more: /about/funding/ and
// /impact/publications/ held second copies of these two documents and were
// removed, so `docs/community-docs/02-funding.md` and `06-citing-us.md` are the
// only versions and are no longer pointers to here.
export const OVERTURE_DOCUMENTATION_FUNDING = `${DOCS}/community/funding`;
export const OVERTURE_DOCUMENTATION_CITING = `${DOCS}/community/citing-us`;
export const OVERTURE_SUPPORT = `${DOCS}/community/support`;

// Case Study Links

export const GDC_LINK = "https://portal.gdc.cancer.gov/";
export const HCMIS_LINK = "https://hcmi-searchable-catalog.nci.nih.gov/";
export const HCMIS_PORTAL_LINK = "https://hcmi-searchable-catalog.nci.nih.gov/";
export const ICGC_LINK = "https://dcc.icgc.org/";
export const IHCC_LINK = "https://ihccglobal.org/";
export const IHCC_PORTAL_LINK = "https://atlas.ihccglobal.org/";
export const KIDS_FIRST_LINK =
  "https://portal.kidsfirstdrc.org/login?redirect_path=/dashboard?";
// iMicroSeq, published as VirusSeq until 2026-08-07. The portal URL still
// carries the old name; [NEEDS: URL] confirmation of whether it moves.
export const VIRUSSEQ_PORTAL_LINK = "https://virusseq-dataportal.ca/explorer";
export const ICGC_ARGO_LINK = "https://www.icgc-argo.org/";
export const ICGC_ARGO_PORTAL_LINK = "https://platform.icgc-argo.org/";
export const CGC_LINK = "https://cancercollaboratory.org/";

// Misc Links

export const DOCKER_DOWNLOAD =
  "https://www.docker.com/products/docker-desktop/";
export const NETLIFY_IMAGE_LINK =
  "https://www.netlify.com/img/global/badges/netlify-color-bg.svg";
export const NETLIFY_LINK = "https://www.netlify.com/";
export const OICR_LINK = "https://oicr.on.ca";
export const TEAM_BLOG_LINK = "https://softeng.oicr.on.ca/";
export const TEAM_LINK = "https://softeng.oicr.on.ca/team/";
export const EMAIL_LINK = "mailto:contact@overture.bio";
export const GI_PROGRAM_LINK =
  "https://oicr.on.ca/programs/genome-informatics/";

// Product Links

// arranger
export const ARRANGER_DOCS_LINK = `${DOCS}/develop/Arranger/overview`;
export const ARRANGER_GITHUB_LINK =
  "https://github.com/overture-stack/arranger";

// stage
export const STAGE_DOCS_LINK = `${DOCS}/develop/Stage/overview`;
export const STAGE_GITHUB_LINK = "https://github.com/overture-stack/stage";

// maestro
export const MAESTRO_DOCS_LINK = `${DOCS}/develop/Maestro/overview`;
export const MAESTRO_GITHUB_LINK = "https://github.com/overture-stack/maestro";

// song
export const SONG_DOCS_LINK = `${DOCS}/develop/Song/overview`;
export const SONG_BLOG_POST_LINK =
  "https://softeng.oicr.on.ca/alex_lepsa/2018/03/22/Spring-Method-Security-Using-JWTs/";
export const SONG_GITHUB_LINK = "https://github.com/overture-stack/song";

// score
export const SCORE_DOCS_LINK = `${DOCS}/develop/Score/overview`;
export const SCORE_GITHUB_LINK = "https://github.com/overture-stack/score";

// lectern
export const LECTERN_DOCS_LINK = `${DOCS}/develop/Lectern/overview`;

// lyric
export const LYRIC_DOCS_LINK = `${DOCS}/develop/Lyric/overview`;

// Access and authorization, which is configured rather than shipped: the stack
// delegates to Keycloak. This is what the Control group on /products/ points at
// for what a deployment can do today.
export const KEYCLOAK_DEPLOY_LINK = `${DOCS}/deploy/deployment/keycloak`;

// The authorization service being built on top of that, still unnamed and
// undocumented, so the repository is the only thing there is to link to. Swap
// this for its documentation once there is some.
export const USHER_GITHUB_LINK = "https://github.com/overture-stack/usher";

// prelude, the development environment that replaced the Quickstart
export const PRELUDE_DOCS_LINK = `${DOCS}/deploy/prelude`;
