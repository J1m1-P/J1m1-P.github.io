import { useEffect, useRef, useState } from "react";
import { skillLogos } from "../../content/site.js";

const marqueeLoopDuration = 45000;
const minimumLogosPerLoop = 8;
const marqueeRepetitions = 5;

const LogoIcon = ({ icon, duplicate, selected, onSelect }) => (
  <div
    className={`marquee-item${selected ? " is-selected" : ""}`}
    aria-hidden={duplicate || undefined}
  >
    <button
      className="marquee-item-center"
      type="button"
      tabIndex={duplicate ? -1 : 0}
      aria-label={`Center ${icon.name}`}
      onClick={onSelect}
    />
    <img src={icon.image} alt={icon.name} />
    <span className="marquee-item-name" aria-hidden="true">
      {icon.name}
    </span>
  </div>
);

const TechnologyStrip = () => {
  const [selectedLogo, setSelectedLogo] = useState(null);
  const marqueeTrackRef = useRef(null);
  const repetitions = Math.max(
    1,
    Math.ceil(minimumLogosPerLoop / skillLogos.length),
  );
  const logosInLoop = Array.from(
    { length: repetitions },
    () => skillLogos,
  ).flat();
  const repeatedLogos = Array.from(
    { length: marqueeRepetitions },
    () => logosInLoop,
  ).flat();
  const middleLogoSet = Math.floor(marqueeRepetitions / 2);

  const resumeMarquee = (forceWhileHovered = false) => {
    const track = marqueeTrackRef.current;

    if (!track) {
      return;
    }

    const styles = window.getComputedStyle(track);
    const computedTransform = styles.transform;
    const currentTransform =
      computedTransform === "none"
        ? 0
        : new DOMMatrixReadOnly(computedTransform).m41;
    const gap = Number.parseFloat(styles.columnGap) || 0;
    const loopDistance = (track.scrollWidth + gap) / marqueeRepetitions;
    const phase =
      ((-currentTransform % loopDistance) + loopDistance) % loopDistance;

    if (track.contains(document.activeElement)) {
      document.activeElement.blur();
    }

    track.style.transition = "none";
    track.style.transform = "";
    track.style.animation = "";
    track.style.animationDelay = `-${
      (phase / loopDistance) * marqueeLoopDuration
    }ms`;
    track.style.animationPlayState = forceWhileHovered ? "running" : "";
    setSelectedLogo(null);
  };

  useEffect(() => {
    if (selectedLogo === null) {
      return undefined;
    }

    const resumeFromOutsideClick = (event) => {
      if (!event.target.closest(".marquee-item")) {
        resumeMarquee();
      }
    };

    document.addEventListener("click", resumeFromOutsideClick);
    return () => document.removeEventListener("click", resumeFromOutsideClick);
  }, [selectedLogo]);

  const centerLogo = (event, index) => {
    if (selectedLogo === index) {
      resumeMarquee(true);
      return;
    }

    const clickedLogo = event.currentTarget.closest(".marquee-item");
    const viewport = clickedLogo?.closest(".marquee");
    const track = clickedLogo?.closest(".marquee-box");
    if (!viewport || !track) {
      return;
    }

    const styles = window.getComputedStyle(track);
    const computedTransform = styles.transform;
    const currentTransform =
      computedTransform === "none"
        ? 0
        : new DOMMatrixReadOnly(computedTransform).m41;
    const gap = Number.parseFloat(styles.columnGap) || 0;
    const loopDistance = (track.scrollWidth + gap) / marqueeRepetitions;
    const middleTransform = -middleLogoSet * loopDistance;
    const normalizationSteps = Math.round(
      (middleTransform - currentTransform) / loopDistance,
    );
    const normalizedTransform =
      currentTransform + normalizationSteps * loopDistance;
    const logos = track.querySelectorAll(".marquee-item");
    let normalizedIndex =
      index - normalizationSteps * logosInLoop.length;

    while (normalizedIndex < 0) {
      normalizedIndex += logosInLoop.length;
    }

    while (normalizedIndex >= logos.length) {
      normalizedIndex -= logosInLoop.length;
    }

    const logo = logos[normalizedIndex];

    if (!logo) {
      return;
    }

    setSelectedLogo(normalizedIndex);
    track.style.animation = "none";
    track.style.transition = "none";
    track.style.transform = `translateX(${normalizedTransform}px)`;
    track.getBoundingClientRect();

    requestAnimationFrame(() => {
      const logoBounds = logo.getBoundingClientRect();
      const viewportBounds = viewport.getBoundingClientRect();
      const horizontalOffset =
        logoBounds.left +
        logoBounds.width / 2 -
        (viewportBounds.left + viewportBounds.width / 2);
      const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;

      track.style.transition = prefersReducedMotion
        ? "none"
        : "transform 360ms cubic-bezier(0.22, 1, 0.36, 1)";
      track.style.transform = `translateX(${
        normalizedTransform - horizontalOffset
      }px)`;
    });
  };

  return (
    <section className="technology-strip" aria-label="Skills">
      <div className="gradient-edge left" />
      <div className="gradient-edge right" />
      <div className="marquee">
        <div
          ref={marqueeTrackRef}
          className={`marquee-box${
            selectedLogo !== null ? " is-centered" : ""
          }`}
          onMouseLeave={(event) => {
            if (selectedLogo === null) {
              event.currentTarget.style.animationPlayState = "";
            }
          }}
        >
          {repeatedLogos.map((icon, index) => (
            <LogoIcon
              key={`${icon.name}-${index}`}
              icon={icon}
              duplicate={
                Math.floor(index / logosInLoop.length) !== middleLogoSet
              }
              selected={selectedLogo === index}
              onSelect={(event) => centerLogo(event, index)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TechnologyStrip;
