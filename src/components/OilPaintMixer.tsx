import { useMemo, useState } from "react";
import "./oil-paint-mixer.css";
import { mixPigmentHex } from "./mixPigments";

type Pigment = { id: string; name: string; colourIndex: string; hex: string; note: string };
type StudyTask = "portrait" | "landscape" | "still-life";
type Recipe = { id: string; task: StudyTask; label: string; description: string; first: string; second: string; ratio: number; third?: string; thirdRatio?: number };

const pigments: Pigment[] = [
  { id: "titanium-white", name: "Титановые белила", colourIndex: "PW6", hex: "#f0e8d7", note: "Осветляют смесь; могут снижать насыщенность." },
  { id: "yellow-ochre", name: "Жёлтая охра", colourIndex: "PY43", hex: "#c49a45", note: "Приглушённый землистый жёлтый." },
  { id: "cadmium-yellow", name: "Кадмиевый жёлтый", colourIndex: "PY35", hex: "#f2c52d", note: "Тёплый жёлтый; соблюдай маркировку безопасности." },
  { id: "raw-sienna", name: "Сиена натуральная", colourIndex: "PBr7", hex: "#b97845", note: "Тёплый золотисто-коричневый земляной пигмент." },
  { id: "burnt-sienna", name: "Сиена жжёная", colourIndex: "PBr7", hex: "#984b32", note: "Красно-коричневый для полутонов и нейтрализации." },
  { id: "burnt-umber", name: "Умбра жжёная", colourIndex: "PBr7", hex: "#594033", note: "Глубокий тёмный земляной цвет." },
  { id: "raw-umber", name: "Умбра натуральная", colourIndex: "PBr7", hex: "#756047", note: "Спокойный коричневый для теней и нейтралей." },
  { id: "ultramarine", name: "Ультрамарин", colourIndex: "PB29", hex: "#344b91", note: "Синий для холодных теней и сложных нейтралей." },
  { id: "cerulean", name: "Церулеум", colourIndex: "PB35 / PB36", hex: "#558ba4", note: "Мягкий небесно-голубой; индекс зависит от краски." },
  { id: "viridian", name: "Виридоновая зелёная", colourIndex: "PG18", hex: "#3c7861", note: "Холодная зелёная; сверяй индекс с этикеткой." },
  { id: "sap-green", name: "Сок зелёный (имитация)", colourIndex: "смесь", hex: "#627348", note: "Название часто обозначает готовую смесь." },
  { id: "alizarin", name: "Ализариновый малиновый", colourIndex: "PR83 / замены", hex: "#873e55", note: "Состав и светостойкость зависят от конкретной версии." },
  { id: "red-oxide", name: "Красный оксид железа", colourIndex: "PR101", hex: "#a64c3d", note: "Землистый красный для тёплых полутонов." },
  { id: "ivory-black", name: "Слоновая кость (чёрная)", colourIndex: "PBk9", hex: "#302f2b", note: "Сильно снижает светлоту; добавляй понемногу." }
];

const taskOptions: { id: StudyTask; label: string; description: string }[] = [
  { id: "portrait", label: "Портрет", description: "Кожа и полутон · губы и румянец · волосы · тени лица" },
  { id: "landscape", label: "Пейзаж", description: "Небо и воздух · листва · земля и горы · вода" },
  { id: "still-life", label: "Натюрморт", description: "Фрукты и овощи · керамика · ткань · стекло и металл" }
];

const recipes: Recipe[] = [
  { id: "skin", task: "portrait", label: "Кожа и полутон", description: "Начни с охры и белил; красный оксид можно добавить малыми порциями для тепла.", first: "yellow-ochre", second: "titanium-white", ratio: 38, third: "red-oxide", thirdRatio: 10 },
  { id: "lips", task: "portrait", label: "Губы и румянец", description: "Малиновый и охра дают отправную точку; белила смягчают смесь.", first: "alizarin", second: "yellow-ochre", ratio: 65, third: "titanium-white", thirdRatio: 12 },
  { id: "hair", task: "portrait", label: "Волосы", description: "Сиена и умбра создают тёплую основу; ультрамарин углубляет холодные участки.", first: "burnt-sienna", second: "burnt-umber", ratio: 55, third: "ultramarine", thirdRatio: 8 },
  { id: "face-shadows", task: "portrait", label: "Тени лица", description: "Умбра с ультрамарином — ориентир для приглушённых теней; сверяйся с освещением.", first: "burnt-umber", second: "ultramarine", ratio: 62, third: "red-oxide", thirdRatio: 8 },
  { id: "sky", task: "landscape", label: "Небо и воздух", description: "Голубой с белилами; небольшая охра может приглушить холодный оттенок у горизонта.", first: "cerulean", second: "titanium-white", ratio: 35, third: "yellow-ochre", thirdRatio: 5 },
  { id: "foliage", task: "landscape", label: "Листва", description: "Зелёный и охра дают природную основу; умбра помогает затемнить без простого добавления чёрного.", first: "viridian", second: "yellow-ochre", ratio: 55, third: "raw-umber", thirdRatio: 10 },
  { id: "earth", task: "landscape", label: "Земля и горы", description: "Сиена с умброй — земляная база; ультрамарин помогает охладить дальний план.", first: "raw-sienna", second: "burnt-umber", ratio: 55, third: "ultramarine", thirdRatio: 8 },
  { id: "water", task: "landscape", label: "Вода и отражения", description: "Начни с синего и белил, затем настрой отражение по цвету окружения, а не только воды.", first: "ultramarine", second: "titanium-white", ratio: 40, third: "raw-umber", thirdRatio: 6 },
  { id: "fruit", task: "still-life", label: "Фрукты и овощи", description: "Для красно-оранжевых предметов попробуй красный оксид с охрой; белила меняют светлоту.", first: "red-oxide", second: "yellow-ochre", ratio: 60, third: "titanium-white", thirdRatio: 8 },
  { id: "ceramic", task: "still-life", label: "Керамика", description: "Белила и умбра дают основу для тёплых нейтралей; ультрамарин охлаждает тень.", first: "titanium-white", second: "raw-umber", ratio: 72, third: "ultramarine", thirdRatio: 6 },
  { id: "fabric", task: "still-life", label: "Ткань", description: "Сочетай основной цвет ткани с небольшим количеством дополнительного или земляного пигмента.", first: "ultramarine", second: "alizarin", ratio: 55, third: "titanium-white", thirdRatio: 12 },
  { id: "glass-metal", task: "still-life", label: "Стекло и металл", description: "Для отражений смешивай нейтрали и оттенки окружения; один универсальный серый не подойдёт.", first: "ultramarine", second: "burnt-sienna", ratio: 52, third: "titanium-white", thirdRatio: 10 }
];

