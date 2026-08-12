# Project Rules

## Architecture

Feature-modular structure under `src/features/`. Each feature is self-contained with its own component, data, and barrel export.

```
src/
  components/
    ui/             button.tsx, navigation-menu.tsx, popover.tsx
  features/
    hero/            Hero.tsx, hero.data.ts, useGitHubStats.ts, index.ts
    objective/       Objective.tsx, objective.data.ts, index.ts
    experience/      Experience.tsx, experience.data.ts, index.ts
    skills/          Skills.tsx, skills.data.ts, index.ts
    projects/        Projects.tsx, projects.data.ts, techIcons.tsx, techIconMap.ts, index.ts
    github/          GitHub.tsx, index.ts
    education/       Education.tsx, education.data.ts, index.ts
    awards/          Awards.tsx, awards.data.ts, index.ts
    footer/          Footer.tsx, index.ts
  lib/
    utils.ts         cn() className merge helper
  shared/
    types.ts         Shared TypeScript interfaces
    navigation.ts    Nav section definitions
    useBreakpoint.ts Responsive breakpoint hook
  App.tsx            Root component
  index.css          Global styles (Tailwind theme + custom classes)
  main.tsx           Entry point (StrictMode + HelmetProvider)
```

### Feature Pattern

```
src/features/<name>/
├── <Name>.tsx        # React component (named export)
├── <name>.data.ts    # Static data/content (optional)
└── index.ts          # Barrel re-export: `export { Name } from './Name'`
```

### Path Alias

`@/` maps to `src/`, configured in both `tsconfig.app.json` and `vite.config.ts`. Use `@/features/hero` for imports.

## Code Conventions

- All new features follow the `feature/data/component/index` pattern
- Data types shared across features go in `src/shared/types.ts`
- Imports use barrel exports: `import { Hero } from '@/features/hero'`
- No single file should exceed ~200 lines; split into smaller relational files
- Components must be named exports via barrel `index.ts`
- No comments in code unless essential
- Tailwind CSS for all styling; custom CSS only in `index.css` for theme tokens, animations, and global resets
- Reusable UI primitives live in `src/components/ui/`
- Utility functions live in `src/lib/`

## Environment Variables

Create a `.env` file (not committed) with:

```
VITE_GITHUB_TOKEN=<github_personal_access_token>
VITE_GITHUB_TOKEN_NGC=<optional_second_token_for_org_repos>
```

These are used by `useGitHubStats.ts` and the GitHub feature section to fetch live repository data.

## Stack

Vite 6 + React 19 + TypeScript 6 + Tailwind CSS v4 (with `@tailwindcss/vite` plugin)

**UI & Animation:**
- Radix UI primitives (navigation-menu, popover, slot, icons)
- Framer Motion (scroll-triggered animations)
- react-intersection-observer (viewport detection, `triggerOnce`)
- shiki (syntax highlighting for GitHub README previews)
- class-variance-authority (component variant API)

**Icons:**
- lucide-react
- react-icons

**SEO & Analytics:**
- react-helmet-async (document head management)
- @vercel/analytics
- @vercel/speed-insights

## Git & Deployment

- Always push to the `main` branch
- Do not commit `node_modules`, `dist`, `.env` files, or `*.local`
- Commit `.env.example` only (no secrets)

## Verification

- TypeScript: `npx tsc -b` (must pass with zero errors)
- Build: `npx vite build`
- Lint: `npm run lint`
