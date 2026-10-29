import { useState } from "react";
import PageButton from "../components/ui/PageButton.jsx";
import { experiences } from "../content/experiences.js";
import { site } from "../content/site.js";
import useScrollReveal from "../hooks/useScrollReveal.js";

const ExperienceEntry = ({ entry, index }) => {
  const [isDismissed, setIsDismissed] = useState(false);
  const { elementRef, isVisible } = useScrollReveal({
    rootMargin: "0px 0px 12%",
    threshold: 0.04,
  });
  const isActive = isVisible && !isDismissed;
  const visualId = `experience-visual-${index}`;

  return (
    <li
      ref={elementRef}
      className={`timeline-entry${isActive ? " is-active" : ""}`}
    >
      <span className="timeline-marker" aria-hidden="true" />
      <article className="timeline-card">
        <div className="timeline-card-heading">
          <div>
            <h2>{entry.title}</h2>
            {entry.organization && <p>{entry.organization}</p>}
          </div>
          <time>{entry.date}</time>
        </div>
        <p className="timeline-summary">{entry.summary}</p>
        <button
          className="timeline-card-toggle"
          type="button"
          aria-controls={visualId}
          aria-expanded={isActive}
          aria-label={`${isActive ? "Hide" : "Show"} image for ${entry.title}`}
          onClick={() => setIsDismissed((currentValue) => (
            isVisible ? !currentValue : currentValue
          ))}
        />
      </article>
      <figure
        id={visualId}
        className="timeline-visual"
        aria-hidden={!isActive}
      >
        <img src={entry.image} alt={entry.imageAlt || entry.title} loading="lazy" />
      </figure>
    </li>
  );
};

const ExperiencePage = () => {
  return (
    <section className="standard-page experience-page padding-x-lg">
      <header className="page-heading">
        <p className="eyebrow">{site.experience.eyebrow}</p>
        <h1>{site.experience.title}</h1>
        <p>{site.experience.description}</p>
        <PageButton
          className="experience-contact-button"
          text="View My Contact"
          to="/contact"
        />
      </header>

      <ol className="experience-timeline">
        {experiences.map((entry, index) => (
          <ExperienceEntry
            entry={entry}
            index={index}
            key={`${entry.title}-${entry.date}`}
          />
        ))}
      </ol>
    </section>
  );
};

export default ExperiencePage;
