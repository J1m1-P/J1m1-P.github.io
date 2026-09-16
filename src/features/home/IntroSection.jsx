import PageButton from "../../components/ui/PageButton.jsx";
import { introWords, site } from "../../content/site.js";
import Highlights from "./Highlights.jsx";
import Terminal from "./Terminal.jsx";

const showHighlights = false;

const IntroSection = () => {
  const words = [...introWords, ...introWords];

  return (
    <section id="intro" className="intro">
      <img className="intro-background" src="/images/home/background.png" alt="" />

      <div className="intro-layout">
        <header id="about" className="intro-copy">
          <div
            className="intro-title"
            aria-label={`${site.intro.titleStart} ideas ${site.intro.titleEnd}`}
          >
            <h1>
              {site.intro.titleStart}
              <span className="slide" aria-hidden="true">
                <span className="word-wrapper">
                  {words.map((word, index) => (
                    <span className="rotating-word" key={`${word.text}-${index}`}>
                      <img src={word.image} alt="" />
                      <span>{word.text}</span>
                    </span>
                  ))}
                </span>
              </span>
            </h1>
            <h1>{site.intro.titleEnd}</h1>
          </div>

          <div className="intro-about">
            <p>{site.intro.greeting}</p>
            <p className="intro-role">{site.intro.role}</p>
            <PageButton
              className="intro-cta"
              text={site.intro.button}
              to={site.intro.buttonTo}
            />
          </div>
        </header>

        <div className="intro-terminal">
          <Terminal />
        </div>
      </div>

      {showHighlights && <Highlights />}
    </section>
  );
};

export default IntroSection;
