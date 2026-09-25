import { useId, useState } from "react";
import ProjectImageLightbox from "./ProjectImageLightbox.jsx";

const ProjectImage = ({ image, imageAlt, imageBackdrop, title }) => (
  <ProjectImageLightbox
    src={image}
    alt={imageAlt ?? title}
    triggerClassName={`project-image${imageBackdrop === "card" ? " project-image--card-background" : ""}`}
  />
);

const ProjectLinks = ({ github, githubVisible = true, website, news }) => {
  const visibleGithub = githubVisible ? github : null;

  if (!visibleGithub && !website && !news) return null;

  return (
    <div className="project-links" aria-label="Project links">
      {visibleGithub && (
        <a href={visibleGithub} target="_blank" rel="noreferrer">
          <img src="/images/icons/technologies/github.svg" alt="" />
          GitHub
          <span aria-hidden="true">↗</span>
        </a>
      )}
      {website && (
        <a href={website} target="_blank" rel="noreferrer">
          Website <span aria-hidden="true">↗</span>
        </a>
      )}
      {news && (
        <a href={news} target="_blank" rel="noreferrer">
          News <span aria-hidden="true">↗</span>
        </a>
      )}
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
            <ProjectImageLightbox
              key={src}
              src={src}
              alt={alt ?? subproject.title}
              triggerClassName="subproject-image-trigger"
              imageClassName="subproject-image"
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
        imageBackdrop={project.imageBackdrop}
        title={project.title}
      />

      <div className="project-content">
        <div className="project-card-main">
          <h2>{project.title}</h2>
          <p>{project.summary}</p>
        </div>

        {project.skills?.length > 0 && (
          <ul className="project-tags" aria-label="Skills and technologies">
            {project.skills.map((skill) => (
              <li key={skill}>{skill}</li>
            ))}
          </ul>
        )}

        <div className="project-actions project-card-actions">
          <ProjectLinks
            github={project.github}
            githubVisible={project.githubVisible}
            website={project.website}
            news={project.news}
          />
          {hasSubprojects && (
            <button
              className="project-expand-button"
              type="button"
              aria-expanded={isExpanded}
              aria-controls={detailsId}
              aria-label={`${isExpanded ? "Collapse" : "Explore"} ${project.title} details`}
              onClick={() => setIsExpanded((expanded) => !expanded)}
            >
              <span>{isExpanded ? "Hide Details" : "More Details"}</span>
              <svg aria-hidden="true" viewBox="0 0 24 24">
                <path d="m6 9 6 6 6-6" />
              </svg>
            </button>
          )}
        </div>
      </div>
      {hasSubprojects && (
        <div
          id={detailsId}
          className={`project-details${isExpanded ? " is-expanded" : ""}`}
          aria-hidden={!isExpanded}
          inert={!isExpanded}
        >
          <div className="project-details-inner">
            <div
              className={`subproject-group${project.detailsLayout === "two-column-grid" ? " subproject-group--two-column-grid" : ""}`}
              role="group"
              aria-label={`${project.title} components`}
            >
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
