import type { DashboardSummary } from "../domain/dashboard/DashboardSummary";

export const mockDashboardSummary: DashboardSummary = {
  metrics: {
    inProgress: 4,
    awaitingQa: 2,
    releaseReady: 7,
  },

  attentionItems: [
    {
      id: "attention-1",
      projectId: "core-api",
      projectName: "Core API",
      title: "Authentication refresh",
      type: "ci-failure",
      createdAt: "2026-08-09T10:15:00Z",
    },

    {
      id: "attention-2",
      projectId: "billing",
      projectName: "Billing Platform",
      title: "Billing webhook",
      type: "qa-required",
      createdAt: "2026-08-09T09:40:00Z",
    },
  ],

  activeProjects: [
    {
      id: "core-api",
      name: "Core API",
      progress: 72,
      inProgressCount: 4,
      testingCount: 2,
      qaCount: 1,
    },

    {
      id: "mobile-app",
      name: "Mobile App",
      progress: 51,
      inProgressCount: 6,
      testingCount: 1,
      qaCount: 2,
    },

    {
      id: "internal-platform",
      name: "Internal Platform",
      progress: 84,
      inProgressCount: 2,
      testingCount: 1,
      qaCount: 0,
    },
  ],

  nextRelease: {
    id: "release-0.8.0",
    projectId: "core-api",
    projectName: "Core API",
    version: "v0.8.0",
    issueCount: 6,
    pullRequestCount: 4,
    qaPendingCount: 1,
  },
};