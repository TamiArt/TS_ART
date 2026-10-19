# TS·ART Studio — Technical Roadmap

## Current state
- [x] Brand, academy concept, 20-module curriculum and product roadmap documented.
- [x] React + TypeScript + Vite application scaffolded on `feat/ts-art-studio-mvp`.
- [x] MVP UI: dashboard, first learning module, mini-studio, curriculum map and journal.
- [x] Lesson completion and notes persisted in browser localStorage; journal export to TXT.
- [ ] Install dependencies and run typecheck/build; fix every reported error.
- [ ] Add automated tests for progress, persistence and lesson flows.
- [ ] Run accessibility, mobile and cross-browser checks.
- [ ] Validate learning content with beginner learners.

## Product logic
- **Home:** progress overview and next incomplete lesson.
- **Lessons:** only authored lessons can be opened. The first module is the initial interactive learning scope.
- **Mini-studio:** filters short practice lessons from the same lesson source; completion is shared.
- **Journal:** autosaves locally and can export a plain-text copy.
- **Learning path:** shows all 20 planned modules; future modules must be labelled as planned until content is authored and reviewed.
- **Progress:** completed lesson IDs are unique; completion must not inflate when a lesson is repeated.
- **Storage:** current MVP is single-browser/local-only. No accounts, cloud sync, uploads or cross-device sync are implemented.

## Allowed
- Work only on a new feature/fix branch; inspect the current branch before editing.
- Use React, TypeScript and Vite; keep components, content and styles modular.
- Keep every source file below 1,500 lines; prefer smaller focused modules.
- Update this file and README whenever application features, logic, status or commands change.
- Use free/open-source dependencies and browser-native capabilities; document new dependencies.
- Add tests and run checks where the environment allows; report unrun checks honestly.
- Preserve learner privacy; do not add analytics, external AI, cloud storage or uploads without explicit design and privacy review.

## Forbidden
- Never commit directly to `main`, force-push it, or merge into it.
- Never present planned lessons as finished content or claim tests/build passed without running them.
- No paid services, required paid APIs, secret keys in source, auto-upload of artwork, or hidden tracking.
- No monolithic files, duplicate lesson definitions, invented historical/material facts, or destructive changes without inspection.
- On conflicts, keep **only the newer intended file version**. Do not combine old and new content or retain both versions; inspect the diff and replace the old file with the newer complete version.

## Next implementation steps
1. Verify install, TypeScript and production build; repair issues.
2. Extract reusable navigation, lesson and progress components where useful.
3. Add automated unit/component tests and basic end-to-end coverage.
4. Improve keyboard navigation, screen-reader labels, contrast and mobile UX.
5. Author and review Module 1 lesson content; add media only with clear rights and purpose.
6. Prototype Colour Lab with reproducible material records and evidence labels.
7. Validate with beginners; revise based on observed friction.
8. Specify accounts, cloud persistence, image upload, export and privacy before implementation.
9. Build backend only after requirements and access controls are agreed; prefer free/open-source, low-cost architecture.
10. Prepare deployment, CI checks, error handling, backup and production acceptance criteria.

## Definition of done
- Feature matches documented behaviour and works on narrow/mobile and desktop layouts.
- Typecheck, production build and relevant tests pass, or any blocker is explicitly recorded.
- Empty, error, persistence and accessibility states are considered.
- Docs reflect the shipped behaviour; no placeholder is presented as a working integration.

## Commands
- `npm install`
- `npm run check`
- `npm run build`
- `npm run dev`
