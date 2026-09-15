import PageButton from "../components/PageButton.jsx";
import ProjectCard from "../components/ProjectCard.jsx";
import { projects } from "../content/projects.js";
import { site } from "../content/site.js";

const ProjectsPage = () => (
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

    <div className="projects-grid">
      {projects.map((project) => (
        <ProjectCard project={project} key={project.id} />
      ))}
    </div>
  </section>
);

export default ProjectsPage;
