# Building Dictionaries

Before any record is submitted to your platform, someone has to decide what fields exist, what types they hold, what values are permitted, and which are required. Lectern is Overture's data dictionary management service: it gives those decisions a persistent, versioned, machine-readable home, so the same dictionary that guides submitters also drives automated validation at ingestion time.

## Dictionary Structure

A Lectern dictionary is a JSON document made up of a name, a version, and one or more **schemas**, each schema modeling a single data entity (for example, `donor` or `specimen`). Within a schema, each **field** specifies a name, a value type (`string`, `integer`, `number`, or `boolean`), and any restrictions on the values it will accept:

```json
{
  "name": "my-dictionary",
  "version": "1.0",
  "schemas": [
    {
      "name": "donor",
      "description": "Core donor record",
      "fields": [
        {
          "name": "donor_id",
          "valueType": "string",
          "restrictions": { "required": true, "regex": "^DO-[0-9]{3,}$" }
        },
        {
          "name": "sex",
          "valueType": "string",
          "restrictions": {
            "required": true,
            "codeList": ["Female", "Male", "Other", "Unknown"]
          }
        }
      ]
    }
  ]
}
```

Restrictions (`required`, `codeList`, `regex`, `range`, and more) are where the curation work lives; they turn naming conventions and value ranges into enforced constraints, rejected at submission time rather than discovered after the fact. Schemas can also reference each other through shared identifier fields (a `specimen` schema referencing its donor's `donor_id`), expressing hierarchy without flattening everything into one table.

## Where a Dictionary Fits

Once published to a running Lectern server, a dictionary drives the rest of the pipeline:

- **Lyric** validates incoming submissions against it; every restriction becomes an automated, field-level check
- **Maestro** uses the schema to inform how validated data is indexed into Elasticsearch, carrying typed fields, controlled vocabularies, and relationships through to the search layer

## Try It: Dictionary Playground

If you have a running instance, its portal includes a **Dictionary Playground** at `/dictionary/playground`, a live editor where you can write a schema and see it rendered as an interactive table in real time, no server required.

:::tip
For the full schema reference (every restriction type, schema-level `uniqueKey`/`foreignKey` relationships, and versioning), see the [Lectern dictionary reference](/develop/Lectern/dictionaryReference).
:::
