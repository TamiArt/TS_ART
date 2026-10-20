import { useEffect, useMemo, useState, type FormEvent, type ReactNode } from "react";
import { allLessons, curriculum, type Lesson } from "./data/curriculum";
import {
  readSavedState,
  STORAGE_KEY,
  type ColourTest,
  type PortfolioItem,
  type SavedState,
  type StudioProject
} from "./data/persistence";
import OilPaintMixer from "./components/OilPaintMixer";
import LessonVisualGuide from "./components/LessonVisualGuide";
import ArtHistoryPage from "./components/ArtHistoryPage";

type Page = "home" | "learn" | "art-history" | "practice" | "journal" | "path" | "colourlab" | "openstudio" | "workshops" | "portfolio";

const icons: Record<Page, string> = {
  home: "⌂", learn: "▤", "art-history": "◈", practice: "✳", journal: "✎", path: "↗", colourlab: "◉", openstudio: "✳", workshops: "◈", portfolio: "▧"
};

function App() {
  const [page, setPage] = useState<Page>("home");
  const [saved, setSaved] = useState<SavedState>(readSavedState);
  const [activeLessonId, setActiveLessonId] = useState<string | null>(null);
  const [activeModuleId, setActiveModuleId] = useState(1);
  const [reflection, setReflection] = useState("");
  const [toast, setToast] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(saved));
    } catch {
      setToast("Браузер не разрешил сохранить изменения. Экспортируй заметки вручную.");
    }
  }, [saved]);

  useEffect(() => {
    if (!toast) return;
    const timeout = window.setTimeout(() => setToast(""), 3200);
    return () => window.clearTimeout(timeout);
  }, [toast]);

  const activeLesson = allLessons.find((lesson) => lesson.id === activeLessonId) ?? null;
  const completedCount = allLessons.filter((lesson) => saved.completed.includes(lesson.id)).length;
  const progress = Math.round((completedCount / allLessons.length) * 100);
  const nextLesson = allLessons.find((lesson) => !saved.completed.includes(lesson.id)) ?? allLessons[0];
  const practices = allLessons.filter((lesson) => lesson.kind === "practice");

  const navigate = (nextPage: Page) => {
    setPage(nextPage);
    setActiveLessonId(null);
    setMobileMenuOpen(false);
  };

  const openLesson = (lesson: Lesson) => {
    setActiveLessonId(lesson.id);
    setActiveModuleId(allLessons.find((item) => item.id === lesson.id)?.moduleId ?? 1);
    setReflection(saved.reflections[lesson.id] ?? "");
    setPage("learn");
  };

  const markComplete = () => {
    if (!activeLesson) return;
    setSaved((current) => ({
      ...current,
      completed: current.completed.includes(activeLesson.id) ? current.completed : [...current.completed, activeLesson.id],
      reflections: { ...current.reflections, [activeLesson.id]: reflection }
    }));
    setToast("Практика отмечена. Маленький шаг — тоже прогресс.");
  };

  const updateJournal = (value: string) => setSaved((current) => ({ ...current, journal: value }));

  const navItems: Array<{ id: Page; label: string }> = [
    { id: "home", label: "Моя студия" },
    { id: "learn", label: "Уроки" },
    { id: "art-history", label: "История искусства" },
    { id: "practice", label: "Мини-студия" },
    { id: "journal", label: "Дневник" },
    { id: "path", label: "Учебный маршрут" },
    { id: "colourlab", label: "Colour Lab" },
    { id: "workshops", label: "Мастерские" },
    { id: "openstudio", label: "Открытая студия" },
    { id: "portfolio", label: "Портфолио" }
  ];

  return (
    <div className="app-shell">
      <aside className={`sidebar ${mobileMenuOpen ? "sidebar-open" : ""}`}>
        <button className="brand-lockup" onClick={() => navigate("home")} aria-label="TS ART Studio — на главную">
          <span className="brand-mark">TS<span>·</span>ART</span>
          <span className="brand-caption">STUDIO · CREATIVE PRACTICE</span>
        </button>
        <div className="sidebar-label">ТВОЁ ПРОСТРАНСТВО</div>
        <nav className="main-nav" aria-label="Основная навигация">
          {navItems.map((item) => (
            <button key={item.id} className={`nav-item ${page === item.id && !activeLesson ? "nav-item-active" : ""}`} onClick={() => navigate(item.id)}>
              <span className="nav-icon" aria-hidden="true">{icons[item.id]}</span>{item.label}
              {item.id === "learn" && <span className="nav-count">{allLessons.length}</span>}
            </button>
          ))}
        </nav>
        <div className="sidebar-spacer" />
        <div className="sidebar-note">
          <span className="note-spark">✳</span>
          <p>Не нужно уметь всё.<br /><strong>Достаточно начать.</strong></p>
          <span className="note-small">SEE. FEEL. CREATE.</span>
        </div>
        <div className="sidebar-footer"><span className="status-dot" /> ТВОЙ ТЕМП · ТВОИ ПРАВИЛА</div>
      </aside>

      {mobileMenuOpen && <button className="mobile-scrim" aria-label="Закрыть меню" onClick={() => setMobileMenuOpen(false)} />}

      <main className="main-content">
        <header className="topbar">
          <button className="mobile-menu-button" onClick={() => setMobileMenuOpen((value) => !value)} aria-label="Открыть меню">☰</button>
          <div className="breadcrumb">TS·ART STUDIO <span>/</span> {activeLesson ? "ТЕКУЩИЙ УРОК" : navItems.find((item) => item.id === page)?.label.toUpperCase()}</div>
          <div className="topbar-right"><span className="focus-label"><span /> ПРОСТРАНСТВО ДЛЯ ПРАКТИКИ</span><div className="avatar">T</div></div>
        </header>

        {activeLesson ? (
          <LessonView
            lesson={activeLesson}
            moduleTitle={curriculum.find((module) => module.id === activeLesson.moduleId)?.title ?? ""}
            isCompleted={saved.completed.includes(activeLesson.id)}
            reflection={reflection}
            onReflectionChange={setReflection}
            onBack={() => setActiveLessonId(null)}
            onComplete={markComplete}
            onNext={() => {
              const currentIndex = allLessons.findIndex((item) => item.id === activeLesson.id);
              const next = allLessons[currentIndex + 1];
              if (!next) return;
              setSaved((current) => ({
                ...current,
                reflections: { ...current.reflections, [activeLesson.id]: reflection }
              }));
              setActiveLessonId(next.id);
              setActiveModuleId(next.moduleId);
              setReflection(saved.reflections[next.id] ?? "");
            }}
            hasNext={allLessons.findIndex((item) => item.id === activeLesson.id) < allLessons.length - 1}
          />
        ) : (
          <>
            {page === "home" && <HomePage progress={progress} completedCount={completedCount} total={allLessons.length} nextLesson={nextLesson} onContinue={() => openLesson(nextLesson)} onNavigate={navigate} />}
            {page === "learn" && <LessonsPage onOpen={openLesson} completed={saved.completed} moduleId={activeModuleId} onSelectModule={setActiveModuleId} />}
            {page === "art-history" && <ArtHistoryPage />}
            {page === "practice" && <PracticePage practices={practices} completed={saved.completed} onOpen={openLesson} />}
            {page === "journal" && <JournalPage value={saved.journal} onChange={updateJournal} completedCount={completedCount} />}
            {page === "path" && <PathPage completed={saved.completed} onOpen={openLesson} onSelectModule={setActiveModuleId} onNavigate={navigate} />}
            {page === "colourlab" && <ColourLabPage tests={saved.colourTests} onAdd={(test) => setSaved((current) => ({ ...current, colourTests: [test, ...current.colourTests] }))} onDelete={(id) => setSaved((current) => ({ ...current, colourTests: current.colourTests.filter((test) => test.id !== id) }))} />}
            {page === "openstudio" && <OpenStudioPage projects={saved.projects} onAdd={(project) => setSaved((current) => ({ ...current, projects: [project, ...current.projects] }))} onStatus={(id, status) => setSaved((current) => ({ ...current, projects: current.projects.map((project) => project.id === id ? { ...project, status } : project) }))} onDelete={(id) => setSaved((current) => ({ ...current, projects: current.projects.filter((project) => project.id !== id) }))} />}
            {page === "portfolio" && <PortfolioPage items={saved.portfolio} onAdd={(item) => setSaved((current) => ({ ...current, portfolio: [item, ...current.portfolio] }))} onDelete={(id) => setSaved((current) => ({ ...current, portfolio: current.portfolio.filter((item) => item.id !== id) }))} />}
            {page === "workshops" && <WorkshopsPage onOpen={(id) => { const lesson = allLessons.find((item) => item.id === id); if (lesson) openLesson(lesson); }} />}
          </>
        )}
        <footer className="page-footer"><span>TS·ART STUDIO</span><span>SEE. FEEL. CREATE.</span><span>Учись в своём ритме.</span></footer>
      </main>
      {toast && <div className="toast" role="status">{toast}</div>}
    </div>
  );
}

