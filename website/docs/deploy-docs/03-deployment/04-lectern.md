---
id: lectern
slug: /deployment/lectern
title: Lectern
sidebar_label: Lectern
---

# Lectern

Lectern and Lyric form Overture's structured, dictionary-driven tabular data submission system. Lectern manages the dictionaries that define your tabular data, and Lyric validates and stores tabular submissions against those dictionaries.

Lyric depends on Lectern, so set up Lectern first. After this page, continue to [Lyric](/deploy/deployment/lyric).

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
