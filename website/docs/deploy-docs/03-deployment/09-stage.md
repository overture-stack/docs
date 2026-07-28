---
id: stage
slug: /deployment/stage
title: Stage
sidebar_label: Stage
---

# Stage

Stage is the React-based portal UI that researchers use to query and explore Overture data.

If you have not yet deployed Arranger, return to [Arranger](/deploy/deployment/arranger).

## Setting up Stage

1. **Create an env file:** Create a file named `.env.stage` with the following content:

    ```bash
    # ==============================
    # Stage Environment Variables
    # ==============================

    # Stage Variables
    NEXTAUTH_URL=http://localhost:3000/api/auth
    NEXT_PUBLIC_LAB_NAME=Overture QuickStart Portal
    NEXT_PUBLIC_ADMIN_EMAIL=contact@overture.bio
    NEXT_PUBLIC_DEBUG=true
    # Keycloak Variables
    NEXT_PUBLIC_AUTH_PROVIDER=keycloak
    ACCESSTOKEN_ENCRYPTION_SECRET=super_secret
    SESSION_ENCRYPTION_SECRET=this_is_a_super_secret_secret
    NEXT_PUBLIC_KEYCLOAK_HOST=http://keycloak:8080
    NEXT_PUBLIC_KEYCLOAK_REALM=myrealm
    NEXT_PUBLIC_KEYCLOAK_CLIENT_ID=webclient
    KEYCLOAK_CLIENT_SECRET=ikksyrYaKX07acf4hpGrpKWcUGaFkEdM
    NEXT_PUBLIC_KEYCLOAK_PERMISSION_AUDIENCE=dms
    # Arranger Variables
    NEXT_PUBLIC_ARRANGER_DOCUMENT_TYPE=file
    NEXT_PUBLIC_ARRANGER_INDEX=file_centric
    NEXT_PUBLIC_ARRANGER_API_URL=http://arranger-server:5050
    NEXT_PUBLIC_ARRANGER_MANIFEST_COLUMNS=repositories.code, object_id, analysis.analysis_id, study_id, file_type, file.name, file.size, file.md5sum, file.index_file.object_id, donors.donor_id, donors.specimens.samples.sample_id
    ```

    <details>
    <summary><b>Click here for a detailed breakdown</b></summary>

    #### Stage Variables

    - `NEXTAUTH_URL` specifies the base URL for NextAuth.js, which handles authentication in the portal.

    - `NEXT_PUBLIC_LAB_NAME` is the name displayed in the top left of the portal interface.

    - `NEXT_PUBLIC_ADMIN_EMAIL` is the administrator or support contact email.

    - `NEXT_PUBLIC_DEBUG` enables debug mode.

    #### Keycloak Variables

    - `NEXT_PUBLIC_AUTH_PROVIDER` specifies the authentication provider, in this case Keycloak.

    - `ACCESSTOKEN_ENCRYPTION_SECRET` defines the secret used to encrypt access tokens.

    - `SESSION_ENCRYPTION_SECRET` specifies the secret used to encrypt session cookies.

    - `NEXT_PUBLIC_KEYCLOAK_HOST` specifies the Keycloak server URL.

    - `NEXT_PUBLIC_KEYCLOAK_REALM` defines the Keycloak realm used for authentication.

    - `NEXT_PUBLIC_KEYCLOAK_CLIENT_ID` and `KEYCLOAK_CLIENT_SECRET` are the Keycloak client credentials.

    - `NEXT_PUBLIC_KEYCLOAK_PERMISSION_AUDIENCE` specifies the audience for permission claims.

    #### Arranger Variables

    - `NEXT_PUBLIC_ARRANGER_DOCUMENT_TYPE` defines the document type for Arranger (file-centric or analysis-centric).

    - `NEXT_PUBLIC_ARRANGER_INDEX` defines the Arranger index used by the portal.

    - `NEXT_PUBLIC_ARRANGER_API_URL` is the URL of the Arranger GraphQL API.

    - `NEXT_PUBLIC_ARRANGER_MANIFEST_COLUMNS` lists the columns included in the manifest generated for downloads.

    </details>

2. **Run Stage:** Use the docker run command with your `.env.stage` file:

    ```bash
    docker run --env-file .env.stage \
        --name stage \
        -p 3000:3000 \
        ghcr.io/overture-stack/stage:3ede4e2
    ```

    The front-end portal will now be available in your browser at `localhost:3000`.

:::info
Stage depends on Arranger, so confirm Arranger is accessible before attempting to use the portal.
:::
