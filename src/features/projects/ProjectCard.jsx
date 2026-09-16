import { useId, useState } from "react";

const ProjectImage = ({ image, imageAlt, title }) => (
  <div className="project-image">
    <img src={image} alt={imageAlt ?? title} />
  </div>
);

const ProjectLinks = ({ github, website, news, children }) => {
  if (!github && !website && !news && !children) return null;

  return (
    <div className="project-links" aria-label="Project links">
      {github && (
        <a href={github} target="_blank" rel="noreferrer">
          <img src="/images/icons/technologies/github.svg" alt="" />
          GitHub
          <span aria-hidden="true">↗</span>
        </a>
      )}
      {website && (
        <a href={website} target="_blank" rel="noreferrer">
          Live demo <span aria-hidden="true">↗</span>
        </a>
      )}
      {news && (
        <a href={news} target="_blank" rel="noreferrer">
          News <span aria-hidden="true">↗</span>
        </a>
      )}
      {children}
    </div>
  );
};

const Subproject = ({ subproject }) => {
  const images = subproject.images ?? [];

  return (
    <article className="subproject-card">
      <div className="subproject-copy">
        <h3>{subproject.title}</h3>
        <p>{subproject.description}</p>
      </div>
      {images.length > 0 && (
        <div className={`subproject-images${images.length > 1 ? " subproject-images--pair" : ""}`}>
          {images.map(({ src, alt }) => (
            <img
              key={src}
              className="subproject-image"
              src={src}
              alt={alt ?? subproject.title}
              loading="lazy"
            />
          ))}
        </div>
      )}
    </article>
  );
};

const ProjectCard = ({ project }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const detailsId = useId();
  const hasSubprojects = project.subprojects?.length > 0;

  return (
    <article className="project-card">
      <ProjectImage
        image={project.image}
        imageAlt={project.imageAlt}
        title={project.title}
      />

      <div className="project-content">
        <h2>{project.title}</h2>
        <p>{project.summary}</p>

        {project.skills?.length > 0 && (
          <ul className="project-tags" aria-label="Skills and technologies">
            {project.skills.map((skill) => (
              <li key={skill}>{skill}</li>
            ))}
          </ul>
        )}

        <ProjectLinks github={project.github} website={project.website} news={project.news}>
          {hasSubprojects && (
            <button
              className="project-expand-button"
              type="button"
              aria-expanded={isExpanded}
              aria-controls={detailsId}
              aria-label={`${isExpanded ? "Collapse" : "Explore"} ${project.title} details`}
              onClick={() => setIsExpanded((expanded) => !expanded)}
            >
              <span>More Details</span>
              <svg aria-hidden="true" viewBox="0 0 24 24">
                <path d="m6 9 6 6 6-6" />
              </svg>
            </button>
          )}
        </ProjectLinks>
      </div>
      {hasSubprojects && (
        <div
          id={detailsId}
          className={`project-details${isExpanded ? " is-expanded" : ""}`}
          aria-hidden={!isExpanded}
          inert={!isExpanded}
        >
          <div className="project-details-inner">
            <div className="subproject-group" role="group" aria-label={`${project.title} components`}>
              {project.subprojects.map((subproject) => (
                <Subproject key={subproject.title} subproject={subproject} />
              ))}
            </div>
          </div>
        </div>
      )}
    </article>
  );
};

export default ProjectCard;
