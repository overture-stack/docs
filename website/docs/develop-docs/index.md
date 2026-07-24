---
title: Build
slug: /
sidebar_label: Develop Overture
sidebar_position: 0
---

# Building on Overture

**For developers working with or extending Overture components and the MCP
infrastructure.**

This journey is the developer home for Overture: the per-component **reference
library** (Lectern, Song, Score, Maestro, Arranger, Stage), the API reference,
the Arranger MCP developer documentation, components under active development,
and the standards for contributing to Overture and its documentation.

## Core Software

![Core Software](./images/core-software.webp "Core Software")

:::info
Overture is a genomics data platform that combines front and back-end services. Stage handles navigation, while Arranger enables data search. Authentication runs through Keycloak/Ego, Song manages metadata, Score handles S3 file transfers, and Maestro indexes to Elasticsearch for Arranger's search functionality. Together, these components enable efficient genomics data management.
:::

### Documentation Structure

Our core software documentation is organized as follows:

```
.
└── /Service/
   ├── /Overview
   ├── /Setup
   └── /Usage
```

#### Overview

The Overview section for each service typically includes: - High-level overview of the service - System architecture diagram and explanation - Key features and capabilities - Repository structure - Links to relevant GitHub repositories or additional resources

#### Setup

The Setup section runs you through the process of getting each service setup in a development environment. We offer guidance for the following Overture development configurations:

<Tabs>
  <TabItem value="platform" label="Platform" default>
    ![Platform](./images/platform.svg 'Overture Platform')
  </TabItem>
  <TabItem value="songDev" label="SongDev">
    ![Song Dev](./images/songDev.svg 'Song Dev Environment')
  </TabItem>
  <TabItem value="scoreDev" label="ScoreDev">
    ![Score Dev](./images/scoreDev.svg 'Score Dev
    Environment')
  </TabItem>
  <TabItem value="maestroDev" label="MaestroDev">
    ![Maestro Dev](./images/maestroDev.svg 'Maestro Dev
    Environment')
  </TabItem>
  <TabItem value="arrangerDev" label="ArrangerDev">
    ![Arranger Dev](./images/arrangerDev.svg 'Arranger Dev
    Environment')
  </TabItem>
  <TabItem value="stageDev" label="StageDev">
    ![Stage Dev](./images/stageDev.svg 'Stage Dev
    Environment')
  </TabItem>
</Tabs>

:::info
For newcomers to Overture, we recommend starting with our Platform Quickstart and Platform Guides. Combined resources provide a comprehensive overview and hands-on experience with the Overture ecosystem. To begin your journey, [visit the Deploy journey](/deploy).
:::

#### Usage

The Usage section provides detailed information on how to effectively use each service, including:

- Interacting with the API
- Common use cases and best practices
- Troubleshooting and FAQs
- Integration tips with other Overture services
- Performance optimization suggestions
