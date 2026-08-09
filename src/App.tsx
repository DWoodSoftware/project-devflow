import {
  Navigate,
  Route,
  Routes,
} from "react-router-dom";

import { AppLayout } from "./layouts/AppLayout";
import { AutomationsPage } from "./pages/AutomationsPage";
import { DashboardPage } from "./pages/DashboardPage";
import { IntegrationsPage } from "./pages/IntegrationsPage";
import { MyWorkPage } from "./pages/MyWorkPage";
import { ProjectsPage } from "./pages/ProjectsPage";
import { ReleasesPage } from "./pages/ReleasesPage";
import { SettingsPage } from "./pages/SettingsPage";

export default function App() {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route
          index
          element={<Navigate to="/dashboard" replace />}
        />

        <Route
          path="/dashboard"
          element={<DashboardPage />}
        />

        <Route
          path="/projects"
          element={<ProjectsPage />}
        />

        <Route
          path="/my-work"
          element={<MyWorkPage />}
        />

        <Route
          path="/releases"
          element={<ReleasesPage />}
        />

        <Route
          path="/automations"
          element={<AutomationsPage />}
        />

        <Route
          path="/integrations"
          element={<IntegrationsPage />}
        />

        <Route
          path="/settings"
          element={<SettingsPage />}
        />
      </Route>
    </Routes>
  );
}