function HomePage({ progress, completedCount, total, nextLesson, onContinue, onNavigate }: {
  progress: number; completedCount: number; total: number; nextLesson: (typeof allLessons)[number]; onContinue: () => void; onNavigate: (page: Page) => void;
}) {
  const [showWelcome, setShowWelcome] = useState(true);
  return (
    <div className="page-wrap home-page">
      <section className="hero">
        <div className="hero-copy">
          <div className="eyebrow"><span className="eyebrow-line" /> ТВОЯ ТВОРЧЕСКАЯ ПРАКТИКА</div>
          <h1>Искусство начинается<br />с <em>внимания.</em></h1>
          <p className="hero-description">Не с идеального рисунка. Не с дорогих материалов.<br className="desktop-break" /> С одного взгляда, одной линии и желания попробовать.</p>
          <button className="button button-dark" onClick={onContinue}>Продолжить путь <span>↗</span></button>
          <div className="hero-meta"><span>◷ {nextLesson.duration}</span><span>Урок по шагам</span><span>Для любого уровня</span></div>
        </div>
        <div className="hero-art" aria-label="Абстрактная композиция из художественных мазков" role="img">
          <div className="art-paper">
            <div className="art-label">STUDY No. 001<br /><span>OBSERVE / EXPLORE</span></div>
            <div className="art-sun" />
            <div className="art-stroke stroke-one" />
            <div className="art-stroke stroke-two" />
            <div className="art-stroke stroke-three" />
            <div className="art-arc" />
            <div className="art-caption">form follows feeling</div>
          </div>
          <span className="art-index">FIG. 01 — THE BEGINNING</span>
        </div>
        <div className="hero-decoration">01</div>
      </section>

      {showWelcome && <div className="welcome-strip"><span className="welcome-icon">✳</span><p><strong>Добро пожаловать в студию.</strong> Здесь важен процесс — не сравнение с другими.</p><button onClick={() => setShowWelcome(false)} aria-label="Скрыть приветствие">×</button></div>}

      <section className="section-block">
        <div className="section-heading"><div><div className="eyebrow">ТВОЯ ТОЧКА ОТСЧЁТА</div><h2>Всё начинается с малого</h2></div><button className="text-link" onClick={() => onNavigate("path")}>Весь маршрут <span>→</span></button></div>
        <div className="dashboard-grid">
          <article className="progress-card">
            <div className="card-topline"><span>МОЙ ПРОГРЕСС</span><span className="card-symbol">↗</span></div>
            <div className="progress-number">{progress}<span>%</span></div>
            <p>{completedCount === 0 ? "Первый шаг ждёт тебя" : `Завершено уроков: ${completedCount} из ${total}`}</p>
            <div className="progress-track"><span style={{ width: `${progress}%` }} /></div>
            <div className="progress-bottom"><span>Старт</span><span>Твой темп</span></div>
          </article>
          <article className="next-card">
            <div className="card-topline"><span>СЛЕДУЮЩИЙ ШАГ</span><span className="next-dot">●</span></div>
            <div className="next-card-body"><div className="lesson-thumb"><span>✳</span><i /><b /></div><div><span className="mini-tag">{nextLesson.kind === "practice" ? "МИНИ-ПРАКТИКА" : "УРОК"}</span><h3>{nextLesson.title}</h3><p>◷ {nextLesson.duration} · Без спешки</p></div></div>
            <button className="button button-outline" onClick={onContinue}>Открыть урок <span>→</span></button>
          </article>
          <article className="principle-card"><div className="principle-mark">“</div><p>Художник — не тот, кто всегда умеет. А тот, кто <em>учится видеть.</em></p><span>ПРИНЦИП СТУДИИ № 01</span><div className="principle-lines" /></article>
        </div>
      </section>

      <section className="section-block modes-section">
        <div className="section-heading"><div><div className="eyebrow">ВЫБИРАЙ СВОЙ ФОРМАТ</div><h2>Чему уделим внимание?</h2></div></div>
        <div className="mode-grid">
          <button className="mode-card mode-main" onClick={() => onNavigate("learn")}><span className="mode-number">01 / LEARN</span><span className="mode-icon">▤</span><h3>Учебный маршрут</h3><p>Последовательные уроки от первых наблюдений к самостоятельным работам.</p><span className="mode-arrow">↗</span></button>
          <button className="mode-card mode-practice" onClick={() => onNavigate("practice")}><span className="mode-number">02 / PRACTICE</span><span className="mode-icon">✳</span><h3>Мини-студия</h3><p>Короткие упражнения на 3–7 минут. Маленькая практика — большой вклад.</p><span className="mode-arrow">↗</span></button>
          <button className="mode-card mode-journal" onClick={() => onNavigate("journal")}><span className="mode-number">03 / REFLECT</span><span className="mode-icon">✎</span><h3>Визуальный дневник</h3><p>Фиксируй открытия, замечай перемены и формируй собственный взгляд.</p><span className="mode-arrow">↗</span></button>
          <button className="mode-card mode-colourlab" onClick={() => onNavigate("colourlab")}><span className="mode-number">04 / EXPERIMENT</span><span className="mode-icon">◉</span><h3>Colour Lab</h3><p>Проверяй смеси реальных пигментов и веди журнал наблюдений.</p><span className="mode-arrow">↗</span></button>
          <button className="mode-card mode-workshops" onClick={() => onNavigate("workshops")}><span className="mode-number">05 / STUDY</span><span className="mode-icon">◈</span><h3>Мастерские</h3><p>Исследуй свет, композицию, пейзаж и художественные решения.</p><span className="mode-arrow">↗</span></button>
          <button className="mode-card mode-openstudio" onClick={() => onNavigate("openstudio")}><span className="mode-number">06 / CREATE</span><span className="mode-icon">✳</span><h3>Открытая студия</h3><p>Веди собственные проекты, эксперименты и следующие шаги.</p><span className="mode-arrow">↗</span></button>
          <button className="mode-card mode-portfolio" onClick={() => onNavigate("portfolio")}><span className="mode-number">07 / COLLECT</span><span className="mode-icon">▧</span><h3>Портфолио</h3><p>Собирай архив своих работ и документируй художественный путь.</p><span className="mode-arrow">↗</span></button>
        </div>
      </section>
    </div>
  );
}

