import { site } from "../content/site.js";
import PageButton from "../components/PageButton.jsx";
// import SkillsSection from "../sections/SkillsSection.jsx";
import TechnologyStrip from "../sections/TechnologyStrip.jsx";

const AboutPage = () => (
  <>
    <section className="standard-page standard-page-compact padding-x-lg">
      <div className="about-layout">
        <header className="page-heading">
          <p className="eyebrow">{site.about.eyebrow}</p>
          <h1>{site.about.title}</h1>
          <p>{site.about.description}</p>
          <p>{site.about.details}</p>
          <p>{site.about.opportunity}</p>
          <PageButton
            className="about-projects-button"
            text="View Projects"
            to="/projects"
          />
        </header>
        <div className="about-photo">
          <img src="/images/myself/AboutMePic.png" alt="Jimmy Pan" />
        </div>
      </div>
      <TechnologyStrip />
    </section>
    {/* Re-enable this when the How I work section should return. */}
    {/* <SkillsSection /> */}
  </>
);

export default AboutPage;
