import { useEffect, useState } from "react";

import type { DashboardSummary } from "../domain/dashboard/DashboardSummary";
import { MockDashboardRepository } from "../repositories/dashboard/MockDashboardRepository";
import { DashboardService } from "../services/dashboard/DashboardService";

import { DashboardMetricCard } from "../components/dashboard/DashboardMetricCard/DashboardMetricCard";
import { AttentionPanel } from "../components/dashboard/AttentionPanel/AttentionPanel";
import { ActiveProjectsPanel } from "../components/dashboard/ActiveProjectsPanel/ActiveProjectsPanel";

import "../styles/DashboardPage.css"

const dashboardService = new DashboardService(
  new MockDashboardRepository(),
);

export function DashboardPage() {
  const [dashboard, setDashboard] =
    useState<DashboardSummary | null>(null);

  useEffect(() => {
    dashboardService
      .getSummary()
      .then(setDashboard);
  }, []);

  if (!dashboard) {
    return <p>Loading dashboard...</p>;
  }

  return (
    <section className="dashboard">
      <header className="dashboard__header">
        <div>
          <p className="dashboard__eyebrow">
            Overview
          </p>

          <h1>Dashboard</h1>

          <p>
            Here's what needs your attention.
          </p>
        </div>
      </header>

      <section
        className="dashboard__metrics"
        aria-label="Work summary"
      >
        <DashboardMetricCard 
          label="In Progress"
          value={dashboard.metrics.inProgress}
          accent="cobalt"
        />

        <DashboardMetricCard 
          label="Waiting QA"
          value={dashboard.metrics.awaitingQa}
          accent="orange"
        />

        <DashboardMetricCard 
          label="Release Ready"
          value={dashboard.metrics.releaseReady}
          accent="cobalt"
        />
      </section>

      <AttentionPanel
        items={dashboard.attentionItems}
      />

      <ActiveProjectsPanel
        projects={dashboard.activeProjects}
      />

      {dashboard.nextRelease && (
        <section className="dashboard__section">
          <header>
            <h2>Next release</h2>
          </header>

          <article>
            <strong>
              {dashboard.nextRelease.version}
            </strong>

            <span>
              {dashboard.nextRelease.projectName}
            </span>

            <p>
              {dashboard.nextRelease.issueCount} issues ·{" "}
              {dashboard.nextRelease.pullRequestCount} PRs ·{" "}
              {dashboard.nextRelease.qaPendingCount} awaiting QA
            </p>
          </article>
        </section>
      )}
    </section>
  );
}