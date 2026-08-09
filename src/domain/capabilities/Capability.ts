export type CapabilityId =
  | "source-control"
  | "ci"
  | "deployment"
  | "distribution"
  | "observability"
  | "issue-tracking"
  | "notifications"
  | "release-management"
  | "webhook";

export interface Capability {
  id: CapabilityId;
  name: string;
  description: string;
}