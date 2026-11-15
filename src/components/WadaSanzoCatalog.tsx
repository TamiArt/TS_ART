import { useMemo, useState } from "react";
import wadaData from "../data/wadaSanzoData.json";

type WadaColor = {
  id: number; name: string; hex: string; rgb: number[]; lab: number[];
  cmyk: number[]; lrv?: number; swatch: number; combinations: number[];
};
type WadaPalette = { number: number; colors: number[] };
const colors = wadaData.colors as WadaColor[];
const palettes = wadaData.palettes as WadaPalette[];
const colorById = new Map(colors.map(color => [color.id, color]));
const familyNames: Record<string, string> = {
  "red/pink": "Красные и розовые", orange: "Оранжевые", yellow: "Жёлтые",
  green: "Зелёные", blue: "Синие", purple: "Фиолетовые", neutral: "Нейтральные"
};
const familyOf = (color: WadaColor) => {
  const name = color.name.toLowerCase();
  if (/pink|red|carmine|rose|lake|pomegranate|scarlet|eugenia|coral|brick/.test(name)) return "red/pink";
  if (/orange|sienna|cinnamon|ochre|citrine|brown|buff|maple|russet|isabella|khaki|sepia|umber/.test(name)) return "orange";
  if (/yellow|lemon|golden|sulph|sulphur/.test(name)) return "yellow";
  if (/green|olive|viridian|pistachio|artemesia|rainette|benzol/.test(name)) return "green";
  if (/blue|indigo|glaucous|medici|lyons|cerulian|cobalt|calamine|nile/.test(name)) return "blue";
  if (/violet|purple|lavender|lilac|mauve|plumbeous/.test(name)) return "purple";
  return "neutral";
};
const rgbDistance = (a: number[], b: number[]) => Math.sqrt(a.reduce((sum, value, i) => sum + (value - b[i]) ** 2, 0));
const hexRgb = (hex: string) => [1, 3, 5].map(i => parseInt(hex.slice(i, i + 2), 16));
const rgbHex = (rgb: number[]) => "#" + rgb.map(v => Math.round(v).toString(16).padStart(2, "0")).join("").toUpperCase();

