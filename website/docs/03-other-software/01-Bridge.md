
# Bridge

Bridge is a single, easy-to-navigate hub that beautifully renders all our product documentation from the `/docs` folder of all our GitHub repositories. 

:::info 
Overture Docs started under the name Bridge to reflect its ability to bridge information across multiple repositories. Bridge was also chosen in fitting with Overtures Orchestral theme.
:::

## Documentation Framework

Overture has three user profiles:

- **Software Engineers**: They build and customize Overture components for their software stack.

- **IT specialist**: Deploying and configuring Overture platforms.

- **Informaticians**: Use Overture platforms to gather, organize, explore and share data.

Our documentation is split up as follows:

| Documentation | User Profile | Description
|---|---|---|
| Product Documentation (Housed here) | Software Engineers & Developers | Technical resources for those working on or contributing to the project. | 
| Platform Guides (Overture.bio)  | IT Specialists & Informaticians | Instructive guides covering platform setup, maintenance and usage for end-users and administrators. |

## How Overture Docs Works

- **Docusaurus**: We use Docusaurus to render the site, providing a sleek and navigable interface for our documentation.

- **Markdown Files**: All documentation content is stored as markdown files in the `/website/docs` directory. 

- **Git Submodules**: We use Git submodules to store and track all our GitHub repositories within one main repository. All submodules can be found in the `submodule` folder.

- **Symlinks**: Only the necessary documentation files are symlinked from the submodules in the `submodule` folder to the `/website/docs` directory. This allows us to import only the required markdown content that Docusaurus needs.

## Benefits of this Setup

- **A Centralized Resource for Decentralized Documentation**: A single, easy-to-navigate hub displaying all our developer documentation while keeping all documentation markdown files within their respective repositories.

- **Consistent**: Enables us to easily ensure all documentation follows the same standards across different projects.

- **Easy to Maintain**: Updates to any of the individual project repositories `/docs` folders are automatically reflected here.

- **Robust Error Handling**: Docusaurus has excellent error catching, particularly for broken and missing links, reducing the need for manual testing.

![Pro Tip](./images/proTip.png 'Use Overture Docs repo to search across all Overture repos')

  :::tip Pro Tip
  The Overture Docs repo contains everything, therefore finding & tracking links and content across all our repos has never been easier.
  :::

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

> **Note:** Docusaurus requires node version 18 or higher

### Adding Submodules

Use the following command from the submodules directory to add a new submodule:

   ```bash
   git submodule add -b <branchName> <GitHub repository URL> module_name
   ```

This will automatically update the `.gitmodules` file located in the root directory.

### Updating Submodules

To pull the latest changes for all submodules, including any newly added ones run:

   ```bash
   git submodule update --remote
   ```

### Using Symlinks

All documentation content is stored in markdown files located within `/website/docs` while the original repositories for these markdown files are in the `submodule` folder.

Symlinks are used here to link only the necessary folders containing markdown files from the submodule directories.

The script for this is in the root directory, titled `bridge.sh`:

   ```bash
   ln -s ../../submodules/song/docs website/docs/Song
   ln -s ../../submodules/score/docs website/docs/Score
   ```

   This allows us to import only the necessary markdown files that Docusaurus needs. Changes to either directory are linked and reflected in both.

#### Getting it to run with Docusaurus

To run this without errors, I needed to create a plugin found in `website/docsPlugin.ts`:

```typescript
module.exports = function(context, options) {
  return {
    name: "custom-docusaurus-plugin",
    configureWebpack(config, isServer, utils) {
      return {
        resolve: {
          symlinks: false
        }
      };
    }
  };
};
```

This plugin is imported on line 32 of the `docusaurus.config.ts`:

```typescript
plugins: ['./docsPlugin.ts'],
```

The source of this fix can be found [here](https://github.com/facebook/docusaurus/issues/3272#issuecomment-688409489).

## Globally imported Mdx components

We can import components by default across all our mdx files reducing the head matter when using these components in mdx documents. This can be configured from the `/src/theme/MDXComponents.ts`:

```ts title="MDXComponents.ts"
import type {ComponentType} from 'react';
import MDXComponents from '@theme-original/MDXComponents';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';


const components: typeof MDXComponents & {
    Tabs: ComponentType<any>;
    TabItem: ComponentType<any>;
    DocCardList: ComponentType<any>;
} = {
  ...MDXComponents,
  Tabs,
  TabItem,
  DocCardList,
};

export default components;
```


## Custom Components 

There are three custom components built for this site all located in the components directory as follows:

```
.
└── /src/
    └── components/
        ├── FundingStatment
        ├── SiteMap
        └── SwaggerAPIDoc
```

### Site Map

- The sitemap component renders the frontpage navigation of the website, organized in a mosaic layout with left and right columns
- Categories can be added by extending the `const categories:` object (lines 24-45) with new entries containing:
  - `title`: Category display name
  - `description`: Brief category description
- Products are defined in `const products:` array (lines 47-61) with each product requiring:
  - `title`: Product name
  - `link`: URL path
  - `description`: Brief description 
  - `category`: Must match a category key
  - `image`: Optional icon path

The layout groups products into their respective categories and automatically distributes them between the left column (`core`, `development`) and right column (`platform`, `misc`, `standards`).

This component also includes our funding statement, the copy used can be updated directly from the component on line 90.

:::tip Improvement Consideration
The current implementation uses hardcoded arrays (leftColumnCategories and rightColumnCategories) for column distribution. This is not ideal however it is the simplest method to organize our site content in its ideal layout. 
:::

### Sidebar Funding Statement

A simple React component that displays funding attribution information on the bottom left of all sidebars. It uses CSS Modules for scoped styling (styles.module.css). 

:::tip Improvement Consideration
Consider making the content configurable by accepting props rather than hardcoding the grant information, allowing reuse for different funding sources.
:::

### Swagger API Embed

The `SwaggerAPIDoc` component renders API documentation completely client-side by:

1. Importing local JSON specification files (`songAPI.json`, `scoreAPI.json`, `maestroAPI.json`)
2. Using these static JSON files to generate the documentation UI, meaning:
   - No actual API calls are made
   - Documentation works offline
   - No backend connectivity required
   - Safe for internal/private API documentation
   - Specifications can be version controlled alongside the code

Usage example with local JSON:
```jsx
// Your JSON spec file (e.g., songAPI.json)
{
  "openapi": "3.0.0",
  "info": {
    "title": "Song API",
    // ... rest of your API specification
  }
}

// Component usage remains the same
<SwaggerAPIDoc specName="song" />
```

The `tryItOutEnabled={false}` setting further reinforces this by preventing any attempts to make actual API calls from the documentation interface.

:::tip Improvement Consideration
Consider making the content configurable by accepting a path prop rather than having to add the spec to the component itself.
:::
