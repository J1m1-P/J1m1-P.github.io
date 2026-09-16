import { Link } from "react-router-dom";
import ContactIcon from "../../components/ui/ContactIcon.jsx";

const DirectionIcon = ({ external }) => (
  <svg viewBox="0 0 20 20" aria-hidden="true" focusable="false">
    {external ? (
      <path d="M6 4h10v10M16 4 4 16" />
    ) : (
      <path d="M3 10h13m-5-5 5 5-5 5" />
    )}
  </svg>
);

const ContactLink = ({
  name,
  url,
  handle,
  icon,
  description,
  priority = "primary",
  newTab = false,
}) => {
  const isInternal = url?.startsWith("/") && !newTab;
  const isExternal = newTab || /^https?:///.test(url);
  const className = `contact-link contact-link--${priority}`;
  const content = (
    <>
      <span className="contact-link-icon">
        <ContactIcon name={icon} />
      </span>
      <span className="contact-link-copy">
        <strong>{name}</strong>
        {description && <span>{description}</span>}
        {handle && <span className="contact-link-value">{handle}</span>}
      </span>
      <span className="contact-link-action" aria-hidden="true">
        <DirectionIcon external={isExternal} />
      </span>
    </>
  );

  if (isInternal) {
    return (
      <Link className={className} to={url}>
        {content}
      </Link>
    );
  }

  return (
    <a
      className={className}
      href={url}
      {...(isExternal && { target: "_blank", rel: "noopener noreferrer" })}
    >
      {content}
    </a>
  );
};

export default ContactLink;
