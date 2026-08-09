import { useState } from "react";

import type { CapabilityId } from "../../../domain/capabilities/Capability";
import { capabilities } from "../../../domain/capabilities/capabilities";
import type { IntegrationProvider } from "../../../domain/integrations/IntegrationProvider";

import "./ProviderDetailsModal.css";

interface ProviderDetailsModalProps {
  provider: IntegrationProvider;
  onClose: () => void;
  onConnect: (
    provider: IntegrationProvider,
    capabilities?: readonly CapabilityId[],
  ) => void;
}

export function ProviderDetailsModal({
  provider,
  onClose,
  onConnect,
}: ProviderDetailsModalProps) {
  const isCustomWebhook =
    provider.id === "custom-webhook";

  const [selectedCapabilities, setSelectedCapabilities] =
    useState<CapabilityId[]>(["webhook"]);

  const selectableCapabilities =
    Object.values(capabilities).filter(
      (capability) =>
        capability.id !== "webhook",
    );

  const toggleCapability = (
    capabilityId: CapabilityId,
  ) => {
    setSelectedCapabilities((current) =>
      current.includes(capabilityId)
        ? current.filter(
            (id) => id !== capabilityId,
          )
        : [...current, capabilityId],
    );
  };

  return (
    <div
      className="provider-details-modal__backdrop"
      role="presentation"
      onClick={onClose}
    >
      <section
        className="provider-details-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="provider-details-title"
        onClick={(event) => event.stopPropagation()}
      >
        <header className="provider-details-modal__header">
          <div>
            <span className="provider-details-modal__category">
              {provider.category}
            </span>

            <h2 id="provider-details-title">
              {provider.name}
            </h2>
          </div>

          <button
            type="button"
            className="provider-details-modal__close"
            aria-label="Close provider details"
            onClick={onClose}
          >
            ×
          </button>
        </header>

        <div className="provider-details-modal__body">
          <p className="provider-details-modal__description">
            {provider.description}
          </p>

          <section>
            <h3>Capabilities</h3>

            <div className="provider-details-modal__capabilities">
              {provider.capabilities.map((capability) => (
                <article key={capability.id}>
                  <strong>{capability.name}</strong>

                  <span>
                    {capability.description}
                  </span>
                </article>
              ))}
            </div>
          </section>

          {isCustomWebhook && (
            <section className="provider-details-modal__capability-selector">
                <h3>Webhook capabilities</h3>

                <p>
                Choose which workflow capabilities this webhook
                should satisfy for automation.
                </p>

                <div className="provider-details-modal__capability-pills">
                {selectableCapabilities.map((capability) => {
                    const selected =
                    selectedCapabilities.includes(
                        capability.id,
                    );

                    return (
                    <button
                        key={capability.id}
                        type="button"
                        data-selected={selected}
                        onClick={() =>
                        toggleCapability(capability.id)
                        }
                    >
                        {capability.name}
                    </button>
                    );
                })}
                </div>
            </section>
            )}

          <div className="provider-details-modal__metadata">
            <span>
              {provider.supportsMultipleConnections
                ? "Supports multiple connections"
                : "Single connection per project"}
            </span>
          </div>
        </div>

        <footer className="provider-details-modal__footer">
          <button
            type="button"
            className="provider-details-modal__cancel"
            onClick={onClose}
          >
            Cancel
          </button>

          <button
            type="button"
            className="provider-details-modal__connect"
            onClick={() =>
                onConnect(
                    provider,
                    isCustomWebhook
                    ? selectedCapabilities
                    : undefined,
                )
            }
          >
            Connect {provider.name}
          </button>
        </footer>
      </section>
    </div>
  );
}