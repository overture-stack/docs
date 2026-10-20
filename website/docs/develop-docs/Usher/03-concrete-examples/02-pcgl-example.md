# PCGL example

_This project-specific example has not been written yet. The structure below follows the [Basic Example](index.md) and the completed [iMS example](01-ims-example.md); fill in each section with PCGL's own scenario, data, and policy._

## 1. The problem being solved

_State the access question and the scope in one or two sentences._

> _TODO: describe the access scenario PCGL needs to support._

_Scope the example to a well-defined slice of data. Identify broader capabilities separately._

_Name the people involved and the outcome the backend must support. Describe the need without specifying screens or clicks._

> _TODO: as a [role], I want to [goal], so that [outcome]._

_Include the recipient's pending, accepted, and declined states as backend inputs, if relevant. Signing in alone must not expose controlled data._

## 2. The data being governed

_Define what one record represents, then provide representative rows with synthetic identifiers._

| Record identifier | Resource identifier |
| ------------------ | --------------------- |
| _TODO_             | _TODO_                |

_Each row belongs to one resource. State which fields in the actual data carry these identifiers. Access settings are defined in the policy section below._

## 3. The corresponding Arranger mapping

_Show how the data above maps to Usher's resource and category names. Supply actual field names and the configuration location, or label the mapping as conceptual._

| Mapping question                        | What the example must establish |
| ---------------------------------------- | --------------------------------- |
| Which field identifies the resource?     | _TODO_                             |
| Which records does the category select?  | _TODO_                             |
| Where is the mapping configured?         | _TODO_                             |
| Where is the resulting scope enforced?   | _TODO_                             |

The mapping establishes which records each resource and category selects. The policy below determines who may access those records and what they may do.

## 4. The policy that governs it

_Describe the grant, then the permissions it produces. Keep names consistent throughout._

| Policy choice           | Illustrative value |
| ------------------------ | -------------------- |
| Resource                | _TODO_                |
| Resource access setting | _TODO_                |
| Category                | _TODO_                |
| Recipient               | _TODO_                |
| Role                    | _TODO_                |
| Activation              | _TODO_                |

**Meaning:** _TODO: state in plain language who may do what once the grant is active._

The resulting token's permissions would include an excerpt in the same shape as the [Basic Example](index.md) and the [iMS example](01-ims-example.md).
