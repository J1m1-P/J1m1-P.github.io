import { useEffect, useRef, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { navLinks, site } from "../../content/site.js";
import ContactIcon from "../ui/ContactIcon.jsx";
import CopyButton from "../ui/CopyButton.jsx";

const headerEmail = site.contact.links.find(({ name }) => name === "Email");
const headerIconLinks = site.contact.links.filter(({ name }) =>
  ["GitHub", "LinkedIn", "Resume"].includes(name),
);
const resumeLink = headerIconLinks.find(({ name }) => name === "Resume");

const SiteHeader = ({ personalDiscovered }) => {
  const [emailOpen, setEmailOpen] = useState(false);
  const mobileMenuRef = useRef(null);
  const emailActionRef = useRef(null);
  const emailButtonRef = useRef(null);
  const closeMobileMenu = () => mobileMenuRef.current?.removeAttribute("open");

  useEffect(() => {
    if (!emailOpen) return undefined;

    const closeOnOutsideClick = (event) => {
      if (!emailActionRef.current?.contains(event.target)) setEmailOpen(false);
    };
    const closeOnEscape = (event) => {
      if (event.key === "Escape") {
        setEmailOpen(false);
        emailButtonRef.current?.focus();
      }
    };

    document.addEventListener("pointerdown", closeOnOutsideClick);
    document.addEventListener("keydown", closeOnEscape);

    return () => {
      document.removeEventListener("pointerdown", closeOnOutsideClick);
      document.removeEventListener("keydown", closeOnEscape);
    };
  }, [emailOpen]);

  return (
    <header className="site-header">
      <div className="site-header-inner">
        <Link className="logo" to="/">
          {site.name}
        </Link>

        <nav aria-label="Primary navigation">
          <ul>
            {navLinks.map(({ to, name }) => (
              <li key={name}>
                <NavLink to={to}>
                  {name}
                </NavLink>
              </li>
            ))}
            <li className={`personal-nav-item${personalDiscovered ? " is-visible" : ""}`} aria-hidden={!personalDiscovered}>
              <NavLink to="/personal" tabIndex={personalDiscovered ? 0 : -1}>
                Personal
              </NavLink>
            </li>
          </ul>
        </nav>

        <div className="header-actions">
          {headerEmail && (
            <div className="header-email-action" ref={emailActionRef}>
              <button
                className="header-icon-link"
                type="button"
                aria-label="Email"
                aria-expanded={emailOpen}
                aria-controls="header-email-popover"
                title="Email"
                onClick={() => setEmailOpen((isOpen) => !isOpen)}
                ref={emailButtonRef}
              >
                <ContactIcon name={headerEmail.icon} />
              </button>
              {emailOpen && (
                <div
                  className="header-email-popover"
                  id="header-email-popover"
                  aria-label="Email actions"
                >
                  <a
                    className="header-email-address"
                    href={headerEmail.url}
                    aria-label={`Email ${headerEmail.handle}`}
                  >
                    <ContactIcon name={headerEmail.icon} />
                    <span>{headerEmail.handle}</span>
                  </a>
                  <CopyButton value={headerEmail.handle} label="email address" />
                </div>
              )}
            </div>
          )}
          {headerIconLinks.map(({ name, url, icon, newTab }) => {
            const iconContent = <ContactIcon name={icon} />;
            const sharedProps = {
              className: "header-icon-link",
              "aria-label": name,
              title: name,
            };
            const isInternal = url.startsWith("/") && !newTab;

            return isInternal ? (
              <NavLink {...sharedProps} to={url} key={name}>
                {iconContent}
              </NavLink>
            ) : (
              <a
                {...sharedProps}
                href={url}
                {...(newTab && {
                  target: "_blank",
                  rel: "noopener noreferrer",
                })}
                key={name}
              >
                {iconContent}
              </a>
            );
          })}
        </div>

        <details className="mobile-menu" ref={mobileMenuRef}>
          <summary>Menu</summary>
          <nav aria-label="Mobile navigation">
            {navLinks.map(({ to, name }) => (
              <NavLink to={to} onClick={closeMobileMenu} key={name}>
                {name}
              </NavLink>
            ))}
            {personalDiscovered && (
              <NavLink to="/personal" onClick={closeMobileMenu}>
                Personal
              </NavLink>
            )}
            {resumeLink && (
              <a
                href={resumeLink.url}
                target="_blank"
                rel="noopener noreferrer"
                onClick={closeMobileMenu}
              >
                Resume
              </a>
            )}
          </nav>
        </details>
      </div>
    </header>
  );
};

export default SiteHeader;
