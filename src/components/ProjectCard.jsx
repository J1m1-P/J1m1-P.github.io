const ProjectLinks = ({ website, repository }) => {
  if (!website && !repository) return null;

  return (
    <div className="project-links" aria-label="Project links">
      {website && (
        <a href={website} target="_blank" rel="noreferrer">
          Visit project <span aria-hidden="true">↗</span>
        </a>
      )}
      {repository && (
        <a href={repository} target="_blank" rel="noreferrer">
          Source <span aria-hidden="true">↗</span>
        </a>
      )}
    </div>
  );
};

const ProjectCard = ({ project }) => (
  <article className="project-card">
    <div
      className="project-image"
      style={{ backgroundColor: project.accent ?? "#151c2b" }}
    >
      <img src={project.image} alt={project.imageAlt ?? project.title} />
    </div>

    <div className="project-content">
      {project.tags?.length > 0 && (
        <ul className="project-tags" aria-label="Technologies">
          {project.tags.map((tag) => (
            <li key={tag}>{tag}</li>
          ))}
        </ul>
      )}
      <h3>{project.title}</h3>
      <p>{project.description}</p>
      <ProjectLinks
        website={project.website}
        repository={project.repository}
      />
    </div>
  </article>
);

export default ProjectCard;
