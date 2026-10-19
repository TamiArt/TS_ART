import { useEffect, useState } from "react";
import "./RepeatByExample.css";

const STEPS = [
  { id: "01", title: "Начало", task: "Поставь предмет рядом с источником света.", hint: "Расположи лампу сбоку и немного выше предмета. Посмотри, куда направлен свет и где появляется падающая тень.", image: "/illustrations/repeat-by-example/01-start.svg", focus: "Свет направлен на предмет" },
  { id: "02", title: "Найди крайние значения", task: "Найди самую освещённую область и самую тёмную.", hint: "Сначала найди два крайних значения. Не путай собственную тень на форме с падающей тенью на поверхности.", image: "/illustrations/repeat-by-example/02-light-dark.svg", focus: "Самый светлый и самый тёмный участки" },
  { id: "03", title: "Переход света в тень", task: "Заметь, где форма постепенно переходит из света в тень.", hint: "Проследи за округлением формы. Тон меняется постепенно, а не только по внешнему контуру.", image: "/illustrations/repeat-by-example/03-transition.svg", focus: "Плавный переход тона" },
  { id: "04", title: "Три тональные зоны", task: "Сделай три условные тональные зоны без растушёвки.", hint: "Раздели форму на свет, полутон и тень. Пока не растушёвывай границы: задача — увидеть и обозначить отношения.", image: "/illustrations/repeat-by-example/04-three-zones.svg", focus: "Свет · полутон · тень" },
  { id: "05", title: "Проверь", task: "Сравни тональные отношения с натурой.", hint: "Поочерёдно посмотри на предмет и рисунок. Проверь, какая область светлее или темнее и насколько заметна разница.", image: "/illustrations/repeat-by-example/05-compare.svg", focus: "Сравнение с натурой" },
] as const;

const STORAGE_KEY = "ts-art-repeat-by-example-v1";

function readCompleted(): string[] {
  try {
    const parsed: unknown = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? "[]");
    return Array.isArray(parsed) ? parsed.filter((value): value is string => typeof value === "string" && STEPS.some((step) => step.id === value)) : [];
  } catch {
    return [];
  }
}

export default function RepeatByExample() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [showHint, setShowHint] = useState(true);
  const [completed, setCompleted] = useState<string[]>(readCompleted);
  const step = STEPS[activeIndex];
  const progress = Math.round((completed.length / STEPS.length) * 100);

  useEffect(() => {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(completed)); } catch { /* Keep session state if storage is unavailable. */ }
  }, [completed]);

  function toggleCompleted() {
    setCompleted((current) => current.includes(step.id) ? current.filter((id) => id !== step.id) : [...current, step.id]);
  }

  return (
    <section className="rbe" aria-labelledby="rbe-title">
      <header className="rbe__header">
        <div>
          <p className="rbe__eyebrow">САМОСТОЯТЕЛЬНАЯ ПРАКТИКА · 7 МИН</p>
          <h2 id="rbe-title">Повтори по образцу</h2>
          <p className="rbe__intro">Каждый рисунок показывает конкретное действие. Повторяй шаги по порядку, сохраняя лёгкий карандашный набросок.</p>
        </div>
        <aside className="rbe__principle"><span aria-hidden="true" className="rbe__bulb">✳</span><div><strong>Главный принцип</strong><p>Сравнивай цвет по температуре, светлоте и насыщенности. Иллюстрация помогает понять шаг, но сверяйся и с натурой.</p></div></aside>
      </header>

      <div className="rbe__progress" role="progressbar" aria-label="Прогресс выполнения урока" aria-valuemin={0} aria-valuemax={100} aria-valuenow={progress}><span style={{ width: progress + "%" }} /></div>
      <nav className="rbe__steps" aria-label="Этапы урока">
        {STEPS.map((item, index) => <button type="button" key={item.id} className={`rbe__step-tab ${index === activeIndex ? "is-active" : ""} ${completed.includes(item.id) ? "is-complete" : ""}`} onClick={() => setActiveIndex(index)} aria-current={index === activeIndex ? "step" : undefined}><span className="rbe__step-number">{completed.includes(item.id) ? "✓" : item.id}</span><span className="rbe__step-tab-title">{item.title}</span></button>)}
      </nav>

      <article className="rbe__lesson" aria-live="polite">
        <div className="rbe__artwork"><img src={step.image} alt={`${step.title}: ${step.focus}`} /><p className="rbe__artwork-caption">Учебная схема · лёгкий карандашный набросок</p></div>
        <div className="rbe__lesson-copy">
          <p className="rbe__step-kicker">ШАГ {step.id} ИЗ 05</p><h3>{step.title}</h3><p className="rbe__task">{step.task}</p><p className="rbe__focus"><span aria-hidden="true">◉</span> {step.focus}</p>
          <button className="rbe__hint-toggle" type="button" aria-expanded={showHint} onClick={() => setShowHint((value) => !value)}>{showHint ? "Скрыть подсказку" : "Показать подсказку"}<span aria-hidden="true">{showHint ? "−" : "+"}</span></button>
          {showHint && <p className="rbe__hint">{step.hint}</p>}
          <label className="rbe__check"><input type="checkbox" checked={completed.includes(step.id)} onChange={toggleCompleted} /><span>Я выполнила этот шаг</span></label>
          <div className="rbe__navigation"><button type="button" className="rbe__button rbe__button--secondary" disabled={activeIndex === 0} onClick={() => setActiveIndex((index) => Math.max(0, index - 1))}>← Назад</button><span className="rbe__count">{activeIndex + 1} / {STEPS.length}</span><button type="button" className="rbe__button rbe__button--primary" disabled={activeIndex === STEPS.length - 1} onClick={() => setActiveIndex((index) => Math.min(STEPS.length - 1, index + 1))}>Далее →</button></div>
        </div>
      </article>

      <footer className="rbe__summary"><h3>Кратко о главном</h3><div className="rbe__summary-grid"><div><strong>Светлота</strong><p>Насколько участок светлее или темнее соседнего.</p></div><div><strong>Температура</strong><p>Тёплые и холодные оттенки помогают передать характер света.</p></div><div><strong>Насыщенность</strong><p>Насколько цвет яркий или приглушённый.</p></div></div>{completed.length === STEPS.length && <p className="rbe__success" role="status">Все шаги выполнены. Попробуй повторить упражнение с другим предметом.</p>}</footer>
    </section>
  );
}
