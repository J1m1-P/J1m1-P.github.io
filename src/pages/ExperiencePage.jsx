import { experience, site } from "../content/site.js";

const ExperiencePage = () => (
  <section className="standard-page padding-x-lg">
    <header className="page-heading">
      <p className="eyebrow">{site.experience.eyebrow}</p>
      <h1>{site.experience.title}</h1>
      <p>{site.experience.description}</p>
    </header>

    <div className="info-grid">
      {experience.map((entry) => (
        <article className="info-card" key={`${entry.organization}-${entry.title}`}>
          <p className="info-meta">{entry.period}</p>
          <h2>{entry.title}</h2>
          <h3>{entry.organization}</h3>
          <p>{entry.description}</p>
        </article>
      ))}
    </div>
  </section>
);

export default ExperiencePage;
