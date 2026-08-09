import type { ProjectIntegration } from "../domain/integrations/ProjectIntegration";

export const mockProjectIntegrations: ProjectIntegration[] = [
  {
    id: "integration-github-1",
    projectId: "project-devflow",
    providerId: "github",
    name: "DevFlow GitHub",
    status: "connected",

    capabilities: [
      "source-control",
      "ci",
      "release-management",
    ],

    createdAt: "2026-08-09T10:00:00Z",
    updatedAt: "2026-08-09T10:00:00Z",
  },

  {
    id: "integration-webhook-1",
    projectId: "project-devflow",
    providerId: "custom-webhook",
    name: "Internal QA webhook",
    status: "connected",

    capabilities: [
      "webhook",
      "notifications",
    ],

    createdAt: "2026-08-09T10:15:00Z",
    updatedAt: "2026-08-09T10:15:00Z",
  },
];