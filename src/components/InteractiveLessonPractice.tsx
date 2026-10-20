import { useEffect, useMemo, useState } from "react";
import type { Lesson } from "../data/types";
import StepIllustration from "./StepIllustration";
import { classifyLesson, getVisualKindLabel, getVisualPrinciple } from "./lessonVisuals";
import "./InteractiveLessonPractice.css";

const ACTION_HINTS: Array<{ pattern: RegExp; hint: string }> = [
  { pattern: /наблюд|заметь|рассмотр|прищур|найди/, hint: "Сначала смотри на объект целиком. Отложи детали и назови то, что действительно видишь." },
  { pattern: /сравн|проверь|оцени|отличи/, hint: "Сравнивай по одному признаку за раз: размер, направление, светлоту, цвет или расположение." },
  { pattern: /измер|пропорц|ширин|высот|масштаб|наклон/, hint: "Сопоставь части друг с другом и проверь общие габариты до уточнения мелочей." },
  { pattern: /линия|контур|силуэт|нажим|штрих/, hint: "Начни легко. Оставь вспомогательные линии видимыми, пока не проверишь форму." },
  { pattern: /цвет|палитр|оттен|смеш|пигмент|насыщ/, hint: "Сравнивай цвет по отдельным свойствам и меняй за один раз только один параметр." },
  { pattern: /свет|тень|тон|полутон|контраст/, hint: "Сначала найди самые светлый и тёмный участки, затем сравни промежуточные значения." },
  { pattern: /перспектив|горизонт|точк.*сход|глубин/, hint: "Найди уровень глаз и проследи направление основных линий, прежде чем рисовать детали." },
  { pattern: /запиши|сформулируй|отметь|сохрани|подпиши/, hint: "Зафиксируй конкретное наблюдение или действие — так, чтобы к нему можно было вернуться." },
  { pattern: /выбери|отбери|вариант|композиц|располож/, hint: "Сделай несколько простых вариантов и сравни их по одной цели, а не по впечатлению в целом." },
  { pattern: /кист|краск|живопис|мазок|сло[йя]|холст|цифров/, hint: "Сначала проверь инструмент на небольшом тесте и только потом используй его в основной работе." },
];

function hintFor(instruction: string, objective: string): string {
  const text = instruction.toLocaleLowerCase("ru");
  return ACTION_HINTS.find((rule) => rule.pattern.test(text))?.hint
    ?? `Свяжи действие с целью урока: ${objective} Сначала выполни его в простом виде, затем проверь результат.`;
}

function storageKey(lessonId: string) {
  return `ts-art-interactive-lesson-v1:${lessonId}`;
}

type SavedProgress = { completed: number[]; checks: boolean[]; note: string };

function readProgress(key: string, stepCount: number, checkCount: number): SavedProgress {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return { completed: [], checks: Array(checkCount).fill(false), note: "" };
    const value = JSON.parse(raw) as Partial<SavedProgress>;
    return {
      completed: Array.isArray(value.completed) ? value.completed.filter((n) => Number.isInteger(n) && n >= 0 && n < stepCount) : [],
      checks: Array.from({ length: checkCount }, (_, i) => Boolean(value.checks?.[i])),
      note: typeof value.note === "string" ? value.note : "",
    };
  } catch {
    return { completed: [], checks: Array(checkCount).fill(false), note: "" };
  }
}

