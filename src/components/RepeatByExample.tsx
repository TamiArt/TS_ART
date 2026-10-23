import { useEffect, useState } from "react";
import "./RepeatByExample.css";

const STEPS = [
  { id: "01", title: "Начало", image: "/illustrations/repeat-by-example/01-start.svg", alt: "Сфера и источник света" },
  { id: "02", title: "Найди крайние значения", image: "/illustrations/repeat-by-example/02-light-dark.svg", alt: "Светлая и самая тёмная области сферы" },
  { id: "03", title: "Переход света в тень", image: "/illustrations/repeat-by-example/03-transition.svg", alt: "Переход тона от света к тени" },
  { id: "04", title: "Три тональные зоны", image: "/illustrations/repeat-by-example/04-three-zones.svg", alt: "Свет, полутон и тень на сфере" },
  { id: "05", title: "Проверь", image: "/illustrations/repeat-by-example/05-compare.svg", alt: "Сравнение рисунка с натурой" },
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
  const [completed, setCompleted] = useState<string[]>(readCompleted);
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
          <p className="rbe__intro">Все пять этапов перед глазами. Отмечай выполненное по мере практики.</p>
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
          <li><span>1</span><p>Поставь предмет рядом с источником света.</p></li>
          <li><span>2</span><p>Найди самую освещённую область и самую тёмную.</p></li>
          <li><span>3</span><p>Заметь, где форма постепенно переходит из света в тень.</p></li>
          <li><span>4</span><p>Сделай три условные тональные зоны без растушёвки.</p></li>
          <li><span>5</span><p>Сравни тональные отношения с натурой.</p></li>
        </ol>
      </section>

      <div className="rbe__stage-grid" aria-label="Пять последовательных этапов урока">
        {STEPS.map((step) => {
          const isComplete = completed.includes(step.id);
          return (
            <article className={`rbe__stage-card ${isComplete ? "is-complete" : ""}`} key={step.id}>
              <div className="rbe__stage-select">
                <span className="rbe__stage-number">{isComplete ? "✓" : step.id}</span>
                <span className="rbe__stage-title">{step.title}</span>
              </div>
              <img className="rbe__stage-image" src={step.image} alt={step.alt} loading="eager" />
                            <label className="rbe__stage-check">
                <input type="checkbox" checked={isComplete} onChange={() => toggleCompleted(step.id)} />
                <span>{isComplete ? "Выполнено" : "Отметить этап"}</span>
              </label>
            </article>
          );
        })}
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
