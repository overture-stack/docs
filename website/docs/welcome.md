---
sidebar_position: 0
sidebar_label: Introduction
---

# Welcome to the Overture Dev Hub

Howdy, welcome to the Overture Dev Hub. This is a proof of concept for a unified developer hub that uses submodules from external repositories to render a comprehensive documentation site. 

## How It Works

- **Docusaurus**: We use Docusaurus to render the site, providing a sleek and navigable interface for our documentation.

- **Markdown Files**: All documentation content is stored as markdown files in the `/website/docs` directory.

- **Git Submodules**: We utilize Git submodules to store and track all our GitHub repositories within one main repository. All submodules can be found in the `submodule` folder.

- **Symlinks**: The necessary documentation files are symlinked from the submodules in the `submodule` folder to the `/website/docs` directory. This allows us to import only the required documentation that Docusaurus needs.

## Benefits of this Setup

1. **A Centralized Resource for Decentralized Documentation**: A single, easy-to-navigate hub displaying all our developer documentation while keeping all documentation markdown files within their respective repositories of interest.

2. **Consistent**: Enables us to easily ensure all documentation follows the same standards across different projects.

3. **Easy to Maintain**: Updates to individual project repositories can be automatically reflected in the dev hub.

4. **Scalable**: Easy to add new projects or microservices to the hub as submodules. Docusaurus will automatically update the sidebar and docs site accordingly with optional head metadata.

5. **Collaborative**: Developers can contribute to documentation directly through their project repositories.

6. **Automated Updates (requiring further work)**: Changes in submodules can trigger automated builds and deployments of the dev hub.

7. **Version Control (requiring further investigation)**: Docusaurus supports version control (e.g., Arranger V2 vs V3), which we plan to explore further.

8. **Robust**: Docusaurus has excellent error catching, particularly for broken and missing links, reducing the need for manual testing.

## Running it Locally

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

## Updating Documentation Pages

1. Navigate to the microservice submodule you wish to update:

   ```bash
   cd submodules/score
   ```

   Note: Submodules are Git repositories nested inside other Git repositories. Each submodule is a separate Git repository. When you're within the score submodule folder, you're working on a branch of the score repo.

2. Make your required changes and commit them:

   ```bash
   git add .
   git commit -m "Your descriptive commit message"
   ```

3. If your branch changes to a commit hash and you want to push changes to a specific branch:

   ```bash
   git checkout -b <newBranchName>
   ```

4. Push your changes:

   ```bash
   git push --set-upstream origin <branchName>
   ```

5. Navigate back to the root (parent) repository and update it:

   ```bash
   cd ../..
   git add .
   git commit -m "Updated score submodule"
   git push
   ```

   The parent repository (in this case, `bridge`) tracks the commit history of each submodule. Therefore, we need to push the submodule commit history changes (of score) to the remote repository (bridge).

## How docs get rendered onto the site

I used Docusaurus (also used for the ARGO docs) to render the site.

All documentation content is stored in markdown files located within `/website/docs`.

The original repositories for these markdown files are in the `submodule` folder.

Symlinks link only the necessary folders containing markdown files from the submodule directories. The simple script for this is in the root directory, titled `bridge.sh`:

```bash
ln -s ../../submodules/song/docs website/docs/Song
ln -s ../../submodules/score/docs website/docs/Score
```

This setup allows us to import only the necessary markdown files that Docusaurus needs. Changes to either directory are linked and reflected in both.

To run this without errors, I created a local plugin in `website/docsPlugin.ts`:

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

This plugin is imported on line 32 of `docusaurus.config.ts`:

```typescript
plugins: ['./docsPlugin.ts'],
```

The source of this fix can be found [here](https://github.com/facebook/docusaurus/issues/3272#issuecomment-688409489).

### Updating Submodules

You can add or update submodules in two ways:

1. **Adding a New Submodule using `git`**  
   Use the following command to add a new submodule:

   ```bash
   git submodule add -b <branchName> <GitHub repository URL> module_name
   ```

   This will automatically update the `.gitmodules` file located in the root directory with the submodule's details.

2. **Updating the `.gitmodules` File Directly**  
   You can manually update the `.gitmodules` file to add new submodules or modify existing ones. Once the file is updated, pull the latest changes for all submodules, including any newly added ones:

   ```bash
   git submodule update --recursive --remote
   ```