function LessonsPage({ onOpen, completed, moduleId, onSelectModule }: { onOpen: (lesson: Lesson) => void; completed: string[]; moduleId: number; onSelectModule: (id: number) => void }) {
  const module = curriculum.find((item) => item.id === moduleId) ?? curriculum[0];
  const moduleDone = module.lessons.filter((lesson) => completed.includes(lesson.id)).length;
  return <div className="page-wrap inner-page">
    <PageIntro eyebrow="LEARN · УЧЕБНАЯ ПРОГРАММА" title={<>Сначала — <em>основа.</em></>} description="Все 20 модулей содержат практические занятия. Выбирай тему, проходи уроки в своём темпе и возвращайся к упражнениям по мере необходимости." />
    <div className="module-picker">
      <label htmlFor="module-select">Выбрать модуль</label>
      <select id="module-select" value={module.id} onChange={(event) => onSelectModule(Number(event.target.value))}>
        {curriculum.map((item) => <option key={item.id} value={item.id}>Модуль {String(item.id).padStart(2, "0")} — {item.title}</option>)}
      </select>
      <span>{moduleDone} из {module.lessons.length} уроков отмечено</span>
    </div>
    <div className="content-columns"><div className="lesson-list-panel"><div className="panel-header"><span>МОДУЛЬ {String(module.id).padStart(2, "0")}</span><span>{module.lessons.length} урока · самостоятельный темп</span></div><h2>{module.title}</h2><p className="panel-description">{module.description}</p>
      {module.lessons.map((lesson, index) => <button className="lesson-row" key={lesson.id} onClick={() => onOpen(lesson)}><span className={`lesson-index ${completed.includes(lesson.id) ? "lesson-index-done" : ""}`}>{completed.includes(lesson.id) ? "✓" : String(index + 1).padStart(2, "0")}</span><span className="lesson-row-copy"><strong>{lesson.title}</strong><small>{lesson.kind === "practice" ? "Практика" : "Урок"} · {lesson.duration}</small></span><span className="lesson-row-arrow">↗</span></button>)}
      <div className="module-switcher"><button className="button button-outline" disabled={module.id === 1} onClick={() => onSelectModule(module.id - 1)}>← Предыдущий</button><button className="button button-dark" disabled={module.id === curriculum.length} onClick={() => onSelectModule(module.id + 1)}>Следующий модуль →</button></div>
    </div><aside className="side-info-card"><div className="info-drawing">✳</div><span className="eyebrow">ПОМНИ</span><h3>Не спеши к результату. Замечай процесс.</h3><p>У каждого урока есть цель, последовательность действий и критерии самопроверки. Они помогут понять, что получилось и что попробовать дальше.</p><div className="side-info-foot">ОБУЧЕНИЕ · БЕЗ СРАВНЕНИЯ</div></aside></div>
  </div>;
}

