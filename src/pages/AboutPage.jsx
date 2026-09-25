import { site } from "../content/site.js";
import PageButton from "../components/ui/PageButton.jsx";
import TechnologyStrip from "../features/about/TechnologyStrip.jsx";

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
            text="View My Projects"
            to="/projects"
          />
        </header>
        <div className="about-photo">
          <img src="/images/about/profile.png" alt="Jimmy Pan" />
        </div>
      </div>
      <TechnologyStrip />
    </section>
  </>
);

export default AboutPage;
