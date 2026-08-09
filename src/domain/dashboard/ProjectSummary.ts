// src/domain/dashboard/ProjectSummary.ts

export interface ProjectSummary {
  id: string;
  name: string;

  progress: number;

  inProgressCount: number;
  testingCount: number;
  qaCount: number;
}