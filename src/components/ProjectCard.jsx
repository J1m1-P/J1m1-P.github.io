import { useState } from "react";

const ProjectImage = ({ image, imageAlt, title, accent }) => {
  const [imageFailed, setImageFailed] = useState(false);
  const showImage = image && !imageFailed;

  return (
    <div
      className={`project-image${showImage ? "" : " project-image--empty"}`}
      style={{ backgroundColor: accent ?? "#151c2b" }}
    >
      {showImage ? (
        <img
          src={image}
          alt={imageAlt ?? title}
          onError={() => setImageFailed(true)}
        />
      ) : (
        <div
          className="project-image-placeholder"
          aria-label="Project image not available"
        >
          <svg aria-hidden="true" viewBox="0 0 24 24">
            <rect x="3" y="3" width="18" height="18" rx="2" />
            <circle cx="8.5" cy="8.5" r="1.5" />
            <path d="m4 17 5-5 4 4 2-2 5 5" />
          </svg>
          <span>Project image coming soon</span>
        </div>
      )}
    </div>
  );
};

const ProjectLinks = ({ github, website, news }) => {
  if (!github && !website && !news) return null;

  return (
    <div className="project-links" aria-label="Project links">
      {github && (
        <a href={github} target="_blank" rel="noreferrer">
          <img src="/images/skills/skill-logo-github.svg" alt="" />
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
    </div>
  );
};

const ProjectCard = ({ project }) => (
  <article className="project-card">
    <ProjectImage
      image={project.image}
      imageAlt={project.imageAlt}
      title={project.title}
      accent={project.accent}
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

      <ProjectLinks
        github={project.github}
        website={project.website}
        news={project.news}
      />
    </div>
  </article>
);

export default ProjectCard;
