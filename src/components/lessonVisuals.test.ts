import { describe, expect, it } from "vitest";
import { allLessons } from "../data/curriculum";
import { buildLessonVisualStages, classifyLesson, classifyVisualAction, getVisualPrinciple } from "./lessonVisuals";

describe("lesson visual guides", () => {
  it("creates one ordered visual stage for every written instruction in all lessons", () => {
    for (const lesson of allLessons) {
      const stages = buildLessonVisualStages(lesson);
      expect(stages).toHaveLength(lesson.steps.length);
      expect(stages.map((stage) => stage.number)).toEqual(lesson.steps.map((_, index) => index + 1));
      expect(stages.every((stage) => stage.instruction.trim().length > 0)).toBe(true);
      expect(stages.every((stage) => Boolean(stage.action))).toBe(true);
      expect(stages.every((stage) => stage.drawingStage >= 1 && stage.drawingStage <= 4)).toBe(true);
      expect(stages[0]?.label).toBe("Начало");
      expect(stages.at(-1)?.label).toBe("Проверь");
      expect(stages.slice(1, -1).map((stage) => stage.label)).toEqual(
        stages.slice(1, -1).map((stage) => `Этап ${stage.number}`)
      );
    }
  });

  it("matches visual action to the actual instruction", () => {
    expect(classifyVisualAction("Поставь предмет на уровне глаз.")).toBe("place");
    expect(classifyVisualAction("Проследи взглядом внешний край предмета.")).toBe("observe");
    expect(classifyVisualAction("Наметь силуэт лёгкой линией.")).toBe("outline");
    expect(classifyVisualAction("Сравни наклоны и выступы с натурой.")).toBe("compare");
    expect(classifyVisualAction("Измерь высоту и ширину предмета.")).toBe("measure");
    expect(classifyVisualAction("Сделай три линии одним движением.")).toBe("practice");
    expect(classifyVisualAction("Запиши одно наблюдение.")).toBe("record");
    expect(classifyVisualAction("Различи свет и тень.")).toBe("shade");
    expect(classifyVisualAction("Смешай два пигмента.")).toBe("mix");
  });

  it("classifies core art topics into the matching visual family", () => {
    const lesson = (title: string, objective = title) => ({
      id: title, title, duration: "5 мин", kind: "lesson" as const,
      objective, materials: "Бумага и карандаш",
      steps: ["Сделай пробу", "Сравни результат", "Запиши наблюдение"],
      selfCheck: ["Проверено", "Понятно"]
    });
    expect(classifyLesson(lesson("Портрет: пропорции лица"))).toBe("portrait");
    expect(classifyLesson(lesson("Пейзаж: большие планы"))).toBe("landscape");
    expect(classifyLesson(lesson("Натюрморт с чашкой"))).toBe("still-life");
    expect(classifyLesson(lesson("Смешение пигментов и оттенки"))).toBe("colour");
    expect(classifyLesson(lesson("Свет, полутон и тень"))).toBe("tone");
    expect(classifyLesson(lesson("Одноточечная перспектива"))).toBe("perspective");
    expect(classifyLesson(lesson("Линия горизонта и уровень глаз"))).toBe("perspective");
    expect(classifyLesson(lesson("Рисуем пространство вокруг предмета", "Использовать пустые промежутки вокруг формы"))).toBe("negative-space");
    expect(classifyLesson(lesson("Горный пейзаж"))).toBe("landscape");
    expect(classifyLesson(lesson("Композиционные миниатюры"))).toBe("composition");
    expect(classifyLesson(lesson("Сравнение пропорций"))).toBe("proportion");
    expect(classifyLesson(lesson("Сложный предмет из простых форм"))).toBe("shape");
    expect(classifyLesson(lesson("Контур одной линией"))).toBe("line");
    expect(classifyLesson(lesson("Первый слой масляной краски"))).toBe("paint");
  });

  it("does not infer a specific subject from generic objective words", () => {
    const genericLesson = {
      id: "observe",
      title: "Учимся смотреть, а не угадывать",
      duration: "12 мин",
      kind: "lesson" as const,
      objective: "Замечать реальные отношения формы, размера и пространства до начала рисунка.",
      materials: "Любой простой предмет, бумага и карандаш.",
      steps: ["Наблюдай", "Сравни", "Запиши"],
      selfCheck: ["Проверено"]
    };
    expect(classifyLesson(genericLesson)).toBe("general");
  });

  it("uses the lesson title before broad words in the objective", () => {
    const titleSpecific = {
      id: "m05-thumbnails",
      title: "Композиционные миниатюры",
      duration: "8 мин",
      kind: "practice" as const,
      objective: "Выбирать размещение крупных масс до проработки деталей.",
      materials: "Бумага и карандаш.",
      steps: ["Создай варианты", "Сравни", "Выбери"],
      selfCheck: ["Проверено"]
    };
    expect(classifyLesson(titleSpecific)).toBe("composition");
  });

  it("provides a practical principle for every lesson visual", () => {
    for (const lesson of allLessons) {
      expect(getVisualPrinciple(classifyLesson(lesson)).trim().length).toBeGreaterThan(10);
    }
  });
});
