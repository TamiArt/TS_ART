# TS·ART Studio — Technical Roadmap

## Development order

Work through these four stages in order. Do not move to the next stage while the current stage has unresolved blocking issues. Continue the current work on `feat/oil-paint-mixer-qa-hardening` unless a separate, explicitly scoped feature branch is needed; never change `main` unless explicitly requested.

### 1. Finish the Oil Paint Mixer — CURRENT STAGE

**Goal:** make the mixer stable, coherent and testable as a standalone learning tool before adding more features.

**Work completed so far:** extracted a pure whole-percentage share calculation; wired displayed A/B/C shares to it; clarified the A:B ratio label when pigment C is enabled; aligned the calculation's 60% third-pigment cap with the UI; corrected the reversed endpoint labels on the A:B slider; guarded ratio calculations against non-finite values; rejected malformed six-digit HEX inputs explicitly rather than generating invalid preview strings; and added tests for three-pigment share totals, limits, swapping A/B, non-finite inputs, identical pigments, a zero-share third pigment and malformed HEX values. The prior branch had an independent Node.js arithmetic smoke check, but the current branch's project checks and interaction review remain pending. The stage stays open until type-check, tests, production build and interaction review are confirmed.

- [ ] Verify task selection: Portrait, Landscape and Still Life, including each task's study categories.
- [ ] Verify two-pigment selection, proportion controls, swapping pigments and displayed mixture shares.
- [ ] Verify optional third pigment, its percentage and the distribution of the remaining share between pigments A and B.
- [x] Review calculation boundaries, default selections and labels in source; corrected the reversed A:B slider endpoint labels and aligned the third-pigment calculation cap with the UI.
- [x] Validate six-digit HEX inputs and add regression tests for invalid colours, identical pigments and a zero-share third pigment.
- [x] Add polite live announcements for the calculated colour and mixture shares; strengthen keyboard focus contrast and small-screen spacing in source.
- [ ] Verify accessible control names and responsive layout through runtime/browser interaction.
- [ ] Fix any interaction, calculation, visual or responsive-layout defects found.
- [ ] Run type-check, unit tests and production build; fix failures and report only observed results.
- [ ] Keep the RGB preview limitation visible: screen interpolation is an educational approximation, not a physically accurate oil-paint prediction.

**Exit criteria:** all mixer controls work as specified; calculation edge cases have tests; type-check, tests and build pass; no known blocking mixer defects remain.

### 2. Connect the Mixer to Colour Lab

**Goal:** let a user transfer a mixture into a Colour Lab experiment without re-entering the recipe.

- [ ] Pass pigment A/B/C names, proportions, task/category and calculated HEX colour from the mixer to the existing Colour Lab form.
- [ ] Populate the form without silently saving or submitting it; the user reviews and explicitly confirms the record.
- [ ] Preserve the recipe and observations in the existing local journal record and TXT export.
- [ ] Keep compatibility with existing records and avoid breaking current create/delete/export flows.
- [ ] Add focused tests for recipe transfer and persistence/export mapping.

**Exit criteria:** mixer-to-form transfer works end to end; a confirmed experiment survives reload and appears correctly in the journal/export; existing Colour Lab functionality still works.

### 3. Finish the Curriculum

**Goal:** turn the current first draft into a coherent beginner learning route.

- [ ] Review the sequence and prerequisites across all 20 modules and 84 lessons.
- [ ] Find gaps, repetition, unexplained terms and abrupt jumps in difficulty.
- [ ] Review art-materials and art-history claims; use reliable sources where factual claims need support.
- [ ] Check that lessons include clear explanations and achievable practice tasks.
- [ ] Connect relevant lessons to the Mixer, Colour Lab, Visual Journal, Mini Studio and workshops where useful.
- [ ] Track which material is reviewed and which remains a draft; do not call content expert-validated without review evidence.

**Exit criteria:** the learning sequence and lesson structure have been reviewed, material issues are addressed, and remaining draft/review status is explicit.

### 4. Everything Else

This stage starts only after stages 1–3 are complete. Prioritize work by risk and value, and split it into small verifiable blocks.

**Mixing model**
- [ ] Separate the calculated screen preview from the user's observed physical mixture.
- [ ] Evaluate a more suitable pigment-mixing approach; document assumptions, limitations and trade-offs before implementation.
- [ ] Plan how transparency, tinting strength, opacity and manufacturer/product-specific paints could be represented without inventing unsupported material data.
- [ ] Add tests and documentation for any selected model; keep its limitations explicit.

**Application quality assurance**
- [ ] Run type-check, unit/integrity tests and production build on the final candidate commit.
- [ ] Test primary journeys across lessons, progress, Mini Studio, Visual Journal, Colour Lab/mixer, workshops, Open Studio and portfolio.
- [ ] Verify local save, reload, edit/delete where supported, and TXT exports.
- [ ] Check responsive layouts on desktop and mobile sizes.
- [ ] Check keyboard navigation, focus visibility, accessible names, contrast and screen-reader behavior.
- [ ] Fix critical and high-priority defects and rerun affected checks.
- [ ] Record what was actually tested and what remains unverified.

