import { useMemo, useState } from "react";
import { artHistoryPeriods, artHistorySources } from "../data/artHistory";
import "./art-history.css";

const filterOptions = [
  { value: "all", label: "Все эпохи" },
  { value: "early", label: "Ранние культуры" },
  { value: "europe", label: "Европейское искусство" },
  { value: "modern", label: "XIX–XXI века" }
];

function groupForPeriod(id: string) {
  if (["origins", "ancient", "classical", "medieval"].includes(id)) return "early";
  if (["renaissance", "baroque"].includes(id)) return "europe";
  return "modern";
}

export default function ArtHistoryPage() {
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState("all");
  const [selectedId, setSelectedId] = useState("renaissance");
  const [showSources, setShowSources] = useState(false);

  const periods = useMemo(() => {
    const normalized = query.trim().toLocaleLowerCase("ru");
    return artHistoryPeriods.filter((period) => {
      const matchesFilter = filter === "all" || groupForPeriod(period.id) === filter;
      const searchable = [period.era, period.title, period.date, period.summary, period.region, ...period.terms, ...period.visualClues].join(" ").toLocaleLowerCase("ru");
      return matchesFilter && (!normalized || searchable.includes(normalized));
    });
  }, [query, filter]);

  const selected = periods.find((period) => period.id === selectedId) ?? periods[0] ?? null;

  return <div className="page-wrap inner-page art-history-page">
    <section className="art-history-hero">
      <div className="art-history-hero-copy">
        <div className="eyebrow"><span className="eyebrow-line" /> ВИЗУАЛЬНАЯ КУЛЬТУРА · ИССЛЕДОВАНИЕ</div>
        <h1>История искусства — <em>учись видеть.</em></h1>
        <p>Не просто запоминай даты и имена. Разбирайся, как художники работали с формой, пространством, светом и цветом — и переноси наблюдения в собственную практику.</p>
        <div className="art-history-hero-meta"><span>09 периодов</span><span>Визуальные ориентиры</span><span>Практика после изучения</span></div>
      </div>
      <div className="art-history-hero-art" aria-hidden="true">
        <div className="art-history-paper">
          <span className="history-paper-label">VISUAL STUDY / 01</span>
          <div className="history-shape history-shape-sun" />
          <div className="history-shape history-shape-arch" />
          <div className="history-shape history-shape-vase" />
          <div className="history-shape history-shape-horizon" />
          <span className="history-paper-caption">form · light · meaning</span>
        </div>
      </div>
    </section>

    <section className="art-history-tools" aria-label="Поиск по истории искусства">
      <label className="art-history-search"><span aria-hidden="true">⌕</span><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Найти эпоху, термин или визуальный приём…" aria-label="Поиск по эпохам и терминам" /><kbd>ПОИСК</kbd></label>
      <div className="art-history-filters" aria-label="Фильтр эпох">
        {filterOptions.map((option) => <button key={option.value} className={filter === option.value ? "history-filter-active" : ""} onClick={() => setFilter(option.value)} aria-pressed={filter === option.value}>{option.label}</button>)}
      </div>
    </section>

    <section className="art-history-timeline-section">
      <div className="art-history-section-heading"><div><div className="eyebrow">КАРТА ЭПОХ</div><h2>От первых образов до наших дней</h2></div><span>{periods.length} из {artHistoryPeriods.length}</span></div>
      {periods.length === 0 ? <div className="art-history-empty"><strong>Ничего не найдено</strong><p>Попробуй другой термин или сбрось фильтр.</p><button className="button button-outline" onClick={() => { setQuery(""); setFilter("all"); }}>Сбросить поиск</button></div> :
        <div className="art-history-period-grid">
          {periods.map((period, index) => <button key={period.id} className={`art-history-period-card ${selected?.id === period.id ? "art-history-period-selected" : ""}`} onClick={() => setSelectedId(period.id)} aria-pressed={selected?.id === period.id}>
            <span className="history-card-top"><span>{String(artHistoryPeriods.findIndex((item) => item.id === period.id) + 1).padStart(2, "0")}</span><span>{period.date}</span></span>
            <span className={`history-period-art history-period-art-${period.id}`} aria-hidden="true"><i /><b /><em /></span>
            <span className="history-period-region">{period.region}</span>
            <strong>{period.era}</strong>
            <span className="history-period-title">{period.title}</span>
            <span className="history-card-bottom"><span>{period.terms.slice(0, 2).join(" · ")}</span><span aria-hidden="true">↗</span></span>
          </button>)}
        </div>
      }
    </section>

    {selected && <section className="art-history-study" aria-live="polite">
      <div className="history-study-index"><span>ИЗУЧАЕМ ЭПОХУ</span><strong>{String(artHistoryPeriods.findIndex((item) => item.id === selected.id) + 1).padStart(2, "0")}</strong><div>{selected.date}</div></div>
      <div className="history-study-content">
        <div className="eyebrow">{selected.region}</div>
        <h2>{selected.title}</h2>
        <p className="history-study-summary">{selected.summary}</p>
        <div className="history-study-columns">
          <div><h3>Что искать глазами</h3><ul>{selected.visualClues.map((clue) => <li key={clue}>{clue}</li>)}</ul></div>
          <div className="history-look-for"><h3>Вопрос для анализа</h3><p>{selected.lookFor}</p><h3>Попробуй сама</h3><p>{selected.tryIt}</p></div>
        </div>
        <div className="history-terms"><span>КЛЮЧЕВЫЕ ТЕРМИНЫ</span>{selected.terms.map((term) => <span key={term}>{term}</span>)}</div>
        <div className="history-study-nav">
          <button className="button button-outline" disabled={artHistoryPeriods.findIndex((item) => item.id === selected.id) === 0} onClick={() => setSelectedId(artHistoryPeriods[artHistoryPeriods.findIndex((item) => item.id === selected.id) - 1].id)}>← Предыдущая эпоха</button>
          <button className="button button-dark" disabled={artHistoryPeriods.findIndex((item) => item.id === selected.id) === artHistoryPeriods.length - 1} onClick={() => setSelectedId(artHistoryPeriods[artHistoryPeriods.findIndex((item) => item.id === selected.id) + 1].id)}>Следующая эпоха <span>→</span></button>
        </div>
      </div>
    </section>}

    <section className="art-history-sources">
      <button className="history-sources-toggle" onClick={() => setShowSources((value) => !value)} aria-expanded={showSources}><span><span className="eyebrow">ПРОВЕРЯЙ ФАКТЫ</span><strong>Музейные и учебные источники</strong></span><span>{showSources ? "−" : "+"}</span></button>
      {showSources && <div className="history-source-list">{artHistorySources.map((source) => <a key={source.name} href={source.url} target="_blank" rel="noreferrer"><span><strong>{source.name}</strong><small>{source.description}</small></span><span aria-hidden="true">↗</span></a>)}</div>}
      <p>Периоды условны, а художественные традиции пересекаются. Используй хронологию как ориентир, а конкретные даты, атрибуции и трактовки проверяй по музейным каталогам и научным публикациям.</p>
    </section>
  </div>;
}
