import { site } from "../content/site.js";
import SkillsSection from "../sections/SkillsSection.jsx";
import TechnologyStrip from "../sections/TechnologyStrip.jsx";

const AboutPage = () => (
  <>
    <section className="standard-page standard-page-compact padding-x-lg">
      <header className="page-heading">
        <p className="eyebrow">{site.about.eyebrow}</p>
        <h1>{site.about.title}</h1>
        <p>{site.about.description}</p>
        <p>{site.about.opportunity}</p>
      </header>
    </section>
    <SkillsSection />
    <TechnologyStrip />
  </>
);

export default AboutPage;
