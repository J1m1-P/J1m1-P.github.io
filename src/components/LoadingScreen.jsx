import { useEffect, useState } from "react";
import { site } from "../content/site.js";

const LOADING_TIMINGS = {
  // All delays below are measured in milliseconds.
  reducedMotion: {
    exitDelay: 80, // Time before the reduced-motion screen starts fading out.
    cleanupDelay: 140, // Time before the reduced-motion screen is removed.
  },
  progress: {
    initialDelay: 70, // Time before the first progress update.
    phases: [
      // `until` is a progress percentage; `step` is percentage points;
      // `delay` is the random wait between progress updates.
      { until: 60, step: [6, 12], delay: [38, 70] },
      { until: 85, step: [3, 6], delay: [60, 110] },
      { until: 95, step: [1, 3], delay: [85, 155] },
      { until: 99, step: [1, 1], delay: [155, 215] },
    ],
  },
  readinessTimeout: 2800, // Maximum wait for the page and fonts to be ready.
  completion: {
    readyDelay: 250, // Time showing 100%/"Ready" before fading out.
    exitDelay: 425, // Time before the loading screen starts fading out.
    cleanupDelay: 675, // Time before removal; includes the 350 ms CSS fade.
  },
};

const randomBetween = ([minimum, maximum]) =>
  minimum + Math.random() * (maximum - minimum + 1);

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
      schedule(
        () => setIsExiting(true),
        LOADING_TIMINGS.reducedMotion.exitDelay,
      );
      schedule(() => {
        document.body.style.overflow = previousOverflow;
        setIsVisible(false);
      }, LOADING_TIMINGS.reducedMotion.cleanupDelay);
    } else {
      let currentProgress = 0;
      let pageReady = false;
      let completionScheduled = false;

      const complete = () => {
        if (!pageReady || currentProgress < 99 || completionScheduled) return;
        completionScheduled = true;

        schedule(
          () => setProgress(100),
          LOADING_TIMINGS.completion.readyDelay,
        );
        schedule(
          () => setIsExiting(true),
          LOADING_TIMINGS.completion.exitDelay,
        );
        schedule(() => {
          document.body.style.overflow = previousOverflow;
          setIsVisible(false);
        }, LOADING_TIMINGS.completion.cleanupDelay);
      };

      const advanceProgress = () => {
        const phase =
          LOADING_TIMINGS.progress.phases.find(
            ({ until }) => currentProgress < until,
          ) ?? LOADING_TIMINGS.progress.phases.at(-1);
        const step = Math.floor(randomBetween(phase.step));
        const nextDelay = randomBetween(phase.delay);

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
      const readinessTimeout = new Promise((resolve) =>
        schedule(resolve, LOADING_TIMINGS.readinessTimeout),
      );

      Promise.race([
        Promise.all([windowReady, fontsReady]),
        readinessTimeout,
      ]).then(() => {
        if (cancelled) return;
        pageReady = true;
        complete();
      });

      schedule(advanceProgress, LOADING_TIMINGS.progress.initialDelay);
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
