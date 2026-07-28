# MCP Server

The Arranger MCP server will be set up last, and this step is optional. It sits on top of Arranger (deployed with the search portal above) and exposes your indexed data to MCP-compatible AI clients, so researchers can query the portal in plain language. Deploy it only if you want to offer AI-assisted, conversational data discovery on top of your search portal.

For the workflow this enables, the researcher experience, and a locally deployable demo, see the [AI-Assisted Data Discovery](/use/ai-assisted-data-discovery) guide.

## Running the MCP server

1. **Run the MCP server:** Point the container at the Arranger you deployed with the search portal.

    ```bash
    docker pull ghcr.io/overture-stack/arranger-mcp-server:b4a414ce

    docker run -d \
      --name arranger-mcp \
      -e ARRANGER_BASE_URL=http://<your-arranger-host>:5050 \
      -e ARRANGER_CATALOGUES=<your-catalogues> \
      -p 3100:3100 \
      ghcr.io/overture-stack/arranger-mcp-server:b4a414ce
    ```

    Replace `<your-arranger-host>` with your Arranger's hostname or IP. If Arranger runs in Docker on the same host, use `host.docker.internal` (macOS/Windows) or the Arranger container's service name on a shared network. Set `ARRANGER_CATALOGUES` to the catalogues your Arranger actually serves; the server exits on startup if that list is missing or empty.

    | Variable                      | Default                 | Required     | Description                                                        |
    | ----------------------------- | ----------------------- | ------------ | ------------------------------------------------------------------ |
    | `ARRANGER_BASE_URL`           | `http://localhost:5050` | **Required** | Base URL of the Arranger server                                    |
    | `ARRANGER_CATALOGUES`         | `server`                | **Required** | Comma-separated list of Arranger catalogues to expose             |
    | `ARRANGER_REQUEST_TIMEOUT_MS` | `10000`                 | Optional     | HTTP timeout in milliseconds for requests to Arranger              |
    | `MCP_HOST`                    | `0.0.0.0`               | Optional     | Host the MCP server binds to                                       |
    | `MCP_PORT`                    | `3100`                  | Optional     | Port the MCP server listens on                                     |
    | `MCP_PATH`                    | `/mcp`                  | Optional     | Endpoint path for the Streamable HTTP transport                    |
    | `LOG_LEVEL`                   | `info`                  | Optional     | Pino log level (`trace`, `debug`, `info`, `warn`, `error`, `fatal`) |

2. **Confirm the server is up:** Check that the container is running and connected to Arranger.

    ```bash
    docker ps | grep arranger-mcp
    docker logs arranger-mcp        # should show it connected to Arranger and listening
    ```

    The server is now reachable at `http://<your-arranger-host>:3100/mcp` over the Streamable HTTP transport, ready for an MCP-compatible client to connect.

:::warning Log files can be sensitive
At `LOG_LEVEL` `debug` or `trace`, the server may write SQON query objects to its logs. Those queries are generated from researcher input and can reveal which datasets, filters, and value ranges a researcher is investigating. Treat log files as potentially sensitive data: keep `LOG_LEVEL` at `info` or higher in production unless you are actively debugging, and apply the same access controls and retention policies you use for your primary portal's query logs.
:::

:::info Learn More
For the server's internals, its full tool inventory, and development and testing workflows, see the canonical Arranger MCP Server documentation at [`apps/mcp-server`](https://github.com/overture-stack/arranger/tree/main/apps/mcp-server) and Arranger's [AI and automation](/develop/Arranger/reference/ai-and-automation) reference.
:::

:::note Verified against
This guide was verified against the **Arranger MCP server** image `arranger-mcp-server:b4a414ce`, built from **Arranger** `v3.0.0-beta.32`+`8e84b4b`, on 2026-07-28. Newer releases may differ.
:::
