import type {
  IntegrationProvider,
} from "../../../domain/integrations/IntegrationProvider";

import "./ProviderListItem.css";

interface ProviderListItemProps {
  provider: IntegrationProvider;
  onSelect: (
    provider: IntegrationProvider,
  ) => void;
}

export function ProviderListItem({
  provider,
  onSelect,
}: ProviderListItemProps) {
  return (
    <button
      type="button"
      className="provider-list-item"
      onClick={() => onSelect(provider)}
    >
      <strong className="provider-list-item__name">
        {provider.name}
      </strong>

      <div className="provider-list-item__capabilities">
        {provider.capabilities.map((capability) => (
          <span key={capability.id}>
            {capability.name}
          </span>
        ))}
      </div>

      <span
        className="provider-list-item__open"
        aria-hidden="true"
      >
        ›
      </span>
    </button>
  );
}