---
id: use-cases
sidebar_label: Use cases
---

# Demonstrated use cases

These are reproducible against the demo's Drug Discovery sample. The goal in each case is to refine a large gene list into a focused set of candidate targets. They are written so you can adapt the pattern to a different portal: substitute your own catalogue and field names, and keep the shape of the conversation. If a request is ambiguous, the model asks a targeted follow-up before querying (see [the researcher workflow](/use/ai-assisted-data-discovery#the-researcher-workflow)).

## Use case 1: iterative refinement

Iterative refinement narrows a large candidate set into a focused one through cross-table filtering, one conversational step at a time. This example moves from the `mutation` catalogue to the `expression` catalogue.

1. **Discover the data.**

   > _What datasets are available?_

   The model calls `list-catalogues` and returns the catalogues the server exposes.

2. **Explore a catalogue's fields.**

   > _What fields are available in the mutation catalogue?_

   The model calls `get-catalogue-fields` and returns fields such as `hugo_symbol`, `cancer_type`, `overall_mutation_frequency`, `is_oncogene`, and `is_tumor_suppressor_gene`, each with its type and valid operators.

3. **Run a first query.**

   > _Show me BRCA genes with an overall mutation frequency above 10%._

   The model constructs a SQON filter from the field metadata and calls `execute-query`, returning the matching genes as a table.

4. **Refine across a second catalogue.**

   > _Which of these genes show elevated average expression?_

   The model cross-references the `expression` catalogue using the gene list from the previous step and keeps the genes that also meet the expression criterion.

5. **Narrow further.**

   > _Of those, which are annotated as oncogenes?_

   The model adds an `is_oncogene` filter, leaving a short, focused candidate list.

Each step approves and runs one query, and each follow-up operates on the previous result set, so a researcher builds a precise cohort without writing a single filter by hand.

## Use case 2: pathway-informed filtering

Pathway-informed filtering uses the same refinement pattern to assemble a candidate gene set, then relates those genes to biological pathways, the question that feeds deeper analysis. This is the project's headline end-to-end example; the sequence below mirrors it.

1. **Assemble a candidate set** by mutation burden and cancer type:

   > _What are the most mutated genes in colorectal cancer?_

   An open-ended request like this is usually ambiguous, so the model clarifies intent (which catalogue, which threshold) before proposing a filter such as `mutation_frequency > 10% AND hotspot = true` for the COADREAD cohort, then runs it once you approve.

2. **Add an expression criterion** to keep genes that are also active:

   > _Which of these genes show elevated expression levels?_

3. **Ask the pathway question** to relate the focused set to known biology:

   > _What pathways are these genes involved in?_

**What is reproducible today, and what is not.** The gene-refinement pattern (steps 1 and 2) is reproducible against the demo, as long as you stay within each catalogue's loaded coverage. The demo's `mutation` sample is BRCA-only and does not include a `hotspot` field, so the colorectal (COADREAD) example above illustrates the full Drug Discovery Portal rather than the demo sample; to reproduce it locally, run the same shape of conversation against BRCA and the fields the demo actually exposes (see [use case 1](#use-case-1-iterative-refinement)). Step 3 is the hand-off point: dedicated pathway querying (a companion MCP server over MSigDB, the Molecular Signatures Database) is a forthcoming capability, so today the workflow produces the focused gene list that pathway analysis will consume.
