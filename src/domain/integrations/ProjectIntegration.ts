import type {
  CapabilityId,
} from "../capabilities/Capability";

import type {
  IntegrationProviderId,
} from "./IntegrationProvider";

export type IntegrationStatus =
  | "connected"
  | "disconnected"
  | "error"
  | "pending";

export interface ProjectIntegration {
  id: string;
  projectId: string;

  providerId: IntegrationProviderId;

  name: string;
  status: IntegrationStatus;

  capabilities: readonly CapabilityId[];

  createdAt: string;
  updatedAt: string;
}