import { useMemo, useState } from "react";
import "./oil-paint-mixer.css";
import { getPigmentShares, mixPigmentHex } from "./mixPigments";

import { getPigment, pigments, recipes, taskOptions, type Recipe, type StudyTask } from "./oilPaintMixerData";

export default function OilPaintMixer() {
  const [task, setTask] = useState<StudyTask>("portrait");
  const [recipeId, setRecipeId] = useState("skin");
  const initial = recipes[0];
  const [firstId, setFirstId] = useState(initial.first);
  const [secondId, setSecondId] = useState(initial.second);
  const [thirdId, setThirdId] = useState(initial.third ?? "indian-red");
  const [firstPercent, setFirstPercent] = useState(initial.ratio);
  const [thirdPercent, setThirdPercent] = useState(initial.thirdRatio ?? 10);
  const [useThird, setUseThird] = useState(false);

  const first = getPigment(firstId);
  const second = getPigment(secondId);
  const third = getPigment(thirdId);
  const effectiveThirdPercent = useThird ? thirdPercent : 0;
  const [firstWeight, secondWeight, thirdWeight] = getPigmentShares(firstPercent, thirdPercent, useThird);
  const mixed = useMemo(
    () => mixPigmentHex(first.hex, second.hex, firstPercent, useThird ? third.hex : undefined, effectiveThirdPercent),
    [first.hex, second.hex, firstPercent, third.hex, effectiveThirdPercent, useThird]
  );

  const chooseRecipe = (recipe: Recipe) => {
    setTask(recipe.task);
    setRecipeId(recipe.id);
    setFirstId(recipe.first);
    setSecondId(recipe.second);
    setThirdId(recipe.third ?? "indian-red");
    setFirstPercent(recipe.ratio);
    setThirdPercent(recipe.thirdRatio ?? 10);
    setUseThird(false);
  };

  const chooseTask = (nextTask: StudyTask) => {
    setTask(nextTask);
    const firstRecipe = recipes.find((recipe) => recipe.task === nextTask);
    if (firstRecipe) chooseRecipe(firstRecipe);
  };

  const updatePigment = (slot: "first" | "second" | "third", value: string) => {
    if (slot === "first") setFirstId(value);
    if (slot === "second") setSecondId(value);
    if (slot === "third") setThirdId(value);
    setRecipeId("");
  };

  return (
    <section className="oil-mixer" aria-labelledby="oil-mixer-title">
      <div className="oil-mixer-heading">
        <div>
          <span className="oil-mixer-eyebrow">TS·ART STUDIO · COLOUR LAB</span>
          <h2 id="oil-mixer-title">Смешай <em>свой оттенок.</em></h2>
          <p>Палитра масляных красок «Мастер-Класс» · ЗХК «Невская палитра». Выбирай реальные фирменные оттенки по названию и номеру тубы, затем смешивай два или три пигмента.</p><a className="oil-mixer-brand-source" href="https://www.nevskayapalitra.ru/katalog/paints/product_type-is-maslyanye-kraski/brand-is-master-klass/apply" target="_blank" rel="noreferrer">Каталог производителя ↗</a>
        </div>
        <span className="oil-mixer-mark" aria-hidden="true">◉</span>
      </div>

      <div className="oil-mixer-step">
        <span className="oil-mixer-step-number">01</span>
        <div><h3>Выбери задачу</h3><p>Что ты сейчас пишешь?</p></div>
      </div>
      <div className="oil-mixer-task-list" role="group" aria-label="Выбор художественной задачи">
        {taskOptions.map((option) => (
          <button key={option.id} type="button" className={task === option.id ? "oil-mixer-task is-active" : "oil-mixer-task"} onClick={() => chooseTask(option.id)} aria-pressed={task === option.id}>
            <strong>{option.label}</strong><span>{option.description}</span>
          </button>
        ))}
      </div>

      <div className="oil-mixer-step oil-mixer-step-next">
        <span className="oil-mixer-step-number">02</span>
        <div><h3>Выбери цветовой этюд</h3><p>Подбери конкретную область или материал в рамках задачи.</p></div>
      </div>
      <div className="oil-mixer-presets" aria-label="Цветовые этюды">
        {recipes.filter((recipe) => recipe.task === task).map((recipe) => (
          <button key={recipe.id} type="button" className={recipeId === recipe.id ? "oil-mixer-preset is-active" : "oil-mixer-preset"} onClick={() => chooseRecipe(recipe)} aria-pressed={recipeId === recipe.id}>{recipe.label}</button>
        ))}
      </div>
      <p className="oil-mixer-recipe-note">{recipes.find((recipe) => recipe.id === recipeId)?.description ?? "Настрой пигменты вручную: название рецепта больше не фиксирует выбранные цвета."}</p>

      <div className="oil-mixer-step oil-mixer-step-next">
        <span className="oil-mixer-step-number">03</span>
        <div><h3>Собери смесь</h3><p>Выбирай пигменты и регулируй их доли.</p></div>
      </div>
      <div className="oil-mixer-workspace">
        <div className="oil-mixer-controls">
          <div className="oil-mixer-pigment-field">
            <label htmlFor="oil-pigment-a">Пигмент A</label>
            <div className="oil-mixer-select-row"><span className="oil-mixer-dot" style={{ backgroundColor: first.hex }} aria-hidden="true" /><select id="oil-pigment-a" value={firstId} onChange={(event) => updatePigment("first", event.target.value)}>{pigments.map((pigment) => <option value={pigment.id} key={pigment.id}>{pigment.name}</option>)}</select></div>
            <p className="oil-mixer-index">{first.colourIndex} · {first.note}</p>
          </div>
          <div className="oil-mixer-pigment-field">
            <label htmlFor="oil-pigment-b">Пигмент B</label>
            <div className="oil-mixer-select-row"><span className="oil-mixer-dot" style={{ backgroundColor: second.hex }} aria-hidden="true" /><select id="oil-pigment-b" value={secondId} onChange={(event) => updatePigment("second", event.target.value)}>{pigments.map((pigment) => <option value={pigment.id} key={pigment.id}>{pigment.name}</option>)}</select></div>
            <p className="oil-mixer-index">{second.colourIndex} · {second.note}</p>
          </div>

          <div className="oil-mixer-ratio">
            <div className="oil-mixer-ratio-heading"><label htmlFor="oil-mix-ratio">Соотношение A и B</label><strong>{firstPercent}% / {100 - firstPercent}% {useThird ? "от остатка A+B" : "смеси"}</strong></div>
            <input id="oil-mix-ratio" type="range" min="0" max="100" step="1" value={firstPercent} onChange={(event) => { setFirstPercent(Number(event.target.value)); setRecipeId(""); }} aria-label={`Доля пигмента A среди A и B: ${firstPercent} процентов`} />
            <div className="oil-mixer-range-labels"><span>Больше {second.name}</span><span>Больше {first.name}</span></div>
          </div>

          <div className="oil-mixer-third-control">
            <button className={useThird ? "oil-mixer-add-third is-active" : "oil-mixer-add-third"} type="button" onClick={() => { setUseThird((active) => !active); setRecipeId(""); }} aria-pressed={useThird}>{useThird ? "− Убрать третий цвет" : "+ Добавить третий цвет"}</button>
            {useThird && <>
              <div className="oil-mixer-pigment-field">
                <label htmlFor="oil-pigment-c">Пигмент C</label>
                <div className="oil-mixer-select-row"><span className="oil-mixer-dot" style={{ backgroundColor: third.hex }} aria-hidden="true" /><select id="oil-pigment-c" value={thirdId} onChange={(event) => updatePigment("third", event.target.value)}>{pigments.map((pigment) => <option value={pigment.id} key={pigment.id}>{pigment.name}</option>)}</select></div>
                <p className="oil-mixer-index">{third.colourIndex} · {third.note}</p>
              </div>
              <div className="oil-mixer-ratio">
                <div className="oil-mixer-ratio-heading"><label htmlFor="oil-third-ratio">Доля третьего цвета</label><strong>{thirdPercent}% от всей смеси</strong></div>
                <input id="oil-third-ratio" type="range" min="0" max="60" step="1" value={thirdPercent} onChange={(event) => { setThirdPercent(Number(event.target.value)); setRecipeId(""); }} aria-label={`Доля третьего пигмента: ${thirdPercent} процентов`} />
                <div className="oil-mixer-range-labels"><span>0%</span><span>60%</span></div>
              </div>
            </>}
          </div>
          <button className="oil-mixer-swap" type="button" onClick={() => { setFirstId(secondId); setSecondId(firstId); setFirstPercent(100 - firstPercent); setRecipeId(""); }}>⇄ Поменять A и B местами</button>
        </div>

        <div className="oil-mixer-result">
          <div className="oil-mixer-swatch" style={{ backgroundColor: mixed }} role="img" aria-label={`Условный цвет смеси: ${mixed}`}><span>PREVIEW</span></div>
          <div className="oil-mixer-result-meta" aria-live="polite" aria-atomic="true"><div><span>Расчётный оттенок</span><strong>{mixed.toUpperCase()}</strong></div><div><span>Доли в смеси</span><strong>{firstWeight} : {secondWeight}{useThird ? ` : ${thirdWeight}` : ""}</strong></div></div>
          <div className="oil-mixer-components" aria-label="Доли пигментов в смеси">
            <div><span style={{ backgroundColor: first.hex }} /><span>{first.name}</span><strong>{firstWeight}%</strong></div>
            <div><span style={{ backgroundColor: second.hex }} /><span>{second.name}</span><strong>{secondWeight}%</strong></div>
            {useThird && <div><span style={{ backgroundColor: third.hex }} /><span>{third.name}</span><strong>{thirdWeight}%</strong></div>}
          </div>
        </div>
      </div>
      <div className="oil-mixer-disclaimer"><strong>Важно о точности.</strong> Цвет на экране — простая RGB-интерполяция, а не физическая модель масляных пигментов. Реальный результат зависит от состава краски, производителя, укрывистости, прозрачности, толщины слоя, грунта, освещения и высыхания. Проверяй смесь на настоящей палитре; воспринимай расчёт как учебную гипотезу.</div>
    </section>
  );
}
