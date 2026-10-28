/**
 * Timeline entries render in this order. To add one, copy the non-rendering
 * template at the end of the file and add the completed object to this array.
 */
export const experiences = [
  {
    title: "Firmware Team Lead",
    organization: "UBC Rocket Design Team",
    date: "Sept 2026 - Present",
    image: "/images/experience/firmware-team-lead2.png",
    imageAlt: "Firmware work with UBC Rocket",
    summary:
      "As Firmware Lead at UBC Rocket, I lead firmware development across our thrust-vectoring and multi-stage rocket projects, coordinating technical priorities, reviewing contributions, and mentoring new members. I also develop onboarding materials and technical lessons to help new developers get hands-on experience with embedded systems. \n\n On the technical side, I'm leading the modernization of our STM32-based flight-control firmware, including restructuring the codebase into modular hardware, service, and application layers, improving CMake build workflows, and introducing GitHub CI. My work also involves dual-core STM32H745 development, peripheral integration, FreeRTOS, and communication interfaces. I collaborate closely with the Controls and Avionics teams to translate system requirements into reliable, testable firmware for upcoming flight tests.",
  },
  {
    title: "Embedded Firmware Developer",
    organization: "UBC Rocket Design Team",
    date: "July 2025 - Aug 2026",
    image: "/images/experience/embedded-firmware-developer2.jpg",
    imageAlt: "Embedded firmware development with UBC Rocket",
    summary: 
      "As an Embedded Firmware Developer at UBC Rocket, I worked on both flight-controller firmware and ground-control software for our thrust-vectoring rocket. I developed and improved our C++/Qt 6 ground control station, supporting real-time telemetry visualization, vehicle configuration, radio communication, and sensor-data monitoring during testing. \n\n On the embedded side, I developed and refactored STM32 peripheral drivers, including servo-control interfaces, and contributed to early DShot communication development for electronic speed controllers. I also worked with embedded communication protocols, sensor integration, and debugging hardware-software interactions. Through this role, I gained hands-on experience building real-time embedded systems and integrating firmware with the broader vehicle architecture.",
  },
  {
    title: "Engineering Physics",
    organization: "University of British Columbia",
    date: "May 2025 - Present",
    image: "/images/experience/engineering-physics.png",
    imageAlt: "Engineering Physics at UBC",
    summary:
      "I joined Engineering Physics because I wanted to work across software, hardware, applied mathematics, and physics instead of staying focused on just one area. It's helped me look at projects from different perspectives and think more about how the whole system fits together, rather than only the part I'm working on. The project-heavy courses have also given me valuable hands-on experience in robotics, instrumentation, and system design.",
  },
  {
    title: "Bachelor of Applied Science",
    organization: "University of British Columbia",
    date: "Sept 2024 - Present",
    image: "/images/experience/bachelor-of-applied-science.jpg",
    imageAlt: "Engineering at the University of British Columbia",
    summary:
      "I started at UBC in general engineering, where I got my first real exposure to programming, electronics, and full-stack design. As I worked on more projects, I developed a strong interest in the field of firmware and embedded systems, which eventually led me to pursue Engineering Physics to build a deeper foundation in those areas.",
  },
];

/*
Experience entry template (copy into the array above; this block does not render):
{
  title: "Role or program",
  organization: "Organization",
  date: "Mon YYYY - Present",
  image: "/images/experience/descriptive-file-name.webp",
  imageAlt: "Concise description of the image",
  summary: "What you did, learned, or contributed.",
},
*/
