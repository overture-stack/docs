# Administration Guides

- **These guides are for** anyone seeking information on configuring and using Overture as their platform's foundation. We will walk you through the essential information for configuring it.

- **You will need** Docker, we recommend using Docker Desktop version `4.39.0` or higher. If you already have Docker installed, please ensure it's up to date. For more information see, [Docker's website here](https://www.docker.com/products/docker-desktop/).

  :::caution
  **Note:** Ensure enough resources get allocated to Docker. We recommend a minimum CPU limit of `8`, memory limit of `8 GB`, swap of `2 GB`, and virtual disk limit of `64 GB`. You can access these settings by selecting the **cog wheel** found on the top right of the Docker desktop app and selecting **resources** from the left panel. **If you already have docker desktop installed, ensure you are on version 4.39.0 or higher**.
  :::

- **Overview:** This guide covers basic administration tasks associated with setting up and maintaining an Overture platform. Topics covered include:

  - **[Updating the Data Model](/guides/administration-guides/updating-the-data-model):** Learn how to update your data model to reflect your data requirements

  - **[Index Mappings](/guides/administration-guides/updating-the-data-model):** Understand what Index mappings are and how to configure them

  - **[Search Portal Customization](/guides/administration-guides/updating-the-data-model):** Learn how to customize how data is displayed in your front-end data facets and table components

  :::tip Help us make our guides better
  If you can't find what you're looking for please don't hesitate to reach out through our relevant [**community support channels**](https://docs.overture.bio/community/support).
  :::

# Getting Started

For a rapid, hassle-free setup of an Overture data platform on your local machine, follow these steps:

1. **Set Up Docker:** Install or update to Docker Desktop version 4.39.0 or higher. Visit [Docker's website](https://www.docker.com/products/docker-desktop/) for installation details.

   :::important
   Allocate sufficient resources to Docker:

   - Minimum CPU: `8 cores`
   - Memory: `8 GB`
   - Swap: `2 GB`
   - Virtual disk: `64 GB`

   Adjust these in Docker Desktop settings under "Resources".
   :::

2. **Clone the Repository**

   ```bash
   git clone https://github.com/overture-stack/conductor.git
   ```

3. **Launch the Platform:** Run the appropriate command for your operating system:

   | OS         | Command               |
   | ---------- | --------------------- |
   | Unix/macOS | `make platform`       |
   | Windows    | `./make.bat platform` |

   This will deploy the following services in Docker:

   ![Overture Platform Architecture](../images/platform.svg "Overture Platform")
