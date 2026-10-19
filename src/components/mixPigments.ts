function clampPercent(value: number, max = 100): number {
  if (!Number.isFinite(value)) return 0;
  return Math.max(0, Math.min(max, value));
}

function assertHexColour(value: string): void {
  if (!/^#[\da-f]{6}$/i.test(value)) {
    throw new TypeError(`Expected a six-digit HEX colour such as "#c49a45"; received "${value}".`);
  }
}

function channel(hex: string, offset: number): number {
  return Number.parseInt(hex.slice(offset, offset + 2), 16);
}

/**
 * Educational RGB interpolation only; real oil-paint mixing is not linear RGB.
 * firstPercent controls the A:B balance. If a third pigment is supplied,
 * thirdPercent is its share of the complete mixture and A/B share the rest.
 *
 * Inputs must be six-digit HEX colours (#RRGGBB). Invalid colours fail loudly
 * rather than producing a malformed preview such as "#NaNNaNNaN".
 */
export function mixPigmentHex(
  firstHex: string,
  secondHex: string,
  firstPercent: number,
  thirdHex?: string,
  thirdPercent = 0
): string {
  const colours = [firstHex, secondHex, thirdHex ?? secondHex];
  colours.forEach(assertHexColour);

  const firstShare = clampPercent(firstPercent) / 100;
  const thirdShare = thirdHex ? clampPercent(thirdPercent, 60) / 100 : 0;
  const remainingShare = 1 - thirdShare;
  const weights = [remainingShare * firstShare, remainingShare * (1 - firstShare), thirdShare];

  const channels = [1, 3, 5].map((offset) => {
    const value = colours.reduce((sum, colour, index) => sum + channel(colour, offset) * weights[index], 0);
    return Math.round(value).toString(16).padStart(2, "0");
  });

  return `#${channels.join("")}`;
}

/**
 * Return whole-percentage shares for the UI. A and B divide the portion
 * left after C; the three displayed values always add up to 100.
 */
export function getPigmentShares(
  firstPercent: number,
  thirdPercent = 0,
  includeThird = false
): [number, number, number] {
  const firstShare = clampPercent(firstPercent);
  const thirdShare = includeThird ? clampPercent(thirdPercent, 60) : 0;
  const remainingShare = 100 - thirdShare;
  const firstWeight = Math.round(remainingShare * firstShare / 100);
  return [firstWeight, remainingShare - firstWeight, thirdShare];
}
