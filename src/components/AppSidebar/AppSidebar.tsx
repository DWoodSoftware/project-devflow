import { NavLink } from "react-router-dom";

import "./AppSidebar.css";

interface AppSidebarProps {
  collapsed: boolean;
  onToggle: () => void;
}

const navigation = [
  { label: "Dashboard", to: "/dashboard" },
  { label: "Projects", to: "/projects" },
  { label: "My Work", to: "/my-work" },
  { label: "Releases", to: "/releases" },
  { label: "Automations", to: "/automations" },
];

const secondaryNavigation = [
  { label: "Integrations", to: "/integrations" },
  { label: "Settings", to: "/settings" },
];

export function AppSidebar({
  collapsed,
  onToggle,
}: AppSidebarProps) {
  return (
    <aside
      className="app-sidebar"
      data-collapsed={collapsed}
    >
      <div className="app-sidebar__brand">
        {!collapsed && <strong>DevFlow</strong>}

        <button
          type="button"
          className="app-sidebar__collapse-toggle"
          onClick={onToggle}
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          aria-expanded={!collapsed}
        >
          {collapsed ? "›" : "‹"}
        </button>
      </div>

      <nav aria-label="Primary navigation">
        {navigation.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            title={collapsed ? item.label : undefined}
          >
            <span className="app-sidebar__nav-icon" aria-hidden="true">
              •
            </span>

            {!collapsed && (
              <span>{item.label}</span>
            )}
          </NavLink>
        ))}
      </nav>

      <nav aria-label="Configuration">
        {secondaryNavigation.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            title={collapsed ? item.label : undefined}
          >
            <span className="app-sidebar__nav-icon" aria-hidden="true">
              •
            </span>

            {!collapsed && (
              <span>{item.label}</span>
            )}
          </NavLink>
        ))}
      </nav>

      <div className="app-sidebar__footer">
        <button
          type="button"
          className="app-sidebar__theme-toggle"
          title={collapsed ? "Theme" : undefined}
        >
          <span className="app-sidebar__nav-icon" aria-hidden="true">
            ◐
          </span>

          {!collapsed && (
            <>
              <span>Theme</span>
              <span aria-hidden="true">Light</span>
            </>
          )}
        </button>
      </div>
    </aside>
  );
}