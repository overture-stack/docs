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

export const DEMO_LINK = "https://demo.overture.bio/";
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
export const OVERTURE_DOCUMENTATION_CORE_SOFTWARE = `${DOCS}/develop`;
export const OVERTURE_DOCUMENTATION_LICENSING = `${DOCS}/community/licensing`;
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
// delegates to Keycloak. This is the Control band's destination on /products/.
export const KEYCLOAK_DEPLOY_LINK = `${DOCS}/deploy/deployment/keycloak`;

// prelude, the development environment that replaced the Quickstart
export const PRELUDE_DOCS_LINK = `${DOCS}/deploy/prelude`;
