---
id: configuration-templates
sidebar_label: Configuration templates
---

# Configuration templates

These templates are intended to be **extended after pilot testing**, not rewritten. Start from them and add your own catalogues, prompts, and checks as your deployment grows.

## MCP server entry

The host connection is a single server entry pointed at the Streamable HTTP endpoint:

```json
{
  "mcpServers": {
    "arranger": {
      "url": "http://localhost:3100/mcp"
    }
  }
}
```

## Recommended prompts

The model performs best when a question names its catalogue and stays within that catalogue's coverage. Useful starting prompts:

- _What datasets are available?_ (lists the catalogues the server exposes)
- _What fields are available in the mutation catalogue?_ (lists each field, its type, and valid operators)
- _Show me BRCA genes with an overall mutation frequency above 10%._ (a first query)
- _Explain the filter you constructed for that query._ (the model can describe the SQON it built)

Tips that carry across portals:

- **Name the catalogue** in the question (for example "in the mutation catalogue").
- **Ask about available fields first** if you are unsure what filters are possible.
- **Stay within a catalogue's coverage**; a filter outside it returns nothing.
- **Iterate conversationally**; each follow-up refines the previous result set.

## Connection-testing procedure

Before running a session, confirm each layer responds. Arranger exposes three introspection endpoints the MCP server depends on:

```bash
# Server introspection: expect catalogCount, catalogs, mode, sqonSchemaPath
curl http://localhost:5050/introspection

# SQON schema: expect $schema, operators, aliases, title, version
curl http://localhost:5050/introspection/sqon

# Catalogue fields: expect catalogId, documentType, generatedAt, and a fields map
curl http://localhost:5050/introspection/mutation
```

The MCP server has no plain health route (its `/mcp` endpoint requires an MCP session handshake), so a port check is enough to confirm the process is up:

```bash
nc -z localhost 3100 && echo "port open"
```

If the host cannot connect, the common causes are:

| Symptom                                    | Likely cause                                  | Fix                                                                                             |
| ------------------------------------------ | --------------------------------------------- | ---------------------------------------------------------------------------------------------- |
| Host shows **Disconnected**                | The `arranger-mcp` container isn't running    | `docker ps` should list `arranger-mcp` on port 3100; check `docker logs arranger-mcp`.          |
| Connection refused at `localhost:3100`     | Wrong port, or another process is using 3100  | Confirm the host-side port with `docker ps`; if you overrode `MCP_PORT`, use that value.        |
| Connected, but the model never calls a tool | The loaded model doesn't support tool calling | Load a tool-capable model (look for the tool-use badge).                                        |
| A query returns no rows                    | The filter falls outside the sample's coverage | Ask the model what fields and values exist first, then query within the catalogue's coverage.   |
