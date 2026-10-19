import { describe, expect, it } from "vitest";
import { mixPigmentHex } from "./OilPaintMixer";

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
});
