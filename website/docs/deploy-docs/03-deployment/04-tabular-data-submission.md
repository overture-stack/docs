# Tabular Data Submission

Lectern and Lyric will be set up next. Together they form Overture's structured, dictionary-driven data submission system: Lectern manages the data dictionaries (the schemas that define your tabular data), and Lyric validates and stores tabular submissions against those dictionaries. Lyric depends on Lectern, so we set up Lectern first.

## Setting up the Lectern database

Lectern stores its dictionaries, versions, and metadata in MongoDB.

1. **Run MongoDB:** Use the following command to pull and run the MongoDB docker container

    ```bash
    docker run -d --name lectern-mongo \
    -e MONGODB_USERNAME=admin \
    -e MONGODB_PASSWORD=password \
    -e MONGODB_DATABASE=lectern \
    -e MONGODB_ROOT_PASSWORD=password123 \
    -p 27017:27017 \
    bitnami/mongodb:4.0
    ```

    <details>
    <summary><b>For more details, click here</b></summary>

    - This runs a MongoDB instance named `lectern-mongo` with an application user `admin` (password `password`) scoped to the `lectern` database.
    - Lectern connects to this database using the `MONGO_*` variables set in the next step.

    </details>

## Running Lectern

1. **Run Lectern:** Use the following command to pull and run the Lectern docker container

    ```bash
    docker run -d --name lectern \
    -e PORT=3000 \
    -e MONGO_HOST=lectern-mongo \
    -e MONGO_PORT=27017 \
    -e MONGO_DB=lectern \
    -e MONGO_USER=admin \
    -e MONGO_PASS=password \
    -e AUTH_ENABLED=false \
    -p 3000:3000 \
    ghcr.io/overture-stack/lectern:latest
    ```

    <details>
    <summary><b>Click here for a detailed breakdown</b></summary>

    #### Lectern Variables

    - `PORT` is the port Lectern listens on (default `3000`).
    - `MONGO_HOST`, `MONGO_PORT`, `MONGO_DB`, `MONGO_USER`, and `MONGO_PASS` point Lectern at the MongoDB instance from the previous step. Alternatively, set `MONGO_URL` to a full connection string, which overrides these discrete variables.
    - `AUTH_ENABLED` toggles JWT-based authorization. It is set to `false` here for a simpler local deployment; enable it and set `EGO_API` and `SCOPE` to secure Lectern.

    </details>

    :::info
    Once running, the Lectern API and its Swagger UI are available at `http://localhost:3000/api-docs`.
    :::

## Setting up the Lyric database

Lyric stores submitted tabular data in PostgreSQL.

1. **Run PostgreSQL:** Use the following command to pull and run the PostgreSQL docker container

    ```bash
    docker run -d --name lyric-db \
    -e POSTGRES_USER=postgres \
    -e POSTGRES_PASSWORD=secret \
    -e POSTGRES_DB=lyric \
    -p 5432:5432 \
    postgres:15-alpine
    ```

    <details>
    <summary><b>For more details, click here</b></summary>

    - This runs a PostgreSQL instance named `lyric-db` with the user `postgres`, password `secret`, and a database named `lyric`.
    - Lyric connects to this database using the `DB_*` variables set in the next step.

    </details>

## Running Lyric

1. **Run Lyric:** Use the following command to pull and run the Lyric docker container

    ```bash
    docker run -d --name lyric \
    -e PORT=3030 \
    -e DB_HOST=lyric-db \
    -e DB_PORT=5432 \
    -e DB_NAME=lyric \
    -e DB_USER=postgres \
    -e DB_PASSWORD=secret \
    -e LECTERN_URL=http://lectern:3000 \
    -e ID_USELOCAL=true \
    -p 3030:3030 \
    ghcr.io/overture-stack/lyric:latest
    ```

    <details>
    <summary><b>Click here for a detailed breakdown</b></summary>

    #### Lyric Variables

    - `PORT` is the port Lyric listens on (default `3030`).
    - `DB_HOST`, `DB_PORT`, `DB_NAME`, `DB_USER`, and `DB_PASSWORD` point Lyric at the PostgreSQL instance from the previous step.
    - `LECTERN_URL` is the URL of the running Lectern service supplying dictionary schemas; here it is the `lectern` container on port `3000`.
    - `ID_USELOCAL` set to `true` has Lyric generate record identifiers locally rather than delegating to an external ID service.

    </details>

    :::info
    Once running, the Lyric API and its Swagger UI are available at `http://localhost:3030/api-docs`. Confirm `LECTERN_URL` points to a running Lectern service before submitting data.
    :::

:::note Verified against
This guide was verified against **Lectern** `2.0.0-beta.3` (`8d9182f`) and **Lyric** `0.3.0` (`a6bb4e0`) on 2026-07-28, with MongoDB `4.0` and PostgreSQL `15`. Newer releases may differ.
:::
