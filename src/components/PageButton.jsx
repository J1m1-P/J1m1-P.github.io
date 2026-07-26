import { Link } from "react-router-dom";

const PageButton = ({ text, to, className = "" }) => (
  <Link className={`cta-button group ${className}`} to={to}>
    <span className="bg-circle" aria-hidden="true" />
    <span className="text">{text}</span>
    <span className="arrow-wrapper" aria-hidden="true">
      <img src="/images/arrow-right.svg" alt="" />
    </span>
  </Link>
);

export default PageButton;
