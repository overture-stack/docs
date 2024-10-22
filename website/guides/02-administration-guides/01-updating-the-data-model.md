# Updating the Data Model

## Schema Validation and Submission

Data administrators can configure custom data submission validations for Song by creating and submitting Song schemas. These schemas act as blueprints for validating submissions, ensuring that every piece of data adheres to the requirements specified by the administrators. This validation process guarantees that all essential fields are included and that the data within these fields conforms to the designated data types or permitted value sets.

## Integration with Song's Base Schema

Song merges all admin-defined schemas with its pre-existing [base schema](https://github.com/overture-stack/SONG/blob/develop/song-server/src/main/resources/schemas/analysis/analysisBase.json). Therefore, when creating your schemas, it is important to reference the base schema to avoid specifying conflicting properties.

:::info Song Base Schema
The Song base schema can be restrictive for data models outside of cancer research contexts, as it requires tumor and normal samples. We are aware of this limitation and are currently working on a new data-agnostic submission system. For more information, contact us on Slack or email us at contact@overture.bio.
:::

## Building Schemas

### Schema Basics

The following schema defines any data submission using the `analysisType` of `exampleSchema` must contain two fields, `field1` (a string) and `field2` (a number):

```JSON
{
  "name": "exampleSchema",
  "schema": {
    "type": "object",
    "required": ["field1", "field2"],
    "properties": {
      "field1": {
        "type": "string"
      },
      "field2": {
        "type": "number"
      }
    }
  }
}
```

There are many different type values available in JSON schema, here is a list of commonly used JSON type values definitions:

- `string` Textual data e.g., "a word"
- `number` Numeric data (integer or float), e.g. `-5`, `10`, `-5.8`, `10.2`  
- `integer` Integer values (`16`, `0`, `-20`)
- `boolean` Boolean values (`true` or `false`)   
- `object` Key-value pairs where keys are strings and values can be any type
- `array` Ordered lists of items, which can contain any data type   
- `enum`  A fixed set of values.
- `null`  Represents a null value

#### JSON Schema can also include various additional constraints:

- **Regex Patterns:** Fields can use regex patterns to enforce specific formatting rules

    ```JSON
    "field1": {
    "type": "string",
    "pattern": "^[A-Za-z]+$"
    }
    ```

- **Required Fields:** Defines which fields must be present in the data object

    ```JSON
    "required": ["field1", "field2"]
    ```

- **Array Constraints:**  Allows setting minimum (minItems) and maximum (maxItems) array lengths

    ```JSON
    "field3": {
    "type": "array",
    "minItems": 1,
    "maxItems": 5
    }
    ```

- **Conditional Logic (if-then):** Logic to enforce required fields based on conditions.

    ```JSON
    "if": {
    "properties": { "field4": { "const": "value1" } }
    },
    "then": {
    "required": ["field5"]
    }
    ```

### Basic Example

In the context of Song here is a basic schema, it requires at a minimum, an `analysisType` defined by the `name` field and a single object within it. In the example below, this object is a field termed `experiment`:

```JSON
{
 "name": "basicSchemaExample",
 "schema":{
     "type": "object",
     "required":[
         "experiment"
     ],
     "properties":{
        "experiment":{}
     }
  }
}
```

<details>
  <summary><b>Click here for a detailed breakdown</b></summary>

- `name` is the name of the schema, which identifies the schema for validation purposes

- `schema` contains the schema definition

- `type` is the data type of the schema, in this case, an object

- `required` is a list of fields that must be included in any data submission validated against this schema

- `properties` are the fields that the schema expects. In this example, the schema expects an `experiment` field.

</details>

The `analysisType` is defined in data submissions to Song. This field informs Song which data model the submission should be validated against. Below is an example of a mock data submission:

```JSON
{
  "studyId": "MICR-CA",
  "analysisType": {
    "name": "basicSchemaExample"
  },
  "experiment": "myNewExperiment"
}
```

- In this example, the schema named `basicSchemaExample` is used to validate the data submission

- The `analysisType` field specifies that the submission should adhere to the `basicSchemaExample` model, ensuring that all required fields, such as `experiment`, are present and correctly formatted

- The field `studyId` comes from and is required by Song's base schema and is used to identify what group this collection of data belongs to

### Detailed Examples

Let's break down some more complex schema examples. We will pull from a reference schema that can be found [here](https://github.com/overture-stack/composer/blob/develop/guideMaterials/dataAdministration/SONG-schema.json). In the following sections, we will provide snippets of this schema along with explanations of the structure, function, and any embedded logic.

- **Required Fields:** Here, our Schema dictates that `"donor"`, `"specimen"`, `"workflow"`, and `"experiment"` are required fields:

    ```JSON
    {
    "name": "quickStartSchema",
    "schema": {
        "type": "object",
        "required": ["donor", "specimen", "workflow", "experiment"],
        "properties": { ... 
    ```

- **Enum, Types, and Patterns:** Within `workflow`, we can see the use of `propertyNames`, `enum`, `required fields`, `types` and `regex patterns`

    ```JSON
        "workflow": {
            "propertyNames": {
            "enum": ["workflowName", "workflowShortName", "workflowVersion", "genomeBuild", "inputs","sessionId","runId"]
            },
            "required": ["workflowName", "genomeBuild", "inputs"],
            "type": "object",
            "properties": {
            "workflowName": {
                "type": "string",
                "pattern": "^[a-zA-Z][a-zA-Z0-9 _\\-]+[a-zA-Z0-9]+$"
            },
            "workflowShortName": {
                "type": "string",
                "pattern": "^[a-zA-Z][a-zA-Z0-9_\\-]+[a-zA-Z0-9]+$"
            },
            "workflowVersion": {
                "type": "string"
            },
            "genomeBuild": {
                "type": "string",
                "enum": ["GRCh37", "GRCh38_hla_decoy_ebv", "GRCh38_Verily_v1"]
            },
    ```

    <details>
    <summary><b>Click here for a detailed breakdown</b></summary>

    - `workflow` Defines an object containing properties related to workflow.

    - `propertyNames` Limits the allowed property names within workflow to those listed

    - `required` specifies that `workflowName`, `genomeBuild`, and `inputs` must be present within the workflow object

    - `type` indicates that workflow is an object type and therefore contains nested key value pairs

    - `workflowName` Requires a string (`"type": "string"`) that matches the specified regex pattern (`"pattern": ^[a-zA-Z][a-zA-Z0-9 _\\-]+[a-zA-Z0-9]+$`). This ensures it starts with a letter, allows alphanumeric characters, spaces, underscores, and hyphens, and ends with alphanumeric characters.

    - `genomeBuild` requires a string (`"type": "string"`) that can only be one of the specified values (`"enum": ["GRCh37", "GRCh38_hla_decoy_ebv", "GRCh38_Verily_v1"]`).

    </details>

- **minItems & maxItems:** The JSON Schema below is a simplified workflow property made to show the usage of `minItems` and `maxItems`

    ```JSON
        "workflow": {
            "propertyNames": {
            "enum": ["inputs"]
            },
            "required": ["inputs"],
            "type": "object",
            "properties": {
            "inputs": {
                "type": "array",
                "items": {
                "type": "object",
                "properties": {
                    "tumourAnalysisId": {
                    "type": "string",
                    "pattern": "^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{13}$"
                    },
                    "normalAnalysisId": {
                    "type": "string",
                    "pattern": "^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{13}$"
                    },
                    "analysisType": {
                    "type": "string"
                    }
                }
                },
                "minItems": 1,
                "maxItems": 2
            },
            }
    ```

    <details>
    <summary><b>Click here for a detailed breakdown</b></summary>

    - `"minItems": 1,` If you submit data according to this schema then you must include at least one complete set of inputs (A complete set consists of `analysisType`, `normalAnalysisId`, and `tumourAnalysisId`).

    - `"maxItems": 2` You can include up to two complete sets of inputs in a single submission.

    The `minItems` and `maxItems` constraints apply to the number of these sets (or arrays) within the inputs array, not to the individual fields within each set.

    </details>

- **Conditional Logic:** The Schema segment below demonstrates the usage of conditional if, and then logic used to determine if the fields `causeOfDeath` and `survivalTime` are required

    ```JSON
            "vitalStatus": {
                "type": "string",
                "enum": ["Alive", "Deceased"]
            },
            "if": {
            "properties": {
                "vitalStatus": {
                "const": "Deceased"
                }
            }
            },
            "then": {
            "required": ["causeOfDeath", "survivalTime"]
            }
        },
    ```

    <details>
    <summary><b>Click here for a detailed breakdown</b></summary>

    This conditional schema structure allows for dynamic validation based on the value of `vitalStatus`, ensuring that `causeOfDeath` and `survivalTime` are only required when `vitalStatus` is `Deceased`.

    - If `vitalStatus` is `"Deceased"`, then the submission must include `causeOfDeath` and `survivalTime`.

    - If `vitalStatus` is `"Alive"`, then there are no additional requirements needed.

    - `const` is a validation keyword that specifies that a property's value must exactly match for the submission to be considered valid

    </details>

- **Null Values:** Null values can provide flexibility by allowing a property to be explicitly null when no valid string value is applicable or known. The schema segment below shows the use of a `null` enum value for a `relapseType` property.

    ```JSON
    "relapseType": {
        "type": ["string", "null"],
        "enum": [
        "Distant recurrence/metastasis",
        "Local recurrence",
        "Local recurrence and distant metastasis",
        "Progression (liquid tumours)",
        null
        ]
    ```

<details>
  <summary><b>Click here for a detailed breakdown</b></summary>

If `relapseType` is a string, it must match exactly one of the values listed in the enum array ("Distant recurrence/metastasis", "Local recurrence", "Local recurrence and distant metastasis", "Progression (liquid tumours)")

If relapseType is `null`

```JSON
{
  "relapseType": null
}
```

The above key value pair is considered valid according to the schema. This allows for scenarios where relapseType might not have a defined value or where its value is intentionally absent or unknown.

</details>

- **Minimum & Maximum:** Minimum and maximum keywords in JSON Schema provide straightforward ways to enforce numerical constraints, ensuring that data adheres to specified ranges or limits

    ```JSON
    "treatmentDuration": {
    "type": "integer",
    "minimum": 0
    }
    ```

    Here, `"minimum": 0` ensures that `treatmentDuration` can only accept non-negative integer values   

    :::info Want to learn more?
    If you want to learn more about JSON schema take a look at the following [JSON Schema guide](https://json-schema.org/understanding-json-schema).
    :::

## Updating the Schema

You can update Song schemas using the Song server's Swagger UI or using curl commands. 

### Using the Swagger UI

The Song Swagger UI provides a user-friendly interface to interact with Song's API endpoints. You can access it at the Song server URL appended with `/swagger-ui.html`. For the quickstart, this will be `http://localhost:8080/swagger-ui.html`.

To update the schema using the Swagger UI:

1. **Locate the Schema API endpoints** From the schema dropdown, find the `POST` **RegisterAnalysisType** endpoint.

    ![Entity](../images/swagger_register_schema.png 'register new schema')

2. **Select *Try it out* and input your API key and Schema:** enter your authorization token in the authorization field (`Bearer {API-Key}`), and place your new schema inside the request field.

    API Keys are brokered by Keycloak and accessible when logged in to the Stage UI. For the Overture QuickStart, Stage can access from `localhost:3000`

    - **Login through the Stage UI** by selecting login from the top right. Default credentials when using the Overture QuickStart will be username `admin` and password `admin123`.

    - **Generate a new API token** by selecting **Profile and Token** from your user drop down found on the top right of the Stage UI, select **Generate New Token**. 

        ![Accessing an API Key](../images/apikeys.png 'Accessing an API Key')

3. **Select Execute:** expected responses as well as response codes and descriptions, are conveniently documented within Swagger-UI. 

    :::info Verifying Schemas
    To verify your schema has successfully been added, you can use the `GET` **ListAnalysisTypes** endpoint found under the Schema dropdown. If updating a pre-existing schema, use the `GET` **GetAnalysisTypeVersion** endpoint.
    :::

### Using the Curl command

The following curl command makes a POST request with the required authorization tokens, headers and data:

```bash
curl -X POST "https://localhost:8080/schemas" -H "accept: */*" -H "Authorization: Bearer {Insert-API-Key}" -H "Content-Type: application/json" -d "{ \"name
\":\"example_demo\", \"schema\": { \"type\":\"object\", \"required\":[ \"experiment\" ], \"properties\":{ \"experiment\": { \"type\": \"object\", \"required\": [\"experiment_type\"], \"propertyNames\": { \"experiment_type\":{ \"type\":\"string\", \"enum\": [\"WGS\",\"RNA-Seq\"] }, } } } }}"
```

    - `-X POST "https://localhost:8080/schemas"` specifies the request method to be used, in this case, POST, this points to Song's `schemas` endpoint

    - `-H "accept: */*"` adds an HTTP header specifying that the client accepts any type of response

    - `-H "Authorization: Bearer {Insert-API-Key}"` adds an HTTP header for authorization, with a Bearer token (replace `{Insert-API-Key}` with the actual API key).

    - `-H "Content-Type: application/json"` Adds an HTTP header specifying the content type of the request body as JSON.

    - `-d {...} ` is the data to be sent with the POST request. This is the JSON payload defining the schema.

## Useful Links

Here are some resources to help with the creation of new schemas for your projects:

- [Understanding JSON Schema guide](https://json-schema.org/understanding-json-schema): This comprehensive guide provides detailed information on JSON Schema formatting.

- [Example schema](https://raw.githubusercontent.com/cancogen-virus-seq/metadata-schemas/main/schemas/consensus_sequence.json): For a practical reference, you can examine this sample schema used in CanCOGeN's VirusSeq Portal. 

- [Base schema reference](https://github.com/overture-stack/SONG/blob/develop/song-server/src/main/resources/schemas/analysis/analysisBase.json): Song incorporates a base schema that combines with all user schemas. When developing your schemas, it's crucial to reference this base schema to avoid conflicting properties and ensure compatibility with Song's base schema structure.

There's no need to write your JSON Schema manually. Several existing tools can help you format your data efficiently:

- For basic schemas, [JSONschema.net](https://jsonschema.net) or [Liquid Technologies' Online JSON to Schema Converter](https://www.liquid-technologies.com/online-json-to-schema-converter) are excellent resources. These tools allow you to easily convert JSON to JSON Schema.

:::info What's Next?
With your data model updated, we next need to ensure we configure an accurate index mapping to help enable our downstream search and portal UI components
:::
