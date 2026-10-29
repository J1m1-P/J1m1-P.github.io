import { useEffect, useState } from "react";
import ProjectCard from "./ProjectCard.jsx";

const slideDuration = 420;

const innerChevron = "M3 4.5 7 5.3 19 27.5Q19.3 28 19 28.5L7 50.7 3 51.5 14.5 28Z";
const middleChevron = "M15 8.5 19 9.3 31 27.5Q31.3 28 31 28.5L19 46.7 15 47.5 26.5 28Z";
const outerChevron = "M27 12.5 31 13.3 43 27.5Q43.3 28 43 28.5L31 42.7 27 43.5 38.5 28Z";

const ArrowGraphic = () => (
  <svg aria-hidden="true" viewBox="0 4 44 48" preserveAspectRatio="none">
    <path d={innerChevron} />
    <path className="featured-project-chevron--middle" d={middleChevron} />
    <path className="featured-project-chevron--outer" d={outerChevron} />
  </svg>
);

const FeaturedProjectCarousel = ({ projects, onProjectNavigate }) => {
  const [{ activeIndex, fromIndex, direction, phase }, setCarousel] = useState({
    activeIndex: 0,
    fromIndex: 0,
    direction: 1,
    phase: "idle",
  });

  useEffect(() => {
    if (phase === "prepare") {
      let movementFrame;
      // Paint the incoming card beside the current card before sliding it in.
      const preparationFrame = requestAnimationFrame(() => {
        movementFrame = requestAnimationFrame(() => {
          setCarousel((current) => ({ ...current, phase: "moving" }));
        });
      });

      return () => {
        cancelAnimationFrame(preparationFrame);
        cancelAnimationFrame(movementFrame);
      };
    }

    if (phase === "moving") {
      const timer = window.setTimeout(() => {
        setCarousel((current) => ({ ...current, phase: "idle" }));
      }, slideDuration);

      return () => window.clearTimeout(timer);
    }
  }, [phase]);

  if (projects.length === 0) return null;

  const visibleIndex = phase === "prepare" ? fromIndex : activeIndex;

  const selectProject = (nextIndex, requestedDirection) => {
    if (phase !== "idle" || nextIndex === activeIndex) return;

    const forwardDistance = (nextIndex - activeIndex + projects.length) % projects.length;
    const nextDirection = requestedDirection ?? (forwardDistance <= projects.length / 2 ? 1 : -1);
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    setCarousel({
      activeIndex: nextIndex,
      fromIndex: activeIndex,
      direction: nextDirection,
      phase: reducedMotion ? "idle" : "prepare",
    });
  };

  const switchProject = (direction) => {
    selectProject((activeIndex + direction + projects.length) % projects.length, direction);
  };

  const getSlideOffset = (index) => {
    if (phase === "prepare" && index === fromIndex) return 0;
    if (phase === "prepare" && index === activeIndex) return direction;
    if (phase === "moving" && index === fromIndex) return -direction;

    const distance = (index - activeIndex + projects.length) % projects.length;
    return distance > projects.length / 2 ? distance - projects.length : distance;
  };

  return (
    <section
      className="featured-projects"
      aria-labelledby="featured-projects-title"
      aria-roledescription="carousel"
    >
      <div className="featured-project-heading">
        <div className="projects-section-heading">
          <p className="eyebrow">Selected work</p>
          <h2 id="featured-projects-title">Featured Projects</h2>
        </div>

        {projects.length > 1 && (
          <p className="featured-project-position" aria-live="polite" aria-atomic="true">
            <span className="sr-only">{projects[visibleIndex].title}, project </span>
            {String(visibleIndex + 1).padStart(2, "0")}
            <span aria-hidden="true"> / </span>
            <span className="sr-only"> of </span>
            <span>{String(projects.length).padStart(2, "0")}</span>
          </p>
        )}
      </div>

      <div
        className="featured-project-stage"
        onKeyDown={(event) => {
          if (!event.target.closest(".featured-project-arrow")) return;
          if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
            event.preventDefault();
            switchProject(event.key === "ArrowLeft" ? -1 : 1);
          }
        }}
      >
        {projects.length > 1 && (
          <button
            className="featured-project-arrow featured-project-arrow--previous"
            type="button"
            aria-label="Previous featured project"
            aria-controls="featured-project-slides"
            onClick={() => switchProject(-1)}
          >
            <ArrowGraphic />
          </button>
        )}
        <div className="featured-project-viewport">
          <div
            className="featured-project-track"
            id="featured-project-slides"
            style={{ "--slide-duration": `${slideDuration}ms` }}
          >
            {projects.map((project, index) => (
              <div
                className={`featured-project-slide${index === visibleIndex ? " is-active" : ""}${phase !== "moving" ? " is-positioning" : ""}`}
                key={project.id}
                style={{ "--slide-offset": getSlideOffset(index) }}
                role="group"
                aria-roledescription="slide"
                aria-label={`${index + 1} of ${projects.length}: ${project.title}`}
                aria-hidden={index !== visibleIndex}
                inert={index !== visibleIndex}
              >
                <ProjectCard project={project} onProjectNavigate={onProjectNavigate} />
              </div>
            ))}
          </div>
        </div>
        {projects.length > 1 && (
          <button
            className="featured-project-arrow featured-project-arrow--next"
            type="button"
            aria-label="Next featured project"
            aria-controls="featured-project-slides"
            onClick={() => switchProject(1)}
          >
            <ArrowGraphic />
          </button>
        )}
      </div>

      {projects.length > 1 && (
        <div className="featured-project-pagination" role="group" aria-label="Choose a featured project">
          {projects.map((project, index) => (
            <button
              className="featured-project-indicator"
              key={project.id}
              type="button"
              aria-label={`Show ${project.title}`}
              aria-current={index === visibleIndex ? "true" : undefined}
              aria-controls="featured-project-slides"
              onClick={() => selectProject(index)}
            >
              <span aria-hidden="true" />
            </button>
          ))}
        </div>
      )}
    </section>
  );
};

export default FeaturedProjectCarousel;
