---
sidebar_label: ReadMe
---

# `ReadMe.md`

All Overture repositories have a `README.md` file stored in the root directory of the project. This standardized README template is broken down as follows:

1. **Project Overview**: High-level summary of what the project does, its relationship to the broader Overture platform, and any relevant software components or related projects.

2. **Repository Structure**: An explanation of the repository's structure, using a diagram to illustrate the organization of directories and files (see https://tree.nathanfriend.io/).

3. **Local Development**: Information on development tools, system dependencies, setup instructions, and links to relevant information not suitable for the conciseness of a readme but needed for local development.

4. **Documentation**: Links our more detailed developer docs, platform guides, and other resources to help users understand how to work with and configure the software.

5. **Support & Contribution**: Encourages users to get involved by reporting issues, making contributions, and connecting on the Overture Slack channel.

6. **Related Software**: A table about related Overture components and their descriptions.

<details>
  <summary><b>Click here for our templated readme.md</b></summary>
``````
# repoName

What does this component do? Are there any related components (JS client, UI, etc.)? *Keep it to ~3-5 sentences*

</br>

> 
> <div>
> <img align="left" src="ov-logo.png" height="90"/>
> </div>
> 
> *{Component Name} is part of [Overture](https://www.overture.bio/), a collection of open-source software microservices used to create platforms for researchers to organize and share genomics data.*
> 
> 

## Repository Structure

The repository is organized with the following directory structure:

```
.
├── apps/
│   └── server 
└── packages/
    ├── client
    ├── common
    ├── dictionary
    └── validation
```

The modules in the monorepo are organized into two categories:

- __apps/__ - Standalone processes meant to be run. These are published to [ghcr.io](https://ghcr.io) as container images.
- __packages/__ - Reusable packages shared between applications and other packages. Packages are published to [NPM](https://npmjs.com).
- __scripts__ - Utility scripts for use within this repo.

## Local development

### Development tools

- [PNPM](https://pnpm.io/) Project manager
- [Node.js](https://nodejs.org/en) Runtime environment (v20 or higher)
- [VS Code](https://code.visualstudio.com/) As recommended code editor. Plugins recommended: ESLint, Prettier - Code formatter, Mocha Test Explorer, Monorepo Workspace

### System Dependencies

- [Lectern](https://github.com/overture-stack/lectern) Dictionary Management and validation
- [Postgres Database](https://www.postgresql.org/) For data storage

### Setup

- If the setup is sufficiently simple you may choose to display it here, otherwise link to the detailed setup.md within your /docs folder

## Documentation

- **[Developer Documentation](link):** Technical resources for those working with or contributing to the project, these exists within the `/docs` folder of this repository as well as our [developer docs website](link).

- **[Platform Guides](link):** Targeted towards end-users and administrators looking for information on Overture platform setup, maintenance and usage. 

## Support & Contributions

- Filing an [issue](https://github.com/overture-stack/{repoName}/issues)
- Making a [contribution](CONTRIBUTING.md)
- Connect with us on [Slack](http://slack.overture.bio)

## Related Software 

The Overture Platform includes the following Overture Components:

</br>

|Software|Description|
|---|---|
|[Score](https://github.com/overture-stack/score/)| Transfer data to and from any cloud-based storage system |
|[Song](https://github.com/overture-stack/song/)| Catalog and manage metadata associated to file data spread across cloud storage systems |
|[Maestro](https://github.com/overture-stack/maestro/)| Organizing your distributed data into a centralized Elasticsearch index |
|[Arranger](https://github.com/overture-stack/arranger/)| A search API with reusable search UI components |
|[Stage](https://github.com/overture-stack/stage)| A React-based front-data portal UI |
|[Lyric](https://github.com/overture-stack/lyric)| A data-agnostic tabular data submission system |
|[Lectern](https://github.com/overture-stack/lectern)| A simple web browser UI that integrates Ego and Arranger |
``````

</details>