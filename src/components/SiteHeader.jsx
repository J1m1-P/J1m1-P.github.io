import { useRef } from "react";
import { Link, NavLink } from "react-router-dom";
import { navLinks, site } from "../content/site.js";

const SiteHeader = () => {
  const mobileMenuRef = useRef(null);
  const closeMobileMenu = () => mobileMenuRef.current?.removeAttribute("open");

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
          </ul>
        </nav>

        <NavLink className="resume-link" to="/resume">
          Resume
        </NavLink>

        <details className="mobile-menu" ref={mobileMenuRef}>
          <summary>Menu</summary>
          <nav aria-label="Mobile navigation">
            {navLinks.map(({ to, name }) => (
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
