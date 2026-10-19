import { describe, expect, it } from "vitest";
import { getPigment, pigments, recipes, taskOptions, type StudyTask } from "./oilPaintMixerData";

describe("oil mixer learning data", () => {
  it("provides all three study tasks with four focused study categories each", () => {
    expect(taskOptions.map((task) => task.id)).toEqual(["portrait", "landscape", "still-life"]);

    for (const task of taskOptions) {
      expect(recipes.filter((recipe) => recipe.task === task.id)).toHaveLength(4);
    }
  });

  it("keeps recipe identifiers unique and every study task represented", () => {
    const ids = recipes.map((recipe) => recipe.id);
    expect(new Set(ids).size).toBe(ids.length);
    expect(new Set(recipes.map((recipe) => recipe.task))).toEqual(
      new Set<StudyTask>(["portrait", "landscape", "still-life"])
    );
  });

  it("references pigments that exist in the palette", () => {
    const pigmentIds = new Set(pigments.map((pigment) => pigment.id));

    for (const recipe of recipes) {
      expect(pigmentIds.has(recipe.first), `${recipe.id}: missing first pigment`).toBe(true);
      expect(pigmentIds.has(recipe.second), `${recipe.id}: missing second pigment`).toBe(true);
      if (recipe.third) {
        expect(pigmentIds.has(recipe.third), `${recipe.id}: missing third pigment`).toBe(true);
      }
    }
  });

  it("keeps recipe proportions within the supported control ranges", () => {
    for (const recipe of recipes) {
      expect(recipe.ratio, recipe.id).toBeGreaterThanOrEqual(0);
      expect(recipe.ratio, recipe.id).toBeLessThanOrEqual(100);
      if (recipe.thirdRatio !== undefined) {
        expect(recipe.thirdRatio, recipe.id).toBeGreaterThanOrEqual(0);
        expect(recipe.thirdRatio, recipe.id).toBeLessThanOrEqual(60);
      }
    }
  });

  it("provides usable names, HEX colours and explanatory notes for each pigment", () => {
    for (const pigment of pigments) {
      expect(pigment.name.trim()).not.toBe("");
      expect(pigment.note.trim()).not.toBe("");
      expect(pigment.hex).toMatch(/^#[\\da-f]{6}$/i);
    }
  });

  it("falls back to the first known pigment for an unknown identifier", () => {
    expect(getPigment("not-a-real-pigment")).toEqual(pigments[0]);
  });
});
