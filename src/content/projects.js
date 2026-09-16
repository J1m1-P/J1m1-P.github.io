/**
 * Portfolio projects are defined here and rendered throughout the site.
 *
 * To add a project, append one object with a unique `id`, a short `title`,
 * a concise `summary`, and an `image`. `imageAlt`, `skills`, `github`, `website`,
 * `news`, and `subprojects` are optional. Each subproject can have a
 * title and a short description. Add `images: [{ src, alt }, { src, alt }]`
 * to show two photos side by side; one image or no images also works.
 */
export const projects = [
  {
    id: "enph-253-autonomous-robot",
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
];
