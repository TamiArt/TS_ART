import { describe, expect, it } from "vitest";
import { getRequestedLineCount } from "./StepIllustration";

describe("instruction-specific pencil illustrations", () => {
  it("extracts the exact number of lines requested in a lesson step", () => {
    expect(getRequestedLineCount("Проведи пять линий от очень лёгкой к более сильной.")).toBe(5);
    expect(getRequestedLineCount("Сделай три линии одним движением, не отрывая руку.")).toBe(3);
    expect(getRequestedLineCount("Нарисуй 4 короткие линии.")).toBe(4);
    expect(getRequestedLineCount("Проведи две линии рядом.")).toBe(2);
    expect(getRequestedLineCount("Сделай небольшой рисунок из 5–10 крупных линий, без деталей.")).toBe(8);
  });

  it("does not invent a line count when the instruction has no explicit quantity", () => {
    expect(getRequestedLineCount("Наметь внешний силуэт лёгкой линией.")).toBeNull();
    expect(getRequestedLineCount("Сравни рисунок с предметом.")).toBeNull();
  });
});
