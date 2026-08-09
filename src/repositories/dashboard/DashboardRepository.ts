import type { DashboardSummary } from "../../domain/dashboard/DashboardSummary";

export interface DashboardRepository {
  getSummary(): Promise<DashboardSummary>;
}