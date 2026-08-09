// src/domain/dashboard/AttentionItem.ts

export type AttentionItemType =
  | "ci-failure"
  | "qa-required"
  | "review-required"
  | "blocked";

export interface AttentionItem {
  id: string;
  projectId: string;
  projectName: string;

  title: string;
  type: AttentionItemType;

  createdAt: string;
}