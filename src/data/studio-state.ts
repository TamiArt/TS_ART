import type { SavedState } from "../types/studio";

export const STORAGE_KEY = "ts-art-studio-state-v1";

const emptyState = (): SavedState => ({
  completed: [],
  reflections: {},
  journal: "",
  colourTests: [],
  projects: [],
  portfolio: []
});

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function stringArray(value: unknown): string[] {
  return Array.isArray(value) ? value.filter((item): item is string => typeof item === "string") : [];
}

function stringRecord(value: unknown): Record<string, string> {
  if (!isRecord(value)) return {};
  return Object.fromEntries(
    Object.entries(value).filter((entry): entry is [string, string] => typeof entry[1] === "string")
  );
}

function records<T extends { id: string }>(value: unknown, isItem: (item: unknown) => item is T): T[] {
  return Array.isArray(value) ? value.filter(isItem) : [];
}

function isColourTest(value: unknown): value is SavedState["colourTests"][number] {
  if (!isRecord(value)) return false;
  return ["id", "question", "pigments", "ratio", "medium", "support", "wetObservation", "dryObservation", "result", "nextStep", "createdAt"]
    .every((key) => typeof value[key] === "string");
}

function isStudioProject(value: unknown): value is SavedState["projects"][number] {
  if (!isRecord(value)) return false;
  return ["id", "title", "question", "medium", "constraint", "nextStep", "createdAt"]
    .every((key) => typeof value[key] === "string")
    && (value.status === "active" || value.status === "paused" || value.status === "complete");
}

function isPortfolioItem(value: unknown): value is SavedState["portfolio"][number] {
  if (!isRecord(value)) return false;
  return ["id", "title", "medium", "year", "description", "link", "createdAt"]
    .every((key) => typeof value[key] === "string");
}

/** Read persisted studio notes without allowing malformed or outdated storage to crash the app. */
export function readSavedState(): SavedState {
  if (typeof window === "undefined") return emptyState();

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return emptyState();

    const parsed: unknown = JSON.parse(raw);
    if (!isRecord(parsed)) return emptyState();

    return {
      completed: stringArray(parsed.completed),
      reflections: stringRecord(parsed.reflections),
      journal: typeof parsed.journal === "string" ? parsed.journal : "",
      colourTests: records(parsed.colourTests, isColourTest),
      projects: records(parsed.projects, isStudioProject),
      portfolio: records(parsed.portfolio, isPortfolioItem)
    };
  } catch {
    return emptyState();
  }
}
