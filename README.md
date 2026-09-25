# Jimmy Pan — Engineering Portfolio

This repository contains [Jimmy Pan's personal engineering portfolio](https://j1m1-p.github.io/). It highlights projects, technical experience, and interests across firmware, embedded systems, robotics, and software development.

## Website overview

The site provides a concise introduction to Jimmy's background, expandable project case studies, an experience timeline, testimonials, a downloadable resume, and contact links. It also includes a small interactive terminal and a few intentionally playful details.

## Tech stack

- React 19 and React Router 7
- Vite 7
- Tailwind CSS 4 plus project-specific CSS
- ESLint 9
- GitHub Actions and GitHub Pages

## Local development

Use Node.js 20.19 or newer (Node.js 22.12+ or 24 is also supported). Install the locked dependencies and start the Vite development server:

```bash
npm ci
npm run dev
```

Create and inspect a production build with:

```bash
npm run build
npm run preview
```

Run the repository's static checks with:

```bash
npm run lint
```

The project does not currently have an automated test suite.

## Project structure and maintenance

```text
.github/workflows/deploy.yml    GitHub Pages build and deployment
public/images/                  Static images, icons, and resume PDF
src/components/                 Shared layout and interface components
src/content/                    Portfolio content and terminal data
src/features/                   Components grouped by site feature
src/pages/                      Route-level page components
src/utils/                      Shared browser utilities
src/App.jsx                     Application routes and global interactions
src/index.css                   Global, responsive, and animation styles
```

Most routine content updates are intentionally data-driven:

- Add or edit projects in `src/content/projects.js`. The file includes a commented entry template for featured and secondary projects.
- Add or edit timeline entries in `src/content/experiences.js`. A commented entry template documents every supported field.
- Update personal copy, navigation, contact links, testimonials, technology logos, and the resume path in `src/content/site.js`.
- Store project media under `public/images/projects/<project-name>/` and experience media under `public/images/experience/`. Paths referenced from content files begin with `/images/` and are case-sensitive on GitHub Pages.
- Replace `public/images/resume/Resume_JimmyPan.pdf` to update the downloadable resume without changing its existing links. If the filename changes, update the single `resume.url` value in `src/content/site.js`.

The files under `public/images/cats/protected/` are retained source references for the site's cat interactions and should not be modified as part of general asset cleanup.

## Deployment

Pushes to `main` trigger `.github/workflows/deploy.yml`. The workflow installs dependencies with `npm ci`, builds the site, uploads `dist/`, and deploys it through GitHub Pages.

The application uses browser-side routing and is hosted at the user-site root (`/`). Keep static asset paths rooted at `/images/` and preserve filename capitalization so they resolve correctly in the Linux-based build and on GitHub Pages.
