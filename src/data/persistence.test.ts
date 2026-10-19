import { describe, expect, it } from "vitest";
import { allLessons } from "./curriculum";
import { emptySavedState, parseSavedState, readSavedState, STORAGE_KEY } from "./persistence";

describe("studio persistence", () => {
  it("returns a clean empty state for missing, malformed, or non-object data", () => {
    expect(parseSavedState(null)).toEqual(emptySavedState());
    expect(parseSavedState("{broken")).toEqual(emptySavedState());
    expect(parseSavedState("[]")).toEqual(emptySavedState());
    expect(parseSavedState("null")).toEqual(emptySavedState());
  });

  it("deduplicates completed lessons and ignores unknown IDs", () => {
    const validId = allLessons[0].id;
    const state = parseSavedState(JSON.stringify({
      completed: [validId, validId, "deleted-lesson", 12, null],
      reflections: { [validId]: "good study", "deleted-lesson": "orphaned", [allLessons[1].id]: 42 }
    }));

    expect(state.completed).toEqual([validId]);
    expect(state.reflections).toEqual({ [validId]: "good study" });
  });

  it("keeps only valid records in optional studio collections", () => {
    const state = parseSavedState(JSON.stringify({
      colourTests: [{ id: "test-1", question: "mix", pigments: "ochre + white", ratio: "1:2", medium: "oil", support: "canvas", wetObservation: "", dryObservation: "", result: "warm", nextStep: "add blue", createdAt: "2026-10-19" }, { id: 1 }],
      projects: [{ id: "p1", title: "Study", question: "", medium: "oil", constraint: "", nextStep: "", status: "active", createdAt: "2026-10-19" }, { id: "p2", title: "Bad", status: "unknown" }],
      portfolio: [{ id: "work-1", title: "Study", medium: "oil", year: "2026", description: "", link: "", createdAt: "2026-10-19" }, null]
    }));

    expect(state.colourTests).toHaveLength(1);
    expect(state.projects).toHaveLength(1);
    expect(state.portfolio).toHaveLength(1);
  });

  it("does not throw when browser storage is blocked", () => {
    expect(readSavedState({ getItem: () => { throw new Error("blocked"); } })).toEqual(emptySavedState());
    expect(readSavedState({ getItem: (key) => key === STORAGE_KEY ? null : "unexpected" })).toEqual(emptySavedState());
  });
});
