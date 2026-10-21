# TODO — Portfolio Audit & Redesign Program

Source: master audit prompt, 2026-10-15. Work is local-only (no deploy per owner order).
Prior completed work (previous session, already in tree, undeployed except where noted):
- DONE audit-2 GitHub token failover on 401/403/404 (`server/services/github-repositories.mjs`)
- DONE audit-3 shared in-flight refresh promise (same file)
- DONE audit-4 `npm test` script (`package.json`)
- DONE audit-6 catalog fetch on scroll-into-view (`GitHub.tsx`)
- DONE audit-7 dropped dead `?preview=redacted-v2` (`github-api.ts`)
- DONE Leadership section + nav (DEPLOYED 2026-10-15, verified public 200)
- DONE engineer→developer wording incl. SEO meta (local, undeployed)
- DONE CV content: education ladder, skills, phone (local, undeployed)
- DONE GitHub tokens wired on northman .env; systemd unit live (ops, not code)

## P0 — Critical / confidentiality / release blockers

| ID | Issue | Files | Acceptance | Status |
|----|-------|-------|------------|--------|
| P0-1 | Private-repo README title/description served unredacted on public grid | `server/services/github-repositories.mjs` (`toRepository`), `RepositoryGrid.tsx:77-78` | Private repos show name only, no README text | DEFERRED by owner (explicit scope-out 2026-10-15); revisit before any launch that lists sensitive private repos |

## P1 — Usability / credibility

| ID | Issue | Files | Acceptance | Status |
|----|-------|-------|------------|--------|
| P1-1 | Hero redesign in flux: fashion-model direction (centered portrait, backdrop type) under owner review | `Hero.tsx`, `hero.css`, `hero-responsive.css`, `public/portrait.png` | Owner approves preview at :5179; tsc+lint clean | SUPERSEDED — premium hero task rebuilt it (editorial two-column + SystemTrace); fashion files removed; awaiting owner review of new build |
| P1-2 | New/changed sections need responsive verification (320–1920) | hero, leadership, contact | No overflow/clipping at 360/390/768/1024/1280/1440; screenshots | DONE hero (320/390/768/1024/1280/1440 zero overflow, screenshots 390+1280); leadership/contact spot-check pending deploy build |
| P1-3 | Reduced-motion not respected by framer-motion entrances (only marquee had a media query) | `Hero.tsx`, `GitHub.tsx`, feature sections | `useReducedMotion` or CSS gate disables non-essential motion | DONE via `MotionConfig reducedMotion="user"` in `main.tsx` (verified: headline opacity 1 at 400ms under reduce) |

## P2 — Performance / a11y / SEO / maintainability

| ID | Issue | Files | Acceptance | Status |
|----|-------|-------|------------|--------|
| P2-1 | No robots.txt / sitemap.xml | `public/` | Both exist, sitemap lists `/` + 4 project slugs, build copies them | DONE (verified in `dist/`) |
| P2-2 | Bundle 607 kB warning (shiki unused but bundled? verify) | `package.json`, build | Confirm treeshaking or remove `shiki` (owner deferred removal; verify only) | DONE verified: 0 shiki refs in all bundles (treeshaken) |
| P2-3 | Keyboard/focus visibility audit for nav, modal, filters | nav, `ReadmeModal`, `RepositoryGrid` | Visible focus on all interactives; Esc closes modal (already); tab order sane | DONE nav walkthrough (2px outline, Enter activates, CV downloads); global `:focus-visible` rule pre-existing |
| P2-4 | README "Last Updated 2026-07-03" stale; AGENTS.md documents deleted VITE_* design | `README.md`, `AGENTS.md` | Dates corrected; AGENTS env section matches server-only tokens (AGENTS rewrite deferred by owner — README date only) | PARTIAL |
| P2-5 | GitHub empty/error states exist — verify under blocked-network + 502 | `GitHub.tsx`, `ReadmeModal.tsx` | Loading/error/empty all render; no crash on malformed payload | DONE (route-abort → "temporarily unavailable" + profile link) |

## P3 — Polish (optional)

| ID | Issue | Status |
|----|-------|--------|
| P3-1 | Figma hero sample alignment (quota-blocked) | WAITING on quota or owner screenshot |
| P3-2 | Systems marquee under hero (built in attempt-1, dropped in revert) | Re-add only if owner wants motion strip |
| P3-3 | `shiki` removal, AGENTS.md rewrite, affidavit of private-summary decision | DEFERRED by owner |

## Explicitly out of scope (owner orders)

- No git commands of any kind in this program (status/diff/log all skipped).
- No deploy, no northman/VPS writes, no DNS changes.
- No new backend for contact (email links suffice).
- No invented metrics, testimonials, certifications, or production claims.
- No framework migration.
