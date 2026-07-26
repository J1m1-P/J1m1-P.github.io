/**
 * Edit personal details, page headings, resume information, and repeated cards
 * here. Project and terminal-specific content live beside this file.
 */
export const site = {
  name: "Jimmy Pan",
  intro: {
    titleStart: "Bringing",
    titleEnd: "into the Real World",
    greeting: "Hello, I'm Jimmy.",
    role: "3rd Year Engineering Physics (ENPH) @ UBC",
    button: "Get to Know Me",
    buttonTo: "/about",
  },
  projects: {
    pageEyebrow: "Portfolio",
    pageTitle: "All Projects",
    pageDescription:
      "A collection of software and engineering work. Each entry is managed from one project content file.",
  },
  skills: {
    eyebrow: "How I work",
    title: "Skills beyond the toolset",
  },
  about: {
    eyebrow: "About",
    title: "Engineering across disciplines",
    description:
      "I'm studying Engineering Physics at UBC, where I've become especially interested in problems that cross the boundary between hardware and software. On the UBC Rocket Design Team, I develop firmware and software for systems that must work reliably outside the classroom.",
    opportunity:
      "I'm always open to opportunities where I can learn quickly, contribute to meaningful technical work, and collaborate with people building ambitious things.",
  },
  experience: {
    eyebrow: "Experience",
    title: "Where I'm learning and building",
    description:
      "My current engineering education and team experience.",
  },
  contact: {
    eyebrow: "Contact",
    title: "Let's connect",
    description:
      "Use one of the links below to get in touch.",
    emptyMessage: "Contact links will be added soon.",
  },
  resume: {
    eyebrow: "Resume",
    title: "My resume",
    description:
      "A concise overview of my education, experience, and technical work.",
    emptyMessage: "My resume will be available here soon.",
  },
};

export const resume = {
  fileName: "resume.txt",
  content:
    "Resume link not configured yet.\n\nPlace your PDF in public/ and set `url` in src/content/site.js.",
  url: "",
};

export const navLinks = [
  { name: "About", to: "/about" },
  { name: "Projects", to: "/projects" },
  { name: "Experience", to: "/experience" },
  { name: "Contact", to: "/contact" },
];

export const experience = [
  {
    title: "Firmware & Software",
    organization: "UBC Rocket Design Team",
    period: "Current",
    description:
      "Working on and learning about firmware and software development for real-world engineering projects.",
  },
  {
    title: "Engineering Physics",
    organization: "University of British Columbia",
    period: "Expected graduation 2028",
    description:
      "An interdisciplinary engineering education spanning software, electronics, physics, and design.",
  },
];

export const contactLinks = [
  { label: "Email", url: "" },
  { label: "GitHub", url: "" },
  { label: "LinkedIn", url: "" },
];

export const introWords = [
  { text: "Ideas", image: "/images/ideas.svg" },
  { text: "Theory", image: "/images/concepts.svg" },
  { text: "Systems", image: "/images/designs.svg" },
  { text: "Code", image: "/images/code.svg" },
];

export const highlights = [
  {
    value: "Engineering Physics",
    label: "Engineering beyond one domain",
  },
  {
    value: "UBC Rocket",
    label: "Firmware and embedded systems",
  },
  {
    value: "89.8%",
    label: "Cumulative engineering average",
  },
  {
    value: "Real Projects",
    label: "From idea to deployment",
  },
];

export const skills = [
  {
    image: "/images/learning1.png",
    title: "Adaptable Learner",
    description:
      "Quickly learning new concepts, adjusting to feedback, and improving through iteration.",
  },
  {
    image: "/images/communication1.png",
    title: "Clear Communication",
    description:
      "Explaining ideas, decisions, and progress clearly so everyone stays aligned.",
  },
  {
    image: "/images/teamwork8.png",
    title: "Collaborative & Supportive",
    description:
      "Working closely with teammates, sharing knowledge, and contributing reliably.",
  },
];

export const technologyLogos = Array.from({ length: 11 }, (_, index) => ({
  name: `Technology ${index + 1}`,
  image: `/images/logos/company-logo-${index + 1}.png`,
}));
