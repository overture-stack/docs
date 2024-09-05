---
sidebar_position: 1
sidebar_label: Standards
---

# Standards

The following pages are an aggregate of fundamental principles and established precedents that constitute the formal basis of our Overture documentation and developement practices.

## User Profiles

Overture has three primary audiences:

- **Software Engineers**: They build and customize Overture components for their software stack.

- **IT specialist**: Deploying and configuring Overture platforms.

- **Informaticians**: Use Overture platforms to gather, organize, explore and share data.

| Documentation | User Profile | Description
|---|---|---|
| Developer Documentation | Software Engineers & Developers | Technical resources for those working with or contributing to the project. |
| Product Documentation | IT Specialists & Informaticians | Covering features and functionalities with a production focus. Ideal for developers and administrators who want to understand how to operate and configure each indvidual component. |
| Platform Guides | IT Specialists & Informaticians | Providing information on platform setup, maintenance and usage. Ideal for end-users and administrators. |

## Language

We use Canadian English (en-CA) as our standard language for all written and verbal communication.

### Use an Active Voice

The active voice is concise and more accessible for readers to comprehend. Active voice is naturally used in conversation and therefore, readers understand and engage more with writing in the active voice.

| 👎 Disengaging| 👍 Engaging|
|---|---|
|The developer environment has been set up successfully.|We have successfully set up the developer environment.|
|The necessary tools and dependencies are being installed.|We are installing the necessary tools and dependencies.|

### Put Conditional Clauses First

Put conditional clauses up front in sentences. With conditional clauses upfront, readers can skim or skip information they do not require. If done consistently, this saves significant time reading irrelevant information.

| 👎 Slow | 👍 Skimmable |
|---|---|
|See How to Use the Score Client for more information | For more information, see How to Use the Score Client.|
| Set the analysis state to published, this will enable the analysis to be indexed| To index the analysis, set the analysis state to published |

### Write Accessibly

Take note of how you describe software behaviours or user actions. Each reader will have a unique background and familiarity with the content, so avoid using language that assumes knowledge.

| 👎 Sets expectations that can lead to frustration| 👍 No assumptions, made reader friendly|
|---|---|
|Start by *simply* entering the following command|Start by entering the following command|
|To *easily* interact with our API see the Song Swagger UI| To interact with our API see the Song Swagger UI|

Whenever possible, also include descriptive links to prerequisite or contextual material. Our services benefit a variety of people and data; therefore, experience levels and fields of expertise can vary significantly from user to user. 

## Formatting & Punctuation

### Headers

Use level 1 headers at the top of the page and divide your document using the lower level headers for subsections.

- Capitalize the first word of a title or subtitle, even if it is a little word like "The" or "A."
- Capitalize the first word after a colon and dash (ex., "Self-Report" instead of "Self-report").
- Capitalize words of four letters or more (e.g., "With," "Between," and "From").
- Except for the above rules, lowercase minor words that are three letters or fewer in a title or subtitle.

### Numbered lists vs bulleted points

- Numbered lists for sequential items
- Bulleted points for all other lists

### Commas

Use an Oxford comma for a list of three or more items.

| Can lead to confusion | Clearer separatation |
|---|---|
|I had eggs, toast and orange juice for breakfast.|I had eggs, toast, and orange juice for breakfast.|

## UI/Navigation Elements

When referencing UI elements, have them in **Bold**  

1. Click **Documentation** > **Get Started**.
2. Select **Pre-Configuration Setup**.

## Images & Diagrams

Images and diagrams can be valuable, but they can take lots of time and require maintenance. When using images or diagrams, consider how beneficial the visualization will be and how frequently you need to update it. 

For simple diagrams use Mermaid. For more information, see the official [GitHub Docs on creating Mermaid diagrams](https://docs.github.com/en/get-started/writing-on-github/working-with-advanced-formatting/creating-diagrams).


