---
sidebar_label: Overview
---

# AI-Assisted Data Discovery

AI-Assisted data discovery lets a researcher ask a deployed Overture portal questions in **plain language** and get back the exact records that answer them, without knowing field names, filter syntax, or query structure.

> _"show me all breast cancer samples with RNA-seq data from Canadian donors"_

The task is **natural language in, structured query out**, close in spirit to text-to-SQL, but the target is an Overture [Arranger](/develop/Arranger/overview) search query rather than SQL. This guide describes the workflow and the principles that govern it, walks you through a locally deployable testing environment, and gives reproducible use cases you can adapt to your own portal.

:::info Function first
This guide documents the _function_ (ask a question, review the generated query, get results) and the connection steps, so it holds regardless of which model host or chat client you use. Specific tools named below (LM Studio, MCP Inspector) are reference implementations, not requirements. A dedicated researcher-facing conversational host is in active development; today the capability is reachable through any MCP-compatible client pointed at the Arranger MCP server (see [Connect a host application](/use/ai-assisted-data-discovery/connect-a-host)).
:::

## Why conversational discovery

Structuring data behind a search API already makes it machine-accessible. Exposing that API through MCP lets a single conversational interface reason across it, and across other MCP-connected tools, instead of building a bespoke integration for every new tool, view, or data source. The result is one query interface that grows with the ecosystem rather than with custom development.

## How a question becomes a query

A generated query is three parts, each mapping to part of the sentence:

| Part                                 | What it decides                          | From the example                            |
| ------------------------------------ | ---------------------------------------- | ------------------------------------------- |
| **SQON filter**                      | _which_ records to return                | "breast cancer … RNA-seq … Canadian donors" |
| **GraphQL field selection**          | _which fields_ to return for each record | "show me … samples"                         |
| **GraphQL aggregation** _(optional)_ | a summary, when the question implies one | "_how many_ … per province"                 |

[SQON](/develop/Arranger/reference/building-sqon-queries) is Overture's JSON filter language; the [GraphQL API](/develop/Arranger/reference/query-processing) carries the filter, field selection, and aggregation to Arranger, which translates them into an Elasticsearch query. Because the model must know a catalogue's real fields, types, and valid operators before it can build a valid query, it discovers them at runtime through Arranger's [Introspection API](/develop/Arranger/reference/introspection) rather than guessing. Because Arranger generates that schema live from the indexed data, the same MCP server works against any Overture deployment without changes.

## Governing principles

The workflow is built around four principles, driven by the reality that this runs over sensitive biomedical data.

1. **Data sovereignty and minimization.** Sensitive records and the researcher's questions must not leave local infrastructure. The workflow is designed for **open-weights models run locally**, so nothing is sent to an external model provider. Only what a step needs is exposed: the model reads the catalogue _schema_ (via introspection) to build a query, and a query returns only the fields it selects.
2. **Explicit consent before execution.** The system builds a query from the question and **presents it to the researcher for approval before any data is fetched**. Nothing runs against the catalogue until the researcher confirms.
3. **Sandboxed execution.** Approved queries run through Arranger's search API against a configured catalogue (a bounded, read-only surface), not as free-form code against production systems.
4. **Reproducible sessions.** Runs use deterministic model settings (temperature 0) and a schema pinned to a specific introspection snapshot, so the same question yields the same query and the same results.

## The researcher workflow

The workflow runs in four beats: **request, clarifying intent, confirm, execute.**

1. **Request.** The researcher asks a question in plain language. Before answering, the model grounds itself: it **lists the catalogues** to see which datasets exist, reads their descriptions to pick the relevant one, then **loads that catalogue's fields** (their types, descriptions, and valid operators) and the **SQON filter grammar** it needs to build a valid query. Loading fields for only the chosen catalogue, rather than every dataset up front, keeps the model within its context budget.
2. **Clarifying intent.** The model classifies the request as _answerable_, _ambiguous_, _unanswerable_, or _improper_, and responds accordingly: proposing a filter in plain language when it is answerable, presenting its interpretation and asking a targeted follow-up when it is ambiguous, or suggesting the closest available fields when the data cannot answer it. Because the fields come from live introspection, the model stays grounded in fields that actually exist rather than inventing them. (This classify-then-respond loop is adapted from Guo et al. (2024), [Enhancing LLMs for Multi-turn Text-to-SQL](https://arxiv.org/abs/2412.17867); the task here has the same shape, with an Arranger GraphQL query as the target instead of SQL.)
3. **Confirm.** The model presents the finished query in plain language for approval. Nothing runs until the researcher confirms (principle 2), a human-in-the-loop check enforced on every query.
4. **Execute.** Arranger runs the approved query and returns the matching records (or aggregation buckets).

## In this guide

1. **[Set up the testing environment](/use/ai-assisted-data-discovery/testing-environment)**: deploy the demo locally.
2. **[Connect a host application](/use/ai-assisted-data-discovery/connect-a-host)**: point LM Studio (or another MCP host) at the server.
3. **[Configuration templates](/use/ai-assisted-data-discovery/configuration-templates)**: server entry, recommended prompts, connection tests.
4. **[Demonstrated use cases](/use/ai-assisted-data-discovery/use-cases)**: reproducible conversational workflows.
5. **[Deploy the MCP server against your own Arranger](/use/ai-assisted-data-discovery/deploy-your-own-mcp-server)**: go beyond the demo.

## What's coming

- **Integrated pathway-informed discovery** through a companion MCP server over MSigDB (the Molecular Signatures Database), so a refined gene set can be related to known biology in the same conversation.
- **A dedicated research environment** for interactive exploration, analysis, and visualization, where the model produces reproducible **code artifacts** (the data query, the analysis code, the visualization code) rather than opaque answers.
- **Extensibility** through additional MCP servers and reusable **Skills**, keeping research data under local context control.
- **A dedicated conversational host** for non-technical users, and **authentication** on the MCP server.
- **Testing and model optimization**, including a benchmarked model recommendation after the August 2026 evaluation.

For the Arranger server's own roadmap, see its [AI and automation](/develop/Arranger/reference/ai-and-automation#whats-coming) reference.

:::info **Need Help?**
If you encounter any issues or have questions, please reach out through our [**community support channels**](https://docs.overture.bio/community/support).
:::
