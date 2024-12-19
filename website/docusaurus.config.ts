import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

const config: Config = {
  title: 'Overture Docs',
  tagline: 'Resources for Developers & Informaticians',
  favicon: 'img/favicon.ico',

  // Set the production url of your site here
  url: 'https://docs.overture.bio/',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'overture-stack', // Usually your GitHub org/user name.
  projectName: 'Overture Docs', // Usually your repo name.

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  headTags: [
    {
      tagName: 'meta',
      attributes: {
        name: 'referrer',
        content: 'same-origin'
      },
    },
  ],

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  plugins: [
    './docsPlugin.ts',
    [
      '@docusaurus/plugin-content-docs',
      {
        id: 'guides',
        path: 'guides',
        routeBasePath: 'guides',
        sidebarPath: require.resolve('./guidesSidebars.ts'),
      },
    ],
    [
      '@docusaurus/plugin-content-docs',
    {
      id: 'community',
      path: 'community',
      routeBasePath: 'community',
      sidebarPath: require.resolve('./communitySidebars.ts'),
    },
    ],
  ],

  markdown: {
    mermaid: true,
  },
  themes: ['@docusaurus/theme-mermaid'],

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            'https://github.com/overture-stack/docs',
        },
        // Please change this to your repo.
        blog: {
          showReadingTime: true,
          feedOptions: {
            type: ['rss', 'atom'],
            xslt: true,
          },
          // Remove this to remove the "edit this page" links.
          editUrl:
            'https://github.com/overture-stack/docs/tree/main/packages/create-docusaurus/templates/shared/',
          // Useful options to enforce blogging best practices
          onInlineTags: 'warn',
          onInlineAuthors: 'warn',
          onUntruncatedBlogPosts: 'warn',
        }, 
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    // Replace with your project's social card
    image: 'img/overture-social-card.png',
    navbar: {
      title: 'Overture Docs',
      logo: {
        alt: 'Overture Docs Logo',
        src: 'img/Overture-logo.png',
      },
      items: [
        {to: '/guides/getting-started', label: 'Guides', position: 'left'},
        {
          type: 'docSidebar',
          sidebarId: 'docsSidebar',
          position: 'left',
          label: 'Documentation',
        },
        {to: '/community/support', label: 'Community', position: 'left'},
        {
          href: 'https://github.com/overture-stack',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Docs',
          items: [
            {
              label: 'Platform Guides',
              to: '/guides/getting-started',
            },
            {
              label: 'Developer Documentation',
              to: '/docs/getting-started',
            },
            {
              label: 'Under Development',
              to: '/docs/under-development/',
            },
          ],
        },
        {
          title: 'Community',
          items: [
            {
              label: 'Support',
              href: '/community/support',
            },
            {
              label: 'Contributing',
              href: '/community/contribution',
            },
            {
              label: 'Funding',
              href: '/community/funding',
            }
          ],
        },
        {
          title: 'More',
          items: [
            {
              label: 'GitHub',
              href: 'https://github.com/overture-stack',
            },
            {
              label: 'Privacy Statement',
              href: 'https://www.overture.bio/privacy/',
            },
            {
              label: 'Terms & Conditions',
              href: 'https://www.overture.bio/terms-conditions/',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Overture, Inc. Built with Docusaurus.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
    algolia: {
     // application ID provided by Algolia
     appId: '3Y4T1NN3P4',
     // Public API key
     apiKey: '4fd7bf617c615c6714537dda13d900dd',
     indexName: 'overture',
   },
  } satisfies Preset.ThemeConfig,
};

export default config;