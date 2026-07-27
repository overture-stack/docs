---
sidebar_position: 0.5
---

# AI-Assisted Data Discovery

AI-Assisted data discovery lets a researcher ask a deployed Overture portal questions in **plain language** and get back the exact records that answer them, without knowing field names, filter syntax, or query structure.

> _"show me all breast cancer samples with RNA-seq data from Canadian donors"_

The task is **natural language in, structured query out** — close in spirit to text-to-SQL, but the target is an Overture [Arranger](/develop/Arranger/overview) search query rather than SQL. This guide describes the workflow and the principles that govern it, and points to how to connect a client today.

:::info Function first
This guide documents the _function_ — ask a question, review the generated query, get results — and the connection steps, so it holds regardless of which model host or chat client you use. Specific tools named below (LM Studio, MCP Inspector) are reference implementations, not requirements. A dedicated researcher-facing conversational host is in active development; today the capability is reachable through any MCP-compatible client pointed at the Arranger MCP server (see [Connecting a client](#connecting-a-client)).
:::

## How a question becomes a query

A generated query is three parts, each mapping to part of the sentence:

| Part                                 | What it decides                          | From the example                            |
| ------------------------------------ | ---------------------------------------- | ------------------------------------------- |
| **SQON filter**                      | _which_ records to return                | "breast cancer … RNA-seq … Canadian donors" |
| **GraphQL field selection**          | _which fields_ to return for each record | "show me … samples"                         |
| **GraphQL aggregation** _(optional)_ | a summary, when the question implies one | "_how many_ … per province"                 |

[SQON](/develop/Arranger/reference/building-sqon-queries) is Overture's JSON filter language; the [GraphQL API](/develop/Arranger/reference/query-processing) carries the filter, field selection, and aggregation to Arranger, which translates them into an Elasticsearch query. Because the model must know a catalogue's real fields, types, and valid operators before it can build a valid query, it discovers them at runtime through Arranger's [Introspection API](/develop/Arranger/reference/introspection) rather than guessing.

## Governing principles

The workflow is built around four principles, driven by the reality that this runs over sensitive biomedical data.

1. **Data sovereignty and minimization.** Sensitive records and the researcher's questions must not leave local infrastructure. The workflow is designed for **open-weights models run locally**, so nothing is sent to an external model provider. Only what a step needs is exposed: the model reads the catalogue _schema_ (via introspection) to build a query, and a query returns only the fields it selects.
2. **Explicit consent before execution.** The system builds a query from the question and **presents it to the researcher for approval before any data is fetched**. Nothing runs against the catalogue until the researcher confirms.
3. **Sandboxed execution.** Approved queries run through Arranger's search API against a configured catalogue — a bounded, read-only surface — not as free-form code against production systems.
4. **Reproducible sessions.** Runs use deterministic model settings (temperature 0) and a schema pinned to a specific introspection snapshot, so the same question yields the same query and the same results.

## The researcher workflow

1. **Ask** a question in plain language against a chosen catalogue.
2. The model **discovers the schema** for that catalogue through the [Introspection API](/develop/Arranger/reference/introspection) — the fields, their types, and the operators each accepts.
3. The model **builds the query** — a SQON filter plus a GraphQL field selection, and an aggregation if the question implies a summary.
4. The researcher **reviews and approves** the generated query (principle 2).
5. Arranger **executes** the approved query and returns the matching records (or aggregation buckets).

## Connecting a client

Arranger ships an **MCP server** that exposes its discovery and query tools over the [Model Context Protocol](https://modelcontextprotocol.io/) — so any MCP-compatible client can drive the workflow above without Arranger-specific integration code. It provides tools to list catalogues, fetch the SQON schema, and retrieve a catalogue's fields, plus the same data as readable MCP resources.

To connect a client today:

- **MCP Inspector** — a browser-based UI for browsing the server's resources and calling its tools; useful while setting things up.
- **LM Studio** — a desktop app that bundles a local model runtime with a chat UI; add the Arranger MCP server as an MCP entry.

Any client that speaks MCP over Streamable HTTP works the same way. For the concrete server setup, the tools and resources it exposes, and per-client connection steps, see Arranger's [AI and automation](/develop/Arranger/reference/ai-and-automation) reference.

## Try it locally

The quickest way to see this end to end is the Conversational Data Discovery demo — a self-contained [Prelude](/deploy/prelude) environment that starts Arranger, the MCP server, and a portal preloaded with a representative sample of the OICR Drug Discovery data (gene correlation, mutation, expression, and protein catalogues).

1. Clone and start the demo:

   ```bash
   git clone -b overtureMCP --recurse-submodules https://github.com/overture-stack/prelude.git
   cd prelude
   make demo
   ```

   This runs system checks, starts the stack via Docker Compose, and loads the sample catalogues. The MCP server comes up at `http://localhost:3100/mcp`.

2. Connect an MCP host — LM Studio, for example — by adding the server to its MCP config:

   ```json
   {
     "mcpServers": {
       "arranger": { "url": "http://localhost:3100/mcp" }
     }
   }
   ```

3. Load a tool-capable model and ask a question in plain language, for example:

   > _Show me BRCA genes with an overall mutation frequency above 10%_

   The model discovers the catalogue's schema, constructs a query, and returns the matching records as a table. Follow-up questions refine the result set conversationally.

See the [prelude repository](https://github.com/overture-stack/prelude) for the full walkthrough, the sample catalogues, and setup details.

## What's coming

The discovery workflow is being extended (tracked in the Arranger docs' [AI and automation](/develop/Arranger/reference/ai-and-automation#whats-coming) reference):

- a dedicated researcher-facing **conversational host** (a chat front-end for non-technical users),
- **query-execution** tools that run an approved SQON against a catalogue and return results, and
- **authentication** on the MCP server.

:::info **Need Help?**
If you encounter any issues or have questions, please reach out through our [**community support channels**](https://docs.overture.bio/community/support).
:::
