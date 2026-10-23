---
title: Overview
sidebar_position: 1
description: Usher's authorization model, application integrations, and scope. Permission UIs and data access control workflows are built separately.
---

# Overview

:::info Development status and scope
Usher is in the design phase. These pages describe its planned authorization functionality. **Permission management UIs and data access control workflows are separate applications built on Usher.** Each data service also requires an integration to enforce permissions.
:::

Usher is an authorization service for Overture, designed to manage which data a user can access and which actions they can perform. It centralizes access policy so integrated applications can apply the same permissions to search, counts, exports, and downloads.

Authentication remains with the identity provider. Access approval workflows belong to the applications built on Usher, while data services enforce the resulting permissions through their integrations.

## Documentation

| Page | Description |
| --- | --- |
| **Overview** | Usher's purpose, architecture, and scope. |
| [Concrete Technical Example](02-concrete-technical-example.md) | A worked example of data mappings, grants, permissions, and query filtering. |
| [User and Project Requirements](03-user-project-requirements.md) | User stories, project requirements, and acceptance criteria. |
| [Building Applications on Usher](04-building-applications.md) | Integrations and workflows for permission management and data access control. |

## Permission Model

The permission model uses four main concepts:

- **Resource:** A collection of records, such as a study or dataset.
- **Category:** A named subset of data within a resource.
- **Role:** A defined set of permitted actions.
- **Grant:** An assignment of a role to a recipient for a resource and category.

Usher records grants and recipient acceptance decisions, calculates effective permissions, and supports revocation. The model is declarative: a policy describes who can perform which actions on which data. Application integrations translate those declarations into filters and authorization checks for their own schemas and APIs.

## System Architecture

| Layer | Responsibility |
| --- | --- |
| **Identity provider**, initially Keycloak | Authenticates users and handles sign-in. Other identity providers require their own integration. |
| **Usher authorization service** | Manages resources, roles, grants, and recipient decisions; checks management authority; calculates permissions and processes revocations. |
| **Shared bridge and application adapters** | Retrieve and validate permissions, keep them current, and apply them to service requests. Arranger filters search results and counts; file services check downloads separately. |
| **Permission management UI** | Provides workflows for administrators, stewards, and recipients to grant, review, accept, decline, and revoke access. Developed separately from Usher. |
| **Data access control service** | Manages requests, reviews, agreements, notifications, and renewals, translating approvals into Usher operations. Developed separately from Usher. |

Each service must enforce permissions on its API, including requests made outside the portal. UI controls and permission declarations depend on these service integrations to protect the data.

## Scope and Limitations

The initial integration covers the Usher service, shared bridge, and Arranger enforcement. Sharing dashboards, recipient interfaces, and access approval workflows require additional application development.

Projects can use the model to define open, registered, and controlled access. These are configurable policy patterns. Signing in alone does not grant controlled access; each project defines which resources are available to which users.

The examples cover whole records. Field masking, sharing cohorts defined by arbitrary search queries, and access to data snapshots from a specific date require further design and integration. Revocation applies to subsequent access and cannot remove copies already downloaded.

See [User and Project Requirements](03-user-project-requirements.md) for acceptance criteria and [Building Applications on Usher](04-building-applications.md) for the application workflows and integrations.
