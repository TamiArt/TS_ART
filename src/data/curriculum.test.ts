import { describe, expect, it } from "vitest";
import { allLessons, curriculum } from "./curriculum";

describe("TS·ART curriculum", () => {
  it("contains all 20 modules in learning order", () => {
    expect(curriculum).toHaveLength(20);
    expect(curriculum.map((module) => module.id)).toEqual(Array.from({ length: 20 }, (_, index) => index + 1));
  });

  it("provides authored lessons in every module", () => {
    expect(curriculum.every((module) => module.status === "available" && module.lessons.length > 0)).toBe(true);
    expect(allLessons).toHaveLength(84);
  });

  it("uses unique lesson IDs and complete learning steps", () => {
    const ids = allLessons.map((lesson) => lesson.id);
    expect(new Set(ids).size).toBe(ids.length);
    for (const lesson of allLessons) {
      expect(lesson.title.trim()).not.toBe("");
      expect(lesson.objective.trim()).not.toBe("");
      expect(lesson.steps.length).toBeGreaterThanOrEqual(3);
      expect(lesson.selfCheck.length).toBeGreaterThanOrEqual(2);
    }
  });

  it("keeps the negative-space lesson aligned with its five-step visual tutorial", () => {
    const lesson = allLessons.find((item) => item.id === "negative-space");
    expect(lesson?.title).toBe("Рисуем пространство вокруг предмета");
    expect(lesson?.duration).toBe("7 мин");
    expect(lesson?.objective).toContain("пустые промежутки вокруг формы");
    expect(lesson?.materials).toContain("бумага и карандаш");
    expect(lesson?.steps).toHaveLength(5);
    expect(lesson?.steps[0]).toContain("вокруг него были видны промежутки");
    expect(lesson?.steps[2]).toContain("форму этого промежутка");
    expect(lesson?.steps[3]).toContain("второй промежуток");
    expect(lesson?.steps[4]).toContain("внешний силуэт");
    expect(lesson?.selfCheck).toHaveLength(2);
  });

  it("includes a dedicated pigment testing sequence in Module 7", () => {
    const colourLab = curriculum.find((module) => module.id === 7);
    expect(colourLab?.lessons.map((lesson) => lesson.id)).toContain("m07-lab-card");
    expect(colourLab?.lessons.some((lesson) => lesson.title.includes("зелени"))).toBe(true);
  });

  it("keeps a range of short exercises across the learning path", () => {
    expect(allLessons.filter((lesson) => lesson.kind === "practice").length).toBeGreaterThanOrEqual(20);
  });
});
