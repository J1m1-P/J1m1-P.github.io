import { technologyLogos } from "../content/site.js";

const LogoIcon = ({ icon }) => (
  <div className="marquee-item">
    <img src={icon.image} alt={icon.name} />
  </div>
);

const TechnologyStrip = () => {
  const repeatedLogos = [...technologyLogos, ...technologyLogos];

  return (
    <section className="technology-strip" aria-label="Technologies">
      <div className="gradient-edge left" />
      <div className="gradient-edge right" />
      <div className="marquee">
        <div className="marquee-box">
          {repeatedLogos.map((icon, index) => (
            <LogoIcon key={`${icon.name}-${index}`} icon={icon} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TechnologyStrip;
