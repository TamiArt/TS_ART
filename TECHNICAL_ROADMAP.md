# TS·ART Studio — Technical Roadmap

## Current state
- [x] React + TypeScript + Vite app on `feat/full-curriculum-colour-lab`; `main` is untouched.
- [x] Responsive dashboard, lesson reader, module selector, learning path, mini-studio and visual journal.
- [x] All 20 curriculum modules have authored first-draft content: 84 lessons total (8 in Module 1; 4 in each remaining module).
- [x] Lesson completion and reflections persist in browser `localStorage`; journal exports to TXT.
- [x] Colour Lab supports pigment-test records, local saving, deletion and TXT export.
- [x] Vitest curriculum integrity tests and GitHub Actions checks are configured.
- [ ] Confirm CI test, type-check and production-build results; fix any failures.
- [ ] Perform manual mobile, keyboard, screen-reader and browser checks.
- [ ] Review lessons with beginner learners and qualified art educators before calling content validated.

## Product logic
- **Dashboard:** shows total lesson progress and next incomplete lesson.
- **Lessons:** all 20 modules are selectable; each has a lesson list and previous/next navigation.
- **Mini-studio:** filters short exercises from the same lesson source; completion is shared.
- **Learning path:** displays all modules and per-module progress.
- **Journal:** autosaves notes locally and exports plain text.
- **Colour Lab:** stores question, pigment labels, ratio, medium, support, wet/dry observations, result and next experiment. Entries are user observations, not universal pigment recipes.
- **Progress:** lesson IDs are unique; repeated completion must not inflate the count.
- **Storage:** single-browser only. No accounts, cloud sync, artwork uploads or server persistence.

## Allowed
- Work only on a new feature/fix branch; inspect current refs before edits.
- Use React, TypeScript, Vite and free/open-source dependencies.
- Keep source files below 1,500 lines; keep content, UI and styles modular.
- Update this file and README when features, logic or status change.
- Add tests for new learning logic and report checks only when actually run.
- Label educational content as a draft until reviewed; cite reliable sources for historical claims.
- Preserve privacy; disclose browser-local storage and avoid hidden tracking.

## Forbidden
- Never commit to, force-push, or merge changes into `main` without an explicit request.
- Never claim tests, build, deployment or content validation passed without evidence.
- No paid/required paid APIs, secret keys in source, hidden tracking or automatic artwork upload.
- No monolithic files, duplicated lesson source, unsupported art-history/material claims or destructive edits without inspection.
- On conflicts, keep only the newer intended complete file version; do not merge old and new versions.

## Next steps
1. Verify GitHub Actions: `npm run check`, `npm run test`, `npm run build`; fix failures.
2. Manually test module navigation, progress, storage migration, journal export and Colour Lab CRUD on phone and desktop.
3. Improve accessibility and add browser-level interaction tests.
4. Review lesson accuracy, sequencing, safety notes and beginner comprehension; revise from observed feedback.
5. Add licensed diagrams/reference media only where they materially improve instruction.
6. Specify backup, accounts, cloud persistence and privacy before adding any backend.
7. Prepare deployment and production acceptance criteria only after checks pass.

## Commands
- `npm install`
- `npm run dev`
- `npm run check`
- `npm run test`
- `npm run build`
