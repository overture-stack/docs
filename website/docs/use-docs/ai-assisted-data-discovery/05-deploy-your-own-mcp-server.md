---
id: deploy-your-own-mcp-server
sidebar_label: Deploy your own server
---

# Deploy the MCP server against your own Arranger

In the demo, you do not run the MCP server by hand; `make demo` starts it as the `arranger-mcp` container. To point the server at a **different or standalone** Arranger instance, deploy the container yourself.

```bash
docker pull ghcr.io/overture-stack/arranger-mcp-server:b4a414ce

docker run -d \
  --name arranger-mcp \
  -e ARRANGER_BASE_URL=http://<your-arranger-host>:5050 \
  -e ARRANGER_CATALOGUES=correlation,mutation,expression,protein,donor \
  -p 3100:3100 \
  ghcr.io/overture-stack/arranger-mcp-server:b4a414ce
```

Replace `<your-arranger-host>` with your Arranger's hostname or IP. If Arranger runs in Docker on the same host, use `host.docker.internal` (macOS/Windows) or the Arranger container's service name on a shared network. Set `ARRANGER_CATALOGUES` to the catalogues your Arranger actually serves; the server exits on startup if it is missing.

| Variable                      | Default                 | Required     | Description                                                        |
| ----------------------------- | ----------------------- | ------------ | ------------------------------------------------------------------ |
| `ARRANGER_BASE_URL`           | `http://localhost:5050` | **Required** | Base URL of the Arranger server                                    |
| `ARRANGER_CATALOGUES`         | `server`                | **Required** | Comma-separated list of Arranger catalogues to expose             |
| `ARRANGER_REQUEST_TIMEOUT_MS` | `10000`                 | Optional     | HTTP timeout in milliseconds for requests to Arranger              |
| `MCP_HOST`                    | `0.0.0.0`               | Optional     | Host the MCP server binds to                                       |
| `MCP_PORT`                    | `3100`                  | Optional     | Port the MCP server listens on                                     |
| `MCP_PATH`                    | `/mcp`                  | Optional     | Endpoint path for the Streamable HTTP transport                    |
| `LOG_LEVEL`                   | `info`                  | Optional     | Pino log level (`trace`, `debug`, `info`, `warn`, `error`, `fatal`) |

:::warning Log files can be sensitive
At `LOG_LEVEL` `debug` or `trace`, the server may write SQON query objects to its logs. Those queries are generated from researcher input and can reveal which datasets, filters, and value ranges a researcher is investigating. Treat log files as potentially sensitive data: keep `LOG_LEVEL` at `info` or higher in production unless you are actively debugging, and apply the same access controls and retention policies you use for your primary portal's query logs.
:::

For the server's internals, its full tool inventory, and development and testing workflows, see the canonical Arranger MCP Server documentation at [`apps/mcp-server`](https://github.com/overture-stack/arranger/tree/main/apps/mcp-server) and Arranger's [AI and automation](/develop/Arranger/reference/ai-and-automation) reference.
