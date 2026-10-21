---
title: Concrete Technical Example
sidebar_position: 2
description: A worked example of Usher resources, categories, grants, and Arranger mappings. Permission UIs and approval workflows are built separately.
---

# Concrete Technical Example

:::info Development status and scope
Usher is in the design phase. This example describes the planned policy model and the enforcement behavior required for a basic scenario. **Permission management UIs and data access approval workflows are separate applications built on Usher.** The JSON represents illustrative records and configuration, not a finalized API contract.
:::

## 1. The Problem Being Solved

In this example, we want to define access to records: some should be open to everyone, while others should be accessible only to someone with permission.

- Records with `nation = "canada"` are open to everyone.
- Records from a registered Indigenous nation require approval from both that nation and the platform.
- Records from a nation not yet registered with the platform are inaccessible to everyone.

These are the access rules for this synthetic example. The responsible project and community define the rules and approval authority for a real deployment.

## 2. The Data Being Governed

The following dataset belongs to the example Arranger catalogue `my_data_index`.

| Record | `data_label` | `nation`              | `sample_type` | `donor_identifier` | `age_at_collection` | `tissue_source` | `sequencing_platform` | `library_strategy` | `collection_date` | `submission_status` |
| ------ | ------------ | --------------------- | ------------- | ------------------ | ------------------- | --------------- | --------------------- | ------------------ | ----------------- | ------------------- |
| 1      | `dataset_A`  | `canada`              | `reference`   | `DONOR_001`        | 45                  | `blood`         | `illumina_novaseq`    | `wgs`              | `2023-01-10`      | `published`         |
| 2      | `dataset_A`  | `indigenous_nation_1` | `tumour`      | `DONOR_002`        | 61                  | `tissue`        | `illumina_novaseq`    | `wgs`              | `2023-03-22`      | `published`         |
| 3      | `dataset_A`  | `indigenous_nation_2` | `tumour`      | `DONOR_004`        | 52                  | `tissue`        | `illumina_novaseq`    | `wgs`              | `2023-04-02`      | `published`         |
| 4      | `dataset_B`  | `canada`              | `reference`   | `DONOR_006`        | 39                  | `blood`         | `illumina_novaseq`    | `wgs`              | `2023-02-05`      | `published`         |
| 5      | `dataset_B`  | `indigenous_nation_1` | `tumour`      | `DONOR_003`        | 58                  | `tissue`        | `illumina_hiseq`      | `wxs`              | `2023-05-14`      | `published`         |
| 6      | `dataset_B`  | `indigenous_nation_4` | `tumour`      | `DONOR_005`        | 47                  | `tissue`        | `illumina_hiseq`      | `wxs`              | `2023-06-19`      | `published`         |

:::note Working with existing data
The policy and mapping use the dataset's existing fields and values. Usher is model-agnostic: it does not prescribe a domain schema or require a dedicated access-control column. The application integration maps fields such as `data_label` and `nation` to Usher resources and categories, then validates that the data supports those mappings.
:::

Here, `data_label` identifies the resource and `nation` determines which categories apply to a record. The other fields provide context and are not used by this policy.

## 3. The Policy That Governs It

Usher does not read the dataset. It stores resources, categories, roles, grants, and recipient decisions. The application integration connects these policy names to the actual records. A category selects records within a resource. A record can match several categories or none.

### Resources

Each resource name matches a value in `data_label`. Every record belongs to exactly one resource, so its access is governed within that resource's scope.

```json
[
  {
    "name": "dataset_A",
    "description": "Example dataset A",
    "base_tier": "open",
    "categories": [
      "global.indigenous",
      "global.indigenous_nation_1",
      "global.indigenous_nation_2",
      "global.indigenous_unregistered"
    ]
  },
  {
    "name": "dataset_B",
    "description": "Example dataset B",
    "base_tier": "open",
    "categories": [
      "global.indigenous",
      "global.indigenous_nation_1",
      "global.indigenous_nation_2",
      "global.indigenous_unregistered"
    ]
  }
]
```

The illustrative `base_tier` setting determines who can access a resource's unmarked records:

- `open`: Everyone, including anonymous visitors.
- `registered`: Signed-in users.
- `grant`: Users with an active grant for those records.

Both resources use `open`. This makes their unmarked records public; records matching restricted categories still require grants.

Each resource lists all four categories, including those that currently match no records in that resource. This ensures that the corresponding restrictions also apply when new records arrive.

### Categories

A category's identifier combines its scope and name, for example `global.indigenous`. For a `global` category, the record selection, which records the category matches, is defined once for the whole catalogue rather than separately per resource. Grants are still scoped to a single resource: a grant for `global.indigenous` on `dataset_A` does not grant access to `global.indigenous` records in `dataset_B`. The broader model also supports categories local to one resource, each with its own separately defined record selection; this example uses only global categories.

