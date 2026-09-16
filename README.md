# Jimmy Pan — Engineering Portfolio

A responsive portfolio for Jimmy Pan, an Engineering Physics student focused on
firmware, embedded systems, controls, and robotics. The site is built as a
single-page React application and deployed to GitHub Pages.

## Features

- Interactive terminal with a small portfolio-focused command set
- Data-driven project, experience, skills, testimonial, and contact content
- Expandable project details and interactive experience timeline
- Responsive desktop and mobile navigation
- Route transitions, image preloading, loading feedback, and reduced-motion support
- Discoverable Personal section with a custom cat interaction

## Tech stack

- React 19
- React Router 7
- Vite 7
- Tailwind CSS 4 with project-specific CSS
- ESLint 9
- GitHub Actions and GitHub Pages

## Local development

Requires Node.js 20.19+ or 22.12+.

```bash
npm install
npm run dev
```

Vite prints the local development URL after startup.

## Quality checks

```bash
npm run lint
npm run build
```

The production bundle is written to `dist/`. This JavaScript project does not
currently include a separate type-check command or automated test suite.

## Project structure

```text
src/
├── components/
│   ├── layout/       # Site-wide layout and route behavior
│   └── ui/           # Reusable interface controls and icons
├── content/          # Portfolio content and terminal data
├── features/         # Components grouped by portfolio section
├── pages/            # Route-level page components
├── utils/            # Shared browser utilities
├── App.jsx           # Routes and application-level state
└── index.css         # Global styles and responsive rules

public/images/
├── about/            # Profile and About-section artwork
├── cats/             # Cat interaction sprites and protected source assets
├── experience/       # Experience timeline images
├── home/             # Homepage background and intro artwork
├── icons/            # Shared UI and technology icons
└── projects/         # Project-specific media
```

Portfolio text and data are maintained in `src/content/`. Static image paths in
those files resolve from `public/`.

## Deployment

Pushes to `main` trigger `.github/workflows/deploy.yml`, which installs locked
dependencies, creates the production build, and deploys `dist/` to GitHub Pages.
Hash-based routing is intentional so every route works on static hosting without
server rewrite rules.
