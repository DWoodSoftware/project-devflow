import type { DashboardSummary } from "../../domain/dashboard/DashboardSummary";
import type { DashboardRepository } from "../../repositories/dashboard/DashboardRepository";

export class DashboardService {
  private readonly repository: DashboardRepository;

  public constructor(
    repository: DashboardRepository,
  ) {
    this.repository = repository;
  }

  public async getSummary(): Promise<DashboardSummary> {
    return this.repository.getSummary();
  }
}