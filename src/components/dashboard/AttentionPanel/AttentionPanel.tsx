import type { AttentionItem } from "../../../domain/dashboard/AttentionItem";

import "./AttentionPanel.css";

interface AttentionPanelProps {
  items: readonly AttentionItem[];
}

export function AttentionPanel({
  items,
}: AttentionPanelProps) {
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