export default function InteractiveLessonPractice({ lesson }: { lesson: Lesson }) {
  const kind = classifyLesson(lesson);
  const steps = useMemo(() => lesson.steps.map((instruction, index) => ({
    instruction,
    index,
    hint: hintFor(instruction, lesson.objective),
    label: index === 0 ? "Начало" : index === lesson.steps.length - 1 ? "Проверь" : `Этап ${index + 1}`,
  })), [lesson]);
  const key = storageKey(lesson.id);
  const [activeIndex, setActiveIndex] = useState(0);
  const [showHint, setShowHint] = useState(true);
  const [progress, setProgress] = useState<SavedProgress>(() => readProgress(key, steps.length, lesson.selfCheck.length));
  const active = steps[Math.min(activeIndex, steps.length - 1)];
  const completeCount = progress.completed.length;
  const percentage = steps.length ? Math.round(completeCount / steps.length * 100) : 0;

  useEffect(() => {
    try { localStorage.setItem(key, JSON.stringify(progress)); } catch { /* Progress remains available for this session. */ }
  }, [key, progress]);

  function toggleStep() {
    setProgress((current) => ({
      ...current,
      completed: current.completed.includes(active.index)
        ? current.completed.filter((index) => index !== active.index)
        : [...current.completed, active.index],
    }));
  }

  function toggleCheck(index: number, checked: boolean) {
    setProgress((current) => ({ ...current, checks: current.checks.map((value, i) => i === index ? checked : value) }));
  }

  return (
    <section className="ilp" aria-labelledby={`ilp-title-${lesson.id}`}>
      <header className="ilp__header">
        <div>
          <p className="ilp__eyebrow">ИНТЕРАКТИВНАЯ ПРАКТИКА · {lesson.duration.toLocaleUpperCase("ru")}</p>
          <h2 id={`ilp-title-${lesson.id}`}>Повтори по шагам</h2>
          <p className="ilp__objective">{lesson.objective}</p>
        </div>
        <aside className="ilp__principle">
          <span aria-hidden="true">✳</span>
          <div><strong>{getVisualKindLabel(kind)}</strong><p>{getVisualPrinciple(kind)}</p></div>
        </aside>
      </header>

      <div className="ilp__progress" role="progressbar" aria-label="Прогресс практики" aria-valuemin={0} aria-valuemax={100} aria-valuenow={percentage}><span style={{ width: percentage + "%" }} /></div>
      <div className="ilp__progress-label"><span>{completeCount} из {steps.length} шагов выполнено</span><span>{percentage}%</span></div>

      <nav className="ilp__tabs" aria-label="Шаги практики">
        {steps.map((step, index) => <button type="button" key={`${lesson.id}-step-${index}`} className={`ilp__tab ${activeIndex === index ? "is-active" : ""} ${progress.completed.includes(index) ? "is-done" : ""}`} aria-current={activeIndex === index ? "step" : undefined} onClick={() => { setActiveIndex(index); setShowHint(true); }}><span>{progress.completed.includes(index) ? "✓" : String(index + 1).padStart(2, "0")}</span><small>{step.label}</small></button>)}
      </nav>

      {active && <article className="ilp__step" aria-live="polite">
        <div className="ilp__visual"><StepIllustration title={lesson.title} instruction={active.instruction} /><p>Наглядная схема к текущему действию</p></div>
        <div className="ilp__content">
          <p className="ilp__step-label">ШАГ {activeIndex + 1} / {steps.length}</p>
          <h3>{active.label}</h3>
          <p className="ilp__task">{active.instruction}</p>
          <button type="button" className="ilp__hint-button" aria-expanded={showHint} onClick={() => setShowHint((shown) => !shown)}>{showHint ? "Скрыть подсказку" : "Показать подсказку"}<span>{showHint ? "−" : "+"}</span></button>
          {showHint && <p className="ilp__hint">{active.hint}</p>}
          <label className="ilp__done"><input type="checkbox" checked={progress.completed.includes(activeIndex)} onChange={toggleStep} /><span>Я выполнила этот шаг</span></label>
          <div className="ilp__nav"><button type="button" disabled={activeIndex === 0} onClick={() => { setActiveIndex((i) => Math.max(0, i - 1)); setShowHint(true); }}>← Назад</button><span>{activeIndex + 1} / {steps.length}</span><button type="button" disabled={activeIndex === steps.length - 1} onClick={() => { setActiveIndex((i) => Math.min(steps.length - 1, i + 1)); setShowHint(true); }}>Далее →</button></div>
        </div>
      </article>}

      <section className="ilp__checks" aria-labelledby={`ilp-check-title-${lesson.id}`}>
        <div className="ilp__section-heading"><div><p className="ilp__eyebrow">САМОПРОВЕРКА</p><h3 id={`ilp-check-title-${lesson.id}`}>Проверь результат</h3></div><span>{progress.checks.filter(Boolean).length}/{lesson.selfCheck.length}</span></div>
        {lesson.selfCheck.map((item, index) => <label className="ilp__check" key={`${lesson.id}-check-${index}`}><input type="checkbox" checked={Boolean(progress.checks[index])} onChange={(event) => toggleCheck(index, event.target.checked)} /><span>{item}</span></label>)}
      </section>

      <section className="ilp__reflection" aria-label="Заметка по практике">
        <label htmlFor={`ilp-note-${lesson.id}`}>Моё наблюдение</label>
        <textarea id={`ilp-note-${lesson.id}`} value={progress.note} onChange={(event) => setProgress((current) => ({ ...current, note: event.target.value }))} placeholder="Что получилось? Что хочу проверить в следующий раз?" rows={2} />
        <p>Заметка и отмеченные шаги сохраняются на этом устройстве автоматически.</p>
      </section>
      {completeCount === steps.length && progress.checks.every(Boolean) && <p className="ilp__success" role="status">Практика отмечена полностью. Попробуй повторить её на другом сюжете или материале.</p>}
    </section>
  );
}
