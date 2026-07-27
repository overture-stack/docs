---
id: connect-a-host
sidebar_label: Connect a host
---

# Connect a host application

You interact with the data through your **MCP host application**; there is no separate chat UI to install. This section uses **LM Studio** as the worked example. Any MCP-compatible host (Claude Desktop, Ollama, OpenCode, OpenWebUI, and others) works the same way once pointed at the server; only the location of the MCP configuration differs, so consult that application's MCP documentation for where to put the [server entry](/use/ai-assisted-data-discovery/configuration-templates#mcp-server-entry).

Before you start, make sure the [testing environment](/use/ai-assisted-data-discovery/testing-environment) is running.

## Install LM Studio

[Download and install LM Studio](https://lmstudio.ai/) for macOS, Windows, or Linux. LM Studio bundles a local model runtime with a chat UI, so the model runs on your machine and nothing leaves it (principle 1).

## Choose a local model

The workflow requires a model that supports **tool calling**: the model calls the server's tools to discover the schema and run queries. In LM Studio, tool-capable models are marked with a tool-use badge. The target is open-weights models in roughly the **4B to 70B parameter range, Q4-quantized**, so the whole workflow runs locally on accessible hardware.

1. Open the **Discover** tab (magnifying glass icon).
2. Search for a tool-capable model. Reasonable starting points:

   | Model                               | Notes                                                     |
   | ----------------------------------- | --------------------------------------------------------- |
   | `Qwen2.5-7B-Instruct` (Q4, ~4.7 GB) | Good balance of speed and reasoning; strong tool-calling  |
   | `Qwen2.5-3B-Instruct` (Q4, ~2 GB)   | Smaller option for machines with limited RAM              |

   These are **provisional starting points**, not a benchmarked recommendation. A defensible, benchmarked model recommendation lands after the August 2026 model evaluation.

3. Click **Download** and wait for it to complete.
4. Open the **Chat** tab and load the downloaded model; it should appear in the top status bar.

## Configure the MCP connection

The server speaks the **Streamable HTTP** MCP transport at `http://localhost:3100/mcp`. In LM Studio:

1. Select the **Chat** tab from the left-hand menu.
2. In the right-hand panel, under **Integrations**, select **`+ Install`**. This opens your `mcp.json` file.
3. Add the [MCP server entry](/use/ai-assisted-data-discovery/configuration-templates#mcp-server-entry).
4. Click **Save** and confirm the server status shows **Connected**.

If you set a custom `MCP_PORT` in the demo's `.env`, use that port in the URL instead of `3100`.

With a host connected, work through the [demonstrated use cases](/use/ai-assisted-data-discovery/use-cases).
