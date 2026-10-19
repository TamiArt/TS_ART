import { describe, expect, it } from "vitest";
import { artHistoryPeriods, artHistorySources } from "./artHistory";

describe("art history learning content", () => {
  it("provides a unique, navigable set of historical periods", () => {
    expect(artHistoryPeriods.length).toBeGreaterThanOrEqual(8);
    expect(new Set(artHistoryPeriods.map((period) => period.id)).size).toBe(artHistoryPeriods.length);
    expect(artHistoryPeriods[0].id).toBe("origins");
    expect(artHistoryPeriods.at(-1)?.id).toBe("contemporary");
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

  it("links to recognized educational or museum resources over HTTPS", () => {
    expect(artHistorySources.length).toBeGreaterThanOrEqual(3);
    for (const source of artHistorySources) {
      expect(source.url.startsWith("https://")).toBe(true);
      expect(source.description.trim()).not.toBe("");
    }
  });
});
