import { useEffect, useState } from "react";

import type { IntegrationProvider } from "../domain/integrations/IntegrationProvider";
import type { ProjectIntegration } from "../domain/integrations/ProjectIntegration";

import { MockIntegrationRepository } from "../repositories/integrations/MockIntegrationRepository";
import { IntegrationService } from "../services/integrations/IntegrationService";

import { CapabilityCoverage } from "../components/integrations/CapabilityCoverage/CapabilityCoverage";

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

      <section>
        <h2>Connected</h2>

        {integrations.map((integration) => (
          <article key={integration.id}>
            <strong>{integration.name}</strong>
            <span>{integration.providerId}</span>
            <span>{integration.status}</span>
          </article>
        ))}
      </section>

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