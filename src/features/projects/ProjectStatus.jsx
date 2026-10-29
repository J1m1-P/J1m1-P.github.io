const statusLabels = {
  completed: "Completed",
  "in-progress": "In Progress",
};

const ProjectStatus = ({ status, indicatorOnly = false }) => {
  const label = statusLabels[status];

  if (!label) return null;

  return (
    <span
      className={`project-status project-status--${status}${indicatorOnly ? " project-status--indicator" : ""}`}
      role={indicatorOnly ? "img" : undefined}
      aria-label={indicatorOnly ? label : undefined}
      title={indicatorOnly ? label : undefined}
    >
      <span className="project-status-dot" aria-hidden="true" />
      {!indicatorOnly && label}
    </span>
  );
};

export default ProjectStatus;
