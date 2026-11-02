import { personalPhotos } from "../content/personal.js";
import ProjectImageLightbox from "../features/projects/ProjectImageLightbox.jsx";

const PersonalPage = () => {
  return (
    <section className='standard-page personal-page padding-x-lg'>
      <header className='page-heading'>
        <p className='eyebrow'>Personal</p>
        <h1 id="personal-title">Off the Clock</h1>
        <p>Life outside of engineering.</p>
      </header>

      <div className="personal-gallery" role="group" aria-labelledby="personal-title">
        {personalPhotos.map((photo) => (
          <div className="personal-gallery-item" key={photo.src}>
            <ProjectImageLightbox
              src={photo.src}
              alt={photo.alt}
              triggerClassName="personal-photo"
              triggerLabel={`Enlarge photo: ${photo.caption}`}
              triggerContent={(
                <>
                  <img
                    src={photo.src}
                    alt={photo.alt}
                    width={photo.width}
                    height={photo.height}
                    loading="eager"
                    decoding="async"
                  />
                  <span className="personal-photo-caption">{photo.caption}</span>
                </>
              )}
            />
          </div>
        ))}
      </div>
    </section>
  );
};

export default PersonalPage;
