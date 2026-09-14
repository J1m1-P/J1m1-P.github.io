import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const catImages = {
  idle: '/images/cats/animation/gray-lying.png',
  moving: '/images/cats/animation/gray-standing.png',
  preparingToJump: '/images/cats/animation/gray-about-to-jump.png',
  jumping: '/images/cats/animation/gray-jumping.png',
};

const timing = {
  traverse: 2600,
  hops: 5,
  prepare: 350,
  jump: 850,
  transition: 280,
};

const CatPersonalTrigger = ({ onPersonalTransitionStarted }) => {
  const navigate = useNavigate();
  const [phase, setPhase] = useState('idle');
  const phaseRef = useRef('idle');
  const sceneRef = useRef(null);
  const catRef = useRef(null);
  const frameRef = useRef(0);
  const timersRef = useRef([]);

  useEffect(() => () => {
    cancelAnimationFrame(frameRef.current);
    timersRef.current.forEach(clearTimeout);
  }, []);

  const changePhase = (nextPhase) => {
    phaseRef.current = nextPhase;
    setPhase(nextPhase);
  };

  const setProgress = (progress) => {
    const scene = sceneRef.current;
    const cat = catRef.current;
    if (!scene || !cat) return;

    const travel = Math.max(0, scene.clientWidth - cat.offsetWidth);
    scene.style.setProperty('--cat-x', `${Math.round(travel * progress)}px`);
  };

  const navigateToPersonal = () => {
    if (phaseRef.current !== 'transitioning') return;
    phaseRef.current = 'navigating';
    onPersonalTransitionStarted();
    navigate('/personal');
  };

  const beginTransition = () => {
    if (phaseRef.current !== 'jumping') return;

    const catBounds = catRef.current?.getBoundingClientRect();
    if (catBounds && catBounds.left < window.innerWidth && catBounds.top < window.innerHeight) {
      timersRef.current.push(setTimeout(beginTransition, 100));
      return;
    }

    changePhase('transitioning');
    // The animation event is primary; this covers browsers that skip it.
    timersRef.current.push(setTimeout(navigateToPersonal, timing.transition + 100));
  };

  const startJump = () => {
    const scene = sceneRef.current;
    const cat = catRef.current;
    if (!scene || !cat) return;

    const bounds = scene.getBoundingClientRect();
    const exitX = window.innerWidth - bounds.left + cat.offsetWidth;
    const exitY = Math.max(cat.offsetHeight * 2, window.innerHeight - bounds.top + cat.offsetHeight);
    scene.style.setProperty('--exit-x', `${exitX}px`);
    scene.style.setProperty('--exit-y', `${exitY}px`);
    changePhase('jumping');
    // The animation event is primary; this covers browsers that skip it.
    timersRef.current.push(setTimeout(beginTransition, timing.jump + 100));
  };

  const startAnimation = () => {
    if (phaseRef.current !== 'idle') return;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      onPersonalTransitionStarted();
      navigate('/personal');
      return;
    }

    changePhase('moving');
    const startedAt = performance.now();
    const tick = (now) => {
      const progress = Math.min((now - startedAt) / timing.traverse, 1);
      const smoothstep = progress * progress * (3 - 2 * progress);
      setProgress(progress * 0.4 + smoothstep * 0.6);

      if (progress < 1) {
        frameRef.current = requestAnimationFrame(tick);
      } else {
        changePhase('preparingToJump');
        timersRef.current.push(setTimeout(startJump, timing.prepare));
      }
    };
    frameRef.current = requestAnimationFrame(tick);
  };

  return (
    <div
      className={`contact-cat-scene is-${phase}`}
      ref={sceneRef}
      style={{
        '--hop-duration': `${timing.traverse / timing.hops}ms`,
        '--hop-count': timing.hops,
        '--jump-duration': `${timing.jump}ms`,
        '--transition-duration': `${timing.transition}ms`,
      }}
    >
      <span className="contact-cat-bar" aria-hidden="true" />
      {phase !== 'transitioning' && (
        <button
          className="contact-cat"
          type="button"
          ref={catRef}
          aria-label="Follow the cat to the Personal page"
          disabled={phase !== 'idle'}
          onClick={startAnimation}
          onAnimationEnd={(event) => {
            if (event.target === event.currentTarget && event.animationName === 'contact-cat-exit') {
              beginTransition();
            }
          }}
        >
          <img
            className={`contact-cat-image${phase === 'idle' ? '' : ' is-facing-right'}`}
            src={catImages[phase]}
            alt=""
            draggable="false"
          />
        </button>
      )}
      {phase === 'transitioning' && (
        <div
          className="contact-cat-transition"
          aria-hidden="true"
          onAnimationEnd={(event) => {
            if (event.target === event.currentTarget && event.animationName === 'contact-cat-page-out') {
              navigateToPersonal();
            }
          }}
        />
      )}
    </div>
  );
};

export default CatPersonalTrigger;
