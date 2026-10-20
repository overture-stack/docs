# iMS example

## 1. The problem being solved

_State the access question and the scope in one or two sentences._

> The iMS Data Portal needs a steward to share a controlled study with a researcher. Public data remains available, and other controlled studies remain invisible.

_Scope the first iMS example to whole studies and records. Identify broader capabilities separately._

_Name the people involved and the outcome the backend must support. Describe the need without specifying screens or clicks._

> As a data steward, I want to share my controlled study with a researcher so they can view and download it after accepting my invitation.

_Include the recipient's pending, accepted, and declined states as backend inputs. Signing in alone must not expose the study._

## 2. The data being governed

_Define what one record represents, then provide representative rows with synthetic identifiers._

| Record identifier | Study identifier |
| ----------------- | ---------------- |
| `PUBLIC_01`       | `PUBLIC_STUDY`   |
| `A_01`            | `STUDY_A`        |
| `A_02`            | `STUDY_A`        |
| `B_01`            | `STUDY_B`        |

_Each row belongs to one study. State which fields in the actual data carry these identifiers. Access settings are defined in the policy section below._

## 3. The corresponding Arranger mapping

_Show how the data above maps to Usher's resource and category names. Supply actual field names and the configuration location, or label the mapping as conceptual._

| Mapping question                        | What the example must establish                                                                         |
| --------------------------------------- | ------------------------------------------------------------------------------------------------------- |
| Which field identifies the resource?    | The indexed study field whose values identify `PUBLIC_STUDY`, `STUDY_A`, and `STUDY_B`                  |
| Which records does the category select? | These studies have no category subdivisions, so `global.unmarked` covers every record within each study |
| Where is the mapping configured?        | The relevant Arranger integration configuration                                                         |
| Where is the resulting scope enforced?  | Arranger restricts results and counts; file services check downloads separately                         |

The mapping establishes which records each resource and category selects. The policy below determines who may access those records and what they may do.

## 4. The policy that governs it

_Describe the grant, then the permissions it produces. Keep names consistent throughout._

For this example, `PUBLIC_STUDY` is open. `STUDY_A` and `STUDY_B` require grants. These are resource settings in Usher, not access-level fields in the indexed records.

| Policy choice           | Illustrative value                                                                  |
| ----------------------- | ----------------------------------------------------------------------------------- |
| Resource                | `STUDY_A`                                                                           |
| Resource access setting | By grant                                                                            |
| Category                | `global.unmarked`, covering the whole study because it has no category subdivisions |
| Recipient               | The researcher invited by the steward                                               |
| Role                    | `viewer`, permitting count, view, and export                                        |
| Activation              | The recipient accepts the invitation                                                |

**Meaning:** the researcher may count, view, and download `STUDY_A`'s records after accepting.

The resulting token's permissions include this excerpt:

```json
{
  "permissions": {
    "STUDY_A": {
      "global.unmarked": {
        "record": ["count", "view", "export"]
      }
    }
  }
}
```

The excerpt omits token metadata. `unmarked` identifies the records covered; the resource's access setting determines who may reach them.
