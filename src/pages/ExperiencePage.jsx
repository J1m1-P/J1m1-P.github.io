import { useState } from "react";
import PageButton from "../components/ui/PageButton.jsx";
import { experiences } from "../content/experiences.js";
import { site } from "../content/site.js";

const ExperiencePage = () => {
  const [activeEntries, setActiveEntries] = useState(() => new Set());

  const toggleEntry = (index) => {
    setActiveEntries((currentEntries) => {
      const nextEntries = new Set(currentEntries);

      if (nextEntries.has(index)) {
        nextEntries.delete(index);
      } else {
        nextEntries.add(index);
      }

      return nextEntries;
    });
  };

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
        {experiences.map((entry, index) => {
          const isActive = activeEntries.has(index);
          const visualId = `experience-visual-${index}`;

          return (
            <li
              className={`timeline-entry${isActive ? " is-active" : ""}`}
              key={`${entry.title}-${entry.date}`}
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
                  onClick={() => toggleEntry(index)}
                />
              </article>
              <figure
                id={visualId}
                className="timeline-visual"
                aria-hidden={!isActive}
              >
                <img src={entry.image} alt={entry.imageAlt || entry.title} />
              </figure>
            </li>
          );
        })}
      </ol>
    </section>
  );
};

export default ExperiencePage;