function PracticePage({ practices, completed, onOpen }: { practices: typeof allLessons; completed: string[]; onOpen: (lesson: Lesson) => void }) {
  return <div className="page-wrap inner-page"><PageIntro eyebrow="QI FLOW · КОРОТКАЯ ПРАКТИКА" title={<>Пять минут для <em>себя.</em></>} description="Мини-студия — это небольшие упражнения, которые помогают сохранять контакт с рисованием даже в загруженный день." />
    <div className="practice-banner"><span className="practice-banner-symbol">✳</span><div><span className="eyebrow">МАЛЕНЬКИЙ РИТУАЛ</span><h2>Не нужен целый свободный день.</h2><p>Выбери одну задачу. Установи таймер, если помогает. Остановись, когда время закончится.</p></div></div>
    <div className="practice-grid">{practices.map((lesson, index) => <button className="practice-tile" key={lesson.id} onClick={() => onOpen(lesson)}><span className="practice-tile-number">EXERCISE / {String(index + 1).padStart(2, "0")}</span><span className="practice-tile-icon">{index % 2 === 0 ? "〰" : "◌"}</span><h3>{lesson.title}</h3><p>{lesson.objective}</p><div className="practice-tile-bottom"><span>◷ {lesson.duration}</span><span>{completed.includes(lesson.id) ? "✓ Выполнено" : "Начать →"}</span></div></button>)}</div>
  </div>;
}

