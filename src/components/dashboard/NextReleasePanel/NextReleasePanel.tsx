import type { ReleaseSummary } from "../../../domain/dashboard/ReleaseSummary";
import { AppState } from "../../common/AppState/AppState";

import "./NextReleasePanel.css";

interface NextReleasePanelProps {
  release: ReleaseSummary | null;
}

export function NextReleasePanel({
  release,
}: NextReleasePanelProps) {
  if (!release) {
    return (
      <AppState
        variant="empty"
        title="Nothing waiting at the gate."
        message="There's no release being prepared yet. Once work clears QA, it'll show up here."
      />
    );
  }
  return (
    <section className="next-release-panel">
      <header className="next-release-panel__header">
        <div>
          <span className="next-release-panel__eyebrow">
            Release pipeline
          </span>

          <h2>Next release</h2>
        </div>

        <span className="next-release-panel__version">
          {release.version}
        </span>
      </header>

      <div className="next-release-panel__body">
        <div className="next-release-panel__project">
          <span>Project</span>
          <strong>{release.projectName}</strong>
        </div>

        <dl className="next-release-panel__stats">
          <div>
            <dt>Issues</dt>
            <dd>{release.issueCount}</dd>
          </div>

          <div>
            <dt>Pull requests</dt>
            <dd>{release.pullRequestCount}</dd>
          </div>

          <div>
            <dt>Awaiting QA</dt>
            <dd>{release.qaPendingCount}</dd>
          </div>
        </dl>

        <div className="next-release-panel__status">
          <span
            className="next-release-panel__status-dot"
            data-ready={release.qaPendingCount === 0}
          />

          <span>
            {release.qaPendingCount === 0
              ? "Ready for release"
              : `${release.qaPendingCount} QA gate${
                  release.qaPendingCount === 1 ? "" : "s"
                } remaining`}
          </span>
        </div>
      </div>
    </section>
  );
}