**Remaining product and release work**
- [ ] Improve remaining tools and polish cross-application consistency.
- [ ] Add licensed diagrams or reference media where they materially improve instruction.
- [ ] Prepare portfolio, workshops and personal-project flows for regular use.
- [ ] Finalize README, in-app guidance and user-facing documentation.
- [ ] Define production acceptance criteria and prepare deployment.
- [ ] Consider accounts, backups, cloud sync or server storage only after documenting scope, privacy, security and cost. No paid or required paid services.

**Exit criteria:** model changes are documented and tested; automated and manual QA results are recorded honestly; no known critical defects remain; remaining release decisions are explicit.

## Latest UX changes on `feat/oil-paint-mixer-qa-hardening`

- [x] Increase key reading text slightly across navigation, lesson instructions, self-checks and reflection fields while keeping the existing visual system.
- [x] Add an in-lesson **Next lesson** action; moving forward stores the current reflection and loads the next lesson without returning to the lesson list.
- [x] Disable forward navigation on the final lesson and keep the current lesson marked complete only when the user explicitly marks it complete.
- [ ] Run the app checks and verify lesson-to-lesson navigation, reflection retention, final-lesson state and responsive typography in a browser.

## Current application baseline

- React + TypeScript + Vite.
- 20 curriculum modules with 84 first-draft lessons.
- Lesson completion/reflections, journal, Colour Lab, workshops, Open Studio and portfolio use browser-local storage where implemented.
- No accounts, cloud sync, server persistence or artwork uploads.
- The Oil Paint Mixer is embedded in Colour Lab and supports task-based study, two primary pigments and an optional third pigment. Verify the current implementation and tests before treating stage 1 as complete.
- Lesson content is still a draft until reviewed; local storage is browser-specific and is not a backup.

## Product and implementation rules

- Dashboard shows learning progress and the next incomplete lesson.
- Lessons share a single source; lesson IDs remain unique and repeated completion must not inflate progress.
- Colour Lab records are user experiments, not universal pigment recipes.
- The mixer preview must not be represented as physically accurate pigment mixing.
- Keep UI, calculation logic, content and styles modular. Source files must remain below 1,500 lines.
- Use React, TypeScript, Vite and free/open-source dependencies; no paid/required paid APIs.
- Preserve existing data behavior and avoid destructive changes without inspecting current implementation.
- Keep README and this roadmap in sync with verified changes.

## Allowed

- Work on feature/fix branches only; verify current refs before editing.
- Add focused tests for new logic and report results only when actually run.
- Label educational content as a draft until reviewed.
- Preserve privacy and disclose browser-local storage.

## Forbidden

- Never commit to, force-push, or merge changes into `main` without explicit permission.
- Never claim tests, build, deployment, manual testing or content validation passed without evidence.
- No secret keys in source, hidden tracking, automatic artwork upload, or mandatory paid services.
- No monolithic files, duplicated lesson sources, or unsupported art-material/history claims.
- On conflicts, keep the newer intended complete version; do not merge stale and current versions.

## Commands

- `npm install`
- `npm run dev`
- `npm run check`
- `npm run test`
- `npm run build`


## Step-by-step visual examples for every lesson

- [x] Add a reusable visual tutorial to the lesson view, automatically selecting an illustration family from lesson topic and instructions.
- [x] Display an ordered visual stage for every step in each lesson, using the lesson's actual instruction text; include a short explanation that diagrams are learning aids, not a required exact result.
- [x] Add responsive layouts for desktop, tablet and narrow mobile screens.
- [ ] Run type-check, unit tests and production build; visually inspect examples across different lesson themes and screen sizes.
- Note: these are schematic examples rendered in the UI, not individually art-directed reference paintings. Confirm topic classification and refine specific diagrams during visual QA.


## Visual tutorial hardening

- [x] Extract topic classification, stage generation and topic-specific learning principles into a pure module.
- [x] Prioritize the lesson title when selecting a visual family; use narrower objective matching as a fallback so generic words like “форма” and “пространство” do not force a misleading topic.
- [x] Add regression tests for generic lesson classification and title-over-objective priority.
- [x] Add curriculum-wide unit tests: each of the 84 lessons must render one ordered visual stage per written step.
- [x] Test the classifier against portrait, landscape, still life, colour, tone, perspective, composition, proportion, line and paint examples.
- [x] Give the final review stage a distinct completion marker on every lesson, including lessons with fewer than four steps; label intermediate stages distinctly and improve small-screen reading sizes.
- [x] Vercel production build status is `success` for commit `0f7122c6a27d7cdcb8ece2e472ef13f90dcbcc75`, including the final-step marker and distinct stage-label fixes.
- [ ] Confirm unit-test execution from CI; the available status API has not surfaced a test-run result for the current branch tip, and the new classifier regression tests are awaiting execution.
- [ ] Inspect representative lesson screenshots in a browser; the available browser reader could not access the preview URL.
- Known limitation: the illustrations are topic-family schematics reused across related lessons, not 84 separately art-directed drawings. They are explicitly presented as visual aids rather than exact model answers.
