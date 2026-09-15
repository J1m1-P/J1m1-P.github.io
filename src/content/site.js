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

  about: {
    eyebrow: "About",
    title: "My Background",
    description:
      "I'm a third-year Engineering Physics student at UBC who enjoys working with both software and hardware. I'm especially interested in firmware, embedded systems, controls, and anything that interacts with the physical world.",
    details:
      "I like projects where I get to think through design decisions, tradeoffs, and physical constraints with other people. I'm currently co-leading the UBC Rocket Firmware Team, and I'm also researching a personal project involving an FPV quadcopter with a custom STM32-based flight controller.",
    opportunity:
      "I'm always looking to learn something new and contribute to interesting projects, so if anything I'm working on catches your interest, feel free to reach out!",
  },

  projects: {
    // Edit these three values to change the Projects page's small title,
    // main title, and introductory sentence.
    pageEyebrow: "projects",
    pageTitle: "Things I've Built",
    pageDescription: "Courses teach the theory. Projects teach the rest.",
  },

  skills: {
    eyebrow: "How I work",
    title: "Skills beyond the toolset",
  },

  experience: {
    eyebrow: "Experience",
    title: "Aside From Projects",
    description:
      "Titles are nice. What you do matters more.",
  },

  /**
   * CONTACT PAGE
   * Add, remove, or reorder entries in links to update the page.
   * Set enabled: false to hide one without deleting it.
   *
   * TODO: Replace the example email, profile URLs, and handles below.
   */
  contact: {
    eyebrow: "Contact",
    title: "Let's Connect",
    description:
      "I'm always happy to chat about firmware, embedded systems, robotics, or whatever interesting project you're working on. Feel free to reach out.",
    getInTouchLabel: "Get in touch",
    emptyMessage: "Contact links will be added soon.",
    footer: {
      copyright: "© 2026 Jimmy Pan",
      sourceLabel: "View Source",
      sourceUrl: "https://github.com/J1m1-P/J1m1-P.github.io",
    },
    links: [
      {
        name: "Email",
        type: "email",
        url: "mailto:jimmypan0410@gmail.com",
        handle: "jimmypan0410@gmail.com",
        description: "The best way to reach me",
        icon: "email",
        priority: "email",
        copyable: true,
      },
      {
        name: "GitHub",
        type: "external",
        url: "https://github.com/j1m1-p",
        icon: "github",
        priority: "primary",
        newTab: true,
      },
      {
        name: "LinkedIn",
        type: "external",
        url: "https://www.linkedin.com/in/jimmypan-ubc-enph",
        icon: "linkedin",
        priority: "primary",
        newTab: true,
      },
      {
        name: "Resume",
        type: "document",
        url: "/resume",
        icon: "resume",
        priority: "primary",
        newTab: false,
      },
    ],
    testimonials: {
      eyebrow: "Testimonials",
      items: [
        {
          quote:
            "When I worked with Jimmy in a project course, he was the sharpest mind on the team. He always found creative solutions that greatly benefited the project. Beyond his technical skills, he is also an amazing person to work with. I look forward to working with him again in ENPH 353!",
          name: "Samuel Lau",
          role: "Software Lead",
          organization: "UBC Thunderbots",
        },
        {
          quote:
            "I worked with Jimmy on Crabby, our autonomous robot for the UBC Engineering Physics Robot Summer Competition. He was an incredibly dedicated teammate, often working late nights and weekends to keep the team on track while staying optimistic through difficult troubleshooting sessions. \n\n Jimmy also demonstrated strong firmware and software skills, developing many of our core drivers, including drivers for UART communication between our two ESP32s and Raspberry Pi, stepper motors, DC motors, encoders, and our custom tape-following sensors. He also developed a flexible task-sequencing platform that made tuning and modifying the robot's actions much easier.",
          name: "Peter Lu",
          role: "Integration Lead",
          organization: "UBC Supermileage",
        },
        {
          quote:
            "I worked with Jimmy on the Embedded Software team at UBC Rocket, where I had the opportunity to oversee his work and see his strong technical ability, initiative, and ownership firsthand. He made significant contributions to our ground control software, using C++ and Qt to support real-time telemetry, vehicle configuration, data visualization, and communication with our rocket systems.\n \n Jimmy is a quick learner who approaches unfamiliar problems methodically and is willing to take on difficult debugging challenges. He is dependable, collaborative, and motivated to improve both the project and the team.",
          name: "Steven Chen",
          role: "Team Captain",
          organization: "UBC Rocket",
        },
      ],
    },
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
