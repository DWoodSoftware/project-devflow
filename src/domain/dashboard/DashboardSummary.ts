// src/domain/dashboard/DashboardSummary.ts

import type { AttentionItem } from "./AttentionItem";
import type { ProjectSummary } from "./ProjectSummary";
import type { ReleaseSummary } from "./ReleaseSummary";

export interface DashboardMetrics {
  inProgress: number;
  awaitingQa: number;
  releaseReady: number;
}

export interface DashboardSummary {
  metrics: DashboardMetrics;

  attentionItems: readonly AttentionItem[];
  activeProjects: readonly ProjectSummary[];

  nextRelease: ReleaseSummary | null;
}