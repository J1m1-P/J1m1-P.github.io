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
    // Edit these three values to change the Projects page's small title,
    // main title, and introductory sentence.
    pageEyebrow: "projects",
    pageTitle: "The Gallery",
    pageDescription: "Ideas are cheap. Show me the product.",
  },
  skills: {
    eyebrow: "How I work",
    title: "Skills beyond the toolset",
  },
  about: {
    eyebrow: "About",
    title: "From Circuits to Code",
    description:
      "I’m an Engineering Physics student at UBC with a strong interest in embedded systems, firmware, and software that interacts with the physical world.",
    details:
      "I enjoy solving problems that cross the boundary between hardware and software — especially when they involve real constraints, careful design, and reliable execution. Through projects like UBC Rocket, I work on systems that are meant to perform beyond the classroom.",
    opportunity:
      "I’m always open to opportunities where I can learn fast, contribute meaningfully, and help build ambitious technical projects.",
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

export const skillLogos = [
  {
    name: "Git",
    image: "/images/skills/skill-logo-git.svg",
  },
  {
    name: "GitHub",
    image: "/images/skills/skill-logo-github.svg",
  },
  {
    name: "C",
    image: "/images/skills/skill-logo-c.svg",
  },
  {
    name: "C++",
    image: "/images/skills/skill-logo-cpp.svg",
  },
  {
    name: "Python",
    image: "/images/skills/skill-logo-python.svg",
  },
  {
    name: "PlatformIO",
    image: "/images/skills/skill-logo-platformio.svg",
  },
  {
    name: "Arduino",
    image: "/images/skills/skill-logo-arduino.svg",
  },
  {
    name: "STM32",
    image: "/images/skills/skill-logo-stm32.svg",
  },
  {
    name: "ESP32",
    image: "/images/skills/skill-logo-espressif.svg",
  },
  {
    name: "Raspberry Pi",
    image: "/images/skills/skill-logo-rpi.svg",
  },
  {
    name: "Altium Designer",
    image: "/images/skills/skill-logo-altium.svg",
  },
  {
    name: "KiCad",
    image: "/images/skills/skill-logo-kicad.svg",
  }
];
