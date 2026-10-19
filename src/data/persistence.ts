import { allLessons } from "./curriculum";

export type ColourTest = {
  id: string;
  question: string;
  pigments: string;
  ratio: string;
  medium: string;
  support: string;
  wetObservation: string;
  dryObservation: string;
  result: string;
  nextStep: string;
  createdAt: string;
};

export type StudioProject = {
  id: string;
  title: string;
  question: string;
  medium: string;
  constraint: string;
  nextStep: string;
  status: "active" | "paused" | "complete";
  createdAt: string;
};

export type PortfolioItem = {
  id: string;
  title: string;
  medium: string;
  year: string;
  description: string;
  link: string;
  createdAt: string;
};

export type SavedState = {
  completed: string[];
  journal: string;
  reflections: Record<string, string>;
  colourTests: ColourTest[];
  projects: StudioProject[];
  portfolio: PortfolioItem[];
};

export const STORAGE_KEY = "ts-art-studio:v1";

export const emptySavedState = (): SavedState => ({
  completed: [],
  journal: "",
  reflections: {},
  colourTests: [],
  projects: [],
  portfolio: []
});

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === "object" && value !== null && !Array.isArray(value);

const hasStringFields = (value: Record<string, unknown>, fields: string[]) =>
  fields.every((field) => typeof value[field] === "string");

const isColourTest = (value: unknown): value is ColourTest =>
  isRecord(value) && hasStringFields(value, [
    "id", "question", "pigments", "ratio", "medium", "support",
    "wetObservation", "dryObservation", "result", "nextStep", "createdAt"
  ]);

const isStudioProject = (value: unknown): value is StudioProject =>
  isRecord(value) &&
  hasStringFields(value, ["id", "title", "question", "medium", "constraint", "nextStep", "createdAt"]) &&
  (value.status === "active" || value.status === "paused" || value.status === "complete");

const isPortfolioItem = (value: unknown): value is PortfolioItem =>
  isRecord(value) && hasStringFields(value, [
    "id", "title", "medium", "year", "description", "link", "createdAt"
  ]);

export function parseSavedState(raw: string | null): SavedState {
  if (!raw) return emptySavedState();

  try {
    const parsed: unknown = JSON.parse(raw);
    if (!isRecord(parsed)) return emptySavedState();

    const knownLessonIds = new Set(allLessons.map((lesson) => lesson.id));
    const completed = Array.isArray(parsed.completed)
      ? [...new Set(parsed.completed.filter(
          (id): id is string => typeof id === "string" && knownLessonIds.has(id)
        ))]
      : [];

    const reflections: Record<string, string> = {};
    if (isRecord(parsed.reflections)) {
      for (const [lessonId, value] of Object.entries(parsed.reflections)) {
        if (knownLessonIds.has(lessonId) && typeof value === "string") {
          reflections[lessonId] = value;
        }
      }
    }

    return {
      completed,
      journal: typeof parsed.journal === "string" ? parsed.journal : "",
      reflections,
      colourTests: Array.isArray(parsed.colourTests) ? parsed.colourTests.filter(isColourTest) : [],
      projects: Array.isArray(parsed.projects) ? parsed.projects.filter(isStudioProject) : [],
      portfolio: Array.isArray(parsed.portfolio) ? parsed.portfolio.filter(isPortfolioItem) : []
    };
  } catch {
    return emptySavedState();
  }
}

export function readSavedState(storage?: Pick<Storage, "getItem">): SavedState {
  try {
    const source = storage ?? window.localStorage;
    return parseSavedState(source.getItem(STORAGE_KEY));
  } catch {
    // Privacy settings or browser storage restrictions must not block the studio from opening.
    return emptySavedState();
  }
}
