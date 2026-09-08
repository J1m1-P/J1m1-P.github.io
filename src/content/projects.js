/**
 * Portfolio projects are defined here and rendered throughout the site.
 *
 * To add a project, append one object with a unique `id`, a short `title`,
 * and a concise `summary`. `image`, `imageAlt`, `skills`, `github`, `website`,
 * `news`, and `accent` are optional.
 */
export const projects = [
  {
    id: "enph-253-autonomous-robot",
    title: "Crabby — Autonomous Robot",
    image: "/images/projects/crabby.png",
    summary:
      "Crabby is an autonomous competition robot developed for a UBC Engineering Physics course, built around two ESP32-S3 microcontrollers and a Raspberry Pi. It combined a four-wheel omni-directional drivetrain, closed-loop motor control, optical odometry, ToF sensing, computer vision, and custom inter-processor communication to autonomously navigate and execute competition tasks. Crabby was the only robot capable of completing all five tasks and finished third overall, despite scoring more points than the second-place robot.",
    skills: ["C/C++", "Embedded Systems", "ESP32-S3", "Raspberry Pi", "Control Systems", "Computer Vision", "PCB Design", "Robotics"],
    github: "https://github.com/J1m1-P/Robot-Summer-Team-5",
    news: "https://engineering.ubc.ca/news/2026/mars-madness-takes-over-annual-ubc-student-robot-competition",
  },
];
