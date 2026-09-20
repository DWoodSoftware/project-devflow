# DevFlow

DevFlow is a personal engineering project exploring a fairly simple question:

> **What would it look like if the entire development lifecycle was visible as one coherent system?**

The long-term idea is a development-cycle control surface that can pull together work across repositories and services: issues, blockers, dependencies, pull requests, releases, automation, integrations and the relationships between them.

Not another monitoring dashboard.

Not another CI viewer.

The interesting problem is understanding **how work moves through a software project**, what is preventing it from moving, and where useful parts of that process can be automated.

---

## Why this exists

Modern development workflows are fragmented.

A single piece of work might involve:

```text
issue tracker
    ↓
branch
    ↓
commits
    ↓
pull request
    ↓
dependent / stacked pull requests
    ↓
review
    ↓
CI
    ↓
release
    ↓
deployment
```

The actual state of the project is spread across all of those systems.

DevFlow is an attempt to model that lifecycle explicitly and eventually answer questions such as:

```text
What work is currently active?

What is blocked?

What is it blocked by?

Which issues or PRs depend on one another?

Which PRs form part of a stack?

What is ready to move forwards?

What requires human attention?

What could safely be automated?

What does the next release actually depend on?
```

The goal is not to replace every development tool.

It is to build a layer that understands how those tools and their data relate to the development process.

---

# Project state

DevFlow is **actively experimental**.

The current codebase contains working UI, domain models, service boundaries and repository abstractions, but much of the application is still backed by mock repositories rather than live integrations.

For that reason, a visible interface does **not** mean the associated feature is complete.

Feature status is tracked conservatively using:

| State         | Meaning                                                                                    |
| ------------- | ------------------------------------------------------------------------------------------ |
| `PLANNED`     | Intended feature with no meaningful implementation yet                                     |
| `IN-PROGRESS` | Some meaningful implementation exists, but the feature is not yet complete end-to-end      |
| `COMPLETED`   | Implemented end-to-end and considered functionally complete for its current intended scope |
| `CANCELLED`   | Intentionally abandoned or removed from the planned direction                              |

A feature should only move to `COMPLETED` when the underlying behaviour works, not merely because a UI exists.

---

## Current feature lifecycle

| Feature                        | State         | Current reality                                                                                                             |
| ------------------------------ | ------------- | --------------------------------------------------------------------------------------------------------------------------- |
| Application shell / navigation | `IN-PROGRESS` | Core layout and navigation structure exist, but several destination pages remain placeholders                               |
| Dashboard overview             | `IN-PROGRESS` | Working dashboard UI, domain models, service layer and repository abstraction exist; currently backed by mock data          |
| Dashboard metrics              | `IN-PROGRESS` | In-progress, QA and release-ready metrics are rendered from the dashboard model, but no real project data source exists yet |
| Attention / blocker surface    | `IN-PROGRESS` | Attention items can be represented and displayed, but blocker/dependency intelligence is not yet implemented                |
| Active project overview        | `IN-PROGRESS` | UI and summary representation exist; no live project ingestion yet                                                          |
| Next-release overview          | `IN-PROGRESS` | Release summary UI exists against mock dashboard data; release lifecycle integration is not implemented                     |
| Capability model               | `IN-PROGRESS` | Capabilities such as source control, CI, deployment, issue tracking and release management are explicitly modelled          |
| Integration provider model     | `IN-PROGRESS` | Providers and project integrations are modelled separately from capabilities                                                |
| Integration management UI      | `IN-PROGRESS` | Providers can be viewed, connected, disconnected, reconnected and deleted through the current mock repository               |
| Capability coverage UI         | `IN-PROGRESS` | Connected integrations can be evaluated against modelled capabilities, currently using mock-backed integration state        |
| Real provider integrations     | `PLANNED`     | No production provider implementation currently exists                                                                      |
| GitHub integration             | `PLANNED`     | Intended source-control / issue / PR provider; not yet implemented                                                          |
| Project ingestion              | `PLANNED`     | No live repository/project connection flow exists yet                                                                       |
| Issue lifecycle view           | `PLANNED`     | Intended to expose work items and their lifecycle across connected projects                                                 |
| Blocker / dependency graph     | `PLANNED`     | Intended to model relationships between issues, branches and pull requests                                                  |
| Stacked pull request modelling | `PLANNED`     | Intended to show dependent PR chains and their impact on delivery flow                                                      |
| Work / developer view          | `PLANNED`     | Route exists, current page is only a placeholder                                                                            |
| Projects view                  | `PLANNED`     | Route exists, current page is only a placeholder                                                                            |
| Releases view                  | `PLANNED`     | Route exists, current page is only a placeholder                                                                            |
| Automation engine              | `PLANNED`     | Route exists, current page is only a placeholder                                                                            |
| Webhook-driven updates         | `PLANNED`     | Intended as part of the provider/event architecture                                                                         |
| Development-cycle automation   | `PLANNED`     | Intended to identify and execute safe automatable lifecycle actions                                                         |

