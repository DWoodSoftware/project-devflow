import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";

import { AppSidebar } from "../components/AppSidebar/AppSidebar";

import "../styles/AppLayout.css";

const MOBILE_BREAKPOINT = "(max-width: 48rem)";

export function AppLayout() {
  const [isMobile, setIsMobile] = useState(
    () => window.matchMedia(MOBILE_BREAKPOINT).matches,
  );

  const [sidebarCollapsed, setSidebarCollapsed] = useState(
    () => window.matchMedia(MOBILE_BREAKPOINT).matches,
  );

  useEffect(() => {
    const mediaQuery = window.matchMedia(MOBILE_BREAKPOINT);

    const handleBreakpointChange = (
      event: MediaQueryListEvent,
    ) => {
      setIsMobile(event.matches);
      setSidebarCollapsed(event.matches);
    };

    mediaQuery.addEventListener(
      "change",
      handleBreakpointChange,
    );

    return () => {
      mediaQuery.removeEventListener(
        "change",
        handleBreakpointChange,
      );
    };
  }, []);

  const sidebarOpenOnMobile =
    isMobile && !sidebarCollapsed;

  return (
    <div
      className="app-layout"
      data-sidebar-collapsed={sidebarCollapsed}
    >
      <AppSidebar
        collapsed={sidebarCollapsed}
        onToggle={() =>
          setSidebarCollapsed(
            (collapsed) => !collapsed,
          )
        }
      />

      {sidebarOpenOnMobile && (
        <button
          type="button"
          className="app-layout__backdrop"
          aria-label="Close navigation"
          onClick={() => setSidebarCollapsed(true)}
        />
      )}

      <main className="app-layout__content">
        <Outlet />
      </main>
    </div>
  );
}