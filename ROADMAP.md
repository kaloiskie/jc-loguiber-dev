# ROADMAP — Portfolio Program

## Phase A — Audit & hardening (this program, in progress)

- [x] Full-repo audit (ponytail audit + review delivered)
- [x] GitHub reliability fixes (failover, dedup, test runner, lazy fetch)
- [x] Leadership section + CV content gaps closed
- [x] Ops: tokens wired, systemd unit live (northman)
- [ ] Hero redesign approved + responsive-verified (P1-1, P1-2)
- [ ] Reduced-motion, focus visibility, robots/sitemap (P1-3, P2-1, P2-3)
- [ ] Validation sweep + docs close-out (no deploy until ordered)

## Phase B — Deploy cutover (ordered separately)

- [ ] Land + rebuild + restart on northman (needs explicit approval per deploy gate)
- [ ] Owner flips DNS to dedicated tunnel `c99eae1a` (pending owner action)
- [ ] Post-deploy verify: public 200, API 200, new bundle hash, mobile check

## Phase C — Deferred / proposed (not approved)

- P0-1 private-summary redaction decision
- `shiki` removal + bundle diet
- AGENTS.md rewrite (VITE_* drift)
- Figma quota reset → design-token sync if wanted
- Canva MCP connection (waiting on owner Client ID)
- Testimonials/FAQ only with real content (never invented)
