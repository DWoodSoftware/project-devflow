import type {
  IntegrationProvider,
} from "../../domain/integrations/IntegrationProvider";

import type {
  ProjectIntegration,
} from "../../domain/integrations/ProjectIntegration";

import type {
  CreateProjectIntegrationInput,
  IntegrationRepository,
} from "../../repositories/integrations/IntegrationRepository";

export class IntegrationService {
  private readonly repository: IntegrationRepository;

  public constructor(
    repository: IntegrationRepository,
  ) {
    this.repository = repository;
  }

  public async getProviders(): Promise<
    readonly IntegrationProvider[]
  > {
    return this.repository.getProviders();
  }

  public async getProjectIntegrations(
    projectId: string,
  ): Promise<readonly ProjectIntegration[]> {
    return this.repository.getProjectIntegrations(
      projectId,
    );
  }

  public async createProjectIntegration(
    input: CreateProjectIntegrationInput,
  ): Promise<ProjectIntegration> {
    return this.repository.createProjectIntegration(
      input,
    );
  }

  public async disconnectProjectIntegration(
    integrationId: string,
  ): Promise<ProjectIntegration> {
    return this.repository.disconnectProjectIntegration(
      integrationId,
    );
  }

  public async deleteProjectIntegration(
    integrationId: string,
  ): Promise<void> {
    return this.repository.deleteProjectIntegration(
      integrationId,
    );
  }

  public async reconnectProjectIntegration(
    integrationId: string,
  ): Promise<ProjectIntegration> {
    return this.repository.reconnectProjectIntegration(
      integrationId,
    );
  }
}