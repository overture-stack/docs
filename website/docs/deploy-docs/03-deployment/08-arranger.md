---
id: arranger
slug: /deployment/arranger
title: Arranger
sidebar_label: Arranger
---

# Arranger

Arranger generates the search API and UI components on top of your search engine and Maestro-indexed metadata.

If you have not yet deployed Maestro, return to [Maestro](/deploy/deployment/maestro).

:::info Using OpenSearch
Set `SEARCH_ENGINE=opensearch` and point `ES_HOST` at your OpenSearch node (for example `http://opensearch:9200`). The `ES_HOST`, `ES_USER`, and `ES_PASS` variables apply to both engines; the credentials are ignored when the OpenSearch security plugin is disabled. Leaving `SEARCH_ENGINE` unset makes Arranger auto-detect the engine from the cluster.
:::

## Running Arranger

1. **Create an env file:** Create a file named `.env.arranger` with the following content:

    ```bash
    # ==============================
    # Arranger Environment Variables
    # ==============================

    # Arranger Variables
    ENABLE_LOGS=false
    # Directory holding the per-catalogue config files (mounted below)
    CONFIGS_PATH=/configs
    # Elasticsearch / OpenSearch Variables
    ES_HOST=http://elasticsearch:9200
    ES_USER=elastic
    ES_PASS=myelasticpassword
    SEARCH_ENGINE=elasticsearch
    ```

2. **Create a folder titled `arrangerConfigs` and place the following configuration files within it:**

   - The **[base.json](https://github.com/overture-stack/composer/blob/develop/configurationFiles/arrangerConfigs/base.json)**, containing the base configuration for the Arranger server
   - The **[extended.json](https://github.com/overture-stack/composer/blob/develop/configurationFiles/arrangerConfigs/extended.json)**, containing all possible fields inputted into arranger
   - The **[facets.json](https://github.com/overture-stack/composer/blob/develop/configurationFiles/arrangerConfigs/facets.json)**, defines the facets found within the facet panel of the data exploration page in Stage
   - The **[table.json](https://github.com/overture-stack/composer/blob/develop/configurationFiles/arrangerConfigs/table.json)**, defines the formatting of the tables found on the data exploration page in Stage

3. **Run Arranger:** Use the docker run command with your `.env.arranger` file:

    ```bash
    docker run --env-file .env.arranger \
        --name arranger-server \
        -p 5050:5050 \
        -v ./arrangerConfigs:/configs \
        ghcr.io/overture-stack/arranger-search-server:3.1.0-rc.2
    ```

    Make sure to confirm the `./arrangerConfigs/` path aligns with the actual paths to your Arranger-Server configuration files, update your command or folder structure accordingly.

    <details>
    <summary><b>Click here for a detailed breakdown</b></summary>

    ### When creating the .env.arranger file:

    - `ES_HOST` is the URL of your Elasticsearch instance.

    - `ES_USER` and `ES_PASS` are the credentials for accessing Elasticsearch.

    - `SEARCH_ENGINE` selects the search backend, either `elasticsearch` or `opensearch`.

    - `CONFIGS_PATH` is the directory inside the container that holds the per-catalogue config files (matched by the volume mount below).

    ### When running Arranger:

    - `-p 5050:5050` maps port 5050 of the host to port 5050 of the container.

    - `-v ./arrangerConfigs:/configs` mounts the config directory into the container (matched by `CONFIGS_PATH`).
        - `base.json` contains the base configuration for the Arranger server
        - `extended.json` contains all possible fields inputted into arranger
        - `facets.json` defines the facets found within the facet panel of the data exploration page in Stage
        - `table.json` defines the formatting of the tables found on the data exploration page in Stage

    </details>

    :::info Configuring Arranger
    If you want to learn more about configuring Arranger see our administration guide on [customizing the search portal](/use/administration/customizing-the-data-portal).
    :::

:::tip
After Arranger is running, continue with [Stage](/deploy/deployment/stage) to deploy the portal UI.
:::
