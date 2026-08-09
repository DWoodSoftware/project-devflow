import "./DashboardMetricCard.css"

interface DashboardMetricCardProps {
  label: string;
  value: number;
  accent?: "cobalt" | "orange";
}

export function DashboardMetricCard({
  label,
  value,
  accent = "cobalt",
}: DashboardMetricCardProps) {
  return (
    <article
      className="dashboard-metric-card"
      data-accent={accent}
    >
      <span className="dashboard-metric-card__label">
        {label}
      </span>

      <strong className="dashboard-metric-card__value">
        {value}
      </strong>
    </article>
  );
}