function JournalPage({ value, onChange, completedCount }: { value: string; onChange: (value: string) => void; completedCount: number }) {
  const wordCount = useMemo(() => value.trim() ? value.trim().split(/\s+/).length : 0, [value]);
  const downloadJournal = () => {
    const blob = new Blob([`TS·ART STUDIO — ВИЗУАЛЬНЫЙ ДНЕВНИК\n\nЗавершено уроков: ${completedCount}\n\n${value}\n`], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = "ts-art-visual-journal.txt";
    anchor.click();
    URL.revokeObjectURL(url);
  };
  return <div className="page-wrap inner-page"><PageIntro eyebrow="REFLECT · ЛИЧНОЕ ПРОСТРАНСТВО" title={<>Замечай, как ты <em>растёшь.</em></>} description="Дневник — не отчёт и не экзамен. Это место для мыслей, наблюдений, вопросов и небольших открытий." />
    <div className="journal-layout"><div className="journal-paper"><div className="journal-paper-top"><span>TS·ART / NOTES</span><span>MY CREATIVE PROCESS</span></div><label htmlFor="journal-entry">Что сегодня заметила, попробовала или поняла?</label><textarea id="journal-entry" value={value} onChange={(event) => onChange(event.target.value)} placeholder={"Сегодня я заметила…\n\nМне было интересно…\n\nВ следующий раз хочу попробовать…"} /><div className="journal-paper-bottom"><span>{wordCount} слов · сохраняется автоматически в этом браузере</span><button className="text-link" onClick={downloadJournal}>Экспортировать заметки ↓</button></div></div><aside className="journal-prompts"><span className="eyebrow">ВОПРОСЫ ДЛЯ РЕФЛЕКСИИ</span><h3>Не знаешь, с чего начать?</h3>{["Что сегодня получилось лучше, чем я ожидала?", "Какое решение я приняла осознанно?", "Что я хочу исследовать в следующий раз?"].map((prompt, index) => <div className="prompt-row" key={prompt}><span>0{index + 1}</span><p>{prompt}</p></div>)}<div className="journal-stat"><strong>{completedCount}</strong><span>уроков отмечено в твоём пути</span></div></aside></div>
  </div>;
}

function PathPage({ completed, onOpen, onSelectModule, onNavigate }: { completed: string[]; onOpen: (lesson: Lesson) => void; onSelectModule: (id: number) => void; onNavigate: (page: Page) => void }) {
  return <div className="page-wrap inner-page"><PageIntro eyebrow="YOUR PATH · 20 МОДУЛЕЙ" title={<>Большой путь. <em>Один шаг за раз.</em></>} description="Полная программа от наблюдения и основ рисунка до живописи, цифровых техник и авторского портфолио. Выбирай любой модуль; возвращаться к пройденным урокам можно в любое время." />
    <div className="path-timeline">{curriculum.map((module) => { const moduleDone = module.lessons.filter((lesson) => completed.includes(lesson.id)).length; return <section className="path-module path-module-available" key={module.id}><div className="path-marker">{moduleDone === module.lessons.length ? "✓" : String(module.id).padStart(2, "0")}</div><div className="path-module-content"><div className="path-module-top"><span>МОДУЛЬ {String(module.id).padStart(2, "0")}</span><span className="available-label">ДОСТУПЕН</span></div><h2>{module.title}</h2><p>{module.description}</p><div className="module-progress"><span style={{ width: `${moduleDone / module.lessons.length * 100}%` }} /></div><div className="module-meta">{moduleDone} из {module.lessons.length} уроков отмечено · {module.lessons.length} занятий</div><button className="text-link" onClick={() => { onSelectModule(module.id); onNavigate("learn"); }}>Открыть модуль →</button><span className="path-quick-start"><button className="text-link" onClick={() => onOpen(module.lessons.find((lesson) => !completed.includes(lesson.id)) ?? module.lessons[0])}>Продолжить урок ↗</button></span></div></section>; })}</div>
  </div>;
}

function ColourLabPage({ tests, onAdd, onDelete }: { tests: ColourTest[]; onAdd: (test: ColourTest) => void; onDelete: (id: string) => void }) {
  const [question, setQuestion] = useState("");
  const [pigments, setPigments] = useState("");
  const [ratio, setRatio] = useState("");
  const [medium, setMedium] = useState("");
  const [support, setSupport] = useState("");
  const [wetObservation, setWetObservation] = useState("");
  const [dryObservation, setDryObservation] = useState("");
  const [result, setResult] = useState("");
  const [nextStep, setNextStep] = useState("");

  const saveTest = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const test: ColourTest = {
      id: `colour-test-${Date.now()}`, question: question.trim(), pigments: pigments.trim(), ratio: ratio.trim(),
      medium: medium.trim(), support: support.trim(), wetObservation: wetObservation.trim(),
      dryObservation: dryObservation.trim(), result: result.trim(), nextStep: nextStep.trim(),
      createdAt: new Date().toISOString()
    };
    onAdd(test);
    setQuestion(""); setPigments(""); setRatio(""); setMedium(""); setSupport("");
    setWetObservation(""); setDryObservation(""); setResult(""); setNextStep("");
  };

  const exportTests = () => {
    const text = tests.map((test) => [
      `Опыт: ${test.question}`, `Дата: ${new Date(test.createdAt).toLocaleDateString("ru-RU")}`,
      `Пигменты: ${test.pigments}`, `Пропорции: ${test.ratio}`, `Среда: ${test.medium || "не указана"}`,
      `Основа: ${test.support || "не указана"}`, `Мокрый цвет: ${test.wetObservation || "не записан"}`,
      `После высыхания: ${test.dryObservation || "не записан"}`, `Вывод: ${test.result || "не записан"}`,
      `Следующий тест: ${test.nextStep || "не запланирован"}`
    ].join("\n")).join("\n\n---\n\n");
    const blob = new Blob([`TS·ART STUDIO — COLOUR LAB\n\n${text}\n`], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url; anchor.download = "ts-art-colour-lab.txt"; anchor.click();
    URL.revokeObjectURL(url);
  };

  return <div className="page-wrap inner-page colour-lab-page">
    <PageIntro eyebrow="QI FLOW · COLOUR LAB" title={<>Цвет — это <em>исследование.</em></>} description="Записывай реальные пробы смешения, чтобы понимать, что именно сработало в твоих материалах. Результат относится к конкретным пигментам и условиям, а не является универсальным рецептом." />
    <div className="colour-lab-intro"><div className="colour-lab-symbol">◉</div><div><span className="eyebrow">ПРИНЦИП ЛАБОРАТОРИИ</span><h2>Сначала наблюдение, потом вывод.</h2><p>Отмечай название пигмента и производителя, если они известны. Разделяй гипотезу, результат во влажном состоянии и цвет после высыхания. Если данных нет, так и запиши — не угадывай.</p></div></div>
    <OilPaintMixer />
    <div className="colour-lab-grid">
      <form className="colour-test-form" onSubmit={saveTest}>
        <div className="panel-header"><span>НОВЫЙ ОПЫТ</span><span>LOCAL NOTES</span></div>
        <label htmlFor="colour-question">Что исследуешь? *</label>
        <input id="colour-question" value={question} onChange={(event) => setQuestion(event.target.value)} required placeholder="Например: как меняется смесь жёлтого с синим" />
        <label htmlFor="colour-pigments">Пигменты и производитель *</label>
        <textarea id="colour-pigments" value={pigments} onChange={(event) => setPigments(event.target.value)} required rows={2} placeholder="Название с этикетки, Colour Index при наличии, производитель" />
        <div className="colour-form-row"><div><label htmlFor="colour-ratio">Пропорции</label><input id="colour-ratio" value={ratio} onChange={(event) => setRatio(event.target.value)} placeholder="1 часть : 2 части" /></div><div><label htmlFor="colour-medium">Среда / разбавитель</label><input id="colour-medium" value={medium} onChange={(event) => setMedium(event.target.value)} placeholder="Без добавки / указать" /></div></div>
        <label htmlFor="colour-support">Основа и подготовка</label>
        <input id="colour-support" value={support} onChange={(event) => setSupport(event.target.value)} placeholder="Бумага, грунт, тип поверхности" />
        <label htmlFor="colour-wet">Наблюдение во влажном состоянии</label>
        <textarea id="colour-wet" value={wetObservation} onChange={(event) => setWetObservation(event.target.value)} rows={2} placeholder="Оттенок, укрывистость, прозрачность, консистенция…" />
        <label htmlFor="colour-dry">Наблюдение после высыхания</label>
        <textarea id="colour-dry" value={dryObservation} onChange={(event) => setDryObservation(event.target.value)} rows={2} placeholder="Что изменилось после высыхания?" />
        <label htmlFor="colour-result">Результат и ограничения</label>
        <textarea id="colour-result" value={result} onChange={(event) => setResult(event.target.value)} rows={2} placeholder="Что показал именно этот тест? Что нельзя заключить?" />
        <label htmlFor="colour-next">Следующий эксперимент</label>
        <input id="colour-next" value={nextStep} onChange={(event) => setNextStep(event.target.value)} placeholder="Какой один параметр изменишь?" />
        <button className="button button-dark" type="submit">Сохранить опыт <span>＋</span></button>
        <p className="colour-form-note">Записи хранятся в этом браузере. Не закрывай доступ к устройству, если заметки личные.</p>
      </form>
      <section className="colour-test-list">
        <div className="colour-list-heading"><div><span className="eyebrow">МОИ НАБЛЮДЕНИЯ</span><h2>Журнал опытов</h2></div><span className="colour-test-count">{tests.length}</span></div>
        {tests.length === 0 ? <div className="colour-empty"><span>◌</span><h3>Здесь появится первый тест</h3><p>Начни с одного вопроса и небольшого образца. Даже неудачная смесь полезна, если записаны её условия.</p></div> : <>
          <button className="text-link colour-export" onClick={exportTests}>Экспортировать журнал ↓</button>
          {tests.map((test) => <article className="colour-test-card" key={test.id}>
            <div className="colour-test-card-top"><span>{new Date(test.createdAt).toLocaleDateString("ru-RU")}</span><button className="colour-delete" type="button" onClick={() => onDelete(test.id)} aria-label={`Удалить опыт: ${test.question}`}>Удалить ×</button></div>
            <h3>{test.question}</h3><p><strong>Пигменты:</strong> {test.pigments}</p>
            {test.ratio && <p><strong>Пропорции:</strong> {test.ratio}</p>}
            {test.medium && <p><strong>Среда:</strong> {test.medium}</p>}
            {test.support && <p><strong>Основа:</strong> {test.support}</p>}
            {test.wetObservation && <p><strong>Мокрый цвет:</strong> {test.wetObservation}</p>}
            {test.dryObservation && <p><strong>После высыхания:</strong> {test.dryObservation}</p>}
            {test.result && <p><strong>Вывод:</strong> {test.result}</p>}
            {test.nextStep && <p><strong>Следующий шаг:</strong> {test.nextStep}</p>}
          </article>)}
        </>}
      </section>
    </div>
  </div>;
}

function OpenStudioPage({ projects, onAdd, onStatus, onDelete }: {
  projects: StudioProject[];
  onAdd: (project: StudioProject) => void;
  onStatus: (id: string, status: StudioProject["status"]) => void;
  onDelete: (id: string) => void;
}) {
  const [title, setTitle] = useState("");
  const [question, setQuestion] = useState("");
  const [medium, setMedium] = useState("");
  const [constraint, setConstraint] = useState("");
  const [nextStep, setNextStep] = useState("");

  const saveProject = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onAdd({ id: `project-${Date.now()}`, title: title.trim(), question: question.trim(), medium: medium.trim(), constraint: constraint.trim(), nextStep: nextStep.trim(), status: "active", createdAt: new Date().toISOString() });
    setTitle(""); setQuestion(""); setMedium(""); setConstraint(""); setNextStep("");
  };
  const exportProjects = () => {
    const text = projects.map((project) => [
      project.title, `Статус: ${project.status}`, `Вопрос: ${project.question}`,
      `Материал: ${project.medium || "не указан"}`, `Ограничение: ${project.constraint || "не указано"}`,
      `Следующий шаг: ${project.nextStep || "не записан"}`
    ].join("\n")).join("\n\n---\n\n");
    const blob = new Blob([`TS·ART STUDIO — OPEN STUDIO\n\n${text}\n`], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob); const anchor = document.createElement("a");
    anchor.href = url; anchor.download = "ts-art-open-studio.txt"; anchor.click(); URL.revokeObjectURL(url);
  };
  const statusLabel: Record<StudioProject["status"], string> = { active: "В работе", paused: "На паузе", complete: "Завершён" };

  return <div className="page-wrap inner-page">
    <PageIntro eyebrow="OPEN STUDIO · ЛИЧНЫЕ ПРОЕКТЫ" title={<>Твоя идея. <em>Твой процесс.</em></>} description="Открытая студия помогает превратить интерес в небольшое исследование: сформулировать вопрос, выбрать ограничение и определить следующий шаг. Это рабочие заметки, а не конкурс готовых работ." />
    <div className="open-studio-banner"><span>✳</span><div><span className="eyebrow">РАБОЧИЙ ПРИНЦИП</span><h2>Не жди идеального замысла — проверь маленькую идею.</h2><p>Каждый проект хранится только в этом браузере. Здесь можно вести несколько исследований параллельно и экспортировать их записи.</p></div></div>
    <div className="open-studio-grid">
      <form className="project-form" onSubmit={saveProject}>
        <span className="eyebrow">НОВЫЙ ПРОЕКТ</span><h2>С чего хочешь начать?</h2>
        <label htmlFor="project-title">Название *</label><input id="project-title" value={title} onChange={(event) => setTitle(event.target.value)} required placeholder="Например: вечерний свет в комнате" />
        <label htmlFor="project-question">Вопрос или замысел *</label><textarea id="project-question" rows={3} value={question} onChange={(event) => setQuestion(event.target.value)} required placeholder="Что хочу исследовать или передать?" />
        <label htmlFor="project-medium">Материал / формат</label><input id="project-medium" value={medium} onChange={(event) => setMedium(event.target.value)} placeholder="Масло, карандаш, цифровой этюд…" />
        <label htmlFor="project-constraint">Ограничение эксперимента</label><input id="project-constraint" value={constraint} onChange={(event) => setConstraint(event.target.value)} placeholder="Например: три цвета, 20 минут" />
        <label htmlFor="project-next">Первый следующий шаг</label><textarea id="project-next" rows={2} value={nextStep} onChange={(event) => setNextStep(event.target.value)} placeholder="Какое действие можно выполнить сегодня?" />
        <button className="button button-dark" type="submit">Создать проект <span>＋</span></button>
      </form>
      <section className="project-board">
        <div className="project-board-heading"><div><span className="eyebrow">ТВОЯ МАСТЕРСКАЯ</span><h2>Проекты в процессе</h2></div><span className="colour-test-count">{projects.length}</span></div>
        {projects.length > 0 && <button className="text-link project-export" onClick={exportProjects}>Экспортировать проекты ↓</button>}
        {projects.length === 0 ? <div className="colour-empty"><span>◌</span><h3>Пока нет проектов</h3><p>Начни с вопроса, который тебе действительно интересен. Большая работа может начаться с небольшого этюда.</p></div> : projects.map((project) => <article className="project-card" key={project.id}>
          <div className="colour-test-card-top"><span>{new Date(project.createdAt).toLocaleDateString("ru-RU")}</span><span className={`project-status project-status-${project.status}`}>{statusLabel[project.status]}</span></div>
          <h3>{project.title}</h3><p>{project.question}</p>
          {project.medium && <p><strong>Материал:</strong> {project.medium}</p>}
          {project.constraint && <p><strong>Ограничение:</strong> {project.constraint}</p>}
          {project.nextStep && <p><strong>Следующий шаг:</strong> {project.nextStep}</p>}
          <div className="project-actions">
            {project.status !== "complete" && <button className="text-link" onClick={() => onStatus(project.id, project.status === "active" ? "paused" : "active")}>{project.status === "paused" ? "Возобновить" : "Поставить на паузу"}</button>}
            {project.status !== "complete" && <button className="text-link" onClick={() => onStatus(project.id, "complete")}>Отметить завершённым</button>}
            {project.status === "complete" && <button className="text-link" onClick={() => onStatus(project.id, "active")}>Вернуть в работу</button>}
            <button className="colour-delete" onClick={() => onDelete(project.id)}>Удалить ×</button>
          </div>
        </article>)}
      </section>
    </div>
  </div>;
}

