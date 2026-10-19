import type { Lesson } from "../data/types";

export type VisualKind =
  | "line" | "shape" | "negative-space" | "proportion" | "tone" | "perspective"
  | "composition" | "colour" | "portrait" | "landscape"
  | "still-life" | "paint" | "general";

export type VisualAction =
  | "observe" | "place" | "trace" | "outline" | "simplify" | "measure"
  | "compare" | "shade" | "fill" | "mix" | "select" | "record" | "practice" | "review";

export type LessonVisualStage = {
  number: number;
  instruction: string;
  drawingStage: 1 | 2 | 3 | 4;
  label: string;
  action: VisualAction;
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
  { kind: "negative-space", pattern: /негативн|отрицательн.*простран|пуст(?:ой|ые|ого|ых|ым) промежут|пространств(?:о|а|е|ом)? вокруг|пространств вокруг предмет/ },
  { kind: "line", pattern: /лини|контур|силуэт|нажим|штрих|край|обвод/ },
  { kind: "paint", pattern: /кист|краск|масл|акварел|живопис|мазок|холст|грунт|сло[ий]/ },
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
  const objective = lesson.objective.toLowerCase();
  const fullText = title + " " + objective;

  // Broad/introduction titles take precedence over incidental topic words in the objective.
  if (
    title.includes("общ") ||
    title.includes("введен") ||
    title.includes("принцип") ||
    title.includes("основы") ||
    title.includes("general") ||
    title.includes("broad") ||
    title.trim().startsWith("учимся смотреть")
  ) {
    return "general";
  }

  // Negative space is a specific topic and must win over generic shape/proportion wording.
  if (fullText.includes("пространство вокруг") || fullText.includes("негативн")) {
    return "negative-space";
  }

  const titleMatch = topicRules.find((rule) => rule.pattern.test(title));
  if (titleMatch) return titleMatch.kind;

  const objectiveMatch = objectiveRules.find((rule) => rule.pattern.test(objective));
  if (objectiveMatch) return objectiveMatch.kind;

  const materialText = lesson.materials.toLowerCase();
  return topicRules.find((rule) => rule.pattern.test(materialText))?.kind ?? "general";
}

export function classifyVisualAction(instruction: string): VisualAction {
  const text = instruction.toLowerCase();
  if (/запиши|подпиши|сформулируй|сохрани|зафиксируй|дневник|отметь/.test(text)) return "record";
  if (/сравни|проверь|оцени|найди отличие|куда первым|посмотри .*уменьш/.test(text)) return "compare";
  if (/закрась|заполни.*тоном|залей|покрой.*одним тоном/.test(text)) return "fill";
  if (/тень|светлот|полутон|тональн|затемн|освещён|освещен|свет и тень|штрихов/.test(text)) return "shade";
  if (/смеш|пигмент|пропорци.*цвет|оттенок|палитр/.test(text)) return "mix";
  if (/измер|отношени.*размер|пропорц|масштаб|ширин|высот|наклон/.test(text)) return "measure";
  if (/выбери|выбрать|отбери|оставь только|выдели только/.test(text)) return "select";
  if (/нарисуй|наметь|проведи контур|обведи|силуэт|линию|проведи пять линий/.test(text)) return "outline";
  if (/упрости|простых форм|круг, овал|геометрическ|крупными массами/.test(text)) return "simplify";
  if (/проследи взглядом|наблюдай|прищур|заметь|найди самую|рассмотри|смотри на предмет/.test(text)) return "observe";
  if (/поставь|размести|организуй свет|подготовь|положи рядом|разложи рядом/.test(text)) return "place";
  if (/повтори|сделай три|сделай ряд|серия|одним движением|попробуй/.test(text)) return "practice";
  if (/исправ|измени один|добавь|уточни|детал/.test(text)) return "trace";
  return "review";
}

export function buildLessonVisualStages(lesson: Lesson): LessonVisualStage[] {
  return lesson.steps.map((instruction, index) => ({
    number: index + 1,
    instruction,
    drawingStage: Math.min(index + 1, 4) as LessonVisualStage["drawingStage"],
    action: classifyVisualAction(instruction),
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
