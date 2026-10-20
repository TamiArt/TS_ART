import { useEffect, useState } from "react";
import "./RepeatByExample.css";

const STEPS = [
  { id: "01", title: "Начало", hint: "Расположи источник сбоку и немного выше предмета. Заметь направление света и падающую тень.", image: "/illustrations/repeat-by-example/01-start.svg", alt: "Сфера и источник света" },
  { id: "02", title: "Найди крайние значения", hint: "Сначала сравни два крайних значения. Не путай собственную тень на форме с падающей тенью на поверхности.", image: "/illustrations/repeat-by-example/02-light-dark.svg", alt: "Светлая и самая тёмная области сферы" },
  { id: "03", title: "Переход света в тень", hint: "Проследи, как меняется тон по округлой форме, а не только по внешнему контуру.", image: "/illustrations/repeat-by-example/03-transition.svg", alt: "Переход тона от света к тени" },
  { id: "04", title: "Три тональные зоны", hint: "Раздели форму на три условные зоны. Пока не растушёвывай границы: сначала важно увидеть отношения.", image: "/illustrations/repeat-by-example/04-three-zones.svg", alt: "Свет, полутон и тень на сфере" },
  { id: "05", title: "Проверь", hint: "Поочерёдно посмотри на предмет и рисунок. Проверь, какие участки светлее или темнее и насколько заметна разница.", image: "/illustrations/repeat-by-example/05-compare.svg", alt: "Сравнение рисунка с натурой" },
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
          <h2 id="rbe-title">Попробуй по шагам</h2>
          <p className="rbe__intro">Все пять этапов перед глазами. Выбирай этап для подсказки и отмечай выполненное.</p>
        </div>
        <div className="rbe__overview-progress">
          <span>{completed.length} из {STEPS.length} этапов выполнено</span>
          <div className="rbe__progress" role="progressbar" aria-label="Прогресс выполнения урока" aria-valuemin={0} aria-valuemax={100} aria-valuenow={progress}>
            <span style={{ width: progress + "%" }} />
          </div>
        </div>
      </header>

      <section className="rbe__step-instructions" aria-labelledby="rbe-instructions-title">
        <h3 id="rbe-instructions-title">Попробуй по шагам</h3>
        <ol>
          <li><span>01</span><p>Поставь предмет рядом с источником света.</p></li>
          <li><span>02</span><p>Найди самую освещённую область и самую тёмную.</p></li>
          <li><span>03</span><p>Заметь, где форма постепенно переходит из света в тень.</p></li>
          <li><span>04</span><p>Сделай три условные тональные зоны без растушёвки.</p></li>
          <li><span>05</span><p>Сравни тональные отношения с натурой.</p></li>
        </ol>
      </section>

      <div className="rbe__stage-grid" aria-label="Пять последовательных этапов урока">
        {STEPS.map((step) => {
          const isComplete = completed.includes(step.id);
          const isActive = activeId === step.id;
          return (
            <article className={`rbe__stage-card ${isActive ? "is-active" : ""} ${isComplete ? "is-complete" : ""}`} key={step.id}>
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
              <img className="rbe__stage-image" src={step.image} alt={step.alt} loading="eager" />
                            <label className="rbe__stage-check">
                <input type="checkbox" checked={isComplete} onChange={() => toggleCompleted(step.id)} />
                <span>{isComplete ? "Выполнено" : "Отметить этап"}</span>
              </label>
            </article>
          );
        })}
      </div>

      <div className="rbe__stage-detail" aria-live="polite">
        <div>
          <p className="rbe__step-kicker">ЭТАП {activeStep.id} ИЗ 05 · ПОДСКАЗКА</p>
          <strong>{activeStep.title}</strong>
        </div>
        <p>{activeStep.hint}</p>
      </div>

      <footer className="rbe__concepts" aria-label="Кратко о главном">
        <h3>Кратко о главном</h3>
        <div className="rbe__concept-grid">
          <div><strong>Светлота</strong><p>Насколько цвет светлее или темнее.</p><div className="rbe__value-swatches" aria-hidden="true"><i /><i /><i /><i /><i /></div></div>
          <div><strong>Температура</strong><p>Тёплые и холодные оттенки создают настроение и объём.</p><div className="rbe__temperature-swatches"><i>Тёплый</i><i>Холодный</i></div></div>
          <div><strong>Насыщенность</strong><p>Интенсивность цвета: яркий или приглушённый.</p><div className="rbe__saturation-swatches"><i>Насыщенный</i><i>Приглушённый</i></div></div>
        </div>
      </footer>

      {completed.length === STEPS.length && (
        <p className="rbe__success" role="status">Все пять этапов выполнены. Попробуй повторить упражнение с другим предметом.</p>
      )}
    </section>
  );
}
