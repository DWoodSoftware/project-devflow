import type {
  IntegrationProvider,
} from "../../../domain/integrations/IntegrationProvider";

import { ProviderListItem } from "../ProviderListItem/ProviderListItem";

import "./AvailableIntegrationsPanel.css";

interface AvailableIntegrationsPanelProps {
  providers: readonly IntegrationProvider[];

  onSelectProvider: (
    provider: IntegrationProvider,
  ) => void;
}

export function AvailableIntegrationsPanel({
  providers,
  onSelectProvider,
}: AvailableIntegrationsPanelProps) {
  return (
    <section className="available-integrations-panel">
      <header className="available-integrations-panel__header">
        <div>
          <span className="available-integrations-panel__eyebrow">
            Provider catalogue
          </span>

          <h2>Available integrations</h2>

          <p>
            Connect services to expand the parts of your
            development lifecycle DevFlow can automate.
          </p>
        </div>

        <span className="available-integrations-panel__count">
          {providers.length}
        </span>
      </header>

      <div className="available-integrations-panel__list">
        {providers.map((provider) => (
          <ProviderListItem
            key={provider.id}
            provider={provider}
            onSelect={onSelectProvider}
          />
        ))}
      </div>
    </section>
  );
}