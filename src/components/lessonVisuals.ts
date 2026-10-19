import type { Lesson } from "../data/types";

export type VisualKind =
  | "line" | "shape" | "negative-space" | "proportion" | "tone" | "perspective"
  | "composition" | "colour" | "portrait" | "landscape"
  | "still-life" | "paint" | "general";

export type LessonVisualStage = {
  number: number;
  instruction: string;
  drawingStage: 1 | 2 | 3 | 4;
  label: string;
};

const topicRules: Array<{ kind: VisualKind; pattern: RegExp }> = [
  { kind: "portrait", pattern: /портрет|лицо|лица|лицу|лицом|череп|черты лица|анатомия лица|skin|portrait|нос|губ|бров|скул|голова|головы|голове|голову/ },
  { kind: "landscape", pattern: /пейзаж|небо|дерев|гор(?:а|ы|ный|ная|ное|ных|ными|ной|ному)|обла|landscape/ },
  { kind: "still-life", pattern: /натюрморт|чаш|бутыл|яблок|драпиров|still.life/ },
  { kind: "colour", pattern: /цвет|колорит|палитр|пигмент|оттен|тепл|холодн|насыщ|colour|color/ },
  { kind: "tone", pattern: /свет|тень|тон|светлот|контраст|монохром|штрихов|объём|объем/ },
  { kind: "perspective", pattern: /перспектив|горизонт|точк[аи] сход|глубин|уровень глаз/ },
  { kind: "composition", pattern: /композиц|миниатюр|фокус|акцент|баланс|кадр|расположен/ },
  { kind: "proportion", pattern: /пропорц|измер|масштаб|ось|наклон|конструкц|отношени размеров/ },
  { kind: "line", pattern: /лини|контур|силуэт|нажим|штрих|край|обвод/ },
  { kind: "paint", pattern: /кист|краск|масл|акварел|живопис|мазок|холст|грунт|сло[ий]/ },
  { kind: "negative-space", pattern: /негативн|отрицательн.*простран|пуст(?:ой|ые|ого|ых|ым) промежут|пространств вокруг/ },
  { kind: "shape", pattern: /прост(?:ая|ых|ую|ые) форм|геометр|круг|овал|цилиндр|куб|шар|форм[аыуе]/ }
];

const visualPrinciples: Record<VisualKind, string> = {
  line: "Пусть линия показывает форму, а не просто обводит её.",
  shape: "Сначала большие простые формы — детали добавляй после проверки.",
  "negative-space": "Смотри на промежутки вокруг предмета как на самостоятельные формы.",
  proportion: "Сверяй размеры частей друг с другом до уточнения контура.",
  tone: "Сравнивай светлое и тёмное; объём строится отношениями тонов.",
  perspective: "Проверяй направления линий и положение уровня глаз.",
  composition: "Сначала оценивай крупные массы и пустые промежутки.",
  colour: "Сравнивай цвет по температуре, светлоте и насыщенности.",
  portrait: "Начинай с общей формы головы и расположения черт, а не с деталей.",
  landscape: "Разделяй планы и крупные массы прежде, чем добавлять фактуру.",
  "still-life": "Сначала проверь силуэты и взаимное расположение предметов.",
  paint: "Работай от крупных масс к уточнениям и соблюдай свойства материала.",
  general: "Выполняй шаги по порядку и сравнивай результат с поставленной целью."
};

const objectiveRules: Array<{ kind: VisualKind; pattern: RegExp }> = [
  { kind: "portrait", pattern: /портрет|лиц[оауы]|череп|черты лица|анатомия лица|skin|portrait|нос|губ|бров|скул|голов[аыоеу]/ },
  { kind: "landscape", pattern: /пейзаж|небо|дерев|гор(?:а|ы|ный|ная|ное|ных|ными|ной|ному)|обла|landscape/ },
  { kind: "still-life", pattern: /натюрморт|чаш|бутыл|яблок|драпиров|still.life/ },
  { kind: "colour", pattern: /цвет|колорит|палитр|пигмент|оттен|температур[аы]|насыщенност|colour|color/ },
  { kind: "tone", pattern: /светотен|светлот|тень|тональн|монохром|контраст|штрихов|объём|объем/ },
  { kind: "perspective", pattern: /перспектив|горизонт|точк[аи] сход|уровень глаз/ },
  { kind: "composition", pattern: /композиц|миниатюр|фокус|акцент|баланс|кадр|визуальн.*иерарх/ },
  { kind: "proportion", pattern: /пропорц|масштаб|ось и наклон|отношени.*размер|общие габариты/ },
  { kind: "line", pattern: /линия|линию|линии|контур|силуэт|нажим|характер линии|вес линии/ },
  { kind: "paint", pattern: /кист|краск|масл|акварел|живопис|мазок|холст|грунт|сло[ий]/ },
  { kind: "negative-space", pattern: /негативн|отрицательн.*простран|пуст(?:ой|ые|ого|ых|ым) промежут|пространств вокруг|промежутк.*между/ },
  { kind: "shape", pattern: /прост(?:ая|ых|ую|ые) форм|геометр|круг|овал|цилиндр|куб|шар|объёмн.*предмет/ }
];

export function classifyLesson(lesson: Lesson): VisualKind {
  const title = lesson.title.toLowerCase();
  const titleMatch = topicRules.find((rule) => rule.pattern.test(title));
  if (titleMatch) return titleMatch.kind;

  const objective = lesson.objective.toLowerCase();
  const objectiveMatch = objectiveRules.find((rule) => rule.pattern.test(objective));
  if (objectiveMatch) return objectiveMatch.kind;

  const materialText = lesson.materials.toLowerCase();
  return topicRules.find((rule) => rule.pattern.test(materialText))?.kind ?? "general";
}

export function buildLessonVisualStages(lesson: Lesson): LessonVisualStage[] {
  return lesson.steps.map((instruction, index) => ({
    number: index + 1,
    instruction,
    drawingStage: Math.min(index + 1, 4) as LessonVisualStage["drawingStage"],
    label: index === 0 ? "Начало" : index === lesson.steps.length - 1 ? "Проверь" : `Этап ${index + 1}`
  }));
}

export function getVisualKindLabel(kind: VisualKind): string {
  const labels: Record<VisualKind, string> = {
    line: "Линия и контур", shape: "Простые формы", "negative-space": "Пустые промежутки", proportion: "Пропорции", tone: "Свет и тон",
    perspective: "Перспектива", composition: "Композиция", colour: "Цвет", portrait: "Портрет",
    landscape: "Пейзаж", "still-life": "Натюрморт", paint: "Живописная техника", general: "Общий учебный пример"
  };
  return labels[kind];
}

export function getVisualPrinciple(kind: VisualKind): string {
  return visualPrinciples[kind];
}
