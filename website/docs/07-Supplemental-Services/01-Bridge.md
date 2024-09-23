
# Bridge

Bridge is a single, easy-to-navigate hub that beautifully renders all our product documentation from the `/docs` folder of all our GitHub repositories. 

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

## How OvertureDev Works

- **Docusaurus**: We use Docusaurus to render the site, providing a sleek and navigable interface for our documentation.

- **Markdown Files**: All documentation content is stored as markdown files in the `/website/docs` directory.

- **Git Submodules**: We use Git submodules to store and track all our GitHub repositories within one main repository. All submodules can be found in the `submodule` folder.

- **Symlinks**: Only the necessary documentation files are symlinked from the submodules in the `submodule` folder to the `/website/docs` directory. This allows us to import only the required markdown content that Docusaurus needs.

## Benefits of this Setup

- **A Centralized Resource for Decentralized Documentation**: A single, easy-to-navigate hub displaying all our developer documentation while keeping all documentation markdown files within their respective repositories.

- **Consistent**: Enables us to easily ensure all documentation follows the same standards across different projects.

- **Easy to Maintain**: Updates to any of the individual project repositories `/docs` folders are automatically reflected here.

- **Robust Error Handling**: Docusaurus has excellent error catching, particularly for broken and missing links, reducing the need for manual testing.

## Getting Started

### Running it Locally

To clone the repository with the files in the submodules:

```bash
git clone --recurse-submodules https://github.com/MitchellShiell/bridge.git
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

Use the following command to add a new submodule:

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
