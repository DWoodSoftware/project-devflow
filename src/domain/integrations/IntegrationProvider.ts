import type { Capability } from "../capabilities/Capability";

export type IntegrationProviderId =
  | "github"
  | "gitlab"
  | "bitbucket"
  | "azure-devops"
  | "app-store-connect"
  | "google-play-console"
  | "custom-webhook";

export type IntegrationCategory =
  | "source-control"
  | "distribution"
  | "custom";

export interface IntegrationProvider {
  id: IntegrationProviderId;
  name: string;
  description: string;

  category: IntegrationCategory;

  capabilities: readonly Capability[];

  supportsMultipleConnections: boolean;
}