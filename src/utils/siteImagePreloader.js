import { experiences } from "../content/experiences.js";
import { projects } from "../content/projects.js";
import { introWords, skillLogos } from "../content/site.js";
import { preloadImages } from "./imagePreloader.js";
import { isVideoMedia } from "./projectMedia.js";

const homeImages = [
  "/images/home/background.png",
  ...introWords.map(({ image }) => image),
  "/images/cats/protected/white-lying.png",
  "/images/cats/protected/calico-lying.png",
  "/images/cats/protected/gray-lying.png",
];

export const routeImages = {
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
      ...projects.map(({ image }) => image).filter(Boolean),
      ...projects.flatMap(({ extraPic = [] }) =>
        extraPic.filter((item) => !isVideoMedia(item)).map(({ src }) => src),
      ),
      ...projects.flatMap(({ subprojects = [] }) =>
        subprojects.flatMap(({ images = [] }) =>
          images.map(({ src }) => src),
        ),
      ),
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

// Include only images used by the site, including collapsed project galleries.
// Content-driven lists also pick up images from newly added entries.
export const siteImages = [...new Set(
  Object.values(routeImages).flatMap(({ priority = [], standard = [] }) => [
    ...priority,
    ...standard,
  ]),
)];

export const preloadSiteImages = () => preloadImages(siteImages, "low");
