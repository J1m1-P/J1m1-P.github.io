/**
 * Portfolio projects are defined here and rendered throughout the site.
 *
 * To add a project, copy the non-rendering template at the end of this file and
 * append the completed object to `projects`. Use `tier: "featured"` for a large
 * card or `tier: "secondary"` for the compact grid. `image`, `imageAlt`,
 * `compactSummary`, `skills`, `github`, `website`, `news`, `githubVisible`,
 * `privateSource`, `projectType`, and `subprojects` are optional. Set
 * `githubVisible` to false to keep a repository URL ready without rendering
 * its link. Each subproject can have a
 * title and a short description. Add `images: [{ src, alt }, { src, alt }]`
 * to show two photos side by side; one image or no images also works.
 */
export const projects = [
  {
    id: "enph-253-autonomous-robot",
    tier: "featured",
    title: "Crabby - Autonomous Robot",
    image: "/images/projects/crabby/crabby.png",
    summary:
      "Crabby is an autonomous competition robot developed for a UBC Engineering Physics course, built around two ESP32-S3 microcontrollers and a Raspberry Pi. It combined a four-wheel omni-directional drivetrain, closed-loop motor control, optical odometry, ToF sensing, computer vision, and custom inter-processor communication to autonomously navigate and execute competition tasks. Crabby was the only robot capable of completing all five tasks and finished third overall, despite scoring more points than the second-place robot.",
    skills: ["C/C++", "Embedded Systems", "ESP32-S3", "Raspberry Pi", "Control Systems", "Computer Vision", "PCB Design", "Robotics"],
    github: "https://github.com/J1m1-P/Robot-Summer-Team-5",
    news: "https://engineering.ubc.ca/news/2026/mars-madness-takes-over-annual-ubc-student-robot-competition",
    subprojects: [
      {
        title: "PCB Design",
        description: "I designed a set of custom PCBs to clean up Crabby's electrical system and make the hardware easier to build and maintain. That included dedicated boards for power distribution, motor-control logic, tape-following sensors, and H-bridge motor driving, which cut down on loose wiring and gave the robot a much more organized and reliable electrical layout.",
        images: [
          { src: "/images/projects/crabby/schematic.png", alt: "Crabby drivetrain control schematic" },
          { src: "/images/projects/crabby/pcb.jpg", alt: "Crabby drivetrain control PCB" },
        ],
      },
      {
        title: "CAD / Mechanical",
        description: "The mechanical design was built around handling several very different competition tasks without making the robot overly complicated. It used dedicated claws for habitat pieces, three smaller claws that could grab and stack all three tower pieces together, and a motorized locating mechanism with a V-shaped guide and microswitch to precisely find the tower base. The robot also carried a metal-detection arm on the right side and suspended optical sensors on both sides so they could stay close to the floor and maintain reliable readings over uneven surfaces.",
        images: [
          { src: "/images/projects/crabby/crabby-cad-front.png", alt: "Crabby CAD model - front" },
          { src: "/images/projects/crabby/crabby-cad-back.png", alt: "Crabby CAD model - back" },
        ],
      },
      {
        title: "Firmware / Drivers",
        description: "I built Crabby's firmware around a modular driver layer that handled everything from motors and encoders to servos and custom tape-following sensors. The two ESP32-S3s and Raspberry Pi communicated over UART, while SPI and I²C connected the optical and LiDAR sensors; I also integrated the vendor LiDAR libraries, added module-level tests, and kept the overall code structure clean so behaviors could be tuned, swapped, and debugged quickly.",
      },
      {
        title: "Controls",
        description: "Our team built Crabby's four-wheel omni-directional drivetrain with a 30-degree wheel bias, giving the robot more usable torque for climbing the competition ramp while still allowing omnidirectional movement. For odometry, we mounted two optical sensors on opposite sides of the robot and used the difference between their measurements to estimate rotation and yaw, letting us track heading without relying on a gyroscope or IMU.",
      },
      {
        title: "Computer Vision",
        description: "A teammate and I built the vision pipeline that ran on the Raspberry Pi, training a YOLO model to detect the targets Crabby needed during autonomous tasks. Our final model reached about 99.9% precision, 98.1% recall, and 88.8% mAP50-95, and its detections were sent back to the embedded controllers to drive the robot's task logic.",
        images: [
          { src: "/images/projects/crabby/vision-pipeline.png", alt: "Crabby vision pipeline" },
        ],
      },
    ],
  },
  {
    id: "ghost-shell-linux-desktop-environment",
    tier: "secondary",
    title: "Ghost Shell - Custom Linux Desktop",
    summary:
      "I built Ghost Shell as a unified Linux desktop configuration rather than a collection of unrelated dotfiles. It brings together the window manager, status bar, notifications, launcher, session controls, lock/idle behavior, terminal, and file manager into one consistent workflow, while keeping the configuration organized and reproducible.",
    compactSummary:
      "A custom Ubuntu + Hyprland desktop built as a cohesive, reproducible Linux environment with automated configuration, integrated system tools, and a consistent visual design.",
    skills: ["Linux", "Hyprland", "Bash", "systemd", "Wayland"],
    github: "https://github.com/J1m1-P/rice-config",
    detailsLayout: "two-column-grid",
    subprojects: [
      {
        title: "Desktop Integration",
        description: "Configured a cohesive Hyprland-based desktop using Waybar, SwayNC, Rofi, Hyprlock/Hypridle, Kitty, and Thunar, with shared styling, keyboard-driven workflows, and consistent system controls.",
      },
      {
        title: "Configuration & Reliability",
        description: "Organized the setup as a version-controlled configuration repository with modular configs, symlink-based deployment, setup and validation scripts, and session startup/shutdown handling for desktop services.",
      },
    ],
  },
  {
    id: "personal-portfolio-website",
    tier: "secondary",
    title: "Portfolio Website",
    image: "/images/projects/portfolio/homepage.png",
    imageBackdrop: "card",
    imageAlt: "Portfolio homepage with an engineering introduction and interactive terminal",
    summary:
      "A responsive, dark-themed portfolio built with React to showcase my engineering work through reusable components, interactive project details, and custom animations. Developed iteratively with Codex assisting implementation and refactoring while I directed the design, content, and interactions.",
    compactSummary:
      "A responsive, dark-themed portfolio built with React, reusable components, and custom interactive details.",
    skills: ["React", "JavaScript", "CSS", "UI/UX Design", "Frontend Development", "AI-Assisted Development"],
    github: "https://github.com/J1m1-P/J1m1-P.github.io",
    website: "https://j1m1-p.github.io/",
    detailsLayout: "two-column-grid",
    subprojects: [
      {
        title: "Design & Interaction",
        description: "Built a responsive dark-themed portfolio with reusable layouts, expandable project details, and small interactive touches that make the site more interesting to explore.",
      },
      {
        title: "AI-Assisted Development",
        description: "I used Codex extensively to help implement, refactor, and iterate on the site while I directed the design, content, interactions, and overall structure.",
      },
    ],
  },
  {
    id: "java-image-processor",
    tier: "secondary",
    title: "Image Processor",
    image: "/images/projects/java-image-processor/jip-cover.jpg",
    imageAlt: "Three brown bears walking beside a river",
    summary:
      "Built an object-oriented Java image-processing library implementing pixel-level transformations, neighborhood-based filtering, green-screen region detection, and image similarity matching. Wrote a JUnit test suite covering core functionality and edge cases, achieving 92.65% branch coverage.",
    compactSummary:
      "An object-oriented Java image-processing library with pixel transformations, neighborhood filters, region detection, similarity matching, and 92.65% branch coverage.",
    skills: ["Java", "JUnit", "Image Processing", "Algorithms", "OOP"],
    projectType: "Course Project",
    privateSource: true,
    detailsLayout: "three-column-grid",
    subprojects: [
      {
        title: "Image Processing Algorithms",
        description: "Implemented mirroring, negative transformation, posterization, median-based denoising, neighborhood-based weathering, and block painting through direct pixel and RGB manipulation rather than an external image-processing library.",
      },
      {
        title: "Similarity & Region Detection",
        description: "Converted images to grayscale, calculated cosine similarity from pixel intensities, and ranked candidate images by similarity. Also implemented connected-region detection with 8-neighbour connectivity to support green-screen background replacement.",
      },
      {
        title: "Testing & Coverage",
        description: "Wrote JUnit 5 tests for expected behavior and edge cases across transformations, filtering, cosine similarity, candidate matching, and green-screen behavior, reaching 92.65% branch coverage and 94.44% line coverage.",
      },
    ],
  },
  {
    id: "graph-algorithms-library",
    tier: "secondary",
    title: "Graph Algorithms Library",
    image: "/images/projects/graph-algorithms/ga-cover.webp",
    imageAlt: "Abstract network of connected nodes representing a graph",
    summary:
      "Built two weighted graph representations behind a common interface and implemented path-cost, minimum-cost path, connected-component, diameter, and center operations. The project achieved 96.46% overall test coverage, including 97.33% branch coverage.",
    compactSummary:
      "A Java course project implementing weighted graphs with adjacency-list and adjacency-matrix representations, including path analysis, graph metrics, and 97.33% branch coverage.",
    skills: ["Java", "Data Structures", "Graph Algorithms", "JUnit", "OOP"],
    visibleSkillCount: 5,
    projectType: "Course Project",
    privateSource: true,
    detailsLayout: "three-column-grid",
    subprojects: [
      {
        title: "Graph Representations",
        description: "Implemented weighted undirected graphs using both adjacency-list and adjacency-matrix representations behind a shared graph interface.",
      },
      {
        title: "Graph Analysis",
        description: "Implemented path-cost and minimum-cost path calculations, connected-component traversal, and graph diameter and center calculations.",
      },
      {
        title: "Testing",
        description: "Wrote JUnit tests for graph construction, modification, queries, and path operations, contributing to 96.46% overall test coverage.",
      },
    ],
  },
];

/*
Project entry template (copy into the array above; this block does not render):
{
  id: "unique-project-id",
  tier: "secondary", // "featured" or "secondary"
  title: "Project title",
  image: "/images/projects/project-folder/cover.webp", // optional
  imageAlt: "Concise description of the image",
  summary: "Full project summary.",
  compactSummary: "Short summary for a secondary card.",
  skills: ["Technology", "Skill"],
  github: "https://github.com/...", // omit if unavailable
  website: "https://...", // optional
  news: "https://...", // optional
  privateSource: false,
  projectType: "Course Project", // optional source-status context
  subprojects: [
    {
      title: "Area of work",
      description: "What you built or contributed.",
      images: [{ src: "/images/projects/project-folder/detail.webp", alt: "..." }],
    },
  ],
},
*/