export default function WadaSanzoCatalog() {
  const [tab, setTab] = useState<"palettes" | "colors" | "match">("palettes");
  const [query, setQuery] = useState("");
  const [count, setCount] = useState("all");
  const [family, setFamily] = useState("all");
  const [selectedPalette, setSelectedPalette] = useState<number | null>(null);
  const [selectedColor, setSelectedColor] = useState<WadaColor | null>(null);
  const [picker, setPicker] = useState("#C66A73");
  const [showAllMatches, setShowAllMatches] = useState(false);

  const filteredPalettes = useMemo(() => palettes.filter(p => {
    const paletteColors = p.colors.map(id => colorById.get(id)).filter(Boolean) as WadaColor[];
    const text = [String(p.number), ...paletteColors.map(c => c.name)].join(" ").toLowerCase();
    return text.includes(query.trim().toLowerCase())
      && (count === "all" || p.colors.length === Number(count))
      && (family === "all" || paletteColors.some(c => familyOf(c) === family));
  }), [query, count, family]);

  const nearest = useMemo(() => {
    const rgb = hexRgb(picker);
    return [...colors].sort((a,b) => rgbDistance(a.rgb,rgb)-rgbDistance(b.rgb,rgb));
  }, [picker]);
  const nearestColor = nearest[0];
  const matchingPalettes = useMemo(() => palettes.filter(p => p.colors.includes(nearestColor.id)), [nearestColor]);
  const similarColors = nearest.slice(1, showAllMatches ? 16 : 7);

  const copy = (value: string) => { void navigator.clipboard?.writeText(value); };
  const renderColorStrip = (ids: number[]) => <div className="wada-palette-strip">{ids.map(id => {
    const c = colorById.get(id)!;
    return <button key={id} className="wada-color-chip" style={{background:c.hex}} title={c.name + " · " + c.hex} onClick={() => setSelectedColor(c)} aria-label={"Открыть цвет " + c.name}/>;
  })}</div>;
  const colorDetails = (c: WadaColor) => <div className="wada-color-values">
    <div><span>HEX</span><button onClick={() => copy(c.hex)}>{c.hex}</button></div>
    <div><span>RGB</span><button onClick={() => copy("rgb(" + c.rgb.join(", ") + ")")}>{c.rgb.join(", ")}</button></div>
    <div><span>CMYK</span><button onClick={() => copy(c.cmyk.join(", ") + "%")}>{c.cmyk.join(" / ")}%</button></div>
    <div><span>LAB</span><button onClick={() => copy(c.lab.map(v=>v.toFixed(2)).join(", "))}>{c.lab.map(v=>v.toFixed(1)).join(" / ")}</button></div>
  </div>;

  return <section className="color-reference-section wada-catalog" id="wada-catalog">
    <div className="wada-catalog-heading"><div><div className="eyebrow">ПОЛНЫЙ КАТАЛОГ · ТОМ I</div><h2>Справочник Вады Сандзо</h2><p>159 цветов · 348 оригинальных сочетаний · 1 032 цветовых образца</p></div>
      <div className="wada-catalog-counts"><strong>159</strong><span>цветов</span><strong>348</strong><span>палитр</span></div>
    </div>
    <div className="wada-tabs" role="tablist" aria-label="Каталог Вады Сандзо">
      <button className={tab==="palettes"?"active":""} onClick={()=>{setTab("palettes");setSelectedPalette(null);}}>348 палитр</button>
      <button className={tab==="colors"?"active":""} onClick={()=>{setTab("colors");setSelectedColor(null);}}>159 цветов</button>
      <button className={tab==="match"?"active":""} onClick={()=>setTab("match")}>Подбор по цвету</button>
    </div>
    {tab !== "match" && <div className="wada-filters">
      <input value={query} onChange={e=>setQuery(e.target.value)} placeholder={tab==="palettes"?"Поиск по номеру или названию цвета":"Поиск по названию или HEX"} aria-label="Поиск по каталогу"/>
      {tab==="palettes" && <select value={count} onChange={e=>setCount(e.target.value)} aria-label="Количество цветов в палитре"><option value="all">Любое число цветов</option><option value="2">2 цвета</option><option value="3">3 цвета</option><option value="4">4 цвета</option></select>}
      <select value={family} onChange={e=>setFamily(e.target.value)} aria-label="Цветовая группа"><option value="all">Все цветовые группы</option>{Object.entries(familyNames).map(([key,label])=><option key={key} value={key}>{label}</option>)}</select>
      <span>{tab==="palettes"?filteredPalettes.length+" из 348 палитр":colors.filter(c=>(c.name+" "+c.hex).toLowerCase().includes(query.toLowerCase())&&(family==="all"||familyOf(c)===family)).length+" из 159 цветов"}</span>
    </div>}
    {tab==="palettes" && <div className="wada-palette-grid">{filteredPalettes.map(p=>{
      const entries=p.colors.map(id=>colorById.get(id)!);
      return <article className={"wada-palette-card "+(selectedPalette===p.number?"selected":"")} key={p.number}>
        <button className="wada-palette-open" onClick={()=>setSelectedPalette(selectedPalette===p.number?null:p.number)}><span className="wada-palette-number">№ {String(p.number).padStart(3,"0")}</span>{renderColorStrip(p.colors)}<span className="wada-palette-names">{entries.map(c=>c.name).join(" · ")}</span><small>{entries.length} цвета · нажми для значений</small></button>
        {selectedPalette===p.number && <div className="wada-palette-expanded">{entries.map(c=><div className="wada-expanded-color" key={c.id}><span style={{background:c.hex}}/><div><b>{c.name}</b>{colorDetails(c)}</div></div>)}</div>}
      </article>;
    })}</div>}
    {tab==="colors" && <div className="wada-color-grid">{colors.filter(c=>(c.name+" "+c.hex).toLowerCase().includes(query.toLowerCase())&&(family==="all"||familyOf(c)===family)).map(c=><article className={"wada-color-card "+(selectedColor?.id===c.id?"selected":"")} key={c.id}><button className="wada-color-open" onClick={()=>setSelectedColor(selectedColor?.id===c.id?null:c)}><span style={{background:c.hex}}/><b>{c.name}</b><small>{c.hex} · № {c.id}</small></button>{selectedColor?.id===c.id&&<div className="wada-color-expanded">{colorDetails(c)}<p>Встречается в палитрах: {c.combinations.join(", ")}</p><button onClick={()=>{setPicker(c.hex);setTab("match");}}>Подобрать сочетания с этим цветом</button></div>}</article>)}</div>}
    {tab==="match" && <div className="wada-match-tool">
      <div className="wada-match-picker"><label>Выбери любой цвет<input type="color" value={picker} onChange={e=>setPicker(e.target.value)}/></label><code>{picker.toUpperCase()}</code><p>Подберём ближайший цвет из словаря и покажем все оригинальные палитры, в которых он используется.</p></div>
      <div className="wada-nearest-card"><span style={{background:nearestColor.hex}}/><div><small>Ближайший цвет из словаря</small><h3>{nearestColor.name}</h3><b>{nearestColor.hex}</b>{colorDetails(nearestColor)}<small>Совпадение по RGB: ближайший цифровой образец; экранный цвет может отличаться от печатного оригинала.</small></div></div>
      <h3>Похожие цвета из словаря</h3><div className="wada-similar-grid">{similarColors.map(c=><button key={c.id} onClick={()=>{setPicker(c.hex);}}><span style={{background:c.hex}}/><b>{c.name}</b><small>{c.hex}</small></button>)}</div>
      <button className="wada-more-matches" onClick={()=>setShowAllMatches(v=>!v)}>{showAllMatches?"Показать меньше":"Показать больше похожих цветов"}</button>
      <h3>Оригинальные палитры с цветом «{nearestColor.name}» <small>({matchingPalettes.length})</small></h3>
      <div className="wada-palette-grid">{matchingPalettes.map(p=><article className="wada-palette-card" key={p.number}><button className="wada-palette-open" onClick={()=>setSelectedPalette(selectedPalette===p.number?null:p.number)}><span className="wada-palette-number">№ {String(p.number).padStart(3,"0")}</span>{renderColorStrip(p.colors)}<span className="wada-palette-names">{p.colors.map(id=>colorById.get(id)!.name).join(" · ")}</span></button>{selectedPalette===p.number&&<div className="wada-palette-expanded">{p.colors.map(id=>{const c=colorById.get(id)!;return <div className="wada-expanded-color" key={id}><span style={{background:c.hex}}/><div><b>{c.name}</b>{colorDetails(c)}</div></div>})}</div>}</article>)}</div>
    </div>}
    <p className="wada-data-credit">Источник цифровых данных: <a href="https://github.com/mattdesl/dictionary-of-colour-combinations" target="_blank" rel="noreferrer">Matt DesLauriers · dictionary-of-colour-combinations</a> (MIT), исходная компиляция Dain M. Blodorn Kim. Значения HEX/RGB/LAB — цифровое представление печатных образцов; возможны отличия от книги.</p>
  </section>;
}
