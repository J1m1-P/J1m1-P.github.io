/**
 * Portfolio projects are defined here and rendered throughout the site.
 *
 * To add a project, append one object with a unique `id`, a local `image`,
 * a short `title`, and a one- or two-sentence `description`. `tags`, `website`,
 * and `repository` are optional.
 */
export const projects = [
  {
    id: "ryde",
    title: "Ryde — On-Demand Rides",
    description:
      "A full-stack ride-booking app with real-time tracking, secure payments, and a focused mobile interface.",
    image: "/images/project1.png",
    imageAlt: "Ryde mobile application screens",
    tags: ["React Native", "Node.js", "MongoDB"],
    accent: "#151c2b",
  },
  {
    id: "library-platform",
    title: "Library Management Platform",
    description:
      "A streamlined platform for browsing, borrowing, and managing a library collection.",
    image: "/images/project2.png",
    imageAlt: "Library management platform interface",
    tags: ["Web app", "Management"],
    accent: "#ffefdb",
  },
  {
    id: "yc-directory",
    title: "YC Directory",
    description:
      "A searchable directory designed to make exploring startup profiles quick and approachable.",
    image: "/images/project3.png",
    imageAlt: "YC Directory website interface",
    tags: ["Directory", "Search"],
    accent: "#ffe7eb",
  },
];
