import { useEffect, useState } from "react";
import "./NegativeSpaceTutorial.css";

const steps = [
  {
    number: "01",
    title: "Начни с натуры",
    instruction: "Поставь предмет так, чтобы вокруг него были видны промежутки.",
  },
  {
    number: "02",
    title: "Найди один просвет",
    instruction: "Выбери один пустой участок рядом с предметом.",
  },
  {
    number: "03",
    title: "Нарисуй пустоту",
    instruction: "Нарисуй форму этого промежутка вместо самого предмета.",
  },
  {
    number: "04",
    title: "Сравни два промежутка",
    instruction: "Добавь второй промежуток и сравни их размеры.",
  },
  {
    number: "05",
    title: "Проверь силуэт",
    instruction: "Теперь наметь внешний силуэт предмета.",
  }
];

function SugarBowlShapes({ index }: { index: number }) {
  return <>
    {(index === 0 || index === 1 || index === 3) && <path d="M26 54 Q54 43 82 57 L80 88 L65 104 L29 104 Z M158 57 Q186 43 214 54 L211 104 L175 104 L160 88 Z" className="ns-negative" />}
    {(index === 1 || index === 2 || index === 3) && <g>
      <path d="M80 70 C61 61 60 84 80 88 Q91 86 88 76 Z" className="ns-negative" />
      <path d="M160 70 C179 61 180 84 160 88 Q149 86 152 76 Z" className="ns-negative" />
    </g>}
    {index !== 2 && <g>
      <path d="M83 64 Q120 54 157 64 L149 105 Q120 119 91 105 Z" className={index === 4 ? "ns-final-object" : "ns-object"} />
      <ellipse cx="120" cy="64" rx="37" ry="7" className={index === 4 ? "ns-final-object" : "ns-object"} />
      <path d="M84 63 Q88 45 108 45 L132 45 Q152 45 156 63" className={index === 4 ? "ns-final-object" : "ns-object"} />
      <path d="M112 43 L112 36 Q120 32 128 36 L128 43" className={index === 4 ? "ns-final-object" : "ns-object"} />
      <ellipse cx="120" cy="35" rx="8" ry="3.5" className={index === 4 ? "ns-final-object" : "ns-object"} />
      <path d="M83 72 C58 59 57 94 86 92 M157 72 C182 59 183 94 154 92" className={index === 4 ? "ns-final-object" : "ns-object"} />
      {index === 0 && <path d="M70 30h100M70 26v8M170 26v8M120 23v95" className="ns-guide ns-guide-dash" />}
      {index === 3 && <path d="M35 126h42m-42-4v8m42-8v8M163 126h42m-42-4v8m42-8v8" className="ns-measure" />}
      {index === 4 && <path d="M83 64 Q120 54 157 64 L149 105 Q120 119 91 105 Z" className="ns-check-line" />}
    </g>}
    {index === 2 && <g>
      <path d="M26 54 Q54 43 82 57 L80 88 L65 104 L29 104 Z" className="ns-negative" />
      <path d="M158 57 Q186 43 214 54 L211 104 L175 104 L160 88 Z" className="ns-negative" />
      <path d="M80 70 C61 61 60 84 80 88 Q91 86 88 76 Z M160 70 C179 61 180 84 160 88 Q149 86 152 76 Z" className="ns-negative" />
      <path d="M35 115h42m-42-4v8m42-8v8M163 115h42m-42-4v8m42-8v8" className="ns-measure" />
    </g>}
    <path d="M48 119H211" className="ns-table" />
    <text x="25" y="25" className="ns-label">{index === 2 ? "ФОРМЫ ПРОСВЕТОВ" : index === 4 ? "СИЛУЭТ САХАРНИЦЫ" : "САХАРНИЦА"}</text>
    {index === 1 && <text x="28" y="43" className="ns-label">СРАВНИ ПУСТОТУ</text>}
    {index === 3 && <g><text x="51" y="139" className="ns-label">А</text><text x="181" y="139" className="ns-label">Б</text></g>}
  </>;
}

function Drawing({ index }: { index: number }) {
  return <svg className="negative-space-drawing" viewBox="0 0 240 150" role="img" aria-label={`Карандашная схема, этап ${index + 1}: ${steps[index].title.toLowerCase()}`}>
    <rect x="7" y="6" width="226" height="138" rx="3" className="ns-paper" />
    <path d="M14 14 L20 14 M14 14 L14 20 M226 14 L220 14 M226 14 L226 20 M14 136 L20 136 M14 136 L14 130 M226 136 L220 136 M226 136 L226 130" className="ns-corners" />
    <SugarBowlShapes index={index} />
  </svg>;
}

const STORAGE_KEY = "ts-art-negative-space-v1";

function readCompleted(): number[] {
  try {
    const value: unknown = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? "[]");
    return Array.isArray(value) ? value.filter((item): item is number => Number.isInteger(item) && item >= 0 && item < steps.length) : [];
  } catch {
    return [];
  }
}

export default function NegativeSpaceTutorial() {
  const [completed, setCompleted] = useState<number[]>(readCompleted);
  const percentage = Math.round(completed.length / steps.length * 100);

  useEffect(() => {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(completed)); } catch { /* Keep progress for this session. */ }
  }, [completed]);

  function toggleStep(index: number) {
    setCompleted((current) => current.includes(index) ? current.filter((item) => item !== index) : [...current, index]);
  }

  return <section className="negative-space-tutorial" aria-labelledby="negative-space-title">
    <header className="negative-space-header">
      <div><span className="eyebrow">ИНТЕРАКТИВНАЯ ПРАКТИКА · 5 ЭТАПОВ</span><h2 id="negative-space-title">Попробуй по шагам</h2><p>Сначала изучи формы, которые окружают предмет. Все этапы — перед глазами.</p></div>
    </header>
    <div className="negative-space-progress"><span>{completed.length} из {steps.length} выполнено · {percentage}%</span><div role="progressbar" aria-label="Прогресс практики" aria-valuemin={0} aria-valuemax={100} aria-valuenow={percentage}><span style={{ width: percentage + "%" }} /></div></div>
    <section className="negative-space-text-steps" aria-labelledby="negative-space-text-title">
      <h3 id="negative-space-text-title">Попробуй по шагам</h3>
      <ol>
        {steps.map((step, index) => <li key={`instruction-${step.number}`}><span>{index + 1}</span><p>{step.instruction}</p></li>)}
      </ol>
    </section>
    <div className="negative-space-steps">
      {steps.map((step, index) => {
        const isComplete = completed.includes(index);
        return <article className={`negative-space-step ${isComplete ? "is-complete" : ""}`} key={step.number}>
          <div className="negative-space-step-title">
            <span>{isComplete ? "✓" : step.number}</span><h3>{step.title}</h3>
          </div>
          <Drawing index={index} />
          <label className="negative-space-check"><input type="checkbox" checked={isComplete} onChange={() => toggleStep(index)} /><span>{isComplete ? "Выполнено" : "Отметить этап"}</span></label>
        </article>;
      })}
    </div>
    <footer className="negative-space-takeaway"><span aria-hidden="true">✳</span><p><strong>Совет художника.</strong> Прищурься и смотри на просвет как на пятно. Его наклон, ширина и контур помогают проверить пропорции предмета точнее, чем попытка сразу нарисовать знакомую вещь.</p></footer>
    {completed.length === steps.length && <p className="negative-space-success" role="status">Все пять этапов выполнены. Повтори упражнение с другим предметом.</p>}
  </section>;
}
