# Getting Started

Welcome to the Overture platform guides. Here you'll find comprehensive information on deploying and using Overture microservices as an integrated platform.

Our guides currently cover the following key areas:

- **[Deployment](./01-deployment-guide/)**: Step-by-step instructions for deploying our platform from start to finish.
- **[Administration](./02-administration-guides/)**: Detailed guides for customizing and managing your platform.
- **[Data Submission](./03-user-guides/01-cli-submissions.md)**: Instructions for submitting data to the platform.
- **[Data Download](./03-user-guides/02-cli-downloads.md)**: Guidelines for retrieving data from the platform.

:::tip Help us make our guides better
If you can't find what you're looking for please reach out to us on our Slack channel linked on the top right of your screen or by email at contact@overture.bio
:::

## Quick Start Guide

For a rapid, hassle-free setup of the Overture data platform on your local machine, follow these steps:

1. **Set Up Docker:** Install or update to Docker Desktop version 4.32.0 or higher. Visit [Docker's website](https://www.docker.com/products/docker-desktop/) for installation details.

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

   | OS | Command |
   |----|---------|
   | Unix/macOS | `make platform` |
   | Windows | `make.bat platform` |

    This will deploy the following services in Docker:

    ![Overture Platform Architecture](./images/platform.svg 'Overture Platform')