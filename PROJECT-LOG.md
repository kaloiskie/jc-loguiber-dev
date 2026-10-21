# PROJECT-LOG — Portfolio Audit & Redesign Program

## Initial condition (2026-10-15, program start)

- Stack: Vite 8 + React 19 + TS (~6.0 per deps) + Tailwind v4 + Radix primitives + Framer Motion + react-intersection-observer + Express 5 server. Package manager: npm (`package-lock.json`); pnpm used locally only for installs.
- Routes: `/` (single-page sections) + `/projects/:slug` (lazy case-study page) + `*` → `/`. Server also serves `/api/github/*` and injects per-project SEO tags.
- Production (https://jc-loguiber.site/) serves the pre-wording build: old "engineer" copy, original hero, WITH Leadership section + GitHub tokens live. Desktop + mobile screenshots captured, zero console errors.
- Local tree (undeployed): audit fixes 2/3/4/6/7, Leadership, developer wording, CV content (education/skills/phone), fashion-hero experiment v2 (centered portrait, backdrop type) under owner review, `public/portrait.png` (copied from repo-root `profice pic.png`).
- Secrets sweep 2026-10-15: no tokens/keys in repo (only a redaction regex and a CSS color matched). Runtime tokens live only in northman `.env` (chmod 600, sync-excluded).
- Git inspection skipped entirely (owner order: no git commands).

## Key findings (carried from prior audit, re-verified where cheap)

- Server GitHub layer is sound: catalog-only allowlist, per-route validation, double DOMPurify on README HTML, security headers, stale-cache fallback. Redaction test passes (2/2).
- P0-1 (private README summaries public) confirmed real, deferred by owner.
- No robots.txt / sitemap.xml. No focus-visibility pass done. Reduced-motion partial (marquee only).
- index.html + HomePage SEO (title/meta/OG/Twitter/JSON-LD Person) already solid; project pages get server-injected tags.

## Decisions

- No framework migration; no new deps; no contact backend; no invented claims.
- Hero keeps fashion direction pending owner approval; preserves h1 semantics via sr-only heading (backdrop uses aria-hidden spans).
- Docs live in-repo (`TODO.md`, this file, `ROADMAP.md`) per program prompt; workspace root ROADMAP/PROJECT-LOG untouched (different scope).

## Changes in this program

| Date | Change | Files | Verify |
|------|--------|-------|--------|
| 2026-10-15 | Program docs created | `TODO.md`, `PROJECT-LOG.md`, `ROADMAP.md` | — |
| 2026-10-15 | Premium hero rebuild (task): editorial two-column, eyebrow, accent headline, grid backdrop, #projects/#contact CTAs, résumé view link, scroll-margin | `Hero.tsx`, `hero.css`, `hero-responsive.css`, `index.css` (+deleted `public/portrait.png`, fashion CSS removed) | tsc clean, lint clean, build clean; CTA hashes verified; cv.pdf 200; 0 overflow at 320/390/768/1024/1440; keyboard OK; reduced-motion OK; console: only expected dev API 404 |
| 2026-10-15 | robots.txt + sitemap.xml | `public/robots.txt`, `public/sitemap.xml` | present in `dist/` |
| 2026-10-15 | Résumé viewer modal (`resume/` feature, iframe + download + Esc/backdrop close) wired to hero rail View Résumé | `ResumeViewer.tsx`, `index.ts`, `resume-modal.css`, `Hero.tsx`, `hero.css`, `index.css` | tsc/lint clean; opens with /cv.pdf, Esc closes (playwright verified) |

## Test/build record

- `npm test`: 2 pass / 0 fail (pre-existing, still green at program start).
- `npx tsc -b`: clean. `npm run lint`: clean.
- `npx vite build`: clean (chunk-size warning only).
- Production console: 0 errors (desktop + mobile baseline).

## Remaining risks

- P0-1 deferred: private README text public until owner approves redaction.
- Hero unapproved: production and preview diverge; do not deploy until P1-1 accepted.
- DNS flip to dedicated tunnel still pending owner action (ops track, outside this program).
