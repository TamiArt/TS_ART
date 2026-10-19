import type { ReactNode } from "react";

const graphite = "#45443e";
const pencil = "#77746a";
const lightPencil = "#b7b1a5";
const paper = "#fffdf7";
const accent = "#b47a5b";
const sage = "#81896e";

const numberWords: Record<string, number> = {
  один: 1, одна: 1, одну: 1, два: 2, две: 2, три: 3, четыре: 4,
  пять: 5, шесть: 6, семь: 7, восемь: 8, девять: 9, десять: 10
};

export function getRequestedLineCount(instruction: string): number | null {
  const text = instruction.toLowerCase();
  const range = text.match(/(\d{1,2})\s*[–—-]\s*(\d{1,2})\s+(?:крупн[а-яё]*\s+)?лини/);
  if (range) {
    const minimum = Number(range[1]);
    const maximum = Number(range[2]);
    if (minimum >= 1 && maximum <= 12 && minimum <= maximum) return Math.round((minimum + maximum) / 2);
  }
  const match = text.match(/(?:проведи|нарисуй|сделай|повтори|создай|наметь)\s+(\d{1,2}|один|одна|одну|два|две|три|четыре|пять|шесть|семь|восемь|девять|десять)(?:\s+[а-яё-]+){0,4}?\s+лини/);
  if (!match) return null;
  const token = match[1];
  const count = /^\d+$/.test(token) ? Number(token) : numberWords[token];
  return count >= 1 && count <= 12 ? count : null;
}

function PencilLine({ index, x1, y, x2, emphasis = false, pressure }: { index: number; x1: number; y: number; x2: number; emphasis?: boolean; pressure?: number }) {
  const wobble = (index % 3) - 1;
  const force = pressure ?? (emphasis ? .72 : .25);
  return <g>
    <path d={`M ${x1} ${y} Q ${(x1 + x2) / 2} ${y + wobble * 2.1} ${x2} ${y + wobble * .7}`} fill="none" stroke={lightPencil} strokeWidth={1.8 + force * 2} strokeLinecap="round" opacity={.12 + force * .18} />
    <path d={`M ${x1} ${y} Q ${(x1 + x2) / 2 - 1} ${y + wobble * 1.2} ${x2} ${y + wobble * .7}`} fill="none" stroke={force > .55 ? graphite : pencil} strokeWidth={.45 + force * 1.45} strokeLinecap="round" opacity={.3 + force * .68} />
  </g>;
}

function PencilSketch({ children }: { children: ReactNode }) {
  return <svg className="lesson-visual-svg" viewBox="0 0 240 150" role="img" aria-label="Карандашный учебный рисунок">
    <rect x="9" y="7" width="222" height="136" rx="2" fill={paper} stroke="#e2dccf" />
    <path d="M15 14 L21 14 M15 14 L15 20 M225 14 L225 20 M225 14 L219 14 M15 136 L15 130 M15 136 L21 136 M225 136 L219 136 M225 136 L225 130" fill="none" stroke="#d8d0c2" strokeWidth=".8" />
    {children}
  </svg>;
}

