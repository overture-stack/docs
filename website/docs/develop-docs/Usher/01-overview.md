# Overview

Usher is the access policy system for Overture. It defines what data a person can access and what actions they can perform; the applications it serves then enforce those decisions for each request.

:::important
**This overview and the worked examples describe backend functionality:** specifically how permissions are represented, evaluated, and enforced. Designing how users interact with those functions and sustainably maintain their policies is the next step, briefly outlined in [Permission Management](04-permission-management.md).
:::

### The problem Usher solves

Different users may be allowed to access different data or perform different actions on the same data. Those permissions must be applied consistently wherever the data is served, including search results, counts, and downloads. When each application defines its own access rules, permissions become harder to keep aligned, change, and audit. Usher centralizes permission decisions so applications can enforce a shared policy as access is granted, changed, or revoked.

## Where Usher fits

Access control spans three responsibilities:

1. Establish identity through accounts and sign-in (**Keycloak**)
2. Determine permitted data and actions (**Usher**)
3. Enforce permissions on search and downloads (**Ushered Arranger**)

Usher holds the grants and the recipients' acceptance decisions. A permission interface would connect user actions to those backend operations. Keycloak is the initial identity provider. Keeping authorization separate allows Usher to integrate with other identity systems.

```mermaid
flowchart LR
    Researcher["Researcher"] -->|"1. Sign in"| Keycloak["Keycloak: identity"]
    Researcher -->|"2. Search request + identity token"| Arranger["Ushered Arranger: restrict results and counts"]
    Arranger -->|"3. Identity token"| Usher["Usher: determine permissions"]
    Keycloak -.->|"4. Public keys (JWKS)"| Usher
    PolicyDB[("Policy DB: grants and acceptance decisions")] -->|"5. Read grants"| Usher
    Usher -->|"6. Permissions token"| Arranger
    Arranger -->|"7. Query"| ES[("Data: ES index")]
    Arranger -->|"8. Results"| Researcher

    Admin["Admin"] --> PermissionUI["Permission Management Service (UI)"]
    PermissionUI --> Usher
    Usher --> PolicyDB

    classDef future fill:#ffcc80,stroke:#e65100,color:#4e2600,stroke-width:3px,stroke-dasharray: 5 5;
    class Admin,PermissionUI future
```

**The admin flow shown above is a planned next step, not part of the Usher specification.** The Permission Management Service (UI) and the admin's workflow through it are future design work outlined in [Permission Management](04-permission-management.md). Usher's specification defines the admin API and the underlying grant model that supports it. These capabilities enable a permission management UI and its workflows.
