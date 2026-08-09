import type {
  IntegrationProvider,
  IntegrationProviderId,
} from "../../domain/integrations/IntegrationProvider";

import type {
  ProjectIntegration,
} from "../../domain/integrations/ProjectIntegration";

export interface CreateProjectIntegrationInput {
  projectId: string;
  providerId: IntegrationProviderId;
  name: string;
}

export interface IntegrationRepository {
  getProviders(): Promise<readonly IntegrationProvider[]>;

  getProjectIntegrations(
    projectId: string,
  ): Promise<readonly ProjectIntegration[]>;

  createProjectIntegration(
    input: CreateProjectIntegrationInput,
  ): Promise<ProjectIntegration>;

  disconnectProjectIntegration(
    integrationId: string,
  ): Promise<ProjectIntegration>;

  deleteProjectIntegration(
    integrationId: string,
  ): Promise<void>;
}