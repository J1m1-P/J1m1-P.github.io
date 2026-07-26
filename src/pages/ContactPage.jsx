import { contactLinks, site } from "../content/site.js";

const ContactPage = () => {
  const availableLinks = contactLinks.filter((link) => link.url);

  return (
    <section className="standard-page padding-x-lg">
      <header className="page-heading">
        <p className="eyebrow">{site.contact.eyebrow}</p>
        <h1>{site.contact.title}</h1>
        <p>{site.contact.description}</p>
      </header>

      {availableLinks.length ? (
        <div className="contact-links">
          {availableLinks.map((link) => (
            <a href={link.url} target="_blank" rel="noreferrer" key={link.label}>
              {link.label} <span aria-hidden="true">↗</span>
            </a>
          ))}
        </div>
      ) : (
        <p className="empty-state">{site.contact.emptyMessage}</p>
      )}
    </section>
  );
};

export default ContactPage;
