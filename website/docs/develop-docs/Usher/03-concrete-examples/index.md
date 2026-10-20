# Concrete examples

## Basic Example

This walkthrough works through a minimal, platform-agnostic scenario, following the same structure as the project-specific examples in the following sections.

### 1. The problem being solved

In this basic example, we want to define access to records: some should be open to everyone, while others should be reachable only by someone with permission.

### 2. The data being governed

The following is our example dataset, from the made up Arranger catalogue `my_data_index`.

| `data_label` | `nation`              | `sample_type` | `donor_identifier` | `age_at_collection` | `tissue_source` | `sequencing_platform` | `library_strategy` | `collection_date` | `submission_status` |
| ------------ | --------------------- | ------------- | ------------------ | ------------------- | --------------- | --------------------- | ------------------ | ----------------- | ------------------- |
| `dataset_A`  | `canada`              | `reference`   | `DONOR_001`        | `45`                | `blood`         | `illumina_novaseq`    | `wgs`              | `2023-01-10`      | `published`         |
| `dataset_A`  | `indigenous_nation_1` | `tumour`      | `DONOR_002`        | `61`                | `tissue`        | `illumina_novaseq`    | `wgs`              | `2023-03-22`      | `published`         |
| `dataset_B`  | `canada`              | `reference`   | `DONOR_006`        | `39`                | `blood`         | `illumina_novaseq`    | `wgs`              | `2023-02-05`      | `published`         |
| `dataset_B`  | `indigenous_nation_1` | `tumour`      | `DONOR_003`        | `58`                | `tissue`        | `illumina_hiseq`      | `wxs`              | `2023-05-14`      | `published`         |

`nation` here is an existing field in this dataset. Usher doesn't require a dedicated column; it's designed to deifne policies based on the inherient values of any given dataset In this example, we want to control access to records with the nation field value `indigenous_nation_1`.

### 3. The policy that governs it

The following is the grant an administrator defines, naming a resource, a category, a recipient, and a role:

```json
{
  "resource": "dataset_A",                     // Which resource this grant applies to
  "category": "global.indigenous_nation_data", // Which category within that resource
  "holder": "researcher@example.org",          // Who receives the grant
  "role": "viewer"                             // One of Usher's seeded roles, each with a fixed capability set
}
```

:::info
`viewer` is one of a small set of roles Usher ships with, already defined with a fixed set of permissions. The administrator picks a role by name; they don't configure what it can do.
:::

Once accepted, this is what the researcher holds for `dataset_A`:

```json
{
  "permissions": {
    "dataset_A": {                            // Resource this principal reaches
      "global.unmarked": {                    // Open category: granted by baseline, no grant needed
        "record": ["count", "view", "export"] // Actions permitted on this category's records
      },
      "global.indigenous_nation_data": {      // Concrete category: reachable only by an accepted grant
        "record": ["count", "view", "export"] // Actions permitted on this category's records
      }
    }
  }
}
```

:::info
`global.unmarked` is there too because it's open at the baseline: every signed-in principal gets it automatically, independent of the grant above. Together they let the researcher count, view, and export every record in `dataset_A`. `dataset_B` is absent, so none of its records are reachable at all.
:::
