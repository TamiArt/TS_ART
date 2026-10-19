export function mixPigmentHex(first: string, second: string, firstPercent: number): string {
  const a = first.replace("#", "");
  const b = second.replace("#", "");
  const weight = Math.max(0, Math.min(100, firstPercent)) / 100;
  const channels = [0, 2, 4].map((index) => {
    const left = Number.parseInt(a.slice(index, index + 2), 16);
    const right = Number.parseInt(b.slice(index, index + 2), 16);
    return Math.round(left * weight + right * (1 - weight));
  });
  return "#" + channels.map((value) => value.toString(16).padStart(2, "0")).join("");
}
