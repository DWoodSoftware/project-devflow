import { capabilities } from "../capabilities/capabilities";
import type { IntegrationProvider } from "./IntegrationProvider";

export const integrationProviders = {
  github: {
    id: "github",
    name: "GitHub",
    description:
      "Connect repositories, pull requests, reviews, CI workflows and releases.",

    category: "source-control",

    capabilities: [
      capabilities.sourceControl,
      capabilities.ci,
      capabilities.releaseManagement,
    ],

    supportsMultipleConnections: false,
  },

  gitlab: {
    id: "gitlab",
    name: "GitLab",
    description:
      "Connect repositories, merge requests, pipelines and releases.",

    category: "source-control",

    capabilities: [
      capabilities.sourceControl,
      capabilities.ci,
      capabilities.releaseManagement,
    ],

    supportsMultipleConnections: false,
  },

  bitbucket: {
    id: "bitbucket",
    name: "Bitbucket",
    description:
      "Connect repositories, pull requests and pipeline activity.",

    category: "source-control",

    capabilities: [
      capabilities.sourceControl,
      capabilities.ci,
    ],

    supportsMultipleConnections: false,
  },

  azureDevOps: {
    id: "azure-devops",
    name: "Azure DevOps",
    description:
      "Connect repositories, pull requests, pipelines and release workflows.",

    category: "source-control",

    capabilities: [
      capabilities.sourceControl,
      capabilities.ci,
      capabilities.deployment,
      capabilities.releaseManagement,
    ],

    supportsMultipleConnections: false,
  },

  appStoreConnect: {
    id: "app-store-connect",
    name: "App Store Connect",
    description:
      "Track Apple application builds, review status and releases.",

    category: "distribution",

    capabilities: [
      capabilities.distribution,
      capabilities.releaseManagement,
    ],

    supportsMultipleConnections: false,
  },

  googlePlayConsole: {
    id: "google-play-console",
    name: "Google Play Console",
    description:
      "Track Android application builds, testing tracks and releases.",

    category: "distribution",

    capabilities: [
      capabilities.distribution,
      capabilities.releaseManagement,
    ],

    supportsMultipleConnections: false,
  },

  customWebhook: {
    id: "custom-webhook",
    name: "Custom Webhook",
    description:
      "Connect custom systems through inbound or outbound webhook events.",

    category: "custom",

    capabilities: [
      capabilities.webhook,
    ],

    supportsMultipleConnections: true,
  },
} as const satisfies Record<string, IntegrationProvider>;