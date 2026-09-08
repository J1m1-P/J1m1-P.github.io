import { useRef } from "react";
import { Link, NavLink } from "react-router-dom";
import { navLinks, site } from "../content/site.js";

import usePersonalAccess from '../hooks/usePersonalAccess.js';

const SiteHeader = () => {
  const mobileMenuRef = useRef(null);
  const personalUnlocked = usePersonalAccess();
  const closeMobileMenu = () => mobileMenuRef.current?.removeAttribute("open");

  const visibleNavLinks = personalUnlocked
    ? [...navLinks, { name: 'Personal', to: '/personal' }]
    : navLinks;

  return (
    <header className="site-header">
      <div className="site-header-inner">
        <Link className="logo" to="/">
          {site.name}
        </Link>

        <nav aria-label="Primary navigation">
          <ul>
            {visibleNavLinks.map(({ to, name }) => (
              <li
                className={name === 'Personal' ? 'personal-nav-item' : undefined}
                key={name}
              >
                <NavLink to={to}>
                  {name}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        <NavLink className="resume-link" to="/resume">
          Resume
        </NavLink>

        <details className="mobile-menu" ref={mobileMenuRef}>
          <summary>Menu</summary>
          <nav aria-label="Mobile navigation">
            {visibleNavLinks.map(({ to, name }) => (
              <NavLink to={to} onClick={closeMobileMenu} key={name}>
                {name}
              </NavLink>
            ))}
            <NavLink to="/resume" onClick={closeMobileMenu}>
              Resume
            </NavLink>
          </nav>
        </details>
      </div>
    </header>
  );
};

export default SiteHeader;
