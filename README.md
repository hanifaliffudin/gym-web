# NORTHLINE

NORTHLINE is a standalone React and TypeScript gym landing page concept built with Vite. It uses a dark performance editorial direction for a fictional training club, with responsive sections for programs, membership options, and a first-visit request flow.

Live site: [gym-web-seven-tawny.vercel.app](https://gym-web-seven-tawny.vercel.app/)

## What is included

- Split hero with a free Unsplash training image and visible source link.
- Sticky responsive navigation with a mobile menu.
- Keyboard-accessible program tabs with arrow, Home, and End support.
- Membership plan selector with an updating detail panel.
- Request-a-visit modal with validation, loading, error, and local success states.
- Responsive layouts for desktop, tablet, and narrow mobile screens.
- Visible focus states, skip link, semantic landmarks, form labels, and accessible status messages.
- Responsive AVIF image sources with JPEG fallbacks.
- SVG favicon and shortcut icon metadata.

The form is intentionally local to the concept. It does not send or store a real booking request.

## Concept data

NORTHLINE, the Jakarta address, opening hours, email address, program details, and membership rates are fictional presentation content. Replace them with verified business data before using the site for a real gym.

The project does not include testimonials, statistics, coach profiles, customer logos, or performance claims without verified source material.

## Tech stack

- React 19
- TypeScript
- Vite
- Plain CSS
- Oxlint

No UI component library is required.

## Run locally

Requirements: Node.js and npm.

```bash
npm install
npm run dev
```

Vite will print the local development URL in the terminal.

## Commands

```bash
npm run dev       # Start the Vite development server
npm run lint      # Lint the source files with Oxlint
npm run build     # Type-check and create a production build
npm run preview   # Preview the production build locally
```

## Project structure

```text
gym-web/
├── public/
│   ├── favicon.svg
│   └── images/
├── src/
│   ├── App.tsx       # Page content and interaction state
│   ├── App.css       # Component and responsive styles
│   ├── index.css     # Global styles and design tokens
│   └── main.tsx      # React entry point
├── DESIGN.md         # Visual direction and content boundaries
├── AGENTS.md         # Project guidance for future changes
└── index.html        # Metadata, favicon links, and critical first paint shell
```

## Images and licensing

The current photos are free Unsplash images bundled locally for the concept. Each image keeps a visible source link in the page. Replace them with gym-owned or explicitly licensed photography before launch, then update the image metadata and alt text in `src/App.tsx`.

## Deployment

The repository is connected to Vercel and deploys from the `main` branch. The GitHub repository is [hanifaliffudin/gym-web](https://github.com/hanifaliffudin/gym-web).

For a manual Vercel deployment, connect the repository to a Vercel project and use the default Vite settings:

- Build command: `npm run build`
- Output directory: `dist`
- Install command: `npm install`

## Quality checks

Before shipping a change, run:

```bash
npm run lint
npm run build
```

The deployed concept was also checked for responsive layout, keyboard behavior, modal focus behavior, form states, browser console errors, and Lighthouse scores across Performance, Accessibility, Best Practices, and SEO.

For design decisions, read [DESIGN.md](DESIGN.md). For project-specific editing guidance, read [AGENTS.md](AGENTS.md).