```json
[
  {
    "scope": "global",
    "name": "indigenous",
    "description": "Platform approval required for records outside the open Canada category"
  },
  {
    "scope": "global",
    "name": "indigenous_nation_1",
    "description": "Records governed by Indigenous Nation 1"
  },
  {
    "scope": "global",
    "name": "indigenous_nation_2",
    "description": "Records governed by Indigenous Nation 2"
  },
  {
    "scope": "global",
    "name": "indigenous_unregistered",
    "description": "Records with an unregistered or missing nation; no grants permitted"
  }
]
```

The `indigenous` category represents the platform's approval requirement. Each nation-specific category represents that nation's approval requirement. A category name alone does not establish who can grant access: the management layer must enforce the appropriate authority for each category. A global name also does not automatically provide cross-resource custodianship.

No user receives a grant for `global.indigenous_unregistered`. Maintaining that restriction is part of this example's governance policy; the category's name or description does not enforce it by itself.

### Grants

The following two grants give one researcher access to the `global.indigenous` and `global.indigenous_nation_1` categories on `dataset_A`. Each comes from a different authority: `platform-owner-001` grants the platform's approval, and `nation-1-authority-001` grants Nation 1's approval.

```json
[
  {
    "id": "grant-platform-A",
    "resource": "dataset_A",
    "category": "global.indigenous",
    "holder": "researcher-001",
    "role": "viewer",
    "granted_by": "platform-owner-001",
    "granted_at": "2026-01-15T10:00:00Z",
    "expires_at": null,
    "revoked_at": null
  },
  {
    "id": "grant-nation-1-A",
    "resource": "dataset_A",
    "category": "global.indigenous_nation_1",
    "holder": "researcher-001",
    "role": "viewer",
    "granted_by": "nation-1-authority-001",
    "granted_at": "2026-01-15T10:05:00Z",
    "expires_at": null,
    "revoked_at": null
  }
]
```

Each grant names a resource, category, recipient, and role. `granted_by` records who created it; Usher must check that person's authority when creating the grant. A null `expires_at` means no expiry is set, and a null `revoked_at` means the grant has not been revoked.

:::info Roles and recipients
The planned `viewer` role includes `record.count`, `record.view`, and `record.export`. A grant assigns this predefined capability set by role name.

A grant names an identity-provider account. Sharing by email requires an invitation workflow that resolves the verified address to an account. That workflow belongs to an application built on Usher.
:::

### Recipient Decisions

Usher records a recipient's answer separately from the grant because they capture two different decisions: the grantor's choice to authorize access, and the recipient's choice to accept it. An active grant alone does not confer access; the recipient must also accept it, and could instead leave it pending or reject it. For this example, the researcher holds two active grants, one from the platform and one from Nation 1, but needs an accepted decision on each before gaining access to records that require both approvals.

```json
[
  {
    "grant": "grant-platform-A",
    "user": "researcher-001",
    "decision": "accepted",
    "capabilities": ["record.count", "record.view", "record.export"],
    "decided_at": "2026-01-16T09:30:00Z"
  },
  {
    "grant": "grant-nation-1-A",
    "user": "researcher-001",
    "decision": "accepted",
    "capabilities": ["record.count", "record.view", "record.export"],
    "decided_at": "2026-01-16T09:35:00Z"
  }
]
```

The `capabilities` list records what the recipient was shown when accepting. A refusal would record `rejected`. Pending or rejected grants do not contribute access.

The interface for accepting or declining a grant requires separate application development. This walkthrough assumes that the application has recorded both decisions through Usher's backend.

## 4. The Corresponding Arranger Mapping

This mapping tells the application integration how to translate Usher's resource and category names into queries against the catalogue's actual fields: a record's resource is read from its `data_label` value, and its category membership is determined by evaluating conditions against its `nation` value.

The following illustrative configuration expresses each category's matching condition using SQON, Arranger's query expression format. It illustrates what the mapping must specify, not a configuration file that can be deployed as-is.

```json
{
  "catalogue_id": "my_data_index",
  "resource_field": "data_label",
  "categories": {
    "global.indigenous": {
      "op": "not",
      "content": [
        {
          "op": "in",
          "content": { "fieldName": "nation", "value": ["canada"] }
        }
      ]
    },
    "global.indigenous_nation_1": {
      "op": "in",
      "content": { "fieldName": "nation", "value": ["indigenous_nation_1"] }
    },
    "global.indigenous_nation_2": {
      "op": "in",
      "content": { "fieldName": "nation", "value": ["indigenous_nation_2"] }
    },
    "global.indigenous_unregistered": {
      "op": "not",
      "content": [
        {
          "op": "in",
          "content": {
            "fieldName": "nation",
            "value": ["canada", "indigenous_nation_1", "indigenous_nation_2"]
          }
        }
      ]
    }
  },
  "resources": {
    "dataset_A": { "categories": {} },
    "dataset_B": { "categories": {} }
  }
}
```

The top-level `categories` mapping defines each global category once for this catalogue. Usher's resource configuration specifies which categories apply to each resource. The empty resource-level category objects indicate that this example has no additional local categories.

The `global.indigenous` condition deliberately matches everything except `canada`, including unknown or missing values. This is a conservative access rule for the synthetic dataset, not a way to infer a person's identity from missing data.

