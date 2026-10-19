# TS·ART Studio — See. Feel. Create.

TS·ART Studio is an art-learning application built around observation, deliberate practice and the development of an individual visual language.

## Current implementation
- Responsive dashboard with overall and per-module progress.
- **20 interactive curriculum modules and 84 first-draft lessons**: eight lessons in Module 1 and four lessons in each of Modules 2–20.
- Lesson reader with objectives, materials, step-by-step exercises, self-check criteria and reflections.
- Mini-Studio with short practices drawn from the same curriculum.
- Learning-path overview and module selector.
- Visual journal with browser-local autosave and TXT export.
- Colour Lab for documenting pigment experiments, including pigment labels, ratios, medium, support, wet/dry observations, conclusions and next tests. Entries can be deleted or exported.
- Interactive Oil Paint Mixer: choose a task (portrait, landscape or still life), select a study (skin, hair, shadows, sky, foliage, water, fruit, ceramic, fabric and more), mix two pigments, optionally add a third pigment, adjust proportions and compare a simulated swatch. Displayed whole-number shares are calculated separately and sum to 100%. The swatch is an RGB learning simulation—not a reliable prediction of real oil-paint behaviour.
- Six guided Master Workshops linked to relevant lessons, with source-checking guidance for art-history research.
- Open Studio for personal project briefs, constraints, status tracking and TXT export.
- Portfolio notes for artwork metadata and optional HTTP(S) links. Image uploads and hosting are not implemented.
- Vitest curriculum integrity tests and GitHub Actions checks.

**Content status:** all modules are populated with an authored first draft. Lessons still need validation with beginners and qualified art educators. The app is a functional frontend MVP, not yet a production service.

**Data status:** progress, reflections, journal notes and Colour Lab records stay in the current browser's local storage. There are no accounts, cloud sync, server persistence, artwork uploads or cross-device backup.

## Run locally
Requirements: Node.js compatible with the Vite version in `package.json`.

```bash
npm install
npm run dev
npm run check
npm run test
npm run build
```

## Project structure
- `src/App.tsx` — page composition and interaction state.
- `src/components/OilPaintMixer.tsx` — reusable task-based mixer with two primary pigments and an optional third pigment.
- `src/components/oil-paint-mixer.css` — responsive mixer styling.
- `src/components/mixPigments.ts` — pure RGB preview calculation and whole-percentage share calculation.
- `src/components/OilPaintMixer.test.ts` — mixer calculation tests.
- `src/data/types.ts` — shared typed lesson/module structures and content helpers.
- `src/data/curriculum.ts` — Module 1 and aggregation of all module content.
- `src/data/modules-foundations.ts` — Modules 2–7, including Colour Lab learning sequence.
- `src/data/modules-painting.ts` — Modules 8–14, including oil painting, landscape and figure.
- `src/data/modules-projects.ts` — Modules 15–20, including portrait, art history, digital art and portfolio.
- `src/data/curriculum.test.ts` — curriculum integrity tests.
- `src/styles.css` — responsive visual system and layouts.
- `TECHNICAL_ROADMAP.md` — status, product logic, constraints and next steps.
- `docs/BRAND_IDENTITY.md` — brand direction.
- `docs/ACADEMY_MASTER_PLAN.md` — product requirements and learning model.
- `docs/CURRICULUM.md` — programme map.
- `docs/ROADMAP.md` — product development phases.

## Brand architecture
- **TS·ART** — main artist brand.
- **TATIANA · ART · QI** — brand signature.
- **TS·ART Studio** — art-learning product.
- **QI Flow** — short creative practices and learning philosophy.

QI is used as a poetic metaphor for creative energy, attention, movement and flow—not as a scientifically established mechanism.

## Engineering rules
- Never work directly on `main`; develop in a dedicated feature/fix branch.
- Keep files below 1,500 lines and separate UI, content and styling.
- Use React + TypeScript + Vite and free/open-source dependencies.
- Do not claim planned features are implemented or checks passed without evidence.
- When resolving branch conflicts, keep only the newer intended complete file version.

See [TECHNICAL_ROADMAP.md](TECHNICAL_ROADMAP.md) for current status and implementation sequence.
