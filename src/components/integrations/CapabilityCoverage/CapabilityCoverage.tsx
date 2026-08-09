import { capabilities } from "../../../domain/capabilities/capabilities";
import type { ProjectIntegration } from "../../../domain/integrations/ProjectIntegration";

import "./CapabilityCoverage.css";

interface CapabilityCoverageProps {
  integrations: readonly ProjectIntegration[];
}

export function CapabilityCoverage({
  integrations,
}: CapabilityCoverageProps) {
  const fulfilledCapabilities = new Set(
    integrations
      .filter(
        (integration) =>
          integration.status === "connected",
      )
      .flatMap(
        (integration) =>
          integration.capabilities,
      ),
  );

  const visibleCapabilities = Object.values(
    capabilities,
  ).filter(
    (capability) =>
      capability.id !== "webhook",
  );

  const fulfilledCount =
    visibleCapabilities.filter(
      (capability) =>
        fulfilledCapabilities.has(
          capability.id,
        ),
    ).length;

  return (
    <section className="capability-coverage">
      <header className="capability-coverage__header">
        <div>
          <span className="capability-coverage__eyebrow">
            Automation coverage
          </span>

          <h2>Workflow capabilities</h2>

          <p>
            See which parts of your development
            lifecycle DevFlow can currently handle.
          </p>
        </div>

        <div className="capability-coverage__summary">
          <strong>{fulfilledCount}</strong>

          <span>
            of {visibleCapabilities.length} covered
          </span>
        </div>
      </header>

      <div className="capability-coverage__grid">
        {visibleCapabilities.map(
          (capability) => {
            const fulfilled =
              fulfilledCapabilities.has(
                capability.id,
              );

            return (
              <article
                key={capability.id}
                className="capability-coverage__item"
                data-fulfilled={fulfilled}
              >
                <span
                  className="capability-coverage__indicator"
                  aria-hidden="true"
                >
                  {fulfilled ? "✓" : "○"}
                </span>

                <div>
                  <strong>
                    {capability.name}
                  </strong>

                  <span>
                    {fulfilled
                      ? "Automation available"
                      : "Human input required"}
                  </span>
                </div>
              </article>
            );
          },
        )}
      </div>
    </section>
  );
}