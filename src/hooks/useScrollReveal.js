import { useEffect, useRef, useState } from "react";

const canRevealOnScroll = () => (
  typeof window !== "undefined"
  && "IntersectionObserver" in window
  && !window.matchMedia("(prefers-reduced-motion: reduce)").matches
);

const useScrollReveal = ({ rootMargin = "0px", threshold = 0.1 } = {}) => {
  const elementRef = useRef(null);
  const [isVisible, setIsVisible] = useState(() => !canRevealOnScroll());

  useEffect(() => {
    if (isVisible || !elementRef.current || !canRevealOnScroll()) return undefined;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setIsVisible(true);
        observer.disconnect();
      },
      { rootMargin, threshold },
    );

    observer.observe(elementRef.current);
    return () => observer.disconnect();
  }, [isVisible, rootMargin, threshold]);

  return { elementRef, isVisible };
};

export default useScrollReveal;
