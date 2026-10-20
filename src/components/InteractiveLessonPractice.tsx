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
  { pattern: /выбери|отбери|вариант|композици|располож/, hint: "Сделай несколько простых вариантов и сравни их по одной цели, а не по впечатлению в целом." },
  { pattern: /кист|краск|живопис|мазок|сло[йя]|холст|цифров/, hint: "Сначала проверь инструмент на небольшом тесте и только потом используй его в основной работе." },
];

function hintFor(instruction: string, objective: string): string {
  const text = instruction.toLocaleLowerCase("ru");
  return ACTION_HINTS.find((rule) => rule.pattern.test(text))?.hint
    ?? `Свяжи действие с целью урока: ${objective} Сначала выполни его в простом виде, затем проверь результат.`;
}

function stepTitle(instruction: string, index: number, total: number): string {
  const clean = instruction
    .replace(/^[\s.!?]+/, "")
    .replace(/^(?:сначала\s+)?(?:выбери|выберите|поставь|поставьте|положи|положите|возьми|возьмите|сделай|сделайте|нарисуй|нарисуйте|проведи|проведите|повтори|повторите|наблюдай|наблюдайте|заметь|заметьте|найди|найдите|раздели|разделите|сравни|сравните|проверь|проверьте|отметь|отметьте|запиши|запишите|добавь|добавьте|наметь|наметьте|организуй|организуйте|сохрани|сохраните|теперь|затем|после этого)\s+/i, "")
    .replace(/[.!?].*$/, "")
    .trim();
  if (!clean) return index === 0 ? "Начало" : index === total - 1 ? "Проверь результат" : `Этап ${index + 1}`;
  const title = clean;
  return title.charAt(0).toLocaleUpperCase("ru") + title.slice(1);
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
    title: stepTitle(instruction, index, lesson.steps.length),
  })), [lesson]);
  const key = storageKey(lesson.id);
  const [activeIndex, setActiveIndex] = useState(0);
  const [progress, setProgress] = useState<SavedProgress>(() => readProgress(key, steps.length, lesson.selfCheck.length));
  const active = steps[Math.min(activeIndex, Math.max(0, steps.length - 1))];
  const completeCount = progress.completed.length;
  const percentage = steps.length ? Math.round(completeCount / steps.length * 100) : 0;

  useEffect(() => {
    try { localStorage.setItem(key, JSON.stringify(progress)); } catch { /* Progress remains available for this session. */ }
  }, [key, progress]);


  function toggleStep(index: number) {
    setProgress((current) => ({
      ...current,
      completed: current.completed.includes(index)
        ? current.completed.filter((item) => item !== index)
        : [...current.completed, index],
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
          <h2 id={`ilp-title-${lesson.id}`}>Попробуй по шагам</h2>
          <p className="ilp__objective">{lesson.objective}</p>
        </div>
        <aside className="ilp__principle">
          <span aria-hidden="true">✳</span>
          <div><strong>{getVisualKindLabel(kind)}</strong><p>{getVisualPrinciple(kind)}</p></div>
        </aside>
      </header>

      <div className="ilp__progress" role="progressbar" aria-label="Прогресс практики" aria-valuemin={0} aria-valuemax={100} aria-valuenow={percentage}><span style={{ width: percentage + "%" }} /></div>
      <div className="ilp__progress-label"><span>{completeCount} из {steps.length} шагов выполнено</span><span>{percentage}%</span></div>

      <div className="ilp__cards" aria-label="Этапы практики">
        {steps.map((step, index) => {
          const isActive = activeIndex === index;
          const isComplete = progress.completed.includes(index);
          return (
            <article key={`${lesson.id}-step-${index}`} className={`ilp__card ${isActive ? "is-active" : ""} ${isComplete ? "is-done" : ""}`}>
              <button type="button" className="ilp__card-select" onClick={() => setActiveIndex(index)} aria-pressed={isActive} aria-label={`Показать подсказку: этап ${index + 1}, ${step.title}`}>
                <span className="ilp__card-number">{isComplete ? "✓" : String(index + 1).padStart(2, "0")}</span>
                <span className="ilp__card-title">{step.title}</span>
              </button>
              <div className="ilp__card-image"><StepIllustration title={lesson.title} instruction={step.instruction} /></div>
              <p className="ilp__card-instruction" lang="ru">{step.instruction}</p>
              <label className="ilp__card-check">
                <input type="checkbox" checked={isComplete} onChange={() => toggleStep(index)} />
                <span>{isComplete ? "Выполнено" : "Отметить этап"}</span>
              </label>
            </article>
          );
        })}
      </div>

      {active && <article className="ilp__detail" aria-live="polite">
        <div className="ilp__detail-title"><p className="ilp__step-label">ЭТАП {activeIndex + 1} ИЗ {steps.length} · ПОДСКАЗКА</p><h3>{active.title}</h3></div>
        <div className="ilp__detail-copy"><p className="ilp__task">{active.instruction}</p><p className="ilp__hint">{active.hint}</p></div>
      </article>}

      <section className="ilp__checks" aria-labelledby={`ilp-check-title-${lesson.id}`}>
        <div className="ilp__section-heading"><div><p className="ilp__eyebrow">САМОПРОВЕРКА</p><h3 id={`ilp-check-title-${lesson.id}`}>Проверь результат</h3></div><span>{progress.checks.filter(Boolean).length}/{lesson.selfCheck.length}</span></div>
        <div className="ilp__check-grid">
          {lesson.selfCheck.map((item, index) => <label className="ilp__check" key={`${lesson.id}-check-${index}`}><input type="checkbox" checked={Boolean(progress.checks[index])} onChange={(event) => toggleCheck(index, event.target.checked)} /><span>{item}</span></label>)}
        </div>
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
