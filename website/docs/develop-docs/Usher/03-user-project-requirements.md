---
title: User and Project Requirements
sidebar_position: 3
description: Usher user stories and project requirements, distinguishing what Usher supports from the value-added software integrating applications must build.
---

# User and Project Requirements

:::info Development status and scope
These requirements describe planned functionality. **Usher manages authorization; permission management UIs and data access control workflows are developed separately.** Stories involving screens, notifications, submission, or approval require those application integrations.
:::

These requirements capture Usher's core user stories. Each story describes the behavior Usher itself must support, and the additional, value-added software an integrating application must build to deliver the full story.

## User Stories

| User story | What Usher supports | What applications must build |
| --- | --- | --- |
| **U1 · Consumer: browse open data.** I can explore and download open data without signing in. | Anonymous search returns only the configured open records and their counts. Direct export/download requests enforce the same scope. | Search and file integrations enforce baseline permissions; the portal supports anonymous use. |
| **U2 · Consumer: use controlled data.** I see only data I have been granted. | Signing in alone does not expose a controlled study. Approved records appear only after required acceptance. Other controlled records do not appear as locked entries, in counts, or in facets. | Every serving API applies authorization before returning data or aggregates. |
| **U3 · Consumer: understand and accept access.** I can verify my permissions and explicitly accept or decline an invitation. | Pending and declined invitations confer no access. Acceptance activates only the offered scope. The user can see their permissions and the grant details they are authorized to view. | A recipient interface, identity resolution, invitations, and notifications; access rules for grant history still need to be defined. |
| **U4 · Steward: share and review.** I can share my data by email and answer “who can see this?” | An authorized steward can create a scoped grant and inspect grants and stewards on their resource. An unrelated user cannot perform these management operations. | A permission UI resolves recipients and displays scope, acceptance state, and stewardship clearly. |
| **U5 · Steward: end access.** I can revoke access when a collaboration ends. | Updated permissions exclude the revoked grant, including for active sessions and regardless of other grants still in effect. Revocation timing is enforced consistently. | Cache invalidation, enforcement at each API, and user notifications. |
| **U6 · Steward: delegate stewardship.** I can delegate stewardship when people change roles. | An authorized steward can add or transfer stewardship. Removing the final steward is prevented or handled by an explicitly authorized recovery process. | Delegation and account-removal workflows, with safeguards and an audit history. |
| **U7 · Submitter: classify and stay in scope.** I can set access levels during submission and contribute only to my assigned studies. | Controlled data is not exposed before its policy is established. Submission to an unassigned study is denied. In iMS, submission establishes the intended stewardship. | Submission UI and service integration. Automatic stewardship is configured as iMS project policy. |
| **U8 · System administrator: set up the platform.** I can create resources and assign submitters without becoming a data steward. | Administrators can create resources and assign submitters within their authority. Administrative status alone does not grant routine access to read or share controlled data. Recovery actions are authorized and recorded. | An admin UI and account lifecycle integration. The project must define authority for exceptional access and stewardship recovery. |
| **U9 · Integrating application: enforce consistently.** I can use one policy source for search, counts, exports, and direct API access. | Each integrated API allows and denies access consistently for the same user and scope, including requests made outside the UI. | Service-specific mappings and enforcement adapters. The bridge caches permissions and keeps them current, avoiding a network call to Usher on every request. |
| **U10 · Operator: handle failures and reconstruct decisions.** I can explain access changes and avoid exposing protected data during an authorization outage. | Invalid identity and unavailable authorization cannot widen controlled access, including when the revocation channel itself fails. Grant, acceptance, revocation, and enforcement records can support an investigation. | Failure handling, logging, retention, monitoring, and an interface for reviewing audit records. |

## Project Requirements

| Project | What Usher supports | What applications must build |
| --- | --- | --- |
| **iMS** | Steward-led sharing, explicit recipient acceptance, submission-linked stewardship, and scoped data access. | Map study identifiers across submission, search, and file services; implement the user workflows; test the scenario above end to end. |
| **PCGL** | Reuse the authorization model with a potentially different identity system; support the shared consumer, steward, and administrator stories. | Define the identity integration, resource boundaries, approval authority, and test scenarios. Support for an alternative identity provider requires a connector. |
| **ARGO** | Apply authorization to Arranger searches over controlled data. | Define resource and category mappings and test enforcement across results, counts, facets, and exports. |
| **OHCRN** | Apply the shared access-control stories in its project context. | Define the data scope, user roles, approval process, and acceptance scenarios. Detailed project policy remains to be specified. |

Each project requires its own policy configuration and integration. Study-based and attribute-based approvals can both produce scoped grants. The review workflow belongs to the data access control application built on Usher.

## Scope and Dependencies

Usher is designed to provide a reusable authorization model with consistent enforcement across integrated applications. Integration tests should cover allowed and denied requests, grant changes, and authorization failures.

Permission administration, access-request forms, committee review, agreements, notifications, renewals, and audit reporting require separate applications. Each project must define its authority rules, revocation timing, supported APIs, and workflows.

Field-level restrictions, sharing cohorts defined by arbitrary queries, and access to data snapshots from a specific date require further development. These capabilities are outside the first-release scope described here.

See the [technical example](02-concrete-technical-example.md) for policy and mapping details, and [Building Applications on Usher](04-building-applications.md) for application requirements.
