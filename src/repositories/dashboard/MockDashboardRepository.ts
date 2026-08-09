import type { DashboardSummary } from "../../domain/dashboard/DashboardSummary";
import { mockDashboardSummary } from "../../mocks/dashboard";
import type { DashboardRepository } from "./DashboardRepository";

export type DashboardMockScenario =
  | "success"
  | "slow"
  | "error"
  | "empty";

export class MockDashboardRepository
  implements DashboardRepository
{
  private readonly scenario: DashboardMockScenario;

  public constructor(
    scenario: DashboardMockScenario = "success",
  ) {
    this.scenario = scenario;
  }

  public async getSummary(): Promise<DashboardSummary> {
    switch (this.scenario) {
      case "slow":
        await new Promise((resolve) => {
          window.setTimeout(resolve, 3000);
        });

        return structuredClone(mockDashboardSummary);

      case "error":
        throw new Error("Mock dashboard failure");

      case "empty":
        return {
          metrics: {
            inProgress: 0,
            awaitingQa: 0,
            releaseReady: 0,
          },

          attentionItems: [],
          activeProjects: [],
          nextRelease: null,
        };

      case "success":
      default:
        return structuredClone(mockDashboardSummary);
    }
  }
}