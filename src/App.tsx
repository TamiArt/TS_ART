import { useEffect, useMemo, useState, type FormEvent, type ReactNode } from "react";
import { allLessons, curriculum, type Lesson } from "./data/curriculum";

type Page = "home" | "learn" | "practice" | "journal" | "path" | "colourlab" | "openstudio" | "workshops" | "portfolio";
type ColourTest = { id: string; question: string; pigments: string; ratio: string; medium: string; support: string; wetObservation: string; dryObservation: string; result: string; nextStep: string; createdAt: string };
type StudioProject = { id: string; title: string; question: string; medium: string; constraint: string; nextStep: string; status: "active" | "paused" | "complete"; createdAt: string };
type PortfolioItem = { id: string; title: string; medium: string; year: string; description: string; link: string; createdAt: string };
type SavedState = { completed: string[]; journal: string; reflections: Record<string, string>; colourTests: ColourTest[]; projects: StudioProject[]; portfolio: PortfolioItem[] };

const STORAGE_KEY = "ts-art-studio:v1";
const readSavedState = (): SavedState => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw) as Partial<SavedState>;
      return {
        completed: Array.isArray(parsed.completed) ? parsed.completed : [],
        journal: typeof parsed.journal === "string" ? parsed.journal : "",
        reflections: parsed.reflections && typeof parsed.reflections === "object" ? parsed.reflections : {},
        colourTests: Array.isArray(parsed.colourTests) ? parsed.colourTests : [],
        projects: Array.isArray(parsed.projects) ? parsed.projects : [],
        portfolio: Array.isArray(parsed.portfolio) ? parsed.portfolio : []
      };
    }
  } catch {
    // A blocked or malformed local storage must not prevent the learning interface from opening.
  }
  return { completed: [], journal: "", reflections: {}, colourTests: [], projects: [], portfolio: [] };
};

const icons: Record<Page, string> = {
  home: "⌂", learn: "▤", practice: "✳", journal: "✎", path: "↗", colourlab: "◉", openstudio: "✳", workshops: "◈", portfolio: "▧"
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
  const completedCount = saved.completed.length;
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
          />
        ) : (
          <>
            {page === "home" && <HomePage progress={progress} completedCount={completedCount} total={allLessons.length} nextLesson={nextLesson} onContinue={() => openLesson(nextLesson)} onNavigate={navigate} />}
            {page === "learn" && <LessonsPage onOpen={openLesson} completed={saved.completed} moduleId={activeModuleId} onSelectModule={setActiveModuleId} />}
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

function LessonView({ lesson, moduleTitle, isCompleted, reflection, onReflectionChange, onBack, onComplete }: { lesson: Lesson; moduleTitle: string; isCompleted: boolean; reflection: string; onReflectionChange: (value: string) => void; onBack: () => void; onComplete: () => void }) {
  return <div className="page-wrap lesson-page"><button className="back-link" onClick={onBack}>← Назад к урокам</button><div className="lesson-layout"><article className="lesson-main"><div className="eyebrow"><span className="eyebrow-line" /> {moduleTitle.toUpperCase()} · {lesson.kind === "practice" ? "МИНИ-ПРАКТИКА" : "УРОК"}</div><h1>{lesson.title}</h1><div className="lesson-meta"><span>◷ {lesson.duration}</span><span>Самостоятельная практика</span>{isCompleted && <span className="completed-pill">✓ Отмечено</span>}</div><div className="lesson-objective"><span className="objective-icon">◎</span><div><span className="eyebrow">ЦЕЛЬ</span><p>{lesson.objective}</p></div></div><section className="lesson-section"><div className="lesson-section-number">01</div><div><h2>Подготовь материалы</h2><p>{lesson.materials}</p></div></section><section className="lesson-section"><div className="lesson-section-number">02</div><div><h2>Попробуй по шагам</h2><ol className="step-list">{lesson.steps.map((step, index) => <li key={step}><span>{String(index + 1).padStart(2, "0")}</span><p>{step}</p></li>)}</ol></div></section><section className="lesson-section"><div className="lesson-section-number">03</div><div><h2>Проверь себя</h2><p className="section-hint">Это ориентиры для наблюдения, а не оценка таланта.</p><ul className="check-list">{lesson.selfCheck.map((criterion) => <li key={criterion}><span>□</span>{criterion}</li>)}</ul></div></section><section className="reflection-box"><label htmlFor="lesson-reflection">Что ты заметила в процессе?</label><textarea id="lesson-reflection" value={reflection} onChange={(event) => onReflectionChange(event.target.value)} placeholder="Запиши наблюдение, вопрос или идею для следующей попытки…" /><p>Заметка сохраняется при отметке урока.</p><button className="button button-dark" onClick={onComplete}>{isCompleted ? "Сохранить заметку" : "Отметить как выполненный"} <span>✓</span></button></section></article><aside className="lesson-aside"><div className="aside-art"><div className="aside-orbit" /><span>STUDY<br />WITH<br /><em>INTENTION.</em></span></div><div className="aside-tip"><span className="eyebrow">ПОДСКАЗКА</span><p>Не стремись сделать красиво с первого раза. Сначала попробуй понять, что именно ты видишь.</p></div><div className="aside-tip aside-tip-muted"><span className="eyebrow">ТВОЙ ТЕМП</span><p>Можно остановиться, вернуться позже и повторить упражнение столько раз, сколько нужно.</p></div></aside></div></div>;
}

function PageIntro({ eyebrow, title, description }: { eyebrow: string; title: ReactNode; description: string }) {
  return <section className="page-intro"><div className="eyebrow"><span className="eyebrow-line" /> {eyebrow}</div><h1>{title}</h1><p>{description}</p><div className="intro-ornament">✳</div></section>;
}

export default App;