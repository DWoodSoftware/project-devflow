import { useEffect, useState } from "react";

import { AppState } from "../components/common/AppState/AppState";

import type { DashboardSummary } from "../domain/dashboard/DashboardSummary";
import { MockDashboardRepository } from "../repositories/dashboard/MockDashboardRepository";
import { DashboardService } from "../services/dashboard/DashboardService";

import { DashboardMetricCard } from "../components/dashboard/DashboardMetricCard/DashboardMetricCard";
import { AttentionPanel } from "../components/dashboard/AttentionPanel/AttentionPanel";
import { ActiveProjectsPanel } from "../components/dashboard/ActiveProjectsPanel/ActiveProjectsPanel";
import { NextReleasePanel } from "../components/dashboard/NextReleasePanel/NextReleasePanel";

import "../styles/DashboardPage.css"

const dashboardService = new DashboardService(
  new MockDashboardRepository(),
);

export function DashboardPage() {
  const [dashboard, setDashboard] =
    useState<DashboardSummary | null>(null);

  const [error, setError] =
    useState<Error | null>(null);

  useEffect(() => {
    dashboardService
      .getSummary()
      .then(setDashboard)
      .catch((caughtError: unknown) => {
        setError(
          caughtError instanceof Error
            ? caughtError
            : new Error("Failed to load dashboard"),
        );
      });
  }, []);

  if (error) {
    return (
      <AppState
        variant="error"
        title="Well, that's inconvenient."
        message="We couldn't load your dashboard. The good news is your code probably didn't cause this one."
        action={{
          label: "Try again",
          onClick: () => window.location.reload(),
        }}
      />
    );
  }

  if (!dashboard) {
    return (
      <AppState
        variant="loading"
        title="Getting the gears turning…"
        message="Pulling together projects, pipelines and everything currently on fire."
      />
    );
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

      <NextReleasePanel
        release={dashboard.nextRelease}
      />
    </section>
  );
}