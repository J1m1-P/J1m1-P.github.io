import { Link } from "react-router-dom";
import ProjectCard from "../components/ProjectCard.jsx";
import { projects } from "../content/projects.js";
import { site } from "../content/site.js";

const ProjectsPage = () => (
  <section className="projects-page padding-x-lg">
    <header className="page-heading">
      <p className="eyebrow">{site.projects.pageEyebrow}</p>
      <h1>{site.projects.pageTitle}</h1>
      <p>{site.projects.pageDescription}</p>
      <Link className="text-link" to="/">
        <span aria-hidden="true">←</span> Back to home
      </Link>
    </header>

    <div className="projects-grid">
      {projects.map((project) => (
        <ProjectCard project={project} key={project.id} />
      ))}
    </div>
  </section>
);

export default ProjectsPage;
