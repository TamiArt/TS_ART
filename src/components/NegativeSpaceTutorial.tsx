import "./NegativeSpaceTutorial.css";

const steps = [
  {
    number: "01",
    title: "Начни с натуры",
    instruction: "Поставь предмет так, чтобы вокруг него были видны промежутки.",
    note: "Не рисуй сразу. Посмотри на просветы слева, справа и сверху.",
    drawing: <><path d="M48 119 L211 119" className="ns-table" /><path d="M106 52 C97 57 94 72 97 87 L91 108 Q122 121 153 108 L147 87 C150 72 145 57 136 52 Z" className="ns-object" /><path d="M105 55 Q121 45 137 55 M106 54 L108 44 Q121 38 134 44 L137 54" className="ns-object" /><path d="M147 66 C177 58 178 94 151 94" className="ns-object" /><path d="M36 28 L36 119 M31 28 L41 28 M31 119 L41 119" className="ns-guide" /><path d="M82 31 L82 119" className="ns-guide ns-guide-dash" /><path d="M191 31 L191 119" className="ns-guide ns-guide-dash" /><text x="42" y="20" className="ns-label">ЛИСТ</text><text x="153" y="36" className="ns-label">ПРЕДМЕТ</text></>
  },
  {
    number: "02",
    title: "Найди один просвет",
    instruction: "Выбери один пустой участок рядом с предметом.",
    note: "Смотри на форму пустоты — например, на клин слева от кувшина.",
    drawing: <><path d="M48 119 L211 119" className="ns-table" /><path d="M65 43 L93 57 L90 87 L83 108 L65 112 Z" className="ns-negative" /><path d="M106 52 C97 57 94 72 97 87 L91 108 Q122 121 153 108 L147 87 C150 72 145 57 136 52 Z" className="ns-object" /><path d="M105 55 Q121 45 137 55 M106 54 L108 44 Q121 38 134 44 L137 54" className="ns-object" /><path d="M147 66 C177 58 178 94 151 94" className="ns-object" /><path d="M67 56 L84 64 M67 72 L82 77 M67 88 L79 91" className="ns-hatch" /><text x="29" y="31" className="ns-label">ФОРМА ПУСТОТЫ</text><path d="M76 35 L76 42" className="ns-accent-line" /></>
  },
  {
    number: "03",
    title: "Нарисуй пустоту",
    instruction: "Нарисуй форму этого промежутка вместо самого предмета.",
    note: "Передай внешний край просвета. Пока не обводи кувшин.",
    drawing: <><path d="M65 43 L93 57 L90 87 L83 108 L65 112 Z" className="ns-negative" /><path d="M65 43 Q78 46 93 57 L90 87 L83 108 L65 112 Z" className="ns-outline" /><path d="M66 49 L89 60 M66 65 L87 74 M66 82 L85 89 M66 99 L80 104" className="ns-hatch" /><path d="M111 55 L111 119 M122 55 L122 119 M133 55 L133 119" className="ns-guide ns-guide-dash" opacity=".45" /><text x="112" y="32" className="ns-label">ТОЛЬКО ПРОСВЕТ</text><path d="M128 36 L89 47" className="ns-accent-line" /></>
  },
  {
    number: "04",
    title: "Сравни два промежутка",
    instruction: "Добавь второй промежуток и сравни их размеры.",
    note: "Сравни ширину, высоту и направление краёв, не угадывай на глаз.",
    drawing: <><path d="M48 119 L211 119" className="ns-table" /><path d="M65 43 L93 57 L90 87 L83 108 L65 112 Z" className="ns-negative" /><path d="M151 56 L177 48 L190 64 L190 101 L155 108 L160 84 Z" className="ns-negative" /><path d="M106 52 C97 57 94 72 97 87 L91 108 Q122 121 153 108 L147 87 C150 72 145 57 136 52 Z" className="ns-object" /><path d="M105 55 Q121 45 137 55 M106 54 L108 44 Q121 38 134 44 L137 54" className="ns-object" /><path d="M147 66 C177 58 178 94 151 94" className="ns-object" /><path d="M69 128 L87 128 M69 124 L69 132 M87 124 L87 132 M159 128 L186 128 M159 124 L159 132 M186 124 L186 132" className="ns-measure" /><text x="70" y="139" className="ns-label">А</text><text x="170" y="139" className="ns-label">Б</text></>
  },
  {
    number: "05",
    title: "Проверь силуэт",
    instruction: "Теперь наметь внешний силуэт предмета.",
    note: "Сверь силуэт с двумя пустыми формами. Если они не совпадают — поправь край.",
    drawing: <><path d="M48 119 L211 119" className="ns-table" /><path d="M106 52 C97 57 94 72 97 87 L91 108 Q122 121 153 108 L147 87 C150 72 145 57 136 52 Z" className="ns-final-object" /><path d="M105 55 Q121 45 137 55 M106 54 L108 44 Q121 38 134 44 L137 54" className="ns-final-object" /><path d="M147 66 C177 58 178 94 151 94" className="ns-final-object" /><path d="M65 43 L93 57 L90 87 L83 108 L65 112 M151 56 L177 48 L190 64 L190 101 L155 108" className="ns-check-line" /><path d="M76 42 L76 31 M176 47 L187 34" className="ns-accent-line" /><text x="26" y="25" className="ns-label">А</text><text x="188" y="27" className="ns-label">Б</text></>
  }
];

function Drawing({ index }: { index: number }) {
  return <svg className="negative-space-drawing" viewBox="0 0 240 150" role="img" aria-label={`Карандашная схема, этап ${index + 1}: ${steps[index].title.toLowerCase()}`}>
    <rect x="7" y="6" width="226" height="138" rx="3" className="ns-paper" />
    <path d="M14 14 L20 14 M14 14 L14 20 M226 14 L220 14 M226 14 L226 20 M14 136 L20 136 M14 136 L14 130 M226 136 L220 136 M226 136 L226 130" className="ns-corners" />
    {steps[index].drawing}
  </svg>;
}

export default function NegativeSpaceTutorial() {
  return <section className="negative-space-tutorial" aria-labelledby="negative-space-title">
    <header className="negative-space-header">
      <div><span className="eyebrow">РАЗБОР ОТ ХУДОЖНИКА · 5 ЭТАПОВ</span><h2 id="negative-space-title">Учимся видеть пустоту</h2><p>Не начинай с предмета. Сначала изучи формы, которые его окружают.</p></div>
      <span className="negative-space-seal" aria-hidden="true">LOOK<br />FIRST</span>
    </header>
    <div className="negative-space-steps">
      {steps.map((step, index) => <article className="negative-space-step" key={step.number}>
        <div className="negative-space-step-title"><span>{step.number}</span><h3>{step.title}</h3></div>
        <Drawing index={index} />
        <p className="negative-space-instruction">{step.instruction}</p>
        <p className="negative-space-note">{step.note}</p>
      </article>)}
    </div>
    <footer className="negative-space-takeaway"><span aria-hidden="true">✳</span><p><strong>Совет художника.</strong> Прищурься и смотри на просвет как на пятно. Его наклон, ширина и контур помогают проверить пропорции предмета точнее, чем попытка сразу нарисовать знакомую вещь.</p></footer>
  </section>;
}
