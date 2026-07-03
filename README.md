# JC Loguiber Portfolio

> **Personal portfolio site for Jhon Carlo L. Loguiber - React, TypeScript, Tailwind CSS, GitHub activity, project work, and downloadable CV.**

[![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=black)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-6.0-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?logo=tailwindcss&logoColor=white)](https://tailwindcss.com)
[![Vite](https://img.shields.io/badge/Vite-8-646CFF?logo=vite&logoColor=white)](https://vite.dev)
[![License](https://img.shields.io/badge/License-Private-red)](#license)

| Field | Value |
|---|---|
| Status | Active |
| Owner | Jhon Carlo L. Loguiber |
| Last Updated | 2026-07-03 |
| Runtime | Browser static app |
| Package Manager | npm |
| Source Module | `src/` |
| Related Docs | `AGENTS.md` |

## Table Of Contents

- [Overview](#overview)
- [Context](#context)
- [Architecture](#architecture)
- [Installation](#installation)
- [Configuration](#configuration)
- [Usage](#usage)
- [Content Sections](#content-sections)
- [Assets](#assets)
- [Security And Privacy](#security-and-privacy)
- [Testing And Verification](#testing-and-verification)
- [Deployment](#deployment)
- [Rollback](#rollback)
- [Troubleshooting](#troubleshooting)
- [Maintenance Notes](#maintenance-notes)
- [Changelog](#changelog)
- [License](#license)

## Overview

This is a single-page portfolio/resume website for a full-stack engineer. It presents hero details, objective/about copy, technical stack, work experience, selected projects, GitHub activity, education, awards, and contact information.

The site is a static Vite app with client-side section navigation. Content is split into feature folders so updates to experience, projects, skills, and profile details can be made without touching the root app structure.

## Context

The portfolio is designed as a professional landing page for remote backend and full-stack roles. It highlights production systems work, GitHub activity, downloadable CV, organization affiliations, and project screenshots.

## Architecture

| Component | Path | Responsibility |
|---|---|---|
| Root app | `src/App.tsx` | Navigation, SEO metadata, analytics, and section composition |
| Feature sections | `src/features/` | Self-contained content sections with component, data, and barrel export |
| Shared metadata | `src/shared/` | Navigation sections and shared TypeScript types |
| UI primitives | `src/components/ui/` | Button, navigation menu, popover |
| Utilities | `src/lib/utils.ts` | Shared className helper |
| Public assets | `public/` | CV, profile images, org images, project screenshots, favicon |

Project layout:

```text
jc-loguiber-portfolio/
+-- src/
|   +-- components/ui/       # Reusable UI primitives
|   +-- features/
|   |   +-- hero/
|   |   +-- objective/
|   |   +-- skills/
|   |   +-- experience/
|   |   +-- projects/
|   |   +-- github/
|   |   +-- education/
|   |   +-- awards/
|   |   `-- footer/
|   +-- shared/              # navigation and shared types
|   +-- App.tsx
|   +-- index.css
|   `-- main.tsx
+-- public/
|   +-- cv.pdf
|   +-- profilepicture.jpg
|   +-- helmet.png
|   `-- websites/
+-- AGENTS.md
`-- package.json
```

## Installation

Prerequisites:

- Node.js compatible with Vite 8 and TypeScript 6
- npm

Install dependencies:

```bash
cd jc-loguiber-portfolio
npm install
```

## Configuration

The site can run without environment variables. Optional GitHub tokens unlock private/collaborator repo stats and richer README/project data.

| Variable | Required | Description |
|---|---:|---|
| `VITE_GITHUB_TOKEN` | No | GitHub token for the personal account repository and commit stats |
| `VITE_GITHUB_TOKEN_NGC` | No | GitHub token for Northman Gaming Corporation repository and commit stats |

Important: Vite exposes `VITE_*` values in the browser bundle. Use fine-grained read-only tokens and avoid scopes that can write, administer, or access unrelated private data.

## Usage

Start the development server:

```bash
npm run dev
```

Build the static app:

```bash
npm run build
```

Preview the production build:

```bash
npm run preview
```

Run lint:

```bash
npm run lint
```

## Content Sections

| Section | Path | Notes |
|---|---|---|
| Hero | `src/features/hero/` | Name, role, bio, organization cards, GitHub stat hook |
| Objective/About | `src/features/objective/` | Professional summary |
| Tech Stack | `src/features/skills/` | Skills and technology groups |
| Experience | `src/features/experience/` | Work history and role details |
| Projects | `src/features/projects/` | Project data, screenshots, tech icon mapping |
| GitHub | `src/features/github/` | Repository cards, README modal, language stats |
| Education | `src/features/education/` | Education records |
| Awards | `src/features/awards/` | Awards and recognitions |
| Footer/Contact | `src/features/footer/` | Contact links and footer content |

Feature convention:

```text
src/features/example/
+-- Example.tsx
+-- example.data.ts
`-- index.ts
```

Use barrel exports for feature imports, for example:

```ts
import { Hero } from './features/hero'
```

## Assets

Important public files:

| Asset | Purpose |
|---|---|
| `public/cv.pdf` | Downloadable CV |
| `public/profilepicture.jpg` | Profile image |
| `public/helmet.png` | Open Graph and Twitter preview image |
| `public/favicon.svg` | Browser favicon |
| `public/Incredible.jpg` | Organization avatar |
| `public/Northman.jpg` | Organization avatar |
| `public/Sinbad.jpg` | Organization avatar |
| `public/websites/*.png` | Project screenshots |

When replacing assets, keep filenames stable unless the corresponding data files and metadata are updated too.

## Security And Privacy

- Do not commit write-capable GitHub tokens.
- `VITE_GITHUB_TOKEN` and `VITE_GITHUB_TOKEN_NGC` are exposed to site visitors through the compiled frontend bundle.
- Use read-only fine-grained GitHub tokens when private repo stats are needed.
- `sessionStorage` caches GitHub stat summaries for one hour under `gh_stats`.
- The public CV and images are intentionally served from `public/`; review them before deployment.

## Testing And Verification

Run checks:

```bash
npm run lint
npm run build
```

Manual checks:

| Check | Expected Result |
|---|---|
| Navigation | Section nav scrolls to each section and updates hash |
| Mobile menu | Popover opens, links work, and closes after selection |
| SEO metadata | Page title, description, and preview image are present |
| CV link | `/cv.pdf` opens or downloads |
| GitHub section | Repos load when tokens are configured; fallback UI does not break without tokens |
| Project screenshots | Images in `public/websites/` render |
| Build output | `dist/` contains static site files |

## Deployment

This is a static Vite app and can be deployed to Vercel, Netlify, GitHub Pages, S3/static hosting, or any static web server.

Production build:

```bash
npm run build
```

Static output:

```text
dist/
```

For Vercel:

| Setting | Value |
|---|---|
| Framework Preset | Vite |
| Build Command | `npm run build` |
| Output Directory | `dist` |

## Rollback

1. Revert to the previous static deployment.
2. Restore previous environment variables if token configuration changed.
3. Verify hero, navigation, project images, GitHub section, and CV download.

## Troubleshooting

| Symptom | Likely Cause | Check |
|---|---|---|
| GitHub stats are empty | Missing token, rate limit, or token scope issue | Browser console and GitHub API responses |
| README modal fails | Repository has no README or token lacks access | Network response for GitHub README request |
| Images are missing | Public filename changed | `public/` file names and project data references |
| Build fails | TypeScript or dependency issue | `npm run build` output |
| Mobile nav does not close | Route hash or popover state issue | `src/App.tsx` `scrollTo` behavior |

## Maintenance Notes

- Keep feature sections under roughly 200 lines by moving content into `*.data.ts`.
- Shared data types belong in `src/shared/types.ts`.
- New feature sections should follow the `Component.tsx`, `feature.data.ts`, `index.ts` pattern.
- Prefer Tailwind utilities for styling; reserve custom CSS for global resets and animations.
- Update `public/cv.pdf` and hero/contact data together when career details change.

## Changelog

| Date | Change | Author |
|---|---|---|
| 2026-07-03 | Replaced Vite starter README with structured portfolio, config, verification, and deployment guide | Codex |

## License

Private - Jhon Carlo L. Loguiber.