function DrawingContent({ title, instruction }: { title: string; instruction: string }) {
  const text = (title + " " + instruction).toLowerCase();
  const requestedCount = getRequestedLineCount(instruction);

  if (requestedCount !== null) {
    return <PencilSketch>{Array.from({ length: requestedCount }, (_, i) => (
      <PencilLine key={i} index={i} x1={28 + (i % 2) * 2} y={24 + i * (112 / requestedCount)} x2={212 - (i % 3) * 3} emphasis={i === requestedCount - 1} pressure={requestedCount === 1 ? 0.5 : i / (requestedCount - 1)} />
    ))}</PencilSketch>;
  }

  if (/раздели лист на три части|три части/.test(text)) {
    return <PencilSketch><path d="M83 17 L83 132 M157 17 L157 132" stroke={graphite} strokeWidth="1.4" strokeLinecap="round" /><path d="M24 36 Q47 23 69 36 L69 62 Q45 75 24 62 Z M96 62 L109 38 L143 62 L143 78 L96 78 Z M171 48 Q185 25 205 47 L205 78 L171 78 Z" fill="none" stroke={pencil} strokeWidth="1.3" strokeLinejoin="round" /><path d="M24 100 L67 100 M96 100 L143 100 M171 100 L207 100" stroke={lightPencil} strokeWidth="1.1" /></PencilSketch>;
  }

  if (/три условные тональн|тональн.*зон/.test(text)) {
    return <PencilSketch>{[0, 1, 2].map((n) => <g key={n}><rect x={28 + n * 63} y="27" width="57" height="78" fill={["#f3f0e8", "#a7a398", "#4e4d47"][n]} stroke={graphite} strokeWidth="1" />{n === 1 && Array.from({ length: 8 }, (_, i) => <path key={i} d={`M${30 + i * 7} 30 L${44 + i * 7} 102`} stroke="#77746a" strokeWidth=".7" opacity=".5" />)}{n === 2 && Array.from({ length: 10 }, (_, i) => <path key={i} d={`M${30 + i * 5} 31 L${45 + i * 5} 102`} stroke="#c3bfb4" strokeWidth=".7" opacity=".4" />)}</g>)}</PencilSketch>;
  }

  if (/светлую|лёгкую, уверенную|разным нажим|от очень лёгкой/.test(text)) {
    return <PencilSketch>{[0, 1, 2, 3].map((n) => <g key={n}><PencilLine index={n} x1={28} y={32 + n * 29} x2={210} emphasis={n > 1} /><text x="32" y={24 + n * 29} fontSize="8" fill={pencil}>{["лёгкий нажим", "мягкий", "уверенный", "сильнее"][n]}</text></g>)}</PencilSketch>;
  }

  if (/сделай три линии одним движением|не отрывая руку/.test(text)) {
    return <PencilSketch>{[0, 1, 2].map((n) => <path key={n} d={`M28 ${35 + n * 34} C58 ${12 + n * 34}, 75 ${65 + n * 34}, 105 ${35 + n * 34} S158 ${12 + n * 34}, 211 ${35 + n * 34}`} fill="none" stroke={pencil} strokeWidth="1.5" strokeLinecap="round" />)}</PencilSketch>;
  }

  if (/нарисуй форму этого промежутка|пустой участок|пространств.*вокруг/.test(text)) {
    return <PencilSketch><path d="M78 27 C60 31 57 47 62 62 L59 103 Q83 119 105 103 L101 62 C107 46 100 31 83 27 Z" fill="#e3ded2" fillOpacity=".45" stroke={graphite} strokeWidth="1.6" /><path d="M27 22 L50 22 L50 124 L27 124 Z M119 22 L145 22 L145 124 L119 124 Z" fill="#d7d8c8" fillOpacity=".75" stroke={sage} strokeDasharray="3 2" /><path d="M52 72 L60 72 M52 72 L56 68 M52 72 L56 76 M117 72 L109 72 M117 72 L113 68 M117 72 L113 76" stroke={accent} fill="none" strokeWidth="1.4" /></PencilSketch>;
  }

  if (/свет|тень|полутон|освещён|освещен/.test(text)) {
    return <PencilSketch><circle cx="113" cy="73" r="39" fill="#eee9df" stroke={graphite} strokeWidth="1.3" /><path d="M113 34 A39 39 0 0 1 113 112 Z" fill="#77766d" opacity=".9" /><path d="M113 34 A39 39 0 0 1 113 112" fill="none" stroke={graphite} strokeWidth="1.1" /><circle cx="97" cy="56" r="5" fill="#fffdf7" /><ellipse cx="116" cy="117" rx="45" ry="5" fill="#a9a396" opacity=".5" /><path d="M36 26 L55 36 L47 38 M55 36 L51 28" fill="none" stroke={accent} strokeWidth="1.5" /></PencilSketch>;
  }

  if (/круг|овал|прямоугольник|цилиндр|геометрическ|простых форм|крупными формами/.test(text)) {
    return <PencilSketch><circle cx="57" cy="62" r="24" fill="none" stroke={pencil} strokeWidth="1.4" /><ellipse cx="119" cy="61" rx="19" ry="29" fill="none" stroke={pencil} strokeWidth="1.4" /><rect x="157" y="36" width="44" height="53" fill="none" stroke={pencil} strokeWidth="1.4" /><path d="M32 111 L82 111 M91 111 L147 111 M151 111 L207 111" stroke={lightPencil} strokeWidth="1" /></PencilSketch>;
  }

  if (/наброс|крупн.*лини|без деталей|силуэт/.test(text)) {
    return <PencilSketch><path d="M76 30 Q57 41 63 62 L60 100 Q81 113 103 99 L99 61 Q105 43 87 30 Z" fill="none" stroke={pencil} strokeWidth="1.5" strokeLinecap="round" /><path d="M50 24 L111 24 M49 21 L49 27 M111 21 L111 27 M119 31 L203 31 M119 28 L119 34 M203 28 L203 34" stroke={lightPencil} strokeWidth="1" /><path d="M31 120 L208 120" stroke={lightPencil} strokeWidth="1" /></PencilSketch>;
  }

  if (/сравни|проверь|найди отличие|с натурой/.test(text)) {
    return <PencilSketch><rect x="24" y="21" width="86" height="105" fill="none" stroke="#d8d0c2" /><rect x="130" y="21" width="86" height="105" fill="none" stroke="#d8d0c2" /><path d="M52 89 Q43 67 58 50 Q74 35 83 55 L88 91 Z" fill="none" stroke={pencil} strokeWidth="1.5" /><path d="M155 89 Q148 62 165 43 Q183 31 194 56 L196 91 Z" fill="none" stroke={graphite} strokeWidth="1.7" /><path d="M112 71 L126 71 M121 66 L126 71 L121 76" fill="none" stroke={accent} strokeWidth="1.5" /></PencilSketch>;
  }

  if (/запиши|подпиши|сформулируй|сохрани|зафиксируй|отметь/.test(text)) {
    return <PencilSketch><rect x="47" y="17" width="146" height="116" fill="#fffefa" stroke="#c9c1b2" /><path d="M61 37 L177 37 M61 52 L179 52 M61 67 L168 67 M61 82 L177 82 M61 97 L158 97 M61 112 L175 112" stroke={lightPencil} strokeWidth="1.1" /><path d="M57 35 L60 38 L66 30" stroke={sage} fill="none" strokeWidth="1.6" /></PencilSketch>;
  }

  if (/поставь предмет|положи рядом|разложи рядом|выбери инструмент|организуй свет/.test(text)) {
    return <PencilSketch><path d="M25 116 L215 116" stroke={graphite} strokeWidth="1.2" /><path d="M49 52 L68 52 L68 115 L49 115 Z M45 52 L72 52 L72 46 L45 46 Z" fill="#e5dfd2" stroke={pencil} strokeWidth="1.2" /><path d="M141 29 L146 29 L174 91 L169 93 Z" fill="#d7c7a9" stroke={graphite} strokeWidth="1.1" /><path d="M144 30 L148 18 L153 28 Z" fill="#b6aa94" stroke={graphite} strokeWidth="1" /><path d="M188 27 L188 116 M178 116 L198 116" stroke={sage} strokeWidth="1.5" /><path d="M184 45 L163 61 L171 62 M163 61 L168 53" fill="none" stroke={accent} strokeWidth="1.5" /></PencilSketch>;
  }

  if (/портрет|лицо|черты лица/.test(text)) {
    return <PencilSketch><path d="M88 24 C65 24 63 47 67 68 C69 88 82 105 99 105 C116 103 127 82 126 59 C125 37 111 22 88 24 Z" fill="none" stroke={pencil} strokeWidth="1.5" /><path d="M67 53 Q69 20 96 21 Q126 20 128 52 L119 39 Q94 30 73 44 Z" fill="none" stroke={graphite} strokeWidth="1.5" /><path d="M77 59 Q84 55 90 59 M103 59 Q110 55 116 59 M97 59 L93 76 L100 77 M87 89 Q98 95 109 88" fill="none" stroke={pencil} strokeWidth="1.3" /></PencilSketch>;
  }

  if (/пейзаж|небо|дерев|гор[аы]|обла/.test(text)) {
    return <PencilSketch><circle cx="190" cy="32" r="9" fill="none" stroke={lightPencil} /><path d="M19 88 L58 44 L83 75 L119 39 L169 88 L209 57 L221 76 L221 126 L19 126 Z" fill="#e5e0d5" fillOpacity=".6" stroke={pencil} strokeWidth="1.2" /><path d="M19 103 Q62 83 104 105 T221 99 M44 125 L44 93 M39 99 L44 86 L49 99 M188 126 L188 91 M178 104 L188 90 L198 104" fill="none" stroke={sage} strokeWidth="1.2" /></PencilSketch>;
  }

  if (/натюрморт|чаш|бутыл|яблок|предмет/.test(text)) {
    return <PencilSketch><path d="M29 119 L212 119" stroke={lightPencil} strokeWidth="1.1" /><path d="M45 55 L88 55 L84 104 Q66 117 49 104 Z M42 55 Q66 43 91 55 Q67 66 42 55 Z" fill="none" stroke={pencil} strokeWidth="1.4" /><path d="M129 59 C111 52 107 70 117 81 C126 91 140 87 145 75 C149 65 140 55 129 59 Z M130 58 Q128 48 137 44" fill="none" stroke={pencil} strokeWidth="1.4" /><ellipse cx="130" cy="108" rx="32" ry="5" fill="none" stroke={lightPencil} /></PencilSketch>;
  }

  return <PencilSketch><path d="M38 113 L38 46 Q39 34 50 34 L190 34 Q201 34 201 46 L201 113 Z" fill="none" stroke="#d9d2c6" strokeWidth="1" /><path d="M58 97 Q72 67 93 81 Q110 94 126 60 Q145 42 165 80 L183 98" fill="none" stroke={pencil} strokeWidth="1.6" strokeLinecap="round" /><path d="M57 105 L183 105" stroke={lightPencil} strokeWidth="1" /><circle cx="180" cy="49" r="7" fill="none" stroke={lightPencil} strokeWidth="1" /></PencilSketch>;
}

export default function StepIllustration({ title, instruction }: { title: string; instruction: string }) {
  return <DrawingContent title={title} instruction={instruction} />;
}
