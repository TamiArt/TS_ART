const numberWords: Record<string, number> = {
  один: 1, одна: 1, одну: 1, два: 2, две: 2, три: 3, четыре: 4,
  пять: 5, шесть: 6, семь: 7, восемь: 8, девять: 9, десять: 10,
};

/**
 * Returns the requested line count only when the instruction states it
 * explicitly. For a range, use the rounded midpoint for the practice preview.
 */
export function getRequestedLineCount(instruction: string): number | null {
  const text = instruction.toLocaleLowerCase("ru");
  const range = text.match(/(\d{1,2})\s*[–—-]\s*(\d{1,2})\s+(?:крупн[а-яё]*\s+)?лини/);
  if (range) {
    const minimum = Number(range[1]);
    const maximum = Number(range[2]);
    if (minimum >= 1 && maximum <= 12 && minimum <= maximum) {
      return Math.round((minimum + maximum) / 2);
    }
  }

  const match = text.match(/(?:проведи|нарисуй|сделай|повтори|создай|наметь)\s+(\d{1,2}|один|одна|одну|два|две|три|четыре|пять|шесть|семь|восемь|девять|десять)(?:\s+[а-яё-]+){0,4}?\s+лини/);
  if (!match) return null;

  const token = match[1];
  const count = /^\d+$/.test(token) ? Number(token) : numberWords[token];
  return count >= 1 && count <= 12 ? count : null;
}
