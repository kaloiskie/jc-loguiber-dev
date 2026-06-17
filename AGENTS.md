# Project Rules

## Architecture

Feature-modular structure under `src/features/`. Each feature is self-contained with its own component, data, and barrel export.

```
src/
  features/
    hero/        Hero.tsx, hero.data.ts, index.ts
    objective/   Objective.tsx, objective.data.ts, index.ts
    experience/  Experience.tsx, experience.data.ts, index.ts
    skills/      Skills.tsx, skills.data.ts, index.ts
    education/   Education.tsx, education.data.ts, index.ts
    leadership/  Leadership.tsx, leadership.data.ts, index.ts
    awards/      Awards.tsx, awards.data.ts, index.ts
    footer/      Footer.tsx, index.ts
  shared/
    types.ts     Shared TypeScript interfaces
    navigation.ts Nav section definitions
  App.tsx        Root component
  index.css      Global styles (Tailwind + custom)
  main.tsx       Entry point
```

## Code Conventions

- All new features follow the `feature/data/component/index` pattern
- Data types shared across features go in `src/shared/types.ts`
- Imports use barrel exports: `import { Hero } from './features/hero'`
- No single file should exceed ~200 lines; split into smaller relational files
- Components must be named exports via barrel `index.ts`
- No comments in code unless essential
- Tailwind CSS for all styling; custom CSS only for animations and global resets

## Git & Deployment

- Always push to the `main` branch
- Build from local temp directory: `npx tsc -b && npx vite build`
- Do not commit `node_modules` or `dist`

## Stack

Vite + React 19 + TypeScript 6 + Tailwind CSS v4 + Framer Motion + react-icons + react-intersection-observer

## Verification

- TypeScript: `npx tsc -b` (must pass with zero errors)
- Build: `npx vite build`
- Lint: `npm run lint`
