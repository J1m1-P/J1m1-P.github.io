import { resume, site } from "../content/site.js";

const ResumePage = () => (
  <section className="standard-page padding-x-lg">
    <header className="page-heading">
      <p className="eyebrow">{site.resume.eyebrow}</p>
      <h1>{site.resume.title}</h1>
      <p>{site.resume.description}</p>
    </header>

    {resume.url ? (
      <a className="primary-link" href={resume.url} target="_blank" rel="noreferrer">
        Open resume <span aria-hidden="true">↗</span>
      </a>
    ) : (
      <p className="empty-state">{site.resume.emptyMessage}</p>
    )}
  </section>
);

export default ResumePage;
