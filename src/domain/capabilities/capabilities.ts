import type { Capability } from "./Capability";

export const capabilities = {
  sourceControl: {
    id: "source-control",
    name: "Source control",
    description:
      "Provides repository, branch, commit, pull request and review activity.",
  },

  ci: {
    id: "ci",
    name: "Continuous integration",
    description:
      "Provides automated build, test and validation execution.",
  },

  deployment: {
    id: "deployment",
    name: "Deployment",
    description:
      "Provides deployment execution and environment status.",
  },

  distribution: {
    id: "distribution",
    name: "Distribution",
    description:
      "Provides application build distribution and release-channel state.",
  },

  observability: {
    id: "observability",
    name: "Observability",
    description:
      "Provides runtime health, errors, incidents and production telemetry.",
  },

  issueTracking: {
    id: "issue-tracking",
    name: "Issue tracking",
    description:
      "Provides external issue, ticket and work-item lifecycle information.",
  },

  notifications: {
    id: "notifications",
    name: "Notifications",
    description:
      "Provides outbound messaging, alerts and human approval requests.",
  },

  releaseManagement: {
    id: "release-management",
    name: "Release management",
    description:
      "Provides tagging, release creation, versioning and release metadata.",
  },

  webhook: {
    id: "webhook",
    name: "Webhook",
    description:
      "Provides generic inbound or outbound event connectivity.",
  },
} as const satisfies Record<string, Capability>;