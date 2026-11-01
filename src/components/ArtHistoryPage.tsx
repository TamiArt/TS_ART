import { useEffect, useMemo, useState } from "react";
import { artHistoryMilestones, artHistoryPeriods, artHistorySources, artworkStudies } from "../data/artHistory";
import "./art-history.css";

const ART_HISTORY_PROGRESS_KEY = "ts-art-history-studied-v1";

function readStudiedPeriods(): string[] {
  try {
    const value = localStorage.getItem(ART_HISTORY_PROGRESS_KEY);
    if (!value) return [];
    const parsed: unknown = JSON.parse(value);
    return Array.isArray(parsed) ? parsed.filter((id): id is string => typeof id === "string" && artHistoryPeriods.some((period) => period.id === id)) : [];
  } catch {
    return [];
  }
}

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
  const [studiedPeriods, setStudiedPeriods] = useState<string[]>(readStudiedPeriods);

  useEffect(() => {
    try { localStorage.setItem(ART_HISTORY_PROGRESS_KEY, JSON.stringify(studiedPeriods)); } catch { /* Progress remains available for this session. */ }
  }, [studiedPeriods]);

  const toggleStudied = (periodId: string) => {
    setStudiedPeriods((current) => current.includes(periodId) ? current.filter((id) => id !== periodId) : [...current, periodId]);
  };
  const periods = useMemo(() => {
    const normalized = query.trim().toLocaleLowerCase("ru");
    return artHistoryPeriods.filter((period) => {
      const matchesFilter = filter === "all" || groupForPeriod(period.id) === filter;
      const searchable = [period.era, period.title, period.date, period.summary, period.region, ...period.characteristics, ...period.keyArtists.map((artist) => `${artist.name} ${artist.contribution}`), ...(period.recentTimeline ?? []).flatMap((item) => [item.period, item.title, item.description, ...item.artists]), ...period.terms, ...period.visualClues].join(" ").toLocaleLowerCase("ru");
      return matchesFilter && (!normalized || searchable.includes(normalized));
    });
  }, [query, filter]);

  const selected = periods.find((period) => period.id === selectedId) ?? periods[0] ?? null;
  const selectedIndex = selected ? periods.findIndex((period) => period.id === selected.id) : -1;
  const selectedArtwork = selected ? artworkStudies.find((study) => study.periodId === selected.id) : undefined;

  return <div className="page-wrap inner-page art-history-page">
    <section className="art-history-hero">
      <div className="art-history-hero-copy">
        <div className="eyebrow"><span className="eyebrow-line" /> ВИЗУАЛЬНАЯ КУЛЬТУРА · ИССЛЕДОВАНИЕ</div>
        <h1>История искусства — <em>учись видеть.</em></h1>
        <p>Не просто запоминай даты и имена. Разбирайся, как художники работали с формой, пространством, светом и цветом — и переноси наблюдения в собственную практику.</p>
        <div className="art-history-hero-meta"><span>09 периодов</span><span>Изучено: {studiedPeriods.length} из {artHistoryPeriods.length}</span><span>Визуальные ориентиры</span></div><div className="history-progress-track" role="progressbar" aria-label="Прогресс изучения истории искусства" aria-valuemin={0} aria-valuemax={artHistoryPeriods.length} aria-valuenow={studiedPeriods.length}><span style={{ width: `${studiedPeriods.length / artHistoryPeriods.length * 100}%` }} /></div>
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

    <section className="art-history-milestones" aria-label="Ключевые вехи истории живописи">
      <div className="art-history-section-heading"><div><div className="eyebrow">ХРОНОЛОГИЯ ЖИВОПИСИ</div><h2>Пять больших переломов</h2></div><span>от древности до XXI века</span></div>
      <div className="art-history-milestone-list">
        {artHistoryMilestones.map((milestone) => <article className="art-history-milestone" key={milestone.id}>
          <div className="art-history-milestone-date"><span>{milestone.group}</span><small>{milestone.date}</small></div>
          <div className="art-history-milestone-body"><h3>{milestone.title}</h3><p>{milestone.description}</p>
            <div className="art-history-milestone-works"><strong>Картины и примеры на Gallerix:</strong>
              {milestone.artists.map((artist) => <a key={artist.name + artist.work} href={artist.url} target="_blank" rel="noreferrer"><span>{artist.name}</span><em>{artist.work} ↗</em></a>)}
            </div>
          </div>
        </article>)}
      </div>
      <p className="art-history-milestone-note">Хронология показывает главные сдвиги, но направления часто существовали одновременно. Ссылки ведут на конкретные произведения Gallerix там, где доступна отдельная карточка работы.</p>
    </section>

    <section className="art-history-timeline-section">
      <div className="art-history-section-heading"><div><div className="eyebrow">КАРТА ЭПОХ</div><h2>От первых образов до наших дней</h2></div><span>{periods.length} из {artHistoryPeriods.length}</span></div>
      {periods.length === 0 ? <div className="art-history-empty"><strong>Ничего не найдено</strong><p>Попробуй другой термин или сбрось фильтр.</p><button className="button button-outline" onClick={() => { setQuery(""); setFilter("all"); }}>Сбросить поиск</button></div> :
        <div className="art-history-period-grid">
          {periods.map((period) => <button key={period.id} className={`art-history-period-card ${selected?.id === period.id ? "art-history-period-selected" : ""}`} onClick={() => setSelectedId(period.id)} aria-pressed={selected?.id === period.id}>
            <span className="history-card-top"><span>{String(artHistoryPeriods.findIndex((item) => item.id === period.id) + 1).padStart(2, "0")}{studiedPeriods.includes(period.id) && <span className="history-studied-mark" aria-label="Эпоха изучена"> ✓</span>}</span><span>{period.date}</span></span>
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
        {selected.recentTimeline && <section className="history-recent-timeline" aria-label="Современное искусство по десятилетиям"><div className="history-recent-heading"><span className="eyebrow">ОТ 1970-Х ДО СЕГОДНЯ</span><h3>Как менялось современное искусство</h3><p>Это не строгая смена стилей: многие направления развиваются одновременно и по-разному в разных странах.</p></div><div className="history-recent-list">{selected.recentTimeline.map((item) => <article className="history-recent-item" key={item.period}><div className="history-recent-date">{item.period}</div><div className="history-recent-copy"><h4>{item.title}</h4><p>{item.description}</p><div className="history-recent-artists"><strong>Художники:</strong> {item.artists.join(" · ")}</div></div></article>)}</div></section>}
        <section className="history-era-profile" aria-label="Характеристики эпохи">
          <div className="history-era-characteristics"><h3>Чем характеризуется эпоха</h3><ul>{selected.characteristics.map((item) => <li key={item}>{item}</li>)}</ul></div>
          <div className="history-era-artists"><h3>Основные художники и мастера</h3><ul>{selected.keyArtists.map((artist) => <li key={artist.name}><strong>{artist.name}</strong><span>{artist.contribution}</span></li>)}</ul><p className="history-era-note">Список ориентировочный: эпохи включают множество региональных традиций, а авторство многих исторических произведений неизвестно.</p></div>
        </section>
        {selectedArtwork && <section className="history-artwork-study" aria-label="Произведение для анализа">
          <div className="history-artwork-heading"><span className="eyebrow">РАЗБОР ПРОИЗВЕДЕНИЯ</span><span>{selectedArtwork.date}</span></div>
          <h3>{selectedArtwork.title}</h3>
          <p className="history-artwork-meta">{selectedArtwork.creator} · {selectedArtwork.medium}</p>
          <div className="history-artwork-columns"><div><strong>На что смотреть</strong><p>{selectedArtwork.focus}</p></div><div><strong>Практическое задание</strong><p>{selectedArtwork.exercise}</p></div></div>
        </section>}
        <div className="history-study-columns">
          <div><h3>Что искать глазами</h3><ul>{selected.visualClues.map((clue) => <li key={clue}>{clue}</li>)}</ul></div>
          <div className="history-look-for"><h3>Вопрос для анализа</h3><p>{selected.lookFor}</p><h3>Попробуй сама</h3><p>{selected.tryIt}</p></div>
        </div>
        <div className="history-terms"><span>КЛЮЧЕВЫЕ ТЕРМИНЫ</span>{selected.terms.map((term) => <span key={term}>{term}</span>)}</div>
        <div className="history-completion-row"><div><strong>{studiedPeriods.includes(selected.id) ? "Эпоха отмечена как изученная" : "Завершила знакомство с эпохой?"}</strong><p>Отметка сохранится в этом браузере и поможет продолжить с нужного места.</p></div><button className={studiedPeriods.includes(selected.id) ? "button button-outline" : "button button-dark"} onClick={() => toggleStudied(selected.id)} aria-pressed={studiedPeriods.includes(selected.id)}>{studiedPeriods.includes(selected.id) ? "Снять отметку" : "Отметить изученной"} <span>{studiedPeriods.includes(selected.id) ? "↺" : "✓"}</span></button></div>
        <div className="history-study-nav">
          <button className="button button-outline" disabled={selectedIndex <= 0} onClick={() => { if (selectedIndex > 0) setSelectedId(periods[selectedIndex - 1].id); }}>← Предыдущая эпоха</button>
          <button className="button button-dark" disabled={selectedIndex < 0 || selectedIndex >= periods.length - 1} onClick={() => { if (selectedIndex >= 0 && selectedIndex < periods.length - 1) setSelectedId(periods[selectedIndex + 1].id); }}>Следующая эпоха <span>→</span></button>
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
