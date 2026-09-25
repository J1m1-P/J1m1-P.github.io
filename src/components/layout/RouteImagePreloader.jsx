import { useLayoutEffect } from "react";
import { useLocation } from "react-router-dom";
import { experiences } from "../../content/experiences.js";
import { projects } from "../../content/projects.js";
import { introWords, skillLogos } from "../../content/site.js";
import { preloadImages } from "../../utils/imagePreloader.js";

const homeImages = [
  "/images/home/background.png",
  ...introWords.map(({ image }) => image),
  "/images/cats/protected/white-lying.png",
  "/images/cats/protected/calico-lying.png",
  "/images/cats/protected/gray-lying.png",
];

const routeImages = {
  "/": {
    priority: [...homeImages, "/images/icons/arrow-right.svg"],
  },
  "/about": {
    priority: ["/images/about/profile.png", "/images/icons/arrow-right.svg"],
    standard: skillLogos.map(({ image }) => image),
  },
  "/projects": {
    priority: [
      projects.find(({ tier, image }) => tier === "featured" && image)?.image,
      "/images/icons/arrow-right.svg",
    ].filter(Boolean),
    standard: [
      ...projects
        .filter(({ tier, image }) => tier !== "featured" && image)
        .map(({ image }) => image),
      "/images/icons/technologies/github.svg",
    ],
  },
  "/experience": {
    priority: ["/images/icons/arrow-right.svg"],
    standard: experiences.flatMap(({ image }) => image ? [image] : []),
  },
  "/contact": {
    priority: [
      "/images/cats/animation/gray-lying.png",
      "/images/cats/animation/gray-standing.png",
      "/images/cats/animation/gray-about-to-jump.png",
      "/images/cats/animation/gray-jumping.png",
    ],
  },
};

const RouteImagePreloader = () => {
  const { pathname } = useLocation();

  useLayoutEffect(() => {
    const images = routeImages[pathname];

    if (!images) return;

    // Start every visible-page request together, while giving above-the-fold
    // and animation assets precedence in the browser's network scheduler.
    preloadImages(images.priority ?? [], "high");
    preloadImages(images.standard ?? []);
  }, [pathname]);

  return null;
};

export default RouteImagePreloader;
