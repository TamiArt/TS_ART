import { describe, expect, it } from "vitest";
import { artHistoryPeriods, artHistorySources, artworkStudies } from "./artHistory";

describe("art history learning content", () => {
  it("provides a unique, navigable set of historical periods", () => {
    expect(artHistoryPeriods.length).toBeGreaterThanOrEqual(8);
    expect(new Set(artHistoryPeriods.map((period) => period.id)).size).toBe(artHistoryPeriods.length);
    expect(artHistoryPeriods[0].id).toBe("origins");
    expect(artHistoryPeriods[artHistoryPeriods.length - 1]?.id).toBe("contemporary");
  });

  it("includes visual observation and an achievable practice task for every period", () => {
    for (const period of artHistoryPeriods) {
      expect(period.era.trim()).not.toBe("");
      expect(period.summary.length).toBeGreaterThan(80);
      expect(period.visualClues.length).toBeGreaterThanOrEqual(3);
      expect(period.lookFor.trim()).not.toBe("");
      expect(period.tryIt.trim()).not.toBe("");
      expect(period.terms.length).toBeGreaterThan(0);
    }
  });

  it("provides one artwork study with a visual focus and practice task for every period", () => {
    expect(artworkStudies).toHaveLength(artHistoryPeriods.length);
    expect(new Set(artworkStudies.map((study) => study.periodId)).size).toBe(artHistoryPeriods.length);
    for (const period of artHistoryPeriods) {
      const study = artworkStudies.find((item) => item.periodId === period.id);
      expect(study, `missing artwork study for ${period.id}`).toBeDefined();
      expect(study?.title.trim()).not.toBe("");
      expect(study?.creator.trim()).not.toBe("");
      expect(study?.date.trim()).not.toBe("");
      expect(study?.medium.trim()).not.toBe("");
      expect(study?.focus.length).toBeGreaterThan(40);
      expect(study?.exercise.length).toBeGreaterThan(40);
    }
  });

  it("links to recognized educational or museum resources over HTTPS", () => {
    expect(artHistorySources.length).toBeGreaterThanOrEqual(3);
    for (const source of artHistorySources) {
      expect(source.url.startsWith("https://")).toBe(true);
      expect(source.description.trim()).not.toBe("");
    }
  });
});
