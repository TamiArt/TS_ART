# TS·ART Studio — See. Feel. Create.

TS·ART Studio is an art-learning application built around observation, deliberate practice and the development of an individual visual language.

## Current implementation
The current MVP branch provides:
- A responsive studio dashboard and progress overview.
- An interactive first module with eight authored beginner lessons and exercises.
- A mini-studio view for short practices.
- A 20-module learning-path overview; future modules are explicitly marked as planned.
- Lesson completion, reflections and a personal journal stored locally in the current browser.
- Plain-text export of the journal.

**Important:** progress and journal data are local to one browser/device. There are no user accounts, cloud sync, server, artwork uploads or AI feedback yet.

## Run locally
Requirements: Node.js compatible with the Vite version in `package.json`.

```bash
npm install
npm run dev
npm run check
npm run build
```

## Project structure
- `src/App.tsx` — page composition and interaction state.
- `src/data/curriculum.ts` — typed curriculum and authored lesson content.
- `src/styles.css` — responsive visual system and layouts.
- `TECHNICAL_ROADMAP.md` — current status, product logic, constraints and next steps.
- `docs/BRAND_IDENTITY.md` — brand direction.
- `docs/ACADEMY_MASTER_PLAN.md` — product requirements and learning model.
- `docs/CURRICULUM.md` — planned 20-module curriculum.
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

See [TECHNICAL_ROADMAP.md](TECHNICAL_ROADMAP.md) for status and implementation sequence.
