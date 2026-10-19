import { describe, expect, it } from "vitest";
import { mixPigmentHex } from "./mixPigments";

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

  it("uses the third pigment as a share of the complete mixture", () => {
    expect(mixPigmentHex("#000000", "#ffffff", 50, "#ff0000", 50)).toBe("#804040");
  });

  it("preserves the A:B balance when adding a small third-pigment share", () => {
    expect(mixPigmentHex("#000000", "#ffffff", 50, "#ff0000", 20)).toBe("#666666");
  });

  it("clamps the third-pigment share", () => {
    expect(mixPigmentHex("#000000", "#ffffff", 50, "#ff0000", 100)).toBe("#ff0000");
    expect(mixPigmentHex("#000000", "#ffffff", 50, "#ff0000", -10)).toBe("#808080");
  });
});
