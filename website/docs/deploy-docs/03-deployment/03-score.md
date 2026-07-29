---
id: score
slug: /deployment/score
title: Score
sidebar_label: Score
---

# Score

Score is a fault-tolerant multi-part parallel transfer service made to facilitate transfers of file data to and from object storage.

If you have not already set up Keycloak and Song, see [Keycloak](/deploy/deployment/keycloak) and [Song](/deploy/deployment/song).

## Running Score

1. **Create an env file:** Create a file named `.env.score` with the following content:

    ```bash
    # ==============================
    # Score Environment Variables
    # ==============================

    # Spring Variables
    SPRING_PROFILES_ACTIVE=default,s3,prod,secure
    SERVER_PORT=8087
    # Song Variable
    METADATA_URL=http://song:8080
    # Score Variables
    SERVER_SSL_ENABLED="false"
    # Object Storage Variables
    S3_ENDPOINT=http://host.docker.internal:9000
    S3_ACCESSKEY=admin
    S3_SECRETKEY=admin123
    S3_SIGV4ENABLED=true
    S3_SECURED=false
    OBJECT_SENTINEL=heliograph
    BUCKET_NAME_OBJECT=object
    BUCKET_NAME_STATE=state
    UPLOAD_PARTSIZE=1073741824
    UPLOAD_CONNECTION_TIMEOUT=1200000
    # Keycloak Variables
    AUTH_SERVER_PROVIDER=keycloak
    AUTH_SERVER_CLIENTID=dms
    AUTH_SERVER_CLIENTSECRET=t016kqXfI648ORoIP5gepqCzqtsRjlcc
    AUTH_SERVER_TOKENNAME=apiKey
    AUTH_SERVER_KEYCLOAK_HOST=http://keycloak:8080
    AUTH_SERVER_KEYCLOAK_REALM=myrealm
    AUTH_SERVER_SCOPE_DOWNLOAD_STUDY_PREFIX=STUDY.
    AUTH_SERVER_SCOPE_DOWNLOAD_STUDY_SUFFIX=.READ
    AUTH_SERVER_SCOPE_DOWNLOAD_SYSTEM=score.READ
    AUTH_SERVER_SCOPE_UPLOAD_STUDY_PREFIX=STUDY.
    AUTH_SERVER_SCOPE_UPLOAD_STUDY_SUFFIX=.WRITE
    AUTH_SERVER_SCOPE_UPLOAD_SYSTEM=score.WRITE
    AUTH_SERVER_URL=http://keycloak:8080/realms/myrealm/apikey/check_api_key/
    SPRING_SECURITY_OAUTH2_RESOURCESERVER_JWT_JWK_SET_URI=http://keycloak:8080/realms/myrealm/protocol/openid-connect/certs
    ```

    <details>
    <summary><b>Click here for a detailed breakdown</b></summary>

    #### Spring Run Profiles

    - **Spring Run Profiles** activates specific profiles for the application with defined configurations. Profiles and their specified environment variables are defined in the [Score server application.yml](https://github.com/overture-stack/score/blob/develop/score-server/src/main/resources/application.yml). The profiles used here are summarized below.

    | Profile       | Description                                                                                                                                                                                                 |
    |---------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
    | `s3` | Configures the service for use with an S3-compatible backend.                                             |
    | `prod`        | Optimizes the service for production use, enabling S3 security features and specifying the metadata server URL.                                                                                           |
    | `secure`      | Implements OAuth authentication, specifying the authentication server URL, token name, client ID, client secret, and scopes for download and upload operations.                                  |

    #### Song & Score Variables

    - `SERVER_PORT` and `SERVER_SSL_ENABLED` specifies the port for the Score service (`8087`) and disables SSL (`false`), indicating HTTP communication. SSL is disabled to simplify deployment by avoiding the need to configure SSL certificates for HTTPS. This configuration should only be used in development environments and not in production.

    - `METADATA_URL` points to the URL for our previously deployed song-server at `http://song:8080`.

    #### Object Storage Variables

    - `S3_ENDPOINT`, `S3_ACCESSKEY`, `S3_SECRETKEY`, `BUCKET_NAME_OBJECT`, `BUCKET_NAME_STATE` defines access to object storage, including the endpoint (`minio:9000`), access key (`admin`), secret key (`admin123`), bucket names for objects (`object`) and state (`state`).

    - `UPLOAD_PARTSIZE` specifies the maximum size of individual parts when uploading large files to an object storage service. Large files are typically split into smaller parts to facilitate parallel uploads and to manage network bandwidth efficiently. If network bandwidth is limited, smaller part sizes might be beneficial to keep the upload process moving quickly. On the other hand, if the application requires high throughput and can afford to wait longer for uploads to complete, larger part sizes might be preferable.

    - `UPLOAD_CONNECTION_TIMEOUT` This variable sets the timeout duration for establishing a connection to the object storage service during the upload process. It is measured in milliseconds (ms). Adjusting the connection timeout allows for fine-tuning the application's tolerance for network latency and variability.        

    #### Keycloak Variables

    - **Authentication Configuration**: Specifies the authentication server provider (`Keycloak`), the Keycloak server's host (`http://keycloak:8080`), and the realm (`myrealm`) that contains the users and roles. This setup is crucial for securing applications by directing them to the correct Keycloak instance and realm for authentication and authorization processes.

    - **Token and Client Details**: Defines the token name (`apiKey`), client ID (`dms`), and the client secret configured in your `.env.score` used for authentication. These elements are essential for establishing a secure connection between the application and the Keycloak server, ensuring that only authorized applications can access protected resources.

    - **Scope Definitions**: Outlines the scopes for study, download, and upload operations, specifying prefixes and suffixes that indicate the level of access granted to the token holder. These scopes are critical for defining the permissions associated with the tokens, controlling what actions can be performed by the authenticated users.

    - **Introspection and JWT Validation**: Provides the URL for checking the validity of a token (`http://keycloak:8080/realms/myrealm/apikey/check_api_key/`) and the location of the JSON Web Key Set (JWS) for validating JWT tokens (`http://keycloak:8080/realms/myrealm/protocol/openid-connect/certs`). These mechanisms ensure that tokens are valid and have not been tampered with, maintaining the security of the authentication process.

    </details>

2. **Run Score:** Use the docker run command with the `--env-file` option:

    ```bash
    docker run -d \
    --name score \
    --platform linux/amd64 \
    -p 8087:8087 \
    --env-file .env.score \
    ghcr.io/overture-stack/score-server:latest
    ```

    :::info
    The `score` container will now expose the file transfer API on port `8087`.
    :::

:::note
If you have not already deployed MinIO or Song, return to [Song](/deploy/deployment/song) for the required backend services.
:::
