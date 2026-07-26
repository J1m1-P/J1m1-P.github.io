import { useEffect, useState } from "react";
import { site } from "../content/site.js";

const LoadingScreen = () => {
  const [isExiting, setIsExiting] = useState(false);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const exitDelay = reducedMotion ? 80 : 1100;
    const finishDelay = reducedMotion ? 140 : 1450;

    document.body.style.overflow = "hidden";

    const exitTimer = window.setTimeout(() => setIsExiting(true), exitDelay);
    const finishTimer = window.setTimeout(() => {
      document.body.style.overflow = previousOverflow;
      setIsVisible(false);
    }, finishDelay);

    return () => {
      window.clearTimeout(exitTimer);
      window.clearTimeout(finishTimer);
      document.body.style.overflow = previousOverflow;
    };
  }, []);

  if (!isVisible) return null;

  return (
    <div
      className={`loading-screen ${isExiting ? "is-exiting" : ""}`}
      role="status"
      aria-label="Loading portfolio"
    >
      <div className="loading-content">
        <p className="loading-command">
          <span>J1m1@Terminal</span>:~$ launch
        </p>
        <p className="loading-name">{site.name}</p>
        <div className="loading-track" aria-hidden="true">
          <span />
        </div>
        <p className="loading-status">Initializing portfolio...</p>
      </div>
    </div>
  );
};

export default LoadingScreen;