function PortfolioPage({ items, onAdd, onDelete }: { items: PortfolioItem[]; onAdd: (item: PortfolioItem) => void; onDelete: (id: string) => void }) {
  const [title, setTitle] = useState("");
  const [medium, setMedium] = useState("");
  const [year, setYear] = useState(String(new Date().getFullYear()));
  const [description, setDescription] = useState("");
  const [link, setLink] = useState("");
  const saveItem = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onAdd({ id: `portfolio-${Date.now()}`, title: title.trim(), medium: medium.trim(), year: year.trim(), description: description.trim(), link: link.trim(), createdAt: new Date().toISOString() });
    setTitle(""); setMedium(""); setYear(String(new Date().getFullYear())); setDescription(""); setLink("");
  };
  const exportPortfolio = () => {
    const text = items.map((item) => [item.title, `Год: ${item.year || "не указан"}`, `Материал: ${item.medium || "не указан"}`, item.description, item.link ? `Ссылка: ${item.link}` : ""].filter(Boolean).join("\n")).join("\n\n---\n\n");
    const blob = new Blob([`TS·ART STUDIO — PORTFOLIO NOTES\n\n${text}\n`], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob); const anchor = document.createElement("a");
    anchor.href = url; anchor.download = "ts-art-portfolio.txt"; anchor.click(); URL.revokeObjectURL(url);
  };
  const safeExternalUrl = (value: string) => {
    try { const url = new URL(value); return url.protocol === "http:" || url.protocol === "https:" ? url.href : null; }
    catch { return null; }
  };

  return <div className="page-wrap inner-page">
    <PageIntro eyebrow="PORTFOLIO · АРХИВ РАБОТ" title={<>Собирай не только работы, <em>но и путь.</em></>} description="Создавай записи о собственных произведениях: название, материал, год, замысел и при необходимости ссылка на изображение. Загрузка файлов пока не включена; записи сохраняются локально." />
    <div className="portfolio-layout">
      <form className="project-form" onSubmit={saveItem}>
        <span className="eyebrow">НОВАЯ РАБОТА</span><h2>Добавить в портфолио</h2>
        <label htmlFor="portfolio-title">Название *</label><input id="portfolio-title" value={title} onChange={(event) => setTitle(event.target.value)} required placeholder="Название произведения" />
        <label htmlFor="portfolio-medium">Материал / техника</label><input id="portfolio-medium" value={medium} onChange={(event) => setMedium(event.target.value)} placeholder="Масло на холсте, цифровая живопись…" />
        <label htmlFor="portfolio-year">Год</label><input id="portfolio-year" value={year} onChange={(event) => setYear(event.target.value)} placeholder="2026" />
        <label htmlFor="portfolio-description">Замысел и контекст</label><textarea id="portfolio-description" rows={4} value={description} onChange={(event) => setDescription(event.target.value)} placeholder="Что исследовала, какие решения приняла?" />
        <label htmlFor="portfolio-link">Ссылка на работу (необязательно)</label><input id="portfolio-link" type="url" value={link} onChange={(event) => setLink(event.target.value)} placeholder="https://…" />
        <button className="button button-dark" type="submit">Добавить запись <span>＋</span></button>
      </form>
      <section className="portfolio-board">
        <div className="project-board-heading"><div><span className="eyebrow">МОЯ ПОДБОРКА</span><h2>Работы</h2></div><span className="colour-test-count">{items.length}</span></div>
        {items.length > 0 && <button className="text-link project-export" onClick={exportPortfolio}>Экспортировать портфолио ↓</button>}
        {items.length === 0 ? <div className="colour-empty"><span>▧</span><h3>Архив начинается с одной записи</h3><p>Фиксируй работы и решения, чтобы видеть развитие и постепенно собирать авторскую подборку.</p></div> : items.map((item) => <article className="portfolio-item" key={item.id}>
          <div className="portfolio-art-placeholder"><span>TS·ART</span><small>{item.year || "WORK STUDY"}</small></div>
          <div className="portfolio-item-copy"><div className="colour-test-card-top"><span>{item.medium || "Материал не указан"}</span><button className="colour-delete" onClick={() => onDelete(item.id)}>Удалить ×</button></div>
            <h3>{item.title}</h3>{item.description && <p>{item.description}</p>}{item.link && (safeExternalUrl(item.link) ? <a href={safeExternalUrl(item.link) ?? undefined} target="_blank" rel="noreferrer">Открыть ссылку на работу ↗</a> : <p>Ссылка не распознана как безопасный HTTP(S)-адрес.</p>)}
          </div>
        </article>)}
      </section>
    </div>
  </div>;
}