---

# Current architecture

The current application is deliberately separating domain concepts from the eventual external systems that provide them.

```text
UI
 ↓
services
 ↓
repository interfaces
 ↓
provider / persistence implementations
```

At the moment, the final layer is predominantly:

```text
MockDashboardRepository
MockIntegrationRepository
```

That is intentional scaffolding rather than finished infrastructure.

It lets the application model and UI evolve without prematurely coupling the product to GitHub, Jira, CI vendors or any particular external system.

---

## Capabilities before providers

One of the central ideas in DevFlow is that the application should care about **capabilities**, not hard-code its worldview around particular vendors.

The current domain includes capabilities such as:

```text
source control
continuous integration
deployment
distribution
observability
issue tracking
notifications
release management
webhooks
```

An integration provider can then satisfy one or more of those capabilities.

Conceptually:

```text
CAPABILITY
source-control
      │
      ├── GitHub
      ├── GitLab
      └── another provider later
```

rather than:

```text
application
    ↓
GitHub-specific logic everywhere
```

That makes it possible to swap or combine providers without redefining what the application itself is trying to understand.

---

# Intended direction

The project is moving towards a model where DevFlow can build a connected view of the development lifecycle.

At a high level:

```text
repositories
    ↓
issues ───────────────┐
    ↓                 │
branches              │
    ↓                 │
pull requests         │
    ↓                 │
reviews               │
    ↓                 │
CI                    │
    ↓                 │
releases              │
                      ↓
              dependency graph
                      ↓
               lifecycle state
                      ↓
             attention / automation
```

The important part is not merely displaying each object.

The value comes from understanding the **relationships between them**.

A blocked pull request is useful information.

Knowing that it is blocked because another PR depends on an issue whose acceptance criteria have changed is considerably more useful.

---

# What this project is trying to prove

DevFlow is partly a tool I want for myself and partly an engineering exercise in turning development-process knowledge into software.

It touches several problems I find interesting:

* lifecycle and workflow modelling;
* dependency graphs;
* repository and issue metadata;
* stacked changes;
* automation boundaries;
* event-driven integrations;
* provider abstraction;
* developer experience;
* release management;
* turning fragmented technical state into something understandable.

It is deliberately being built in public rather than waiting until every architectural question has already been answered.

---

# Technology

Current implementation:

```text
React
TypeScript
Vite
React Router
```

The repository is currently frontend-heavy because the project is still establishing its domain and interaction model.

Provider implementations, persistence and real external integrations will be introduced as those boundaries become clearer.

---

# Repository structure

```text
src/
├── components/
│   ├── dashboard/
│   ├── integrations/
│   └── common/
│
├── domain/
│   ├── capabilities/
│   ├── dashboard/
│   └── integrations/
│
├── repositories/
│   ├── dashboard/
│   └── integrations/
│
├── services/
│   ├── dashboard/
│   └── integrations/
│
├── pages/
├── layouts/
├── mocks/
└── styles/
```

The current structure is intended to keep UI concerns separate from domain concepts and data-source implementations.

---

# Running locally

```bash
npm install
npm run dev
```

---

# Status philosophy

This README is intended to stay honest.

A polished component backed entirely by mock data is not a completed feature.

A repository interface without a real provider is not a completed integration.

A button that changes local state is not evidence that the underlying development workflow exists.

The status table above should evolve with the codebase and remain deliberately conservative.

If something says `COMPLETED`, it should mean the feature actually works for the scope described.

---

# Long-term shape

The eventual goal is a system capable of answering:

```text
What is happening?

What is blocked?

Why is it blocked?

What depends on what?

What can move next?

What requires me?

What can the system handle itself?
```

If DevFlow can answer those questions reliably across a real software project, it is doing its job.
