import ProjectImageLightbox from "./ProjectImageLightbox.jsx";

const ProjectGalleryButton = ({ extraPic, title, compact = false }) => {
  if (!extraPic?.length) return null;

  return (
    <ProjectImageLightbox
      images={extraPic}
      alt={title}
      triggerClassName={`project-gallery-button${compact ? " secondary-project-photo-button" : ""}`}
      triggerLabel={`View More from ${title}`}
      triggerContent={(
        <>
          <svg aria-hidden="true" viewBox="0 0 24 24">
            <rect x="3" y="3" width="18" height="18" rx="3" />
            <circle cx="8" cy="8" r="1.5" />
            <path d="m3 16 5-5 4 4 3-3 6 6" />
          </svg>
          <span>View More</span>
        </>
      )}
    />
  );
};

export default ProjectGalleryButton;
