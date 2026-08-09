import type { DashboardSummary } from "../../domain/dashboard/DashboardSummary";
import { mockDashboardSummary } from "../../mocks/dashboard";
import type { DashboardRepository } from "./DashboardRepository";

export class MockDashboardRepository
  implements DashboardRepository
{
  public async getSummary(): Promise<DashboardSummary> {
    return structuredClone(mockDashboardSummary);
  }
}