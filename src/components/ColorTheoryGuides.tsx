import "./color-theory-guides.css";

const wheel = [
  { name: "Жёлтый", hex: "#f4d13d", group: "Первичный" },
  { name: "Жёлто-оранжевый", hex: "#f5a23a", group: "Третичный" },
  { name: "Оранжевый", hex: "#ed6a32", group: "Вторичный" },
  { name: "Красно-оранжевый", hex: "#dc493d", group: "Третичный" },
  { name: "Красный", hex: "#c93645", group: "Первичный" },
  { name: "Красно-фиолетовый", hex: "#a13b69", group: "Третичный" },
  { name: "Фиолетовый", hex: "#784a91", group: "Вторичный" },
  { name: "Сине-фиолетовый", hex: "#535c9c", group: "Третичный" },
  { name: "Синий", hex: "#3679ad", group: "Первичный" },
  { name: "Сине-зелёный", hex: "#319b9b", group: "Третичный" },
  { name: "Зелёный", hex: "#55a65c", group: "Вторичный" },
  { name: "Жёлто-зелёный", hex: "#a7b64b", group: "Третичный" }
];

function point(angle: number, radius: number) {
  const radians = (angle - 90) * Math.PI / 180;
  return { x: 160 + Math.cos(radians) * radius, y: 160 + Math.sin(radians) * radius };
}

export function ColorWheelGuide() {
  return <section className="color-guide" aria-labelledby="color-wheel-guide-title">
    <div className="color-guide-heading"><span className="eyebrow">ВИЗУАЛЬНАЯ СХЕМА</span><h3 id="color-wheel-guide-title">Традиционный учебный цветовой круг</h3><p>Упрощённая модель отношений оттенков. Реальные масляные пигменты не всегда дают идеальные теоретические смеси.</p></div>
    <div className="color-wheel-layout">
      <svg className="color-wheel-svg" viewBox="0 0 320 320" role="img" aria-label="Цветовой круг из двенадцати секторов">
        {wheel.map((color, index) => {
          const start = point(index * 30, 126);
          const end = point((index + 1) * 30, 126);
          return <path key={color.name} d={`M 160 160 L ${start.x} ${start.y} A 126 126 0 0 1 ${end.x} ${end.y} Z`} fill={color.hex} stroke="#fbf8f1" strokeWidth="2" />;
        })}
        <circle cx="160" cy="160" r="48" fill="#fbf8f1" />
        <text x="160" y="154" textAnchor="middle" className="color-wheel-center">ЦВЕТОВОЙ</text>
        <text x="160" y="171" textAnchor="middle" className="color-wheel-center">КРУГ</text>
      </svg>
      <div className="color-wheel-legend">
        {wheel.map((color) => <div className="color-wheel-key" key={color.name}><span style={{ backgroundColor: color.hex }} /><div><strong>{color.name}</strong><small>{color.group}</small></div></div>)}
      </div>
    </div>
    <div className="color-harmony-notes">
      <article><strong>Соседние цвета</strong><p>Аналоговая гармония: близкие оттенки создают связную гамму.</p></article>
      <article><strong>Противоположные цвета</strong><p>Комплементарная пара: сильный контраст, который важно уравновесить по площади и насыщенности.</p></article>
      <article><strong>Три равноудалённых цвета</strong><p>Триада: выразительная схема, в которой один оттенок обычно лучше сделать ведущим.</p></article>
    </div>
  </section>;
}

export function ColorDimensionsGuide() {
  return <section className="color-guide" aria-labelledby="color-dimensions-title">
    <div className="color-guide-heading"><span className="eyebrow">ТРИ ХАРАКТЕРИСТИКИ ЦВЕТА</span><h3 id="color-dimensions-title">Цветовой тон · светлота · насыщенность</h3><p>Это три разных вопроса о цвете. Изменяя один параметр, следи, как меняются остальные.</p></div>
    <div className="color-dimensions-grid">
      <article><h4>1. Цветовой тон</h4><div className="color-dimension-swatches"><i style={{background:"#d94b43"}}/><i style={{background:"#e8b63b"}}/><i style={{background:"#4d9a61"}}/><i style={{background:"#477cb7"}}/><i style={{background:"#80549c"}}/></div><p>Какой именно цвет мы видим: красный, жёлтый, зелёный, синий и т. д.</p></article>
      <article><h4>2. Светлота (тон)</h4><div className="color-dimension-swatches"><i style={{background:"#f2d7d0"}}/><i style={{background:"#d78d83"}}/><i style={{background:"#a94e48"}}/><i style={{background:"#682f34"}}/><i style={{background:"#2e2027"}}/></div><p>Насколько цвет светлый или тёмный. В живописи тон помогает передать объём и освещение.</p></article>
      <article><h4>3. Насыщенность</h4><div className="color-dimension-swatches"><i style={{background:"#a9a09a"}}/><i style={{background:"#b58a7d"}}/><i style={{background:"#bd7162"}}/><i style={{background:"#d95745"}}/><i style={{background:"#ed382b"}}/></div><p>Насколько цвет интенсивный или приглушённый. Насыщенность зависит и от соседних цветов.</p></article>
    </div>
  </section>;
}

export function WadaSanzoGuide() {
  return <section className="color-guide wada-guide" aria-labelledby="wada-guide-title">
    <div className="color-guide-heading"><span className="eyebrow">ИСТОРИЯ ЦВЕТА · ЯПОНИЯ</span><h3 id="wada-guide-title">Сандзо Вада (Wada Sanzō), 1883–1967</h3><p>Японский художник, дизайнер костюмов, преподаватель и исследователь цвета. Его работа показывает, что цветовые сочетания можно не только интуитивно подбирать, но и систематически изучать.</p></div>
    <div className="wada-guide-facts">
      <article><strong>1927</strong><p>Основание Японской ассоциации стандартных цветов.</p></article>
      <article><strong>1933–1934</strong><p>Публикация шеститомного справочника цветовых сочетаний «Haishoku Sōkan».</p></article>
      <article><strong>348 схем</strong><p>В современном сокращённом издании «A Dictionary of Color Combinations» собраны 348 сочетаний из 159 цветов.</p></article>
    </div>
    <div className="wada-guide-practice"><strong>Как использовать справочник в живописи</strong><ol><li>Выбери сочетание из двух, трёх или четырёх цветов.</li><li>Определи ведущий оттенок, поддерживающие цвета и акцент.</li><li>Сделай собственные выкраски масляными красками и подпиши пигменты.</li><li>Проверь светлоту и насыщенность, а затем адаптируй палитру к сюжету.</li></ol><p>Печатные образцы и их экранные конверсии не являются точными рецептами смешивания масляных пигментов: на результат влияют связующее, укрывистость, грунт, освещение и свойства конкретной краски.</p></div>
    <div className="wada-guide-sources"><a href="https://artplatform.go.jp/artists/A2089" target="_blank" rel="noreferrer">Art Platform Japan — биография WADA Sanzō ↗</a><a href="https://www.rijksmuseum.nl/en/collection/publication/Haishoku-jiten-Taisho-Showa-no-shikisai-noto-A-dictionary-of-color-combinations--6b673eac810e6c8532588f2d554a02ac" target="_blank" rel="noreferrer">Rijksmuseum — A Dictionary of Color Combinations ↗</a></div>
  </section>;
}
