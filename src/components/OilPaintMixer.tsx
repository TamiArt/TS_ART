import { useMemo, useState } from "react";
import "./oil-paint-mixer.css";

type Pigment = {
  id: string;
  name: string;
  colourIndex: string;
  hex: string;
  note: string;
};

type Recipe = {
  id: string;
  label: string;
  description: string;
  first: string;
  second: string;
  ratio: number;
};

const pigments: Pigment[] = [
  { id: "titanium-white", name: "Титановые белила", colourIndex: "PW6", hex: "#f0e8d7", note: "Светлые укрывистые смеси; сильно повышают светлоту." },
  { id: "yellow-ochre", name: "Жёлтая охра", colourIndex: "PY43", hex: "#c49a45", note: "Приглушённый землистый жёлтый." },
  { id: "cadmium-yellow", name: "Кадмиевый жёлтый", colourIndex: "PY35", hex: "#f2c52d", note: "Насыщенный тёплый жёлтый; проверяй маркировку и безопасность конкретной краски." },
  { id: "raw-sienna", name: "Сиена натуральная", colourIndex: "PBr7", hex: "#b97845", note: "Тёплый золотисто-коричневый земляной пигмент." },
  { id: "burnt-sienna", name: "Сиена жжёная", colourIndex: "PBr7", hex: "#984b32", note: "Тёплый красно-коричневый для земли, полутонов и нейтрализации." },
  { id: "burnt-umber", name: "Умбра жжёная", colourIndex: "PBr7", hex: "#594033", note: "Тёмный землистый коричневый." },
  { id: "raw-umber", name: "Умбра натуральная", colourIndex: "PBr7", hex: "#756047", note: "Холоднее и спокойнее многих красно-коричневых земляных." },
  { id: "ultramarine", name: "Ультрамарин", colourIndex: "PB29", hex: "#344b91", note: "Глубокий синий; в смеси с земляными даёт сложные тёмные нейтрали." },
  { id: "cerulean", name: "Церулеум", colourIndex: "PB35 / PB36", hex: "#558ba4", note: "Более мягкий небесно-голубой; точный индекс зависит от краски." },
  { id: "viridian", name: "Виридоновая зелёная", colourIndex: "PG18", hex: "#3c7861", note: "Холодная прозрачная зелёная; пигмент и название проверяй на этикетке." },
  { id: "sap-green", name: "Сок зелёный (имитация)", colourIndex: "смесь", hex: "#627348", note: "Название часто обозначает смесь, а не один универсальный пигмент." },
  { id: "alizarin", name: "Ализариновый малиновый", colourIndex: "PR83 / замены", hex: "#873e55", note: "Исторические и современные версии могут отличаться по составу и стойкости." },
  { id: "red-oxide", name: "Красный оксид железа", colourIndex: "PR101", hex: "#a64c3d", note: "Землистый красный; часто полезен для тёплых полутонов." },
  { id: "ivory-black", name: "Слоновая кость (чёрная)", colourIndex: "PBk9", hex: "#302f2b", note: "Сильно снижает светлоту; используй дозированно." }
];

const recipes: Recipe[] = [
  { id: "skin", label: "Кожа", description: "Начни с землистого тёплого оттенка и постепенно осветляй.", first: "yellow-ochre", second: "titanium-white", ratio: 38 },
  { id: "shadows", label: "Тени", description: "Земляной коричневый с ультрамарином — отправная точка для сложных теней.", first: "burnt-umber", second: "ultramarine", ratio: 62 },
  { id: "foliage", label: "Листва", description: "Зелёный с охрой помогает приглушить искусственную яркость.", first: "viridian", second: "yellow-ochre", ratio: 55 },
  { id: "interiors", label: "Интерьеры", description: "Ультрамарин и сиена дают нейтральные серо-коричневые для архитектуры и предметов.", first: "ultramarine", second: "burnt-sienna", ratio: 52 }
];

function getPigment(id: string): Pigment {
  return pigments.find((pigment) => pigment.id === id) ?? pigments[0];
}

export function mixPigmentHex(first: string, second: string, firstPercent: number): string {
  const a = first.replace("#", "");
  const b = second.replace("#", "");
  const weight = Math.max(0, Math.min(100, firstPercent)) / 100;
  const channels = [0, 2, 4].map((index) => {
    const left = Number.parseInt(a.slice(index, index + 2), 16);
    const right = Number.parseInt(b.slice(index, index + 2), 16);
    return Math.round(left * weight + right * (1 - weight));
  });
  return "#" + channels.map((value) => value.toString(16).padStart(2, "0")).join("");
}

