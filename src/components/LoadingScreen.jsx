import { useEffect, useState } from "react";
import { site } from "../content/site.js";

const LoadingScreen = () => {
  const [isExiting, setIsExiting] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const timers = [];
    let cancelled = false;
    const schedule = (callback, delay) => {
      const timer = window.setTimeout(callback, delay);
      timers.push(timer);
      return timer;
    };

    document.body.style.overflow = "hidden";

    if (reducedMotion) {
      schedule(() => setProgress(100), 0);
      schedule(() => setIsExiting(true), 80);
      schedule(() => {
        document.body.style.overflow = previousOverflow;
        setIsVisible(false);
      }, 140);
    } else {
      let currentProgress = 0;
      let pageReady = false;
      let completionScheduled = false;

      const complete = () => {
        if (!pageReady || currentProgress < 99 || completionScheduled) return;
        completionScheduled = true;

        schedule(() => setProgress(100), 500);
        schedule(() => setIsExiting(true), 1200);
        schedule(() => {
          document.body.style.overflow = previousOverflow;
          setIsVisible(false);
        }, 1550);
      };

      const advanceProgress = () => {
        let step;
        let nextDelay;

        if (currentProgress < 60) {
          step = 6 + Math.floor(Math.random() * 7);
          nextDelay = 45 + Math.random() * 50;
        } else if (currentProgress < 85) {
          step = 3 + Math.floor(Math.random() * 4);
          nextDelay = 70 + Math.random() * 70;
        } else if (currentProgress < 95) {
          step = 1 + Math.floor(Math.random() * 3);
          nextDelay = 100 + Math.random() * 90;
        } else {
          step = 1;
          nextDelay = 180 + Math.random() * 120;
        }

        currentProgress = Math.min(99, currentProgress + step);
        setProgress(currentProgress);

        if (currentProgress < 99) {
          schedule(advanceProgress, nextDelay);
        } else {
          complete();
        }
      };

      const windowReady = new Promise((resolve) => {
        if (document.readyState === "complete") {
          resolve();
        } else {
          window.addEventListener("load", resolve, { once: true });
        }
      });
      const fontsReady = document.fonts?.ready ?? Promise.resolve();
      const readinessTimeout = new Promise((resolve) => schedule(resolve, 3000));

      Promise.race([
        Promise.all([windowReady, fontsReady]),
        readinessTimeout,
      ]).then(() => {
        if (cancelled) return;
        pageReady = true;
        complete();
      });

      schedule(advanceProgress, 80);
    }

    return () => {
      cancelled = true;
      timers.forEach((timer) => window.clearTimeout(timer));
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
          <span>J1m1@Terminal</span>:~$ reboot
        </p>
        <p className="loading-name">{site.name}</p>
        <div
          className="loading-track"
          role="progressbar"
          aria-label="Loading progress"
          aria-valuemin="0"
          aria-valuemax="100"
          aria-valuenow={progress}
        >
          <span style={{ transform: `scaleX(${progress / 100})` }} />
        </div>
        <p className="loading-status">
          <span>
            {progress === 100
              ? "Ready"
              : progress >= 95
                ? "Finalizing..."
                : "Loading portfolio..."}
          </span>
          <span aria-hidden="true">{progress}%</span>
        </p>
      </div>
    </div>
  );
};

export default LoadingScreen;