function getPigment(id: string): Pigment {
  return pigments.find((pigment) => pigment.id === id) ?? pigments[0];
}

export default function OilPaintMixer() {
  const [task, setTask] = useState<StudyTask>("portrait");
  const [recipeId, setRecipeId] = useState("skin");
  const initial = recipes[0];
  const [firstId, setFirstId] = useState(initial.first);
  const [secondId, setSecondId] = useState(initial.second);
  const [thirdId, setThirdId] = useState(initial.third ?? "red-oxide");
  const [firstPercent, setFirstPercent] = useState(initial.ratio);
  const [thirdPercent, setThirdPercent] = useState(initial.thirdRatio ?? 10);
  const [useThird, setUseThird] = useState(false);

  const first = getPigment(firstId);
  const second = getPigment(secondId);
  const third = getPigment(thirdId);
  const effectiveThirdPercent = useThird ? thirdPercent : 0;
  const remainingPercent = 100 - effectiveThirdPercent;
  const firstWeight = Math.round(remainingPercent * firstPercent / 100);
  const secondWeight = remainingPercent - firstWeight;
  const mixed = useMemo(
    () => mixPigmentHex(first.hex, second.hex, firstPercent, useThird ? third.hex : undefined, effectiveThirdPercent),
    [first.hex, second.hex, firstPercent, third.hex, effectiveThirdPercent, useThird]
  );

  const chooseRecipe = (recipe: Recipe) => {
    setTask(recipe.task);
    setRecipeId(recipe.id);
    setFirstId(recipe.first);
    setSecondId(recipe.second);
    setThirdId(recipe.third ?? "red-oxide");
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
          <p>Сначала выбери художественную задачу, затем конкретный цветовой этюд. Настрой два пигмента или добавь третий.</p>
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
            <div className="oil-mixer-ratio-heading"><label htmlFor="oil-mix-ratio">Соотношение A и B</label><strong>{firstPercent}% / {100 - firstPercent}%</strong></div>
            <input id="oil-mix-ratio" type="range" min="0" max="100" step="1" value={firstPercent} onChange={(event) => { setFirstPercent(Number(event.target.value)); setRecipeId(""); }} aria-label={`Доля пигмента A среди A и B: ${firstPercent} процентов`} />
            <div className="oil-mixer-range-labels"><span>Больше {first.name}</span><span>Больше {second.name}</span></div>
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
          <div className="oil-mixer-result-meta"><div><span>Расчётный оттенок</span><strong>{mixed.toUpperCase()}</strong></div><div><span>Доли в смеси</span><strong>{firstWeight} : {secondWeight}{useThird ? ` : ${effectiveThirdPercent}` : ""}</strong></div></div>
          <div className="oil-mixer-components" aria-label="Доли пигментов в смеси">
            <div><span style={{ backgroundColor: first.hex }} /><span>{first.name}</span><strong>{firstWeight}%</strong></div>
            <div><span style={{ backgroundColor: second.hex }} /><span>{second.name}</span><strong>{secondWeight}%</strong></div>
            {useThird && <div><span style={{ backgroundColor: third.hex }} /><span>{third.name}</span><strong>{effectiveThirdPercent}%</strong></div>}
          </div>
        </div>
      </div>
      <div className="oil-mixer-disclaimer"><strong>Важно о точности.</strong> Цвет на экране — простая RGB-интерполяция, а не физическая модель масляных пигментов. Реальный результат зависит от состава краски, производителя, укрывистости, прозрачности, толщины слоя, грунта, освещения и высыхания. Проверяй смесь на настоящей палитре; воспринимай расчёт как учебную гипотезу.</div>
    </section>
  );
}
