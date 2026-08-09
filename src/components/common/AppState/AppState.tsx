import "./AppState.css";

export type AppStateVariant =
  | "loading"
  | "error"
  | "empty"
  | "success";

interface AppStateAction {
  label: string;
  onClick: () => void;
}

interface AppStateProps {
  variant: AppStateVariant;
  title: string;
  message: string;
  action?: AppStateAction;
}

export function AppState({
  variant,
  title,
  message,
  action,
}: AppStateProps) {
  return (
    <section
      className="app-state"
      data-variant={variant}
      role={variant === "error" ? "alert" : "status"}
      aria-live="polite"
    >
      <div
        className="app-state__icon"
        aria-hidden="true"
      >
        {variant === "loading" && "↻"}
        {variant === "error" && "!"}
        {variant === "empty" && "◇"}
        {variant === "success" && "✓"}
      </div>

      <div className="app-state__content">
        <h2>{title}</h2>
        <p>{message}</p>

        {action && (
          <button
            type="button"
            onClick={action.onClick}
          >
            {action.label}
          </button>
        )}
      </div>
    </section>
  );
}