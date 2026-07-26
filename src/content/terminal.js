import { projects } from "./projects.js";
import { resume, site } from "./site.js";

const projectFiles = Object.fromEntries(
  projects.map((project) => [
    `${project.id}.txt`,
    {
      content: [
        project.title,
        "",
        project.description,
        "",
        `Tags: ${project.tags?.join(", ") || "Not listed"}`,
      ].join("\n"),
      url: project.website || project.repository,
    },
  ]),
);

/**
 * Edit the prompt, welcome message, shortcut buttons, and browsable files here.
 * A file is an object with `content`. A folder is an object containing files.
 */
export const terminal = {
  user: "J1m1",
  host: "Terminal",
  welcome: [
    `Welcome to my website.`,
    'Type "help" to see the available commands.',
  ],
  shortcuts: ["help", "ls", "cat about.txt", "clear", "reboot"],
  files: {
    "about.txt": {
      content: `${site.name}\n${site.intro.role}\n\n${site.about.description}`,
    },
    [resume.fileName]: {
      content: resume.content,
      url: resume.url,
    },
    projects: projectFiles,
  },
};