function WorkshopsPage({ onOpen }: { onOpen: (lessonId: string) => void }) {
  const workshops = [
    { id: "light", icon: "◐", label: "01 · СВЕТ", title: "Драматический свет и фокус", problem: "Как сделать свет главным участником композиции?", task: "Разложи референс на большие светлые и тёмные массы, выбери главный акцент и сравни края вокруг него.", lesson: "m15-dramatic-light", source: "Для исследования выбери произведение из музейной коллекции и проверь подпись учреждения. Не делай выводов о технике или намерениях автора без источника." },
    { id: "water", icon: "〰", label: "02 · АТМОСФЕРА", title: "Небо, вода и отражения", problem: "Как передать среду, не рисуя каждую волну или облако?", task: "Начни с больших цветовых и тональных отношений; добавляй детали только там, где они объясняют движение или глубину.", lesson: "m12-water-reflection", source: "Сопоставь собственный этюд с натурным наблюдением или лицензированным референсом. Запиши условия света." },
    { id: "forest", icon: "✳", label: "03 · СТРУКТУРА", title: "Дерево как ритм масс", problem: "Как показать рост и глубину без одинаковых листьев?", task: "Найди направление ветвей, три крупные массы листвы и несколько характерных краёв. Оставь часть формы обобщённой.", lesson: "m13-forest-depth", source: "Используй собственное наблюдение или источник с понятными условиями использования." },
    { id: "gesture", icon: "⌁", label: "04 · ДВИЖЕНИЕ", title: "Жест и конструкция фигуры", problem: "Как сохранить движение, когда начинаешь уточнять анатомию?", task: "Сделай быстрый жестовый набросок, отметь оси плеч и таза, затем сравни силуэт до и после построения.", lesson: "m14-gesture", source: "Используй собственные фотографии или референсы, на публикацию которых есть разрешение." },
    { id: "colour", icon: "◉", label: "05 · ПИГМЕНТЫ", title: "Цветовая гипотеза против опыта", problem: "Почему один и тот же словесный рецепт не гарантирует одинаковую смесь?", task: "Запиши точные названия пигментов, меняй один параметр за раз и сравни мокрый и высохший образцы.", lesson: "m07-lab-card", source: "Это практический эксперимент. Вывод относится к протестированным материалам и условиям, а не ко всем краскам." },
    { id: "analysis", icon: "◈", label: "06 · ВИЗУАЛЬНЫЙ АНАЛИЗ", title: "Исследование художественного решения", problem: "Как учиться у мастера, не копируя работу механически?", task: "Сначала опиши наблюдаемые факты, затем выбери одну задачу — свет, композицию, цвет или края — и создай собственный этюд.", lesson: "m16-master-study", source: "Проверяй авторство, название, датировку и материал по музейным или научным каталогам. Не выдавай интерпретацию за установленный факт." }
  ];
  return <div className="page-wrap inner-page">
    <PageIntro eyebrow="MASTER WORKSHOPS · ВИЗУАЛЬНЫЕ ИССЛЕДОВАНИЯ" title={<>Смотри глубже. <em>Пробуй сама.</em></>} description="Мастерская — не биография художника и не копирование ради копирования. Это короткое исследование конкретной художественной задачи с переходом к собственной практике." />
    <div className="workshop-notice"><strong>Метод мастерской</strong><span>Наблюдение → визуальная схема → собственный этюд → рефлексия. Исторические сведения нужно подтверждать источниками; интерпретации обозначай как интерпретации.</span></div>
    <div className="workshop-grid">{workshops.map((workshop) => <article className="workshop-card" key={workshop.id}><div className="workshop-label">{workshop.label}</div><div className="workshop-mark">{workshop.icon}</div><h2>{workshop.title}</h2><p className="workshop-question">{workshop.problem}</p><p>{workshop.task}</p><div className="workshop-source"><span className="eyebrow">ИСТОЧНИК И ПРОВЕРКА</span><p>{workshop.source}</p></div><button className="button button-outline" onClick={() => onOpen(workshop.lesson)}>Открыть связанный урок <span>↗</span></button></article>)}</div>
  </div>;
}

