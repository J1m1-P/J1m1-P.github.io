import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { isVideoMedia } from "../../utils/projectMedia.js";

const CLOSE_TRANSITION_MS = 200;

const ProjectImageLightbox = ({
  src,
  alt,
  triggerClassName,
  imageClassName,
  loading,
  images,
  triggerContent,
  triggerLabel,
}) => {
  const [isMounted, setIsMounted] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [imageIndex, setImageIndex] = useState(null);
  const triggerRef = useRef(null);
  const dialogRef = useRef(null);
  const closeTimerRef = useRef(null);
  const openFrameRef = useRef(null);
  const gallery = images?.length ? images : [{ src, alt }];
  const imageCount = gallery.length;
  const currentImage = gallery[imageIndex] ?? gallery[0];
  const isGallery = Boolean(images?.length);
  const isGrid = isGallery && imageIndex === null;

  const openLightbox = (event) => {
    event.stopPropagation();
    window.clearTimeout(closeTimerRef.current);
    setImageIndex(isGallery ? null : 0);
    if (isMounted) setIsOpen(true);
    setIsMounted(true);
  };

  const closeLightbox = useCallback(() => {
    setIsOpen(false);
    window.clearTimeout(closeTimerRef.current);
    closeTimerRef.current = window.setTimeout(() => {
      setIsMounted(false);
      if (triggerRef.current?.isConnected) {
        triggerRef.current.focus({ preventScroll: true });
      }
    }, CLOSE_TRANSITION_MS);
  }, []);

  useEffect(() => {
    if (!isMounted) return undefined;

    const body = document.body;
    const previousOverflow = body.style.overflow;
    const previousPaddingRight = body.style.paddingRight;
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;

    body.style.overflow = "hidden";
    if (scrollbarWidth > 0) body.style.paddingRight = `${scrollbarWidth}px`;

    openFrameRef.current = window.requestAnimationFrame(() => {
      setIsOpen(true);
    });

    return () => {
      window.cancelAnimationFrame(openFrameRef.current);
      body.style.overflow = previousOverflow;
      body.style.paddingRight = previousPaddingRight;
    };
  }, [isMounted]);

  useEffect(() => {
    if (!isMounted) return undefined;

    const focusFrame = requestAnimationFrame(() => {
      const firstControl = dialogRef.current?.querySelector("button, video[controls]");
      (firstControl ?? dialogRef.current)?.focus({ preventScroll: true });
    });

    const handleKeyDown = (event) => {
      if (event.key === "Escape") closeLightbox();
      if (!isGrid && imageCount > 1 && !event.target.closest("video")
        && (event.key === "ArrowLeft" || event.key === "ArrowRight")) {
        event.preventDefault();
        const direction = event.key === "ArrowLeft" ? -1 : 1;
        setImageIndex((index) => (index + direction + imageCount) % imageCount);
      }
      if (event.key === "Tab") {
        const controls = dialogRef.current?.querySelectorAll("button, video[controls]");
        const first = controls?.[0];
        const last = controls?.[controls.length - 1];

        if (!first || !dialogRef.current.contains(document.activeElement)) {
          event.preventDefault();
          (first ?? dialogRef.current)?.focus({ preventScroll: true });
        } else if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last?.focus({ preventScroll: true });
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus({ preventScroll: true });
        }
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      cancelAnimationFrame(focusFrame);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [closeLightbox, imageCount, isGrid, isMounted]);

  useEffect(() => () => {
    window.clearTimeout(closeTimerRef.current);
    window.cancelAnimationFrame(openFrameRef.current);
  }, []);

  const lightbox = isMounted ? createPortal(
    <div
      ref={dialogRef}
      className={`project-lightbox${isGallery ? " project-lightbox--gallery" : ""}${isOpen ? " is-open" : ""}`}
      role="dialog"
      tabIndex={-1}
      aria-modal="true"
      aria-label={isGallery ? `${alt} photos` : `Enlarged view of ${alt}`}
      onClick={(event) => {
        event.stopPropagation();
        if (event.target.closest("button, img, video, h2, p")) return;
        if (isGallery && !isGrid) {
          setImageIndex(null);
        } else {
          closeLightbox();
        }
      }}
    >
      {isGrid ? (
        <section className="project-photo-grid" aria-label={`${alt} gallery`}>
          <h2>{alt}</h2>
          <p>Choose a photo or video to enlarge.</p>
          <div className="project-photo-grid-items">
            {gallery.map((item, index) => (
              <button
                className="project-photo-thumbnail"
                type="button"
                key={item.src}
                aria-label={`Enlarge ${item.alt ?? `${alt}, item ${index + 1}`}`}
                onClick={() => setImageIndex(index)}
              >
                {isVideoMedia(item) ? (
                  <>
                    <video src={item.src} poster={item.poster} muted playsInline preload="metadata" />
                    <span className="project-photo-video-badge" aria-hidden="true">▶ Video</span>
                  </>
                ) : <img src={item.src} alt={item.alt ?? alt} />}
              </button>
            ))}
          </div>
        </section>
      ) : isGallery ? (
        <div className="project-lightbox-viewer">
          {imageCount > 1 && (
            <button
              className="project-lightbox-arrow project-lightbox-arrow--previous"
              type="button"
              aria-label="Previous photo"
              onClick={() => setImageIndex((index) => (index - 1 + imageCount) % imageCount)}
            >
              <svg aria-hidden="true" viewBox="0 0 24 24"><path d="m15 6-6 6 6 6" /></svg>
            </button>
          )}
          <div className="project-lightbox-media">
            {isVideoMedia(currentImage) ? (
              <video
                key={currentImage.src}
                className="project-lightbox-image"
                src={currentImage.src}
                poster={currentImage.poster}
                aria-label={currentImage.alt ?? alt}
                controls
                playsInline
                preload="metadata"
              />
            ) : (
              <img className="project-lightbox-image" src={currentImage.src} alt={currentImage.alt ?? alt} />
            )}
          </div>
          {imageCount > 1 && (
            <button
              className="project-lightbox-arrow project-lightbox-arrow--next"
              type="button"
              aria-label="Next photo"
              onClick={() => setImageIndex((index) => (index + 1) % imageCount)}
            >
              <svg aria-hidden="true" viewBox="0 0 24 24"><path d="m9 6 6 6-6 6" /></svg>
            </button>
          )}
          <p className="project-lightbox-position" aria-live="polite" aria-atomic="true">
            <span className="sr-only">{currentImage.alt ?? alt}, item </span>
            {imageIndex + 1} / {imageCount}
          </p>
        </div>
      ) : (
        <button
          className="project-lightbox-image-button"
          type="button"
          aria-label={`Close enlarged view of ${currentImage.alt ?? alt}`}
          onClick={closeLightbox}
        >
          <img className="project-lightbox-image" src={currentImage.src} alt={currentImage.alt ?? alt} />
        </button>
      )}
    </div>,
    document.body,
  ) : null;

  return (
    <>
      <button
        ref={triggerRef}
        className={`project-image-trigger${triggerClassName ? ` ${triggerClassName}` : ""}`}
        type="button"
        aria-haspopup="dialog"
        aria-label={triggerLabel ?? `Enlarge ${alt}`}
        onClick={openLightbox}
      >
        {triggerContent ?? <img className={imageClassName} src={src} alt={alt} loading={loading} />}
      </button>
      {lightbox}
    </>
  );
};

export default ProjectImageLightbox;
