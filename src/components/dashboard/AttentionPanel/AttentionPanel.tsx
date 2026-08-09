import type { AttentionItem } from "../../../domain/dashboard/AttentionItem";
import { AppState } from "../../common/AppState/AppState";

import "./AttentionPanel.css";

interface AttentionPanelProps {
  items: readonly AttentionItem[];
}

export function AttentionPanel({
  items,
}: AttentionPanelProps) {
  if (items.length === 0) {
    return (
      <AppState
        variant="success"
        title="Nothing's on fire."
        message="No failed builds, blocked work or QA gates need your attention. Enjoy it while it lasts."
      />
    );
  }
  return (
    <section className="attention-panel">
      <header className="attention-panel__header">
        <div>
          <span className="attention-panel__eyebrow">
            Action required
          </span>

          <h2>Needs attention</h2>
        </div>

        <span className="attention-panel__count">
          {items.length}
        </span>
      </header>

      <div className="attention-panel__list">
        {items.map((item) => (
          <article
            key={item.id}
            className="attention-panel__item"
            data-type={item.type}
          >
            <div className="attention-panel__item-content">
              <span className="attention-panel__project">
                {item.projectName}
              </span>

              <strong>
                {item.title}
              </strong>
            </div>

            <span className="attention-panel__type">
              {item.type}
            </span>
          </article>
        ))}
      </div>
    </section>
  );
}