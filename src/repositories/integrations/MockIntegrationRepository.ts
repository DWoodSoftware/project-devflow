import type { IntegrationProvider } from "../../domain/integrations/IntegrationProvider";
import type { ProjectIntegration } from "../../domain/integrations/ProjectIntegration";
import { integrationProviders } from "../../domain/integrations/integrationProviders";
import { mockProjectIntegrations } from "../../mocks/integrations";

import type {
  CreateProjectIntegrationInput,
  IntegrationRepository,
} from "./IntegrationRepository";

export class MockIntegrationRepository
  implements IntegrationRepository
{
  private integrations: ProjectIntegration[];

  public constructor() {
    this.integrations = structuredClone(
      mockProjectIntegrations,
    );
  }

  public async getProviders(): Promise<
    readonly IntegrationProvider[]
  > {
    return Object.values(integrationProviders);
  }

  public async getProjectIntegrations(
    projectId: string,
  ): Promise<readonly ProjectIntegration[]> {
    return structuredClone(
      this.integrations.filter(
        (integration) =>
          integration.projectId === projectId,
      ),
    );
  }

  public async createProjectIntegration(
    input: CreateProjectIntegrationInput,
  ): Promise<ProjectIntegration> {
    const provider =
      integrationProviders[
        this.getProviderKey(input.providerId)
      ];

    const now = new Date().toISOString();

    const integration: ProjectIntegration = {
      id: crypto.randomUUID(),
      projectId: input.projectId,
      providerId: input.providerId,
      name: input.name,
      status: "connected",

      capabilities:
        provider.capabilities.map(
          (capability) => capability.id,
        ),

      createdAt: now,
      updatedAt: now,
    };

    this.integrations.push(integration);

    return structuredClone(integration);
  }

  public async disconnectProjectIntegration(
    integrationId: string,
  ): Promise<ProjectIntegration> {
    const integration =
      this.findIntegration(integrationId);

    integration.status = "disconnected";
    integration.updatedAt =
      new Date().toISOString();

    return structuredClone(integration);
  }

  public async deleteProjectIntegration(
    integrationId: string,
  ): Promise<void> {
    const index =
      this.integrations.findIndex(
        (integration) =>
          integration.id === integrationId,
      );

    if (index === -1) {
      throw new Error(
        `Integration "${integrationId}" not found`,
      );
    }

    this.integrations.splice(index, 1);
  }

  private findIntegration(
    integrationId: string,
  ): ProjectIntegration {
    const integration =
      this.integrations.find(
        (candidate) =>
          candidate.id === integrationId,
      );

    if (!integration) {
      throw new Error(
        `Integration "${integrationId}" not found`,
      );
    }

    return integration;
  }

  private getProviderKey(
    providerId: CreateProjectIntegrationInput["providerId"],
  ): keyof typeof integrationProviders {
    const entry =
      Object.entries(integrationProviders)
        .find(
          ([, provider]) =>
            provider.id === providerId,
        );

    if (!entry) {
      throw new Error(
        `Provider "${providerId}" not found`,
      );
    }

    return entry[0] as keyof typeof integrationProviders;
  }
}