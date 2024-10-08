# Maven Setup

For Java-based Overture services

## Prerequisites

Before you begin, ensure you have the following installed on your system:
- JDK version (e.g., JDK11)
- Docker (version X or higher)
- [Any other project-specific prerequisites]

## Developer Setup

This guide will walk you through setting up a complete development environment for [Software Name], including its complementary services.

### Setting up supporting services

We'll use Conductor to spin up [Software Name]'s complementary services.

1. Clone the Conductor repository and move into its directory:

    ```bash
    git clone [orchestration-tool-repo-url]
    cd [orchestration-tool-directory]
    ```

2. Run the appropriate start command for your operating system:

   | Operating System | Command         |
   |------------------|-----------------|
   | Unix/macOS       | `[unix-command]`|
   | Windows          | `[windows-command]` |


    <details>
    <summary>**Click here for a detailed breakdown**</summary>

    This command will set up all complementary services for [Software Name] development as follows:

    ![Dev Environment](../images/platform.svg '[Software Name] Dev Environment')

    | Service | Port | Description | Purpose in [Software Name] Development |
    |---------|------|-------------|----------------------------------------|
    | [Service 1] | [Port] | [Description] | [Purpose] |
    | [Service 2] | [Port] | [Description] | [Purpose] |
    | [Service 3] | [Port] | [Description] | [Purpose] |

    - Ensure all ports are free on your system before starting the environment.
    - You may need to adjust the ports in the configuration file if you have conflicts with existing services.

    For more information, see our Conductor documentation

    </details>

### Running the Development Server 

1. Clone [Software Name] and move into its directory:

    ```bash
    git clone [project-repo-url]
    cd [project-directory]
    ```

2. Build the application locally:

   ```bash
   ./mvnw clean install -DskipTests
   ```

    <details>
    <summary>**Click here for an explanation of the command above**</summary>

    - `./mvnw`: This is the Maven wrapper script, which ensures you're using the correct version of Maven.
    - `clean`: This removes any previously compiled files.
    - `install`: This compiles the project, runs tests, and installs the package into your local Maven repository.
    - `-DskipTests`: This flag skips running tests during the build process to speed things up.

    </details>

    :::tip
    Ensure you are running the correct JDK version. To check, you can run `java --version`. You should see something similar to the following:
    ```bash
    [Expected Java version output]
    ```
    :::

3. Start the [Software Name] Server:

   ```bash
   [command-to-start-server]
   ```
       :::info

            If you are looking to configure [Software Name] for your specific environment, **the server configuration file can be found here**. A summary of the available Spring profiles is provided below:

            <details>
            <summary>**Click here for a summary of the server spring profiles**</summary>

            **[Software Name] Profiles**
            | Profile | Description |
            |---------|-------------|
            | `[profile1]` | [Description] |
            | `[profile2]` | [Description] |
            | `[profile3]` | [Description] |

            </details>

        :::

### Verification

After installing and configuring [Software Name], verify that the system is functioning correctly:

1. **Check Server Health**
   ```bash
   [health-check-command]
   ```
   - Expected result: [Expected result]
   - Troubleshooting:
     - [Troubleshooting step 1]
     - [Troubleshooting step 2]

2. **Check the API Documentation**
   - Navigate to `[api-docs-url]` in a web browser
   - Expected result: [Expected result]
   - Troubleshooting:
     - [Troubleshooting step 1]
     - [Troubleshooting step 2]

3. **Test [Key API Endpoint]**
   - Using API Documentation UI:
     1. [Step 1]
     2. [Step 2]
     3. [Step 3]
   - Alternatively, use curl:
     ```bash
     [curl-command]
     ```
   - Expected result: [Expected result]

For further assistance, open an issue on GitHub.

:::warning
This guide is meant to demonstrate the configuration and usage of [Software Name] for development purposes and is not intended for production. If you ignore this warning and use this in any public or production environment, please remember to use appropriate Spring profiles and security measures.
:::