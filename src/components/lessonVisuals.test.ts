import { describe, expect, it } from "vitest";
import { allLessons } from "../data/curriculum";
import { buildLessonVisualStages, classifyLesson, getVisualPrinciple } from "./lessonVisuals";

describe("lesson visual guides", () => {
  it("creates one ordered visual stage for every written instruction in all lessons", () => {
    for (const lesson of allLessons) {
      const stages = buildLessonVisualStages(lesson);
      expect(stages).toHaveLength(lesson.steps.length);
      expect(stages.map((stage) => stage.number)).toEqual(lesson.steps.map((_, index) => index + 1));
      expect(stages.every((stage) => stage.instruction.trim().length > 0)).toBe(true);
      expect(stages.every((stage) => stage.drawingStage >= 1 && stage.drawingStage <= 4)).toBe(true);
      expect(stages[0]?.label).toBe("Начало");
      expect(stages.at(-1)?.label).toBe("Проверь");
    }
  });

  it("classifies core art topics into the matching visual family", () => {
    const lesson = (title: string) => ({
      id: title, title, duration: "5 мин", kind: "lesson" as const,
      objective: title, materials: "Бумага и карандаш",
      steps: ["Сделай пробу", "Сравни результат", "Запиши наблюдение"],
      selfCheck: ["Проверено", "Понятно"]
    });
    expect(classifyLesson(lesson("Портрет: пропорции лица"))).toBe("portrait");
    expect(classifyLesson(lesson("Пейзаж: большие планы"))).toBe("landscape");
    expect(classifyLesson(lesson("Натюрморт с чашкой"))).toBe("still-life");
    expect(classifyLesson(lesson("Смешение пигментов и оттенки"))).toBe("colour");
    expect(classifyLesson(lesson("Свет, полутон и тень"))).toBe("tone");
    expect(classifyLesson(lesson("Одноточечная перспектива"))).toBe("perspective");
    expect(classifyLesson(lesson("Композиционные миниатюры"))).toBe("composition");
    expect(classifyLesson(lesson("Сравнение пропорций"))).toBe("proportion");
    expect(classifyLesson(lesson("Контур одной линией"))).toBe("line");
    expect(classifyLesson(lesson("Первый слой масляной краски"))).toBe("paint");
  });

  it("provides a practical principle for every lesson visual", () => {
    for (const lesson of allLessons) {
      expect(getVisualPrinciple(classifyLesson(lesson)).trim().length).toBeGreaterThan(10);
    }
  });
});
