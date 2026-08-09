import type { ProjectSummary } from "../../../domain/dashboard/ProjectSummary";

import "./ActiveProjectsPanel.css";

interface ActiveProjectsPanelProps {
  projects: readonly ProjectSummary[];
}

export function ActiveProjectsPanel({
  projects,
}: ActiveProjectsPanelProps) {
  return (
    <section className="active-projects-panel">
      <header className="active-projects-panel__header">
        <div>
          <span className="active-projects-panel__eyebrow">
            Current workload
          </span>

          <h2>Active projects</h2>
        </div>

        <span className="active-projects-panel__count">
          {projects.length}
        </span>
      </header>

      <div className="active-projects-panel__list">
        {projects.map((project) => (
          <article
            key={project.id}
            className="active-projects-panel__project"
          >
            <div className="active-projects-panel__project-header">
              <strong>{project.name}</strong>

              <span>
                {project.progress}%
              </span>
            </div>

            <div
              className="active-projects-panel__progress"
              role="progressbar"
              aria-label={`${project.name} progress`}
              aria-valuenow={project.progress}
              aria-valuemin={0}
              aria-valuemax={100}
            >
              <span
                style={{
                  width: `${project.progress}%`,
                }}
              />
            </div>

            <dl className="active-projects-panel__stats">
              <div>
                <dt>In progress</dt>
                <dd>{project.inProgressCount}</dd>
              </div>

              <div>
                <dt>Testing</dt>
                <dd>{project.testingCount}</dd>
              </div>

              <div>
                <dt>QA</dt>
                <dd>{project.qaCount}</dd>
              </div>
            </dl>
          </article>
        ))}
      </div>
    </section>
  );
}