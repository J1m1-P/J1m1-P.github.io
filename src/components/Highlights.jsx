import { highlights } from "../content/site.js";

const Highlights = () => {
  return (
    <div className="highlights padding-x-lg" aria-label="Highlights">
      <div className="grid-4-cols">
        {highlights.map((item) => (
          <div className="highlight-card" key={item.label}>
            <strong>{item.value}</strong>
            <span>{item.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Highlights;
