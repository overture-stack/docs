---
id: maestro
slug: /deployment/maestro
title: Maestro
sidebar_label: Maestro
---

# Maestro

Maestro transforms metadata in Song into a search index that Arranger can expose through a search API and UI.

If you have not yet deployed your search engine, return to [Search Engine](/deploy/deployment/search-engine) first.

:::info Using OpenSearch
Maestro communicates with the search engine over the Elasticsearch 7.x REST API, which OpenSearch 2.x also serves, so the same `MAESTRO_ELASTICSEARCH_*` variables below drive an OpenSearch cluster. Point `MAESTRO_ELASTICSEARCH_CLUSTER_NODES` at your OpenSearch node (for example `http://opensearch:9200`), and if you disabled the OpenSearch security plugin as shown above, set `MAESTRO_ELASTICSEARCH_CLIENT_BASICAUTH_ENABLED=false` since no credentials are required.
:::

## Running Maestro

1. **Create an env file:** Create a file named `.env.maestro` with the following content:

    ```bash
    # ==============================
    # Maestro Environment Variables
    # ==============================

    # Maestro Variables
    MAESTRO_FAILURELOG_ENABLED=true
    MAESTRO_FAILURELOG_DIR=app/logs/maestro
    MAESTRO_LOGGING_LEVEL_ROOT=INFO
    MAESTRO_NOTIFICATIONS_SLACK_ENABLED=false
    # Song Variables
    MAESTRO_REPOSITORIES_0_CODE=song.overture
    MAESTRO_REPOSITORIES_0_URL=http://song:8080
    MAESTRO_REPOSITORIES_0_NAME=Overture
    MAESTRO_REPOSITORIES_0_ORGANIZATION=Overture
    MAESTRO_REPOSITORIES_0_COUNTRY=CA
    # Elasticsearch Variables
    MAESTRO_ELASTICSEARCH_CLUSTER_NODES=http://elasticsearch:9200
    MAESTRO_ELASTICSEARCH_CLIENT_BASICAUTH_USER=elastic
    MAESTRO_ELASTICSEARCH_CLIENT_BASICAUTH_PASSWORD=myelasticpassword
    MAESTRO_ELASTICSEARCH_CLIENT_TRUSTSELFSIGNEDCERT=true
    MAESTRO_ELASTICSEARCH_INDEXES_ANALYSISCENTRIC_ENABLED=false
    MAESTRO_ELASTICSEARCH_INDEXES_FILECENTRIC_ENABLED=true
    MAESTRO_ELASTICSEARCH_INDEXES_FILECENTRIC_NAME=overture-quickstart-index
    MAESTRO_ELASTICSEARCH_INDEXES_FILECENTRIC_ALIAS=file_centric
    MAESTRO_ELASTICSEARCH_CLIENT_BASICAUTH_ENABLED=true
    MANAGEMENT_HEALTH_ELASTICSEARCH_ENABLED=false
    # Spring Variables
    SPRING_MVC_ASYNC_REQUESTTIMEOUT=-1
    SPRINGDOC_SWAGGERUI_PATH=/swagger-api
    # Kafka Variables
    SPRING_CLOUD_STREAM_KAFKA_BINDER_BROKERS=kafka:9092
    SPRING_CLOUD_STREAM_BINDINGS_SONGINPUT_DESTINATION=song-analysis
    ```

    <details>
    <summary><b>Click here for a detailed breakdown</b></summary>

    ### Maestro Variables

    - `MAESTRO_FAILURELOG_ENABLED` enables or disables failure logging. When set to `true`, Maestro logs any failures that occur, which is useful for debugging and monitoring purposes.

    - `MAESTRO_FAILURELOG_DIR` sets the directory path where failure logs are stored.

    - `MAESTRO_LOGGING_LEVEL_ROOT` sets the root logging level for Maestro. `INFO` is standard and `DEBUG` provides more detailed output.

    - `MAESTRO_NOTIFICATIONS_SLACK_ENABLED` enables or disables Slack notifications.

    #### Song Variables

    - `MAESTRO_REPOSITORIES_0_CODE` sets the code identifier for the repository. The value here is `song.overture`, serving as a unique identifier used within Maestro to reference the repository.

    - `MAESTRO_REPOSITORIES_0_URL` is the URL of the metadata repository.

    - `MAESTRO_REPOSITORIES_0_NAME` defines the display name for the repository.

    - `MAESTRO_REPOSITORIES_0_ORGANIZATION` defines the name of the organization that owns the repository.

    - `MAESTRO_REPOSITORIES_0_COUNTRY` defines the country code for the repository's location.

    #### Elasticsearch Variables

    - `MAESTRO_ELASTICSEARCH_INDEXES_ANALYSISCENTRIC_ENABLED` set to `false` specifies that analysis-centric indices are not expected.

    - `MAESTRO_ELASTICSEARCH_INDEXES_FILECENTRIC_ENABLED` set to `true` enables file-centric indices.

    - `MAESTRO_ELASTICSEARCH_CLIENT_BASICAUTH_ENABLED` enables basic authentication for the Elasticsearch client.

    - `MAESTRO_ELASTICSEARCH_CLIENT_BASICAUTH_USER` and `MAESTRO_ELASTICSEARCH_CLIENT_BASICAUTH_PASSWORD` provide credentials for Elasticsearch.

    - `MAESTRO_ELASTICSEARCH_CLUSTER_NODES` points to the address of the Elasticsearch cluster node(s).

    - `MANAGEMENT_HEALTH_ELASTICSEARCH_ENABLED` controls whether Elasticsearch health checks are performed.

    #### Spring Variables

    - `SPRING_MVC_ASYNC_REQUESTTIMEOUT` is `-1` (no timeout).

    - `SPRINGDOC_SWAGGERUI_PATH` specifies the URL path for the Swagger UI.

    #### Kafka Variables

    - `SPRING_CLOUD_STREAM_KAFKA_BINDER_BROKERS` defines the address of the Kafka broker(s).

    - `SPRING_CLOUD_STREAM_BINDINGS_SONGINPUT_DESTINATION` is the destination topic for the Song input binding.

    </details>

2. **Run Maestro:** Use the docker run command with your `.env.maestro` file:

    ```bash
    docker run --env-file .env.maestro \
        --name maestro \
        --platform linux/amd64 \
        -p 11235:11235 \
        ghcr.io/overture-stack/maestro:4.3.0
    ```

    :::info
    Maestro will now be available and can index metadata from Song into your search engine.
    :::

:::tip
After Maestro is running, continue with [Arranger](/deploy/deployment/arranger) to expose search APIs and UI components.
:::
