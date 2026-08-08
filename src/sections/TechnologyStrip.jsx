import { skillLogos } from "../content/site.js";

const minimumLogosPerLoop = 8;

const LogoIcon = ({ icon }) => (
  <div className="marquee-item" tabIndex="0" aria-label={icon.name}>
    <img src={icon.image} alt={icon.name} />
    <span className="marquee-item-name" aria-hidden="true">
      {icon.name}
    </span>
  </div>
);

const TechnologyStrip = () => {
  const repetitions = Math.max(
    1,
    Math.ceil(minimumLogosPerLoop / skillLogos.length),
  );
  const logosInLoop = Array.from(
    { length: repetitions },
    () => skillLogos,
  ).flat();
  const repeatedLogos = [...logosInLoop, ...logosInLoop];

  return (
    <section className="technology-strip" aria-label="Skills">
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
