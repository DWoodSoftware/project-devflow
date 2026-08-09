import type { ProjectIntegration } from "../../../domain/integrations/ProjectIntegration";

import "./ConnectedIntegrationsPanel.css";

interface ConnectedIntegrationsPanelProps {
  integrations: readonly ProjectIntegration[];

  onDisconnect: (
    integrationId: string,
  ) => void;

  onReconnect: (
    integrationId: string,
  ) => void;

  onDelete: (
    integrationId: string,
  ) => void;
}

export function ConnectedIntegrationsPanel({
  integrations,
  onDisconnect,
  onReconnect,
  onDelete,
}: ConnectedIntegrationsPanelProps) {
  return (
    <section className="connected-integrations-panel">
      <header className="connected-integrations-panel__header">
        <div>
          <span className="connected-integrations-panel__eyebrow">
            Active connections
          </span>

          <h2>Connected integrations</h2>
        </div>

        <span className="connected-integrations-panel__count">
          {integrations.length}
        </span>
      </header>

      <div className="connected-integrations-panel__list">
        {integrations.map((integration) => (
          <article
            key={integration.id}
            className="connected-integrations-panel__item"
          >
            <div className="connected-integrations-panel__identity">
              <strong>{integration.name}</strong>
              <span>{integration.providerId}</span>
            </div>

            <div className="connected-integrations-panel__capabilities">
              {integration.capabilities.map((capability) => (
                <span key={capability}>
                  {capability}
                </span>
              ))}
            </div>

            <div className="connected-integrations-panel__controls">
              <span
                className="connected-integrations-panel__status"
                data-status={integration.status}
              >
                {integration.status}
              </span>

              {integration.status === "connected" && (
                <button
                  type="button"
                  onClick={() =>
                    onDisconnect(integration.id)
                  }
                >
                  Disconnect
                </button>
              )}

              {integration.status === "disconnected" && (
                <button
                  type="button"
                  onClick={() =>
                    onReconnect(integration.id)
                  }
                >
                  Reconnect
                </button>
              )}

              <button
                type="button"
                className="connected-integrations-panel__delete"
                onClick={() =>
                  onDelete(integration.id)
                }
              >
                Delete
              </button>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}