import { useEffect, useState } from "react";

import type { IntegrationProvider } from "../domain/integrations/IntegrationProvider";
import type { ProjectIntegration } from "../domain/integrations/ProjectIntegration";

import { MockIntegrationRepository } from "../repositories/integrations/MockIntegrationRepository";
import { IntegrationService } from "../services/integrations/IntegrationService";

import { CapabilityCoverage } from "../components/integrations/CapabilityCoverage/CapabilityCoverage";
import { ConnectedIntegrationsPanel } from "../components/integrations/ConnectedIntegrationsPanel/ConnectedIntegrationsPanel";

const integrationService = new IntegrationService(
  new MockIntegrationRepository(),
);

const MOCK_PROJECT_ID = "project-devflow";

export function IntegrationsPage() {
  const [providers, setProviders] =
    useState<readonly IntegrationProvider[]>([]);

  const [integrations, setIntegrations] =
    useState<readonly ProjectIntegration[]>([]);

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
        onDelete={handleDelete}
      />

      <section>
        <h2>Available integrations</h2>

        {providers.map((provider) => (
          <article key={provider.id}>
            <strong>{provider.name}</strong>
            <p>{provider.description}</p>
          </article>
        ))}
      </section>
    </section>
  );
}