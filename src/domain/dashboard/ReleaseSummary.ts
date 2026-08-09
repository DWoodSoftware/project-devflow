// src/domain/dashboard/ReleaseSummary.ts

export interface ReleaseSummary {
  id: string;
  projectId: string;
  projectName: string;

  version: string;

  issueCount: number;
  pullRequestCount: number;
  qaPendingCount: number;
}