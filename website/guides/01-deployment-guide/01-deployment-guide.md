# Deployment Guide

## Introduction

- **This guide is for** anyone seeking guidance on how to deploy an Overture platform

- **You will need** Docker, we recommend using Docker Desktop version `4.39.0` or higher. If you already have Docker installed, please ensure it's up to date. For more information see, [Docker's website here](https://www.docker.com/products/docker-desktop/).

  :::important
  **Note:** Ensure enough resources get allocated to Docker. We recommend a minimum CPU limit of `8`, memory limit of `8 GB`, swap of `2 GB`, and virtual disk limit of `64 GB`. You can access these settings by selecting the **cog wheel** found on the top right of the Docker desktop app and selecting **resources** from the left panel. **If you already have docker desktop installed, ensure you are on version 4.39.0 or higher**.
  :::

  :::tip File Management
  To simplify managing your configuration files, create a folder (e.g., `localOverturePlatform`) as the root directory of your project. All commands should be run from this directory.
  :::

## Overview

This guide provides a step-by-step deployment of an Overture platform, including configuration details and explanations. It is divided into three setup segments:

1.  **Authorization** using Keycloak

2.  **Data Management & Storage** using Song and Score

3.  **Search Portal setup** using Maestro, Arranger and Stage

    ![Platform Overview](../images/platform.svg "Platform Overview")

    A summary of each Overture and third-party service used in this guide is detailed below:

        | Overture Services | Description                                                                                        |
        | ----------------- | -------------------------------------------------------------------------------------------------- |
        | **Song**          | Our metadata management service with automated submission validation system.                       |
        | **Score**         | Our file transfer microservice that supports fault-tolerant multi-part parallel transfer.          |
        | **Maestro**       | Our indexing service for transforming metadata in Song into an Elasticsearch search index.         |
        | **Arranger**      | Our search API and UI component generation services.                                               |
        | **Stage**         | Our React-based user interface designed to allow easy deployment of data portals.                  |

        | Third Party Services | Description                                                                                     |
        | -------------------- | ----------------------------------------------------------------------------------------------- |
        | **Keycloak**         | A highly regarded open-source identity and access management (IAM) service developed by Red Hat.|
        | **Postgres**         | A free and open-source relational database management system.                                   |
        | **Minio**            | A high-performance open-source object storage provider.                                         |
        | **Kafka**            | The messaging system used to enable asynchronous communication between Song and Maestro.        |
        | **Elasticsearch**    | A search and analytics engine used to help query massive datasets flexibly and efficiently.     |

    :::info Do you have a specific deployment scenario?
    Due to the variety of possible deployment scenarios (notably cloud servers and object storage providers) we are providing a generalized and reproducible deployment of an Overture platform running on your local machine. If you require further assistance with server deployments customized to your specific needs, our team can help. Feel free to reach out to us at contact@overture.bio for personalized consultation.
    :::
