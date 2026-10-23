import { useEffect, useMemo, useState } from "react";
import type { Lesson } from "../data/types";
import StepIllustration from "./StepIllustration";
import { classifyLesson, classifyVisualAction, getVisualKindLabel, getVisualPrinciple } from "./lessonVisuals";
import "./InteractiveLessonPractice.css";

function cardLabel(instruction: string, index: number, total: number): string {
  const actionLabels: Record<string, string> = {
    observe: "Наблюдай", place: "Подготовь", trace: "Уточни", outline: "Наметь",
    simplify: "Упрости", measure: "Сравни размеры", compare: "Сравни",
    shade: "Найди тон", fill: "Заполни", mix: "Смешай", select: "Выбери",
    record: "Зафиксируй", practice: "Выполни", review: "Проверь",
  };
  if (index === 0) return "Начало";
  if (index === total - 1) return "Проверь";
  return actionLabels[classifyVisualAction(instruction)] ?? `Этап ${index + 1}`;
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
      // Self-checks are temporary per-lesson UI state; never restore them from storage.
      checks: Array(checkCount).fill(false),
      note: typeof value.note === "string" ? value.note : "",
    };
  } catch {
    return { completed: [], checks: Array(checkCount).fill(false), note: "" };
  }
}

export default function InteractiveLessonPractice({ lesson }: { lesson: Lesson }) {
  const kind = classifyLesson(lesson);
  const steps = useMemo(() => lesson.steps.map((instruction) => ({ instruction })), [lesson]);
  const key = storageKey(lesson.id);
  const [progress, setProgress] = useState<SavedProgress>(() => readProgress(key, steps.length, lesson.selfCheck.length));
  const completeCount = progress.completed.length;
  const percentage = steps.length ? Math.round(completeCount / steps.length * 100) : 0;

  useEffect(() => {
    // Persist completed practice steps and notes, but reset self-check boxes on every lesson visit.
    try { localStorage.setItem(key, JSON.stringify({ ...progress, checks: [] })); } catch { /* Progress remains available for this session. */ }
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

      <section className="ilp__text-steps" aria-label="Попробуй по шагам — текстовая инструкция">
        <h3>Попробуй по шагам</h3>
        <ol>
          {steps.map((step, index) => (
            <li key={`${lesson.id}-text-step-${index}`}>
              <span className="ilp__text-step-number">{index + 1}</span>
              <span>{step.instruction}</span>
            </li>
          ))}
        </ol>
      </section>

      <div className="ilp__cards" aria-label="Этапы практики">
        {steps.map((step, index) => {
          const isComplete = progress.completed.includes(index);
          return (
            <article key={`${lesson.id}-step-${index}`} lang="ru" className={`ilp__card ${isComplete ? "is-done" : ""}`}>
              <div className="ilp__card-select">
                <span className="ilp__card-number">{isComplete ? "✓" : String(index + 1).padStart(2, "0")}</span>
                <span className="ilp__card-title">{cardLabel(step.instruction, index, steps.length)}</span>
              </div>
              <div className="ilp__card-image"><StepIllustration title={lesson.title} instruction={step.instruction} /></div>
              <label className="ilp__card-check">
                <input type="checkbox" checked={isComplete} onChange={() => toggleStep(index)} />
                <span>{isComplete ? "Выполнено" : "Отметить этап"}</span>
              </label>
            </article>
          );
        })}
      </div>

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
