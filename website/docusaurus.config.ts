import { themes as prismThemes } from "prism-react-renderer";
import type { Config } from "@docusaurus/types";
import type * as Preset from "@docusaurus/preset-classic";

const config: Config = {
  title: "Overture Docs",
  tagline: "Resources for Developers, Operators & Informaticians",
  favicon: "img/favicon.ico",

  // Set the production url of your site here
  url: "https://docs.overture.bio/",
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: "/",

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: "overture-stack", // Usually your GitHub org/user name.
  projectName: "Overture Docs", // Usually your repo name.

  onBrokenLinks: "throw",

  headTags: [
    {
      tagName: "meta",
      attributes: {
        name: "referrer",
        content: "same-origin",
      },
    },
    {
      tagName: "link",
      attributes: { rel: "preconnect", href: "https://fonts.googleapis.com" },
    },
    {
      tagName: "link",
      attributes: {
        rel: "preconnect",
        href: "https://fonts.gstatic.com",
        crossorigin: "anonymous",
      },
    },
  ],

  // Lato is the Overture brand typeface (matches overture.bio); it is the base
  // font via --ifm-font-family-base in src/css/custom.css.
  stylesheets: [
    "https://fonts.googleapis.com/css2?family=Lato:ital,wght@0,400;0,700;0,900;1,400;1,700&display=swap",
  ],

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: "en",
    locales: ["en"],
  },

  plugins: [
    "./docsPlugin.ts",
    [
      "@docusaurus/plugin-content-docs",
      {
        id: "community",
        // Source dir is "docs/community-docs" for consistency with the other
        // journeys (develop, deploy, use), which all live under website/docs/.
        path: "docs/community-docs",
        routeBasePath: "community",
        sidebarPath: require.resolve("./communitySidebars.ts"),
        // The documentation-standards content is vendored (.github submodule)
        // and may carry dead /guides links (see remark/unlink-legacy-paths.js).
        remarkPlugins: [require("./remark/unlink-legacy-paths")],
      },
    ],
    [
      "@docusaurus/plugin-content-docs",
      {
        id: "develop",
        path: "docs/develop-docs",
        routeBasePath: "develop",
        sidebarPath: require.resolve("./developSidebars.ts"),
        // The per-component docs (Song, Maestro, ...) are vendored from each
        // component's own submodule and may carry dead /guides links (see
        // remark/unlink-legacy-paths.js).
        remarkPlugins: [require("./remark/unlink-legacy-paths")],
      },
    ],
    [
      "@docusaurus/plugin-content-docs",
      {
        id: "deploy",
        path: "docs/deploy-docs",
        routeBasePath: "deploy",
        sidebarPath: require.resolve("./deploySidebars.ts"),
      },
    ],
    [
      "@docusaurus/plugin-content-docs",
      {
        id: "use",
        path: "docs/use-docs",
        routeBasePath: "use",
        sidebarPath: require.resolve("./useSidebars.ts"),
      },
    ],
    [
      // Preserves old URLs after the Deploy·Build·Use IA migration so external
      // links, bookmarks, and cross-links from vendored component docs (which
      // this repo cannot edit) don't 404.
      "@docusaurus/plugin-client-redirects",
      {
        redirects: [
          // Guides -> journeys
          { to: "/deploy", from: ["/guides", "/guides/getting-started"] },
          { to: "/deploy/deployment", from: "/guides/deployment-guide" },
          {
            to: "/deploy/deployment/keycloak",
            from: "/guides/deployment-guide/authorization",
          },
          {
            to: "/deploy/deployment/file-transfer",
            from: [
              "/guides/deployment-guide/data-management-storage",
              "/deploy/deployment/data-management-storage",
            ],
          },
          {
            to: "/deploy/deployment/search-portal",
            from: "/guides/deployment-guide/search-portal",
          },
          // Administration guides moved from Deploy to Use (Administrators);
          // the overview content now lives on the main Use overview page.
          {
            to: "/use",
            from: ["/guides/administration-guides", "/deploy/administration"],
          },
          // Renamed from "Updating the Data Model" for clarity (it's
          // specifically about Song's metadata schemas)
          {
            to: "/use/administration/building-song-schemas",
            from: [
              "/guides/administration-guides/updating-the-data-model",
              "/deploy/administration/updating-the-data-model",
              "/use/administration/updating-the-data-model",
            ],
          },
          {
            to: "/use/administration/index-mappings",
            from: [
              "/guides/administration-guides/index-mappings",
              "/deploy/administration/index-mappings",
            ],
          },
          {
            to: "/use/administration/customizing-the-data-portal",
            from: [
              "/guides/administration-guides/customizing-the-data-portal",
              "/deploy/administration/customizing-the-data-portal",
            ],
          },
          { to: "/use", from: "/guides/user-guides" },
          {
            to: "/use/cli-submissions",
            from: "/guides/user-guides/cli-submissions",
          },
          {
            to: "/use/cli-downloads",
            from: "/guides/user-guides/cli-downloads",
          },
          {
            to: "/develop/api-reference",
            from: ["/guides/api-reference", "/build/api-reference"],
          },
          // Platform Tools -> Deploy
          { to: "/deploy", from: "/docs/platform-tools" },
          { to: "/deploy/prelude", from: "/docs/platform-tools/prelude" },
          { to: "/deploy/quickstart", from: "/docs/platform-tools/quickstart" },
          // Docs -> Develop
          {
            to: "/develop/contributing",
            from: ["/docs/contribution", "/build/contributing"],
          },
          // Documentation standards moved from Build to Community (the
          // /build/documentation-standards -> /community/... redirect is
          // handled by createRedirects below, alongside its subpages)
          {
            to: "/community/documentation-standards/documentation-standards",
            from: "/docs/documentation-standards",
          },
          // Workshop -> Use
          { to: "/use/workshop/prerequisites", from: "/workshop" },
          {
            to: "/use/workshop/prerequisites",
            from: "/workshop/prerequisites",
          },
          {
            to: "/use/workshop/running-the-demo",
            from: "/workshop/running-the-demo",
          },
          {
            to: "/use/workshop/architecture",
            from: "/workshop/architecture",
          },
          {
            to: "/use/workshop/data-preparation",
            from: "/workshop/data-preparation",
          },
          {
            to: "/use/workshop/generating-configurations",
            from: "/workshop/generating-configurations",
          },
          {
            to: "/use/workshop/docker-configuration",
            from: "/workshop/docker-configuration",
          },
          {
            to: "/use/workshop/loading-data",
            from: "/workshop/loading-data",
          },
          {
            to: "/use/workshop/troubleshooting",
            from: "/workshop/troubleshooting",
          },
          {
            to: "/use/workshop/portal-customization",
            from: "/workshop/portal-customization",
          },
          { to: "/use/workshop/next-steps", from: "/workshop/next-steps" },
          {
            to: "/use/workshop/extension-task",
            from: "/workshop/extension-task",
          },
          // Reference folded into Develop (formerly named Build)
          {
            to: "/develop",
            from: ["/docs", "/docs/getting-started", "/build"],
          },
          // Arranger docs reshuffle: the "AI and automation" reference page
          // became the standalone "Arranger MCP server" page, and the
          // migration guides moved under Reference.
          {
            to: "/develop/Arranger/mcp-server",
            from: "/develop/Arranger/reference/ai-and-automation",
          },
          {
            to: "/develop/Arranger/reference/Migration/v3.1",
            from: "/develop/Arranger/migration/v3.1",
          },
        ],
        // Component reference moved from /docs/* to /build/* (Reference folded
        // into Build), then from /build/core-software/* to /build/* (the
        // "Core Software" dropdown was flattened), then from /build/* to
        // /develop/* (Build renamed to Develop); redirect every such page.
        createRedirects(existingPath) {
          const components = [
            "Lectern",
            "Lyric",
            "Song",
            "Score",
            "Maestro",
            "Arranger",
            "Stage",
          ];
          for (const component of components) {
            const prefix = `/develop/${component}`;
            if (
              existingPath === prefix ||
              existingPath.startsWith(`${prefix}/`)
            ) {
              const rest = existingPath.slice("/develop/".length);
              return [
                `/docs/core-software/${rest}`,
                `/build/core-software/${rest}`,
                `/build/${rest}`,
              ];
            }
          }
          // Documentation standards moved from /build/documentation-standards/*
          // to /community/documentation-standards/documentation-standards/*.
          if (
            existingPath.startsWith(
              "/community/documentation-standards/documentation-standards",
            )
          ) {
            return existingPath.replace(
              "/community/documentation-standards/documentation-standards",
              "/build/documentation-standards",
            );
          }
          if (existingPath.startsWith("/community/documentation-standards/")) {
            return existingPath.replace(
              "/community/documentation-standards/",
              "/build/documentation-standards/",
            );
          }
          return undefined;
        },
      },
    ],
  ],

  markdown: {
    mermaid: true,
    hooks: {
      onBrokenMarkdownLinks: "warn",
    },
  },
  themes: ["@docusaurus/theme-mermaid"],

  presets: [
    [
      "classic",
      {
        // The default docs instance is disabled: the component reference now
        // lives under the Develop journey (the "develop" plugin-content-docs
        // instance above, served at /develop/*).
        docs: false,
        blog: {
          showReadingTime: true,
          feedOptions: {
            type: ["rss", "atom"],
            xslt: true,
          },
          editUrl: "https://github.com/overture-stack/docs",
          // Useful options to enforce blogging best practices
          onInlineTags: "warn",
          onInlineAuthors: "warn",
          onUntruncatedBlogPosts: "warn",
        },
        theme: {
          customCss: "./src/css/custom.css",
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    // Replace with your project's social card
    image: "img/overture-social-card.png",
    navbar: {
      title: "Overture Docs",
      logo: {
        alt: "Overture Docs Logo",
        src: "img/Overture-logo.png",
      },
      items: [
        { to: "/develop", label: "Develop", position: "left" },
        { to: "/deploy", label: "Deploy", position: "left" },
        { to: "/use", label: "Use", position: "left" },
        {
          to: "/community/support",
          label: "Community",
          position: "right",
          className: "navbar__item--community",
        },
        {
          href: "https://github.com/overture-stack/docs/discussions?discussions_q=",
          label: "Support Forum",
          position: "right",
        },
        {
          href: "https://github.com/overture-stack",
          label: "GitHub",
          position: "right",
        },
      ],
    },
    footer: {
      style: "dark",
      links: [
        {
          title: "Docs",
          items: [
            {
              label: "Develop",
              to: "/develop",
            },
            {
              label: "Deploy",
              to: "/deploy",
            },
            {
              label: "Use",
              to: "/use",
            },
          ],
        },
        {
          title: "Community",
          items: [
            {
              label: "Support",
              href: "/community/support",
            },
            {
              label: "Contributing",
              href: "/community/contribution",
            },
            {
              label: "Funding",
              href: "/community/funding",
            },
          ],
        },
        {
          title: "More",
          items: [
            {
              label: "GitHub",
              href: "https://github.com/overture-stack",
            },
            {
              label: "Privacy Statement",
              href: "https://www.overture.bio/privacy/",
            },
            {
              label: "Terms & Conditions",
              href: "https://www.overture.bio/terms-conditions/",
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Copyright © 2026 Ontario Institute for Cancer Research. Built with Docusaurus.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
      additionalLanguages: ["json"],
    },
    algolia: {
      // application ID provided by Algolia
      appId: "3Y4T1NN3P4",
      // Public API key
      apiKey: "4fd7bf617c615c6714537dda13d900dd",
      indexName: "overture",
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
