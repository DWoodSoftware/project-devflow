import { useEffect, useState } from "react";

import type { IntegrationProvider } from "../domain/integrations/IntegrationProvider";
import type { ProjectIntegration } from "../domain/integrations/ProjectIntegration";

import { MockIntegrationRepository } from "../repositories/integrations/MockIntegrationRepository";
import { IntegrationService } from "../services/integrations/IntegrationService";

import { CapabilityCoverage } from "../components/integrations/CapabilityCoverage/CapabilityCoverage";
import { ConnectedIntegrationsPanel } from "../components/integrations/ConnectedIntegrationsPanel/ConnectedIntegrationsPanel";
import { AvailableIntegrationsPanel } from "../components/integrations/AvailableIntegrationsPanel/AvailableIntegrationsPanel";
import { ProviderDetailsModal } from "../components/integrations/ProviderDetailsModal/ProviderDetailsModal";

const integrationService = new IntegrationService(
  new MockIntegrationRepository(),
);

const MOCK_PROJECT_ID = "project-devflow";

export function IntegrationsPage() {
  const [providers, setProviders] =
    useState<readonly IntegrationProvider[]>([]);

  const [integrations, setIntegrations] =
    useState<readonly ProjectIntegration[]>([]);

  const [selectedProvider, setSelectedProvider] =
    useState<IntegrationProvider | null>(null);

  useEffect(() => {
    Promise.all([
      integrationService.getProviders(),
      integrationService.getProjectIntegrations(
        MOCK_PROJECT_ID,
      ),
    ]).then(([loadedProviders, loadedIntegrations]) => {
      setProviders(loadedProviders);
      setIntegrations(loadedIntegrations);
    });
  }, []);

  
  const handleDisconnect = async (
    integrationId: string,
  ) => {
    await integrationService.disconnectProjectIntegration(
      integrationId,
    );

    const updatedIntegrations =
        await integrationService.getProjectIntegrations(
          MOCK_PROJECT_ID,
        );

      setIntegrations(updatedIntegrations);
    };

  const handleSelectProvider = (
    provider: IntegrationProvider,
  ) => {
    setSelectedProvider(provider);
  };

  const handleConnectProvider = async (
    provider: IntegrationProvider,
  ) => {
    await integrationService.createProjectIntegration({
      projectId: MOCK_PROJECT_ID,
      providerId: provider.id,
      name: provider.name,
    });

    const updatedIntegrations =
      await integrationService.getProjectIntegrations(
        MOCK_PROJECT_ID,
      );

    setIntegrations(updatedIntegrations);
    setSelectedProvider(null);
  };

  const handleDelete = async (
    integrationId: string,
  ) => {
    await integrationService.deleteProjectIntegration(
      integrationId,
    );

    const updatedIntegrations =
      await integrationService.getProjectIntegrations(
        MOCK_PROJECT_ID,
      );

    setIntegrations(updatedIntegrations);
  };

  const handleReconnect = async (
    integrationId: string,
  ) => {
    await integrationService.reconnectProjectIntegration(
      integrationId,
    );

    const updatedIntegrations =
      await integrationService.getProjectIntegrations(
        MOCK_PROJECT_ID,
      );

    setIntegrations(updatedIntegrations);
  };

  const availableProviders = providers.filter((provider) => {
    if (provider.supportsMultipleConnections) {
      return true;
    }

    return !integrations.some(
      (integration) =>
        integration.providerId === provider.id,
    );
  });

  return (
    <section className="integrations-page">
      <header className="integrations-page__header">
        <p>Workspace connectivity</p>
        <h1>Integrations</h1>

        <p>
          Connect the services that power your development
          and delivery workflow.
        </p>
      </header>

      <CapabilityCoverage
        integrations={integrations}
      />

      <ConnectedIntegrationsPanel
        integrations={integrations}
        onDisconnect={handleDisconnect}
        onReconnect={handleReconnect}
        onDelete={handleDelete}
      />

      <AvailableIntegrationsPanel
        providers={availableProviders}
        onSelectProvider={handleSelectProvider}
      />

      {selectedProvider && (
        <ProviderDetailsModal
          provider={selectedProvider}
          onClose={() => setSelectedProvider(null)}
          onConnect={handleConnectProvider}
        />
      )}

    </section>
  );
}