export default function OilPaintMixer() {
  const [recipeId, setRecipeId] = useState("skin");
  const initial = recipes[0];
  const [firstId, setFirstId] = useState(initial.first);
  const [secondId, setSecondId] = useState(initial.second);
  const [firstPercent, setFirstPercent] = useState(initial.ratio);

  const first = getPigment(firstId);
  const second = getPigment(secondId);
  const mixed = useMemo(() => mixPigmentHex(first.hex, second.hex, firstPercent), [first.hex, second.hex, firstPercent]);
  const secondPercent = 100 - firstPercent;

  const chooseRecipe = (id: string) => {
    const recipe = recipes.find((item) => item.id === id);
    if (!recipe) return;
    setRecipeId(recipe.id);
    setFirstId(recipe.first);
    setSecondId(recipe.second);
    setFirstPercent(recipe.ratio);
  };

  const swapPigments = () => {
    setFirstId(secondId);
    setSecondId(firstId);
    setFirstPercent(100 - firstPercent);
  };

  return (
    <section className="oil-mixer" aria-labelledby="oil-mixer-title">
      <div className="oil-mixer-heading">
        <div>
          <span className="oil-mixer-eyebrow">INTERACTIVE STUDY · OIL COLOUR</span>
          <h2 id="oil-mixer-title">Смешай <em>свой оттенок.</em></h2>
          <p>Выбери два пигмента, измени пропорции и сравни условный результат. Используй его как гипотезу перед настоящей пробой на палитре.</p>
        </div>
        <span className="oil-mixer-mark" aria-hidden="true">◉</span>
      </div>

      <div className="oil-mixer-presets" aria-label="Готовые учебные направления">
        {recipes.map((recipe) => (
          <button
            className={recipeId === recipe.id ? "oil-mixer-preset is-active" : "oil-mixer-preset"}
            type="button"
            key={recipe.id}
            onClick={() => chooseRecipe(recipe.id)}
            aria-pressed={recipeId === recipe.id}
          >
            {recipe.label}
          </button>
        ))}
      </div>
      <p className="oil-mixer-recipe-note">{recipes.find((recipe) => recipe.id === recipeId)?.description}</p>

      <div className="oil-mixer-workspace">
        <div className="oil-mixer-controls">
          <div className="oil-mixer-pigment-field">
            <label htmlFor="oil-pigment-a">Пигмент A</label>
            <div className="oil-mixer-select-row">
              <span className="oil-mixer-dot" style={{ backgroundColor: first.hex }} aria-hidden="true" />
              <select id="oil-pigment-a" value={firstId} onChange={(event) => { setFirstId(event.target.value); setRecipeId(""); }}>
                {pigments.map((pigment) => <option value={pigment.id} key={pigment.id}>{pigment.name}</option>)}
              </select>
            </div>
            <p className="oil-mixer-index">{first.colourIndex} · {first.note}</p>
          </div>

          <div className="oil-mixer-pigment-field">
            <label htmlFor="oil-pigment-b">Пигмент B</label>
            <div className="oil-mixer-select-row">
              <span className="oil-mixer-dot" style={{ backgroundColor: second.hex }} aria-hidden="true" />
              <select id="oil-pigment-b" value={secondId} onChange={(event) => { setSecondId(event.target.value); setRecipeId(""); }}>
                {pigments.map((pigment) => <option value={pigment.id} key={pigment.id}>{pigment.name}</option>)}
              </select>
            </div>
            <p className="oil-mixer-index">{second.colourIndex} · {second.note}</p>
          </div>

          <div className="oil-mixer-ratio">
            <div className="oil-mixer-ratio-heading">
              <label htmlFor="oil-mix-ratio">Пропорция смеси</label>
              <strong>{firstPercent}% / {secondPercent}%</strong>
            </div>
            <input
              id="oil-mix-ratio"
              type="range"
              min="0"
              max="100"
              step="1"
              value={firstPercent}
              onChange={(event) => { setFirstPercent(Number(event.target.value)); setRecipeId(""); }}
              aria-label={`Доля пигмента A: ${firstPercent} процентов`}
            />
            <div className="oil-mixer-range-labels"><span>100% {first.name}</span><span>100% {second.name}</span></div>
          </div>
          <button className="oil-mixer-swap" type="button" onClick={swapPigments}>⇄ Поменять пигменты местами</button>
        </div>

        <div className="oil-mixer-result">
          <div className="oil-mixer-swatch" style={{ backgroundColor: mixed }} role="img" aria-label={`Условный цвет смеси: ${mixed}`}>
            <span>PREVIEW</span>
          </div>
          <div className="oil-mixer-result-meta">
            <div><span>Расчётный оттенок</span><strong>{mixed.toUpperCase()}</strong></div>
            <div><span>Смесь по долям</span><strong>{firstPercent} : {secondPercent}</strong></div>
          </div>
          <div className="oil-mixer-components" aria-label="Пропорции двух пигментов">
            <div><span style={{ backgroundColor: first.hex }} /><span>{first.name}</span><strong>{firstPercent}%</strong></div>
            <div><span style={{ backgroundColor: second.hex }} /><span>{second.name}</span><strong>{secondPercent}%</strong></div>
          </div>
        </div>
      </div>
      <div className="oil-mixer-disclaimer">
        <strong>Важно о точности.</strong> Цвет на экране — простая RGB-интерполяция, а не физическая модель масляных пигментов. Реальный результат зависит от состава и производителя краски, укрывистости, прозрачности, толщины слоя, подмалёвка, освещения и высыхания. Проверяй смесь на настоящем материале и записывай результат в журнал Colour Lab.
      </div>
    </section>
  );
}
