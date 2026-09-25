/**
 * Edit personal details, page headings, contact links, and repeated cards here.
 * Project, experience, and terminal-specific content live beside this file.
 */
export const resume = {
  fileName: "resume.pdf",
  content: "Jimmy Pan's current engineering resume.",
  url: "/images/resume/Resume_JimmyPan.pdf",
};

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
        url: "mailto:jimmypan0410@gmail.com",
        handle: "jimmypan0410@gmail.com",
        description: "The best way to reach me",
        icon: "email",
        priority: "email",
        copyable: true,
      },
      {
        name: "GitHub",
        url: "https://github.com/j1m1-p",
        icon: "github",
        priority: "primary",
        newTab: true,
      },
      {
        name: "LinkedIn",
        url: "https://www.linkedin.com/in/jimmypan-ubc-enph",
        icon: "linkedin",
        priority: "primary",
        newTab: true,
      },
      {
        name: "Resume",
        url: resume.url,
        icon: "resume",
        priority: "primary",
        newTab: true,
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

};

export const navLinks = [
  { name: "About", to: "/about" },
  { name: "Projects", to: "/projects" },
  { name: "Experience", to: "/experience" },
  { name: "Contact", to: "/contact" },
];

export const introWords = [
  { text: "Ideas", image: "/images/home/intro/ideas.svg" },
  { text: "Theory", image: "/images/home/intro/theory.svg" },
  { text: "Systems", image: "/images/home/intro/systems.svg" },
  { text: "Code", image: "/images/home/intro/code.svg" },
];

export const skillLogos = [
  {
    name: "Git",
    image: "/images/icons/technologies/git.svg",
  },
  {
    name: "GitHub",
    image: "/images/icons/technologies/github.svg",
  },
  {
    name: "C",
    image: "/images/icons/technologies/c.svg",
  },
  {
    name: "C++",
    image: "/images/icons/technologies/cpp.svg",
  },
  {
    name: "Python",
    image: "/images/icons/technologies/python.svg",
  },
  {
    name: "PlatformIO",
    image: "/images/icons/technologies/platformio.svg",
  },
  {
    name: "Arduino",
    image: "/images/icons/technologies/arduino.svg",
  },
  {
    name: "STM32",
    image: "/images/icons/technologies/stm32.svg",
  },
  {
    name: "ESP32",
    image: "/images/icons/technologies/espressif.svg",
  },
  {
    name: "Raspberry Pi",
    image: "/images/icons/technologies/rpi.svg",
  },
  {
    name: "Altium Designer",
    image: "/images/icons/technologies/altium.svg",
  },
  {
    name: "KiCad",
    image: "/images/icons/technologies/kicad.svg",
  }
];
