import { useEffect, useRef, useState } from "react";
import ProjectImageLightbox from "./ProjectImageLightbox.jsx";

const ExternalIcon = ({ type }) => {
  if (type === "github") {
    return <img src="/images/icons/technologies/github.svg" alt="" />;
  }

  return (
    <svg aria-hidden="true" viewBox="0 0 24 24">
      <path d="M14 5h5v5M19 5l-9 9M19 14v5H5V5h5" />
    </svg>
  );
};

const CompactLinks = ({ project }) => {
  const links = [
    project.githubVisible === false ? null : project.github && {
      href: project.github,
      label: "GitHub",
      type: "github",
    },
    project.website && { href: project.website, label: "Website", type: "website" },
    project.news && { href: project.news, label: "News", type: "website" },
  ].filter(Boolean);

  if (links.length === 0 && !project.privateSource) return null;

  return (
    <div className="secondary-project-links" aria-label={`${project.title} links`}>
      {links.map(({ href, label, type }) => (
        <a
          href={href}
          key={`${label}-${href}`}
          target="_blank"
          rel="noreferrer"
          aria-label={`${project.title} ${label}`}
        >
          <ExternalIcon type={type} />
          <span>{label}</span>
        </a>
      ))}
      {project.privateSource && (
        <span className="secondary-project-source-note" title="Source repository is private">
          <svg aria-hidden="true" viewBox="0 0 24 24">
            <rect x="5" y="10" width="14" height="10" rx="2" />
            <path d="M8 10V7a4 4 0 0 1 8 0v3" />
          </svg>
          <span>{project.projectType ? `${project.projectType} · Source Private` : "Source · Private"}</span>
        </span>
      )}
    </div>
  );
};

const SecondaryProjectCard = ({
  project,
  revealIndex = 0,
  earlyReveal = false,
  isExpanded,
  onToggle,
  detailsId,
}) => {
  const cardRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const supportsIntersectionObserver = typeof IntersectionObserver !== "undefined";
  const visibleSkills = project.skills?.slice(0, project.visibleSkillCount ?? 4);
  const hasDetails = Boolean(project.summary || project.subprojects?.length);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReducedMotion || !cardRef.current || !supportsIntersectionObserver) {
      return undefined;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setIsVisible(true);
        observer.disconnect();
      },
      earlyReveal
        ? { rootMargin: "0px 0px 5%", threshold: 0.05 }
        : { rootMargin: "0px 0px -6%", threshold: 0.12 },
    );

    observer.observe(cardRef.current);
    return () => observer.disconnect();
  }, [earlyReveal, supportsIntersectionObserver]);

  return (
    <article
      ref={cardRef}
      className={`secondary-project-card${isVisible || !supportsIntersectionObserver ? " is-visible" : ""}${isExpanded ? " is-expanded" : ""}`}
      style={{ "--reveal-delay": `${Math.min(revealIndex, 3) * 90}ms` }}
    >
      <div className={`secondary-project-compact${project.image ? "" : " secondary-project-compact--no-image"}`}>
        {project.image && (
          <ProjectImageLightbox
            src={project.image}
            alt={project.imageAlt ?? project.title}
            triggerClassName={`secondary-project-image${project.imageBackdrop === "card" ? " secondary-project-image--card-background" : ""}`}
            loading="lazy"
          />
        )}

        <div className="secondary-project-content">
          <div className="project-card-main">
            <div className="secondary-project-heading">
              <h3 className="secondary-project-title">{project.title}</h3>
            </div>
            <p className="secondary-project-summary">
              {project.compactSummary ?? project.summary}
            </p>
          </div>
          {visibleSkills?.length > 0 && (
            <div className="secondary-project-tags" aria-label="Skills and technologies">
              {visibleSkills.map((skill) => <span key={skill}>{skill}</span>)}
            </div>
          )}

          <div className="secondary-project-actions project-card-actions">
            <CompactLinks project={project} />
            {hasDetails && (
              <button
                className="secondary-project-toggle"
                type="button"
                aria-expanded={isExpanded}
                aria-controls={detailsId}
                onClick={onToggle}
              >
                <span>{isExpanded ? "Hide Details" : "More Details"}</span>
                <span className="secondary-project-chevron" aria-hidden="true">
                  <svg viewBox="0 0 24 24"><path d="m6 9 6 6 6-6" /></svg>
                </span>
              </button>
            )}
          </div>
        </div>
      </div>
    </article>
  );
};

export const SecondaryProjectDetails = ({ project, detailsId, isExpanded, anchor }) => (
  <div
    id={detailsId}
    className={`secondary-project-details secondary-project-details--anchor-${anchor}${isExpanded ? " is-expanded" : ""}`}
    aria-hidden={!isExpanded}
    inert={!isExpanded}
  >
    <div className="secondary-project-details-inner">
      <div className="secondary-project-details-surface">
        {project.summary && <p>{project.summary}</p>}
        {project.subprojects?.length > 0 && (
          <div className={`secondary-project-sections${project.detailsLayout ? ` secondary-project-sections--${project.detailsLayout}` : ""}`}>
            {project.subprojects.map((section) => (
              <section key={section.title} className="secondary-project-section">
                <h3>{section.title}</h3>
                <p>{section.description}</p>
                {section.images?.length > 0 && (
                  <div className="secondary-project-detail-images">
                    {section.images.map(({ src, alt }) => (
                      <ProjectImageLightbox
                        key={src}
                        src={src}
                        alt={alt ?? section.title}
                        triggerClassName="secondary-project-detail-image-trigger"
                        imageClassName="secondary-project-detail-image"
                        loading="lazy"
                      />
                    ))}
                  </div>
                )}
              </section>
            ))}
          </div>
        )}
      </div>
    </div>
  </div>
);

export default SecondaryProjectCard;