### Matching Records to Categories

A record matches every category whose condition is true:

| Record | Resource    | Nation                | Matching categories                                    |
| ------ | ----------- | --------------------- | ------------------------------------------------------ |
| 1      | `dataset_A` | `canada`              | None; `global.unmarked`.                               |
| 2      | `dataset_A` | `indigenous_nation_1` | `global.indigenous`, `global.indigenous_nation_1`.     |
| 3      | `dataset_A` | `indigenous_nation_2` | `global.indigenous`, `global.indigenous_nation_2`.     |
| 4      | `dataset_B` | `canada`              | None; `global.unmarked`.                               |
| 5      | `dataset_B` | `indigenous_nation_1` | `global.indigenous`, `global.indigenous_nation_1`.     |
| 6      | `dataset_B` | `indigenous_nation_4` | `global.indigenous`, `global.indigenous_unregistered`. |

Only records explicitly carrying `canada` are unmarked. Missing and unregistered nation values must match the restricted categories, so they cannot become open data by omission. Validate this behavior against the actual query engine, including missing, null, and unexpected values. The resource and nation fields must also satisfy the mapping's single-value assumptions.

### Expected Access

For a requested action, a record requires permission on **every category it matches, within that record's resource**. This intersection rule is essential: combining category grants as alternative ways to access a record would allow either the platform or nation approval alone to expose it.

The table compares four readers. All listed grants are accepted and active, with the same `viewer` capabilities.

| Reader | Grants                                                                                 |
| ------ | -------------------------------------------------------------------------------------- |
| **A**  | No explicit grants.                                                                    |
| **B**  | `global.indigenous_nation_1` on `dataset_A`.                                           |
| **C**  | `global.indigenous` and `global.indigenous_nation_1` on `dataset_A`, as defined above. |
| **D**  | `global.indigenous` on `dataset_B`.                                                    |

| Record                      | A       | B                              | C                              | D                                              |
| --------------------------- | ------- | ------------------------------ | ------------------------------ | ---------------------------------------------- |
| 1: A, `canada`              | Visible | Visible                        | Visible                        | Visible                                        |
| 2: A, `indigenous_nation_1` | Hidden  | Hidden: platform grant missing | Visible                        | Hidden: grant is for B                         |
| 3: A, `indigenous_nation_2` | Hidden  | Hidden                         | Hidden: Nation 2 grant missing | Hidden                                         |
| 4: B, `canada`              | Visible | Visible                        | Visible                        | Visible                                        |
| 5: B, `indigenous_nation_1` | Hidden  | Hidden                         | Hidden: grants are for A       | Hidden: Nation 1 grant missing                 |
| 6: B, `indigenous_nation_4` | Hidden  | Hidden                         | Hidden                         | Hidden: unregistered category is never granted |
| **Total visible records**   | **2**   | **2**                          | **3**                          | **2**                                          |

Three rules determine these results:

1. Every matching category must permit the requested action. For a fixed policy, adding a grant cannot reduce access.
2. Grants are scoped to a resource. A grant on `dataset_A` does not provide access to restricted records in `dataset_B`.
3. Records matching a category that nobody is granted remain inaccessible. The open baseline applies only to unmarked records.

When registering another nation, first define its category, add it to the affected resources, and deploy its mapping while its records remain blocked by `global.indigenous_unregistered`. Verify that the nation-specific restriction is enforced before adding the nation's value to the unregistered condition's exclusion list. Removing that restriction first could expose records to a reader holding only the platform grant.

### Effective Permissions

Reader C's permissions include the following excerpt:

```json
{
  "permissions": {
    "dataset_A": {
      "global.unmarked": {
        "record": ["count", "view", "export"]
      },
      "global.indigenous": {
        "record": ["count", "view", "export"]
      },
      "global.indigenous_nation_1": {
        "record": ["count", "view", "export"]
      }
    },
    "dataset_B": {
      "global.unmarked": {
        "record": ["count", "view", "export"]
      }
    }
  }
}
```

`global.unmarked` appears for both resources because both have an open baseline. Reader C can access records 1, 2, and 4. The other records remain excluded by the category and resource rules above. Token metadata and transport protection are omitted.

### Enforcing the Policy

The application supplies its mapping to the shared bridge, and the adapter applies the resulting permission filter to requests. Search results, counts, and exports must use the same permitted record set. Separate file APIs must enforce access on downloads, including direct requests outside the portal.

If either of Reader C's explicit grants is pending, rejected, revoked, or expired, it cannot satisfy the corresponding category requirement. Assuming no other grants provide that access, Reader C can then access only the two open records. Revocation must also invalidate cached permissions; verify the timing for active sessions.

The mapping and access tables define the expected behavior for integration testing. They do not by themselves establish support for category intersections, nation-specific granting authority, or approval workflows. See [Building Applications on Usher](04-building-applications.md) for those application responsibilities and [User and Project Requirements](03-user-project-requirements.md) for the wider user stories.
