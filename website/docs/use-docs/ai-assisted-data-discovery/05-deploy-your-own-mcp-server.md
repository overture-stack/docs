---
id: deploy-your-own-mcp-server
sidebar_label: Deploy your own server
---

# Deploy the MCP server against your own Arranger

In the demo, you do not run the MCP server by hand; `make demo` starts it as the `arranger-mcp` container. To point the server at a **different or standalone** Arranger instance, deploy the container yourself.

:::tip Don't have an Arranger portal yet?
The [Building a Foundational Search Portal workshop](/use/workshop/prerequisites) walks you through standing up Arranger and Stage on your own tabular data. Once that portal is running, deploy the MCP server against it using the steps below.
:::

The deployment steps, the full environment-variable reference, and production guidance live in the Deploy guide:

**[Deploy the MCP Server](/deploy/deployment/arranger-mcp-server)**

For the server's internals, its full tool inventory, and development and testing workflows, see the canonical Arranger MCP Server documentation at [`apps/mcp-server`](https://github.com/overture-stack/arranger/tree/main/apps/mcp-server) and Arranger's [MCP server](/develop/Arranger/mcp-server) reference.
