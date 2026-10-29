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
 * title and a short description. Add `projectLink: { projectId, label }` to
 * link to another project on this page. Add `images: [{ src, alt }, { src, alt }]`
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
        description: "I built Crabby's firmware around a modular driver layer that handled everything from motors and encoders to servos and custom tape-following sensors. The two ESP32-S3s and Raspberry Pi communicated over UART, while SPI and I2C connected the optical and LiDAR sensors; I also integrated the vendor LiDAR libraries, added module-level tests, and kept the overall code structure clean so behaviors could be tuned, swapped, and debugged quickly.",
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
    id: "ubc-rocket-firmware",
    tier: "featured",
    title: "Ulysses - Thrust Vectoring Firmware",
    image: "/images/projects/ulysses-firmware/ulysses-firmware-cover.jpg",
    summary: 
      "Ulysses is the embedded flight-control firmware for UBC Rocket's experimental thrust-vectoring rocket, built around a dual-core STM32H745 microcontroller (Cortex-M7/M4) and FreeRTOS. The system integrates onboard sensors, state estimation, and real-time control algorithms to support active vehicle stabilization and thrust-vectoring. It incorporates motor and servo control, radio telemetry, inter-core communication, and SD-card flight-data logging. As Firmware Lead, I'm helping modernize the codebase with a modular hardware-abstraction architecture, CMake-based builds, automated testing, and GitHub CI to improve maintainability, reliability, and development workflows.", 
    skills: ["C/C++", "STM32H745", "FreeRTOS", "Embedded Systems", "Sensor Fusion", "CMake", "GitHub CI/CD", "SPI/I2C/UART"],
    github: "https://github.com/UBC-Rocket/ulysses", 
    subprojects: [
      {
        title: "Firmware Architecture & FreeRTOS",
        description: "Ulysses runs on an STM32H745 dual-core flight controller, utilizing Cortex-M7 and Cortex-M4 processors with FreeRTOS for real-time embedded operations. The firmware follows a layered architecture separating hardware peripherals, I/O interfaces, system services, and application logic. As Firmware Lead, I'm guiding the modernization of this architecture, restructuring the codebase into modular components, establishing clearer boundaries between layers, and coordinating the migration of existing flight-control functionality.", 
        images: [
          {src: "/images/projects/ulysses-firmware/architecture.png"}
        ]
      }, 
      {
        title: "Sensors & Actuators Drivers", 
        description: "As Firmware Lead, I review PRs involving STM32 peripheral configuration, driver development, and hardware integration, with particular attention to clock configurations, registers, interrupts, DMA, and communication timing. My hands-on work includes implementing asynchronous, interrupt-driven I2C communication from scratch, refactoring servo drivers, developing PWM-based actuation, and contributing to early DShot communication for ESCs. I also have experience implementing UART and SPI interfaces, integrating IMUs and other sensors using vendor libraries, and working with peripheral registers and datasheets to debug hardware behavior.", 
        images: [
          {src: "images/projects/ulysses-firmware/mech-design-5.png"}
        ]
      }, 
      {
        title: "Flight Control & State Estimation", 
        description: "As a member of both the Firmware and Controls teams, I work closely with controls developers to integrate PID-based flight-control algorithms and Extended Kalman Filter (EKF) state estimation into our STM32 firmware. I've also been independently studying Kalman filtering, sensor fusion, and control theory to better understand how sensor measurements are processed into reliable state estimates for feedback control. I also contributed to the development of the Ulysses Ground Control Station alongside other team members, building tools for real-time telemetry visualization, PID tuning, vehicle configuration, and diagnostics to support the Controls team's testing and development.", 
        images: [
          {src: "images/projects/ulysses-firmware/controls-design.png"}
        ]
      }, 
      {
        title: "Communication & Flight Data Logging", 
        description: "Ulysses' previous firmware implementation supports bidirectional communication with the Ground Control Station through RFD900 radio modules and UART, using Protocol Buffers, COBS framing, and CRC16 for structured packet transmission. The system handles flight commands, PID tuning, vehicle configuration, and periodic telemetry containing estimated states, actuator outputs, and system health. It also implements asynchronous SD-card logging using DMA, buffered writes, and inter-core data transfer, alongside Python tools for decoding flight records and supporting post-test analysis.", 
        projectLink: {
          projectId: "ubc-rocket-ulysses-gcs",
          label: "View Ground Control Station",
        },
      }, 
      {
        title: "Development Infrastructue & Testing", 
        description: "I work with CMake-based dual-core STM32 builds and GitHub Actions CI, which runs Debug/Release builds and automated code-format checks. As Firmware Lead, I review PRs involving STM32 clock-tree configurations, peripheral initialization, interrupt and DMA handling, and driver implementations. I also help establish the firmware's layered architecture, coding conventions, and development workflow, including structured PR reviews and technical documentation.", 

      }
    ]
  },
  {
    id: "ubc-rocket-ulysses-gcs",
    tier: "secondary",
    title: "Ulysses - Rocket Ground Control Station",
    image: "/images/projects/ulysses-ground-control-station/ulysses-GCS-cover.png",
    imageAlt: "Ulysses ground control station with telemetry and configuration panels",
    summary:
      "I developed Ulysses, a C++/Qt 6 ground control station for UBC Rocket's thrust-vectoring vehicle, bringing together real-time telemetry, radio communication, vehicle configuration, and flight diagnostics. The application combines a C++ backend for serial communication and packet processing with a modular QML interface featuring dedicated flight, tuning, mapping, and diagnostics views. I also worked on CMake-based builds and Linux packaging to make the application easier to deploy and use during testing.",
    compactSummary:
      "A C++/Qt 6 ground control station for UBC Rocket's thrust-vectoring vehicle, featuring real-time telemetry, interactive 3D visualization, radio communication, PID tuning, and flight-data logging.",
    skills: ["C++", "Qt 6 / QML", "CMake", "ProtoBuf", "Linux Deployment"],
    github: "https://github.com/UBC-Rocket/thrust_vectoring_consolidated/tree/main/embedded-software/ground-station", 
    detailsLayout: "two-column-grid",
    subprojects: [
      {
        title: "Telemetry & Visualization",
        description: "Implemented real-time telemetry decoding using COBS-framed Protocol Buffers, integrating flight-state, position, attitude, and motor data into interactive QML dashboards. Built 3D rocket orientation visualization, sensor-health alerts, UWB positioning displays, and CSV telemetry logging for post-test analysis."
      }, 
      {
        title: "Communication & Control", 
        description: "Developed a Qt SerialPort communication interface supporting RFD900x radio detection, configurable RX/TX channels, and binary command transmission. Integrated flight-state commands, PID gain tuning, vehicle configuration, heartbeat messages, and reusable controller presets to support ground-based testing and control."
      }
    ]
  },
  {
    id: "ghost-shell-linux-desktop-environment",
    tier: "secondary",
    title: "Ghost Shell - Custom Linux Desktop",
    image: "/images/projects/ghost-shell/ghost-shell-cover.png",
    imageAlt: "Ghost Shell desktop with Hyprland, Waybar, and Rofi",
    summary:
      "I built Ghost Shell as a unified Linux desktop configuration rather than a collection of unrelated dotfiles. It brings together the window manager, status bar, notifications, launcher, session controls, lock/idle behavior, terminal, and file manager into one consistent workflow, while keeping the configuration organized and reproducible.",
    compactSummary:
      "A custom Ubuntu + Hyprland desktop built as a cohesive, reproducible Linux environment with automated configuration, integrated system tools, and a consistent visual design.",
    skills: ["Linux", "systemd", "Hyprland", "Bash", "Kitty", "Wayland"],
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
    skills: ["React", "Three.js", "JavaScript", "Tailwind CSS", "UI/UX Design"],
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
