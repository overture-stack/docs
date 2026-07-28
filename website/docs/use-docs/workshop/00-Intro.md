---
id: prerequisites
title: Prerequisites
sidebar_position: 0
description: Build a searchable, FAIR-compliant data discovery portal from tabular CSV data using Elasticsearch, Arranger, and Stage.
---

# Building a Foundational Search Portal

This tutorial will guide you through building a foundational data discovery portal for tabular CSV data using Elasticsearch, Arranger, and Stage.

![Demo search and aggregation](./images/workshop-portal-preview.webp)

**Objectives:**

1. Deploy a functional data discovery portal using Elasticsearch, GraphQL, Arranger, and Stage
2. Configure search interfaces and indices tailored to tabular datasets
3. Gain familiarity with the tools needed to adapt this portal to your own data
4. Understand deployment options for making portals accessible on institutional networks and beyond

## Prerequisites

Install and verify the following before you start.

<details>
<summary><strong>1. WSL2 Setup </strong>(windows only)</summary>

Docker Desktop on Windows runs on WSL2, so configure it before installing Docker Desktop below:

1. Install [WSL2](https://learn.microsoft.com/en-us/windows/wsl/install)
2. Use Ubuntu or another Linux distribution within WSL2
3. Enable Docker Desktop's WSL2 integration (Docker Desktop → Settings → Resources → WSL Integration)
4. Run all commands from a **Bash terminal inside WSL2**, not PowerShell or Command Prompt. To open one, search for your Linux distribution (e.g. "Ubuntu") in the Start menu.

</details>

<details>
<summary><strong>2. Git</strong> installed</summary>

Download from [git-scm.com](https://git-scm.com/downloads) if the command is not recognised.

</details>

<details>
<summary><strong>3. Docker Desktop</strong> (`28.0.0` or later)</summary>

- **macOS / Windows:** Download from [docker.com/products/docker-desktop](https://www.docker.com/products/docker-desktop/)
- **Linux:** Follow the [Docker Engine install guide](https://docs.docker.com/engine/install/)

Once installed, open Docker Desktop → Settings → Resources and set:

- **CPUs:** 4+ cores (8 recommended)
- **Memory:** 8 GB minimum
- **Disk:** 10 GB+ available

Please ensure `docker --version` and `docker compose version` both return version numbers, and Docker Desktop is **running** with **4+ CPUs** and **8 GB+ memory** allocated

</details>

#### Optional Prerequisites

These are not required but will make this tutorial easier to follow:

<details>
<summary><strong>5. (Optional) Elasticvue:</strong> browser-based Elasticsearch GUI</summary>

[Elasticvue](https://elasticvue.com/installation) is a browser-based Elasticsearch GUI useful for inspecting indices, browsing documents, and troubleshooting. It is not required but helpful for understanding what's happening inside Elasticsearch while working through this tutorial.

Install it as a browser extension or standalone app.

</details>

<details>
<summary><strong>6. (Optional) PostgreSQL GUI client</strong></summary>

A PostgreSQL GUI client is useful for browsing the database while working through this tutorial. It is not required but helpful if you want to inspect the Postgres data directly.

| OS      | Recommended client                        |
| ------- | ----------------------------------------- |
| macOS   | [Postico](https://eggerapps.at/postico2/) |
| Windows | [pgAdmin](https://www.pgadmin.org/)       |
| Linux   | [pgAdmin](https://www.pgadmin.org/)       |

</details>

<details>
<summary><strong>7. (Optional) Bring your own data:</strong> CSV file</summary>

If you have a tabular dataset you'd like to use, bring it as a CSV file. This tutorial uses demo data throughout, but the final sections cover adapting the portal to your own dataset.

</details>

:::tip Finding Support
If you can't find what you're looking for please don't hesitate to reach out through our [**support page**](/community/support) or our [**discussion forum**](https://github.com/overture-stack/docs/discussions?discussions_q=).
:::
