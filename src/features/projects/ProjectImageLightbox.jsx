import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

const CLOSE_TRANSITION_MS = 200;

const ProjectImageLightbox = ({
  src,
  alt,
  triggerClassName,
  imageClassName,
  loading,
}) => {
  const [isMounted, setIsMounted] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const triggerRef = useRef(null);
  const closeButtonRef = useRef(null);
  const closeTimerRef = useRef(null);
  const openFrameRef = useRef(null);

  const openLightbox = (event) => {
    event.stopPropagation();
    window.clearTimeout(closeTimerRef.current);
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

    const handleKeyDown = (event) => {
      if (event.key === "Escape") closeLightbox();
      if (event.key === "Tab") {
        event.preventDefault();
        closeButtonRef.current?.focus({ preventScroll: true });
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    openFrameRef.current = window.requestAnimationFrame(() => {
      setIsOpen(true);
      closeButtonRef.current?.focus({ preventScroll: true });
    });

    return () => {
      window.cancelAnimationFrame(openFrameRef.current);
      document.removeEventListener("keydown", handleKeyDown);
      body.style.overflow = previousOverflow;
      body.style.paddingRight = previousPaddingRight;
    };
  }, [closeLightbox, isMounted]);

  useEffect(() => () => {
    window.clearTimeout(closeTimerRef.current);
    window.cancelAnimationFrame(openFrameRef.current);
  }, []);

  const lightbox = isMounted ? createPortal(
    <div
      className={`project-lightbox${isOpen ? " is-open" : ""}`}
      role="dialog"
      aria-modal="true"
      aria-label={`Enlarged view of ${alt}`}
      onClick={(event) => {
        event.stopPropagation();
        if (event.target === event.currentTarget) closeLightbox();
      }}
    >
      <button
        ref={closeButtonRef}
        className="project-lightbox-image-button"
        type="button"
        aria-label={`Close enlarged view of ${alt}`}
        onClick={closeLightbox}
      >
        <img className="project-lightbox-image" src={src} alt={alt} />
      </button>
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
        aria-label={`Enlarge ${alt}`}
        onClick={openLightbox}
      >
        <img className={imageClassName} src={src} alt={alt} loading={loading} />
      </button>
      {lightbox}
    </>
  );
};

export default ProjectImageLightbox;
