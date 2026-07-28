---
id: testing-environment
sidebar_label: Testing environment
---

# Set up the testing environment

The quickest way to see the workflow end to end is the AI-Assisted Data Discovery demo: a self-contained instance that starts Arranger, the MCP server, and a portal preloaded with a representative sample of the OICR Drug Discovery data. It is locally deployable and accessible to pilot users and developers.

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

The local model runtime (LM Studio) is installed later, in [Connect a host application](/use/ai-assisted-data-discovery/connect-a-host).

## Start the demo

Clone the demo branch and start the stack:

```bash
git clone -b docs-demo/ai-assisted-data-discovery --recurse-submodules https://github.com/overture-stack/prelude.git
cd prelude
make demo
```

`make demo` runs system checks, starts the stack via Docker Compose, and loads the sample catalogues. The first run also downloads and builds the container images, so it can take a while depending on your connection. When it completes:

- the **portal** is at [http://localhost:3000](http://localhost:3000) (the stack does not open a browser for you), and
- the **MCP server** is at `http://localhost:3100/mcp`.

To stop the stack, run `make down`; to wipe all data and start clean, run `make reset`.

:::info Windows
Run `make demo` from a **Bash terminal inside WSL2**. The MCP demo branch drives the stack through the `Makefile`, so use WSL2 rather than native PowerShell.
:::

## What's running

`docker ps` should list the stack. All ports bind to `127.0.0.1` only:

| Service           | Port   | Role                                    |
| ----------------- | ------ | --------------------------------------- |
| Stage (portal UI) | `3000` | Portal frontend                         |
| Arranger          | `5050` | GraphQL API and introspection endpoints |
| Arranger MCP      | `3100` | MCP server, Streamable HTTP at `/mcp`   |
| OpenSearch        | `9200` | Search engine                           |
| PostgreSQL        | `5435` | Persistent storage                      |

## The demo data

The data is a **representative sample** drawn from the Drug Discovery Portal, roughly 1,000 rows in each of four gene-statistics catalogues. The upstream portal spans about **405 million records** across roughly **20,000 genes** and **32 cancer types**, and its datasets are related by gene (HUGO symbol), so a cohort filtered in one catalogue can be refined against the others:

| Catalogue     | Contents                       | Sample coverage |
| ------------- | ------------------------------ | --------------- |
| `correlation` | Gene correlation data          | DLBC only       |
| `mutation`    | Gene mutation data             | BRCA only       |
| `expression`  | Gene expression profiles       | 32 cancer types |
| `protein`     | Protein interaction statistics | Sampled         |
| `donor`       | Donor records                  | Sampled         |

## Verify

Confirm Arranger and the MCP server are up before connecting a host:

```bash
# Arranger introspection lists the loaded catalogues
curl http://localhost:5050/introspection

# The MCP container is running and listening on 3100
docker ps | grep arranger-mcp
docker logs arranger-mcp        # should show it connected to Arranger and listening
```

Once the stack is up we can move on to [connecting a host application](/use/ai-assisted-data-discovery/connect-a-host).
