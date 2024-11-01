
# Overture Docs

Overture Docs is a centralized documentation site built with [Docusaurus](https://docusaurus.io/) that aggregates and renders Markdown content from `/docs` directories across our GitHub repositories. It transforms distributed documentation into a cohesive, easily navigable knowledge base.

![Overture Docs](./preview.png 'Docs for developers and informaticians')

> [!NOTE]
> Detailed information on this repository see it relevant documentation page linked here 

## Getting Started

### Running it Locally

To clone the repository with the files in the submodules:

```bash
git clone --recurse-submodules https://github.com/overture-stack/docs.git
```

Install required dependencies:

```
npm ci
```

Start the server

```
npm start
```

> [!IMPORTANT]
> Docusaurus requires node version 18 or higher

## How Overture Docs Works

- **Docusaurus**: We use Docusaurus to render the site, providing a sleek and navigable interface for our documentation.

- **Markdown Files**: All documentation content is stored as markdown files in the `/website/docs` directory. 

- **Git Submodules**: We use Git submodules to store and track all our GitHub repositories within one main repository. All submodules can be found in the `submodule` folder.

- **Symlinks**: Only the necessary documentation files are symlinked from the submodules in the `submodule` folder to the `/website/docs` directory. This allows us to import only the required markdown content that Docusaurus needs.


## Repository structure

```
.
├── /submodules/               # Core Repository Submodules
│   ├── /.github/             # GitHub configurations, workflows and standards docs
│   ├── /arranger/            # Arranger repository
│   ├── /lectern/             # Lectern repository
│   ├── /lyric/               # Lyric repository
│   ├── /maestro/             # Maestro repository
│   ├── /score/               # Score repository
│   ├── /song/                # Song repository
│   └── /stage/               # Stage repository
│        └── /docs/           # Repository-specific documentation (found in every submodule repo)
│
└── /website/                  # Documentation Website
    ├── /community/           # Community resources and guidelines
    ├── /docs/                # Aggregated documentation (symlinked from submodules)
    ├── /guides/              # Overture platform user guides
    └── /src/                 # Website source code
        ├── /components/      # React components
        ├── /css/            # Component-specific styles
        ├── /theme/          # Global theme configuration and styling
        └── /pages/          # Static page content
```

### Key Directories

- **/submodules/**: Contains all Overture core repositories as Git submodules
- **/website/**: Houses the Docusaurus-powered documentation website
  - **/community/**: Community-focused content and resources
  - **/docs/**: Central location for all documentation, automatically linked from repository submodules
  - **/guides/**: Comprehensive platform guides and tutorials
  - **/src/**: Website implementation files including custom components, styling, and page content

## Benefits of this Setup

- **A Centralized Resource for Decentralized Documentation**: A single, easy-to-navigate hub displaying all our developer documentation while keeping all documentation markdown files within their respective repositories.

- **Consistent**: Enables us to easily ensure all documentation follows the same standards across different projects.

- **Easy to Maintain**: Updates to any of the individual project repositories `/docs` folders are automatically reflected here.

- **Robust Error Handling**: Docusaurus has excellent error catching, particularly for broken and missing links, reducing the need for manual testing.

![Pro Tip](./website/docs/03-other-software/images/proTip.png 'Use Overture Docs repo to search across all Overture repos')

> [!TIP]  
> The Overture Docs repo contains everything, therefore finding & tracking links and content across all our repos has never been easier.

