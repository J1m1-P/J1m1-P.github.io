import { useEffect, useRef, useState } from "react";
import CopyButton from "../components/ui/CopyButton.jsx";
import CatPersonalTrigger from "../features/contact/CatPersonalTrigger.jsx";
import ContactLink from "../features/contact/ContactLink.jsx";
import { site } from "../content/site.js";

const contactPage = site.contact;
const testimonialLoopDuration = 48000;
const testimonialRepetitions = 5;

const TestimonialCard = ({
  testimonial,
  duplicate,
  selected,
  onSelect,
}) => (
  <article
    className={`testimonial-card${selected ? " is-selected" : ""}`}
    aria-hidden={duplicate || undefined}
  >
    <button
      className="testimonial-card-center"
      type="button"
      tabIndex={duplicate ? -1 : 0}
      aria-label={`Center testimonial from ${testimonial.name}`}
      onClick={onSelect}
    />
    <span className="testimonial-quote-mark" aria-hidden="true">
      “
    </span>
    <blockquote>{testimonial.quote}</blockquote>
    <footer>
      <strong>{testimonial.name}</strong>
      <p>
        {testimonial.role}
        {testimonial.organization && (
          <span> · {testimonial.organization}</span>
        )}
      </p>
    </footer>
  </article>
);

const ContactPage = ({ onPersonalTransitionStarted }) => {
  const [selectedTestimonial, setSelectedTestimonial] = useState(null);
  const testimonialTrackRef = useRef(null);
  const availableLinks = contactPage.links.filter(
    (link) => link.enabled !== false && (link.url || link.handle),
  );
  const linksByPriority = (priority) =>
    availableLinks.filter((link) => link.priority === priority);
  const emailLinks = linksByPriority("email");
  const primaryLinks = linksByPriority("primary");
  const testimonials = contactPage.testimonials.items;
  const middleTestimonialSet = Math.floor(testimonialRepetitions / 2);
  const repeatedTestimonials = Array.from(
    { length: testimonialRepetitions },
    () => testimonials,
  ).flat();
  const resumeTestimonials = (forceWhileHovered = false) => {
    const track = testimonialTrackRef.current;

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
    const loopDistance =
      (track.scrollWidth + gap) / testimonialRepetitions;
    const phase =
      ((-currentTransform % loopDistance) + loopDistance) % loopDistance;

    if (track.contains(document.activeElement)) {
      document.activeElement.blur();
    }

    track.style.transition = "none";
    track.style.transform = "";
    track.style.animation = "";
    track.style.animationDelay = `-${
      (phase / loopDistance) * testimonialLoopDuration
    }ms`;
    track.style.animationPlayState = forceWhileHovered ? "running" : "";
    setSelectedTestimonial(null);
  };

  useEffect(() => {
    if (selectedTestimonial === null) {
      return undefined;
    }

    const resumeFromOutsideClick = (event) => {
      if (!event.target.closest(".testimonial-card")) {
        resumeTestimonials();
      }
    };

    document.addEventListener("click", resumeFromOutsideClick);
    return () => document.removeEventListener("click", resumeFromOutsideClick);
  }, [selectedTestimonial]);

  const centerTestimonial = (event, index) => {
    if (selectedTestimonial === index) {
      resumeTestimonials(true);
      return;
    }

    const clickedCard = event.currentTarget.closest(".testimonial-card");
    const viewport = clickedCard?.closest(".testimonials-viewport");
    const track = clickedCard?.closest(".testimonials-track");
    if (!viewport || !track) {
      return;
    }

    const computedTransform = window.getComputedStyle(track).transform;
    const currentTransform =
      computedTransform === "none"
        ? 0
        : new DOMMatrixReadOnly(computedTransform).m41;
    const gap = Number.parseFloat(
      window.getComputedStyle(track).columnGap,
    ) || 0;
    const loopDistance =
      (track.scrollWidth + gap) / testimonialRepetitions;
    const middleTransform = -middleTestimonialSet * loopDistance;
    const normalizationSteps = Math.round(
      (middleTransform - currentTransform) / loopDistance,
    );
    const normalizedTransform =
      currentTransform + normalizationSteps * loopDistance;
    const cards = track.querySelectorAll(".testimonial-card");
    let normalizedIndex =
      index - normalizationSteps * testimonials.length;

    while (normalizedIndex < 0) {
      normalizedIndex += testimonials.length;
    }

    while (normalizedIndex >= cards.length) {
      normalizedIndex -= testimonials.length;
    }

    const card = cards[normalizedIndex];

    if (!card) {
      return;
    }

    setSelectedTestimonial(normalizedIndex);
    track.style.animation = "none";
    track.style.transition = "none";
    track.style.transform = `translateX(${normalizedTransform}px)`;
    track.getBoundingClientRect();

    requestAnimationFrame(() => {
      const cardBounds = card.getBoundingClientRect();
      const viewportBounds = viewport.getBoundingClientRect();
      const horizontalOffset =
        cardBounds.left +
        cardBounds.width / 2 -
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
    <div className="standard-page contact-page padding-x-lg">
      <section className="contact-layout" aria-labelledby="contact-title">
        <div className="contact-intro">
          <header className="page-heading contact-heading">
            <p className="eyebrow">{contactPage.eyebrow}</p>
            <h1 id="contact-title">{contactPage.title}</h1>
            <p>{contactPage.description}</p>
          </header>

        </div>

        <div className="contact-divider" aria-hidden="true">
          <span />
          <span />
          <span />
        </div>

        {availableLinks.length ? (
          <div className="contact-directory">
            <p className="eyebrow contact-directory-label">
              {contactPage.getInTouchLabel}
            </p>
            <CatPersonalTrigger onPersonalTransitionStarted={onPersonalTransitionStarted} />

            <div className="contact-actions-row">
              <div className="contact-email-links">
                {emailLinks.map((link) => (
                  <div className="contact-email-item" key={link.name}>
                    <ContactLink {...link} />
                    {link.copyable && (
                      <CopyButton value={link.handle} label={link.name} />
                    )}
                  </div>
                ))}
              </div>

              <div className="contact-primary-links">
                {primaryLinks.map((link) => (
                  <ContactLink {...link} key={link.name} />
                ))}
              </div>
            </div>
          </div>
        ) : (
          <p className="empty-state">{contactPage.emptyMessage}</p>
        )}
      </section>

      <section
        className="testimonials-section"
        aria-label={contactPage.testimonials.eyebrow}
      >
        <header className="testimonials-heading">
          <p className="eyebrow">{contactPage.testimonials.eyebrow}</p>
        </header>

        <div className="testimonials-viewport">
          <div
            ref={testimonialTrackRef}
            className={`testimonials-track${
              selectedTestimonial !== null ? " is-centered" : ""
            }`}
            onMouseLeave={(event) => {
              if (selectedTestimonial === null) {
                event.currentTarget.style.animationPlayState = "";
              }
            }}
          >
            {repeatedTestimonials.map((testimonial, index) => (
              <TestimonialCard
                testimonial={testimonial}
                duplicate={
                  Math.floor(index / testimonials.length) !==
                  middleTestimonialSet
                }
                selected={selectedTestimonial === index}
                onSelect={(event) => centerTestimonial(event, index)}
                key={`${testimonial.name}-${testimonial.role}-${index}`}
              />
            ))}
          </div>
        </div>
      </section>

      <footer className="contact-footer">
        <p>{contactPage.footer.copyright}</p>
        <a
          href={contactPage.footer.sourceUrl}
          target="_blank"
          rel="noopener noreferrer"
        >
          {contactPage.footer.sourceLabel}
          <span aria-hidden="true">
            <svg viewBox="0 0 20 20" focusable="false">
              <path d="M6 4h10v10M16 4 4 16" />
            </svg>
          </span>
        </a>
      </footer>
    </div>
  );
};

export default ContactPage;