function LessonView({ lesson, moduleTitle, isCompleted, reflection, onReflectionChange, onBack, onComplete, onNext, hasNext }: { lesson: Lesson; moduleTitle: string; isCompleted: boolean; reflection: string; onReflectionChange: (value: string) => void; onBack: () => void; onComplete: () => void; onNext: () => void; hasNext: boolean }) {
  return <div className={`page-wrap lesson-page ${lesson.id === "light-observation" ? "lesson-page--light-observation" : ""}`}><button className="back-link" onClick={onBack}>← Назад к урокам</button><div className="lesson-layout"><article className="lesson-main"><div className="eyebrow"><span className="eyebrow-line" /> {moduleTitle.toUpperCase()} · {lesson.kind === "practice" ? "МИНИ-ПРАКТИКА" : "УРОК"}</div><h1>{lesson.title}</h1><div className="lesson-meta"><span>◷ {lesson.duration}</span><span>Самостоятельная практика</span>{isCompleted && <span className="completed-pill">✓ Отмечено</span>}</div><div className="lesson-objective"><span className="objective-icon">◎</span><div><span className="eyebrow">ЦЕЛЬ</span><p>{lesson.objective}</p></div></div><section className="lesson-section"><div className="lesson-section-number">01</div><div><h2>Подготовь материалы</h2><p>{lesson.materials}</p></div></section><section className="lesson-section"><div className="lesson-section-number">02</div><div><h2>Попробуй по шагам</h2><ol className="step-list">{lesson.steps.map((step, index) => <li key={step}><span>{String(index + 1).padStart(2, "0")}</span><p>{step}</p></li>)}</ol></div></section><LessonVisualGuide lesson={lesson} /><section className="lesson-section"><div className="lesson-section-number">03</div><div><h2>Проверь себя</h2><p className="section-hint">Это ориентиры для наблюдения, а не оценка таланта.</p><ul className="check-list">{lesson.selfCheck.map((criterion) => <li key={criterion}><span>□</span>{criterion}</li>)}</ul></div></section><section className="reflection-box"><label htmlFor="lesson-reflection">Что ты заметила в процессе?</label><textarea id="lesson-reflection" value={reflection} onChange={(event) => onReflectionChange(event.target.value)} placeholder="Запиши наблюдение, вопрос или идею для следующей попытки…" /><p>Заметка сохраняется при переходе к следующему уроку или отметке выполнения.</p><div className="lesson-actions"><button className="button button-dark" onClick={onComplete}>{isCompleted ? "Сохранить заметку" : "Отметить как выполненный"} <span>✓</span></button><button className="button button-outline lesson-next-button" onClick={onNext} disabled={!hasNext}>{hasNext ? <>Следующий урок <span>→</span></> : "Это последний урок"}</button></div></section></article><aside className="lesson-aside"><div className="aside-art"><div className="aside-orbit" /><span>STUDY<br />WITH<br /><em>INTENTION.</em></span></div><div className="aside-tip"><span className="eyebrow">ПОДСКАЗКА</span><p>Не стремись сделать красиво с первого раза. Сначала попробуй понять, что именно ты видишь.</p></div><div className="aside-tip aside-tip-muted"><span className="eyebrow">ТВОЙ ТЕМП</span><p>Можно остановиться, вернуться позже и повторить упражнение столько раз, сколько нужно.</p></div></aside></div></div>;
}

function PageIntro({ eyebrow, title, description }: { eyebrow: string; title: ReactNode; description: string }) {
  return <section className="page-intro"><div className="eyebrow"><span className="eyebrow-line" /> {eyebrow}</div><h1>{title}</h1><p>{description}</p><div className="intro-ornament">✳</div></section>;
}

export default App;