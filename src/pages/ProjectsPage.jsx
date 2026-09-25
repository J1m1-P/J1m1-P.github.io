import { useState } from "react";
import PageButton from "../components/ui/PageButton.jsx";
import ProjectCard from "../features/projects/ProjectCard.jsx";
import SecondaryProjectCard, {
  SecondaryProjectDetails,
} from "../features/projects/SecondaryProjectCard.jsx";
import { projects } from "../content/projects.js";
import { site } from "../content/site.js";

const ProjectsPage = () => {
  const [expandedProjectId, setExpandedProjectId] = useState(null);
  const featuredProjects = projects.filter(({ tier }) => tier === "featured");
  const secondaryProjects = projects.filter(({ tier }) => tier === "secondary");
  const secondaryProjectRows = [];

  for (let index = 0; index < secondaryProjects.length; index += 2) {
    secondaryProjectRows.push(secondaryProjects.slice(index, index + 2));
  }

  return (
    <section className="projects-page padding-x-lg">
      <header className="page-heading">
        <p className="eyebrow">{site.projects.pageEyebrow}</p>
        <h1>{site.projects.pageTitle}</h1>
        <p>{site.projects.pageDescription}</p>
        <PageButton
          className="projects-experience-button"
          text="View My Experience"
          to="/experience"
        />
      </header>

      <section className="featured-projects" aria-labelledby="featured-projects-title">
        <div className="projects-section-heading">
          <p className="eyebrow">Selected work</p>
          <h2 id="featured-projects-title">Featured Projects</h2>
        </div>

        <div className="projects-grid">
          {featuredProjects.map((project) => (
            <ProjectCard project={project} key={project.id} />
          ))}
        </div>
      </section>

      {secondaryProjects.length > 0 && (
        <section className="more-projects" aria-labelledby="more-projects-title">
          <div className="projects-section-heading">
            <p className="eyebrow">Additional work</p>
            <h2 id="more-projects-title">More Projects</h2>
          </div>
          <div className="secondary-projects-grid">
            {secondaryProjectRows.map((row, rowIndex) => {
              const expandedIndex = row.findIndex(({ id }) => id === expandedProjectId);
              const detailProject = expandedIndex >= 0 ? row[expandedIndex] : row[0];
              const anchor = expandedIndex === 1 ? "right" : "left";
              const detailsId = `secondary-project-details-row-${rowIndex}`;

              return (
                <div
                  className={`secondary-project-row secondary-project-row--anchor-${anchor}`}
                  key={row.map(({ id }) => id).join("-")}
                >
                  {row.map((project, columnIndex) => (
                    <SecondaryProjectCard
                      key={project.id}
                      project={project}
                      revealIndex={(rowIndex * 2) + columnIndex}
                      earlyReveal={(rowIndex * 2) + columnIndex >= 2}
                      isExpanded={expandedProjectId === project.id}
                      detailsId={detailsId}
                      onToggle={() => setExpandedProjectId((currentId) => (
                        currentId === project.id ? null : project.id
                      ))}
                    />
                  ))}
                  <SecondaryProjectDetails
                    project={detailProject}
                    detailsId={detailsId}
                    isExpanded={expandedIndex >= 0}
                    anchor={anchor}
                  />
                </div>
              );
            })}
          </div>
        </section>
      )}
    </section>
  );
};

export default ProjectsPage;
