import { describe, expect, it } from "vitest";
import { getPigmentShares, mixPigmentHex } from "./mixPigments";

describe("oil mixer preview calculation", () => {
  it("returns the first pigment at a 100/0 ratio", () => {
    expect(mixPigmentHex("#c49a45", "#344b91", 100)).toBe("#c49a45");
  });

  it("returns the second pigment at a 0/100 ratio", () => {
    expect(mixPigmentHex("#c49a45", "#344b91", 0)).toBe("#344b91");
  });

  it("interpolates RGB channels for an even mixture", () => {
    expect(mixPigmentHex("#000000", "#ffffff", 50)).toBe("#808080");
  });

  it("clamps out-of-range ratios to valid endpoints", () => {
    expect(mixPigmentHex("#c49a45", "#344b91", -10)).toBe("#344b91");
    expect(mixPigmentHex("#c49a45", "#344b91", 150)).toBe("#c49a45");
  });

  it("returns the same colour when both pigments are identical", () => {
    expect(mixPigmentHex("#c49a45", "#c49a45", 37)).toBe("#c49a45");
  });

  it("does not change a two-pigment result when the third pigment has zero share", () => {
    expect(mixPigmentHex("#c49a45", "#344b91", 38, "#ff0000", 0)).toBe(
      mixPigmentHex("#c49a45", "#344b91", 38)
    );
  });

  it("rejects malformed HEX colours instead of returning an invalid preview", () => {
    expect(() => mixPigmentHex("c49a45", "#344b91", 50)).toThrow(TypeError);
    expect(() => mixPigmentHex("#c49", "#344b91", 50)).toThrow(TypeError);
    expect(() => mixPigmentHex("#gggggg", "#344b91", 50)).toThrow(TypeError);
    expect(() => mixPigmentHex("#c49a45", "#344b91", 50, "not-a-colour", 0)).toThrow(TypeError);
  });

  it("uses the third pigment as a share of the complete mixture", () => {
    expect(mixPigmentHex("#000000", "#ffffff", 50, "#ff0000", 50)).toBe("#bf4040");
  });

  it("preserves the A:B balance when adding a small third-pigment share", () => {
    expect(mixPigmentHex("#000000", "#ffffff", 50, "#ff0000", 20)).toBe("#996666");
  });

  it("limits the third-pigment share to the same 60 percent maximum as the UI", () => {
    expect(mixPigmentHex("#000000", "#ffffff", 50, "#ff0000", 100)).toBe("#cc3333");
    expect(mixPigmentHex("#000000", "#ffffff", 50, "#ff0000", 60)).toBe("#cc3333");
    expect(mixPigmentHex("#000000", "#ffffff", 50, "#ff0000", -10)).toBe("#808080");
  });
});

describe("oil mixer pigment shares", () => {
  it("distributes the whole mixture between A and B when C is disabled", () => {
    expect(getPigmentShares(38, 10, false)).toEqual([38, 62, 0]);
  });

  it("treats C as a percentage of the complete mixture", () => {
    expect(getPigmentShares(38, 10, true)).toEqual([34, 56, 10]);
  });

  it("keeps displayed whole-percentage shares summing to 100", () => {
    for (const firstPercent of [0, 1, 38, 50, 99, 100]) {
      for (const thirdPercent of [0, 1, 17, 59, 60]) {
        expect(getPigmentShares(firstPercent, thirdPercent, true).reduce((sum, share) => sum + share, 0)).toBe(100);
      }
    }
  });

  it("clamps invalid values and limits the third pigment to 60 percent", () => {
    expect(getPigmentShares(-20, -4, true)).toEqual([0, 100, 0]);
    expect(getPigmentShares(50, 90, true)).toEqual([20, 20, 60]);
    expect(getPigmentShares(50, 90, false)).toEqual([50, 50, 0]);
  });

  it("handles non-finite ratio values safely", () => {
    expect(getPigmentShares(Number.NaN, Number.POSITIVE_INFINITY, true)).toEqual([0, 100, 0]);
    expect(mixPigmentHex("#000000", "#ffffff", Number.NaN)).toBe("#ffffff");
    expect(mixPigmentHex("#000000", "#ffffff", 50, "#ff0000", Number.POSITIVE_INFINITY)).toBe("#808080");
  });

  it("preserves the mixture when A and B are swapped with the ratio inverted", () => {
    expect(getPigmentShares(62, 10, true)).toEqual([56, 34, 10]);
    expect(mixPigmentHex("#c49a45", "#344b91", 38, "#a64c3d", 10)).toBe(
      mixPigmentHex("#344b91", "#c49a45", 62, "#a64c3d", 10)
    );
  });
});
