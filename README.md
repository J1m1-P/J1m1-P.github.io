# Jimmy Pan — Portfolio

A React 19 and Vite portfolio with an interactive terminal, a data-driven
project gallery, and hash-based routing for static hosting.

## Development

```bash
npm install
npm run dev
```

Before publishing, run:

```bash
npm run lint
npm run build
```

There is no test suite or separate type-check command in this JavaScript
project.

## Project structure

- `src/content/` — the three files intended for regular content editing
- `src/components/` — small reusable interface pieces
- `src/sections/` — the named sections that compose the homepage
- `src/pages/` — one component for each navigable page
- `public/` — images, documents, and other static files

### Where to edit

- `src/content/site.js` — name, intro, resume, navigation, highlights, and skills
- `src/content/projects.js` — portfolio project entries
- `src/content/terminal.js` — terminal prompt, welcome text, shortcuts, and files

Application behavior and layout live outside `content/`. Normal content changes
should not require editing a component.

## Pages

- `/` — introduction, terminal, and highlights
- `/about` — profile, skills, and technology strip
- `/projects` — complete project gallery
- `/experience` — education and team experience
- `/contact` — configured email and social links
- `/resume` — public resume link or an unavailable state

The header name returns Home. Page links and their order are controlled by
`navLinks` in `src/content/site.js`.

## Add a portfolio project

1. Append one object to `projects` in `src/content/projects.js`.
2. Supply a unique `id`, `title`, and concise `summary`.
3. Optionally add `skills`, `github`, `website`, and `news` URLs.
4. To include a thumbnail, place it in `public/images/` and add `image`, a
   useful `imageAlt`, and optionally `accent`.

No component or route edits are needed. Array order controls display order.

## Customize the terminal

Edit `src/content/terminal.js`. A file is an object with `content` and an
optional `url`. A folder is a plain object containing more files. Project text
files are generated automatically from `projects.js`.

Resume text and its public URL are kept in `src/content/site.js` so personal
information has one clear home.

Contact links and experience cards are also plain arrays in `site.js`. Empty
contact URLs are hidden automatically.

Supported commands are `help`, `ls`, `cd`, `cat`, `open`, `pwd`, `whoami`, and
`clear`. This is an intentionally limited portfolio interface, not a real shell.

## Design notes

- `HashRouter` is intentional so nested routes work on static hosts without
  server rewrite rules.
- Homepage project cards and the all-projects page share `ProjectCard`.
- Keep personal facts and project claims accurate; current project entries
  originated from the unfinished site and should be verified before publishing.

See [TODO.md](./TODO.md) for the remaining content and release work.
