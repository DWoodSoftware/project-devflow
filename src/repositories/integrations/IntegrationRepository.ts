import type {
  IntegrationProvider,
  IntegrationProviderId,
} from "../../domain/integrations/IntegrationProvider";

import type { CapabilityId } from "../../domain/capabilities/Capability";

import type {
  ProjectIntegration,
} from "../../domain/integrations/ProjectIntegration";

export interface CreateProjectIntegrationInput {
  projectId: string;
  providerId: IntegrationProviderId;
  name: string;
  capabilities?: readonly CapabilityId[];
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

  reconnectProjectIntegration(
    integrationId: string,
  ): Promise<ProjectIntegration>;
}