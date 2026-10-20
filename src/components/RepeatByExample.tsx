import { useEffect, useState } from "react";
import "./RepeatByExample.css";

const STEPS = [
  { id: "01", title: "Начало", task: "Поставь предмет рядом с источником света.", hint: "Расположи источник сбоку и немного выше предмета. Заметь направление света и падающую тень." },
  { id: "02", title: "Найди крайние значения", task: "Найди самую освещённую область и самую тёмную.", hint: "Сначала сравни два крайних значения. Не путай собственную тень на форме с падающей тенью на поверхности." },
  { id: "03", title: "Переход света в тень", task: "Заметь, где форма постепенно переходит из света в тень.", hint: "Проследи, как меняется тон по округлой форме, а не только по внешнему контуру." },
  { id: "04", title: "Три тональные зоны", task: "Обозначь свет, полутон и тень без растушёвки.", hint: "Раздели форму на три условные зоны. Пока не растушёвывай границы: сначала важно увидеть отношения." },
  { id: "05", title: "Проверь", task: "Сравни тональные отношения с натурой.", hint: "Поочерёдно посмотри на предмет и рисунок. Проверь, какие участки светлее или темнее и насколько заметна разница." },
] as const;

const STORAGE_KEY = "ts-art-repeat-by-example-v1";

function readCompleted(): string[] {
  try {
    const parsed: unknown = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? "[]");
    return Array.isArray(parsed)
      ? parsed.filter((value): value is string => typeof value === "string" && STEPS.some((step) => step.id === value))
      : [];
  } catch {
    return [];
  }
}

export default function RepeatByExample() {
  const [activeId, setActiveId] = useState<string>(STEPS[0].id);
  const [completed, setCompleted] = useState<string[]>(readCompleted);
  const activeStep = STEPS.find((step) => step.id === activeId) ?? STEPS[0];
  const progress = Math.round((completed.length / STEPS.length) * 100);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(completed));
    } catch {
      // Keep progress for this session if browser storage is unavailable.
    }
  }, [completed]);

  function toggleCompleted(id: string) {
    setCompleted((current) => current.includes(id) ? current.filter((item) => item !== id) : [...current, id]);
  }

  return (
    <section className="rbe rbe--overview" aria-labelledby="rbe-title">
      <header className="rbe__overview-header">
        <div>
          <p className="rbe__eyebrow">САМОСТОЯТЕЛЬНАЯ ПРАКТИКА · 7 МИН</p>
          <h2 id="rbe-title">Повтори по образцу</h2>
        </div>
        <div className="rbe__overview-progress">
          <span>{completed.length} из {STEPS.length} этапов выполнено</span>
          <div className="rbe__progress" role="progressbar" aria-label="Прогресс выполнения урока" aria-valuemin={0} aria-valuemax={100} aria-valuenow={progress}>
            <span style={{ width: progress + "%" }} />
          </div>
        </div>
      </header>

      <figure className="rbe__poster">
        <img
          src="/illustrations/repeat-by-example/light-observation-poster.webp"
          alt="Учебный образец светотени на сфере: пять последовательных этапов, стрелки и обозначения света, полутона и тени; внизу объяснение светлоты, температуры и насыщенности."
        />
      </figure>

      <div className="rbe__stage-grid" aria-label="Интерактивные этапы урока">
        {STEPS.map((step) => {
          const isComplete = completed.includes(step.id);
          const isActive = activeId === step.id;
          return (
            <div className={`rbe__stage-card ${isActive ? "is-active" : ""} ${isComplete ? "is-complete" : ""}`} key={step.id}>
              <button
                type="button"
                className="rbe__stage-select"
                onClick={() => setActiveId(step.id)}
                aria-pressed={isActive}
                aria-label={`Показать пояснение: этап ${step.id}, ${step.title}`}
              >
                <span className="rbe__stage-number">{isComplete ? "✓" : step.id}</span>
                <span className="rbe__stage-title">{step.title}</span>
              </button>
              <label className="rbe__stage-check">
                <input type="checkbox" checked={isComplete} onChange={() => toggleCompleted(step.id)} />
                <span>{isComplete ? "Выполнено" : "Отметить"}</span>
              </label>
            </div>
          );
        })}
      </div>

      <div className="rbe__stage-detail" aria-live="polite">
        <div>
          <p className="rbe__step-kicker">ЭТАП {activeStep.id} ИЗ 05</p>
          <strong>{activeStep.task}</strong>
        </div>
        <p>{activeStep.hint}</p>
      </div>

      {completed.length === STEPS.length && (
        <p className="rbe__success" role="status">Все пять этапов выполнены. Попробуй повторить упражнение с другим предметом.</p>
      )}
    </section>
  );
}
