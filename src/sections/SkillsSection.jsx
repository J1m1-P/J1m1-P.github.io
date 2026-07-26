import { site, skills } from "../content/site.js";

const SkillsSection = () => (
  <section id="skills" className="content-section padding-x-lg">
    <div className="section-heading">
      <p className="eyebrow">{site.skills.eyebrow}</p>
      <h2>{site.skills.title}</h2>
    </div>
    <div className="grid-3-cols">
      {skills.map(({ image, title, description }) => (
        <article key={title} className="feature-card">
          <img src={image} alt="" />
          <h3>{title}</h3>
          <p>{description}</p>
        </article>
      ))}
    </div>
  </section>
);

export default SkillsSection;
