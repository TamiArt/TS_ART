import type { ReactNode } from "react";
import { getRequestedLineCount } from "./lessonLineCount";

const ink = "#45443e";
const pencil = "#77746a";
const light = "#b7b1a5";
const paper = "#fffdf7";
const terracotta = "#b47a5b";
const sage = "#81896e";
const blue = "#86aaca";

type Props = { title: string; instruction: string };

function Sheet({ children }: { children: ReactNode }) {
  return <svg className="lesson-visual-svg" viewBox="0 0 240 150" role="img" aria-label="Учебный карандашный рисунок">
    <rect x="9" y="7" width="222" height="136" rx="2" fill={paper} stroke="#e2dccf" />
    <path d="M15 14h6m-6 0v6m210-6h-6m6 0v6M15 136h6m-6 0v-6m210 6h-6m6 0v-6" fill="none" stroke="#d8d0c2" strokeWidth=".8" />
    {children}
  </svg>;
}

function StageMarks({ instruction }: Props) {
  const s = instruction.toLowerCase();
  if (/сравни|проверь|отличи|натур|результат/.test(s)) {
    return <g stroke={terracotta} fill="none" strokeWidth="1.3"><path d="M111 72h18m-5-5 5 5-5 5" /><path d="M29 126h78M133 126h78" stroke={light} strokeDasharray="3 3" /></g>;
  }
  if (/измер|пропорц|размер|ширин|высот|масштаб/.test(s)) {
    return <g stroke={terracotta} fill="none" strokeWidth="1.2"><path d="M27 23h180M27 19v8M207 19v8M216 32v86M212 32h8M212 118h8" /></g>;
  }
  if (/запиши|подпиши|сформулируй|отметь|сохрани/.test(s)) {
    return <g stroke={sage} fill="none" strokeWidth="1.6"><path d="m177 27 5 5 10-12" /></g>;
  }
  return null;
}

function TopicDrawing({ title, instruction }: Props) {
  const text = (title + " " + instruction).toLocaleLowerCase("ru");
  const stage = instruction.toLocaleLowerCase("ru");
  const details = /детал|уточни|добавь|характерн/.test(stage);
  const compare = /сравни|проверь|отличи|натур/.test(stage);
  const lineCount = getRequestedLineCount(instruction);

  // Lesson-specific reference drawings keep each exercise grounded in the requested real object.
  if (/учимся смотреть/.test(text)) {
    const stage = /наблюдай|30 секунд/.test(stage) ? 0 : /прищур/.test(stage) ? 1 : /5–10|крупных линий/.test(stage) ? 2 : /сравни|запиши/.test(stage) ? 3 : 0;
    return <Sheet>
      <path d="M24 119h192" stroke={light} strokeWidth="1.1"/>
      {stage === 1 && <g fill="none" stroke={blue} strokeDasharray="3 3" strokeWidth="1"><path d="M72 43v65M43 76h61"/><path d="M54 45 98 108M98 45 54 108"/></g>}
      <path d={stage === 2 ? "M61 74 Q58 48 78 42 Q91 37 100 46 M100 46 Q119 33 137 46 Q157 53 154 76 Q151 101 125 111 Q100 117 77 105 Q61 95 61 74" : "M61 75 C59 55 72 42 91 43 C96 36 105 36 111 44 C132 38 151 51 154 72 C159 93 139 109 116 112 C91 117 68 103 61 75Z"} fill="#d77f75" fillOpacity={stage === 2 ? ".12" : ".42"} stroke={ink} strokeWidth={stage === 2 ? "1.3" : "1.7"} strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M101 44 Q105 34 113 27 Q116 24 119 27" fill="none" stroke={ink} strokeWidth="2" strokeLinecap="round"/>
      <path d="M113 31 Q132 22 139 35 Q127 43 113 31Z" fill={sage} fillOpacity=".75" stroke={sage} strokeWidth="1"/>
      {stage === 1 && <path d="M72 60q-8 15 2 30M137 57q9 14 2 28" fill="none" stroke={terracotta} strokeWidth="1.2" strokeDasharray="2 3"/>}
      {stage === 2 && <g stroke={pencil} strokeWidth="1.3" strokeLinecap="round"><path d="M67 67l7 5m-9 7 8 4m-1 9 8 3M131 53l7 4m-2 10 8 2m-13 22 7 3M86 104l5 2"/></g>}
      {stage === 3 && <g fill="none" stroke={terracotta} strokeWidth="1.2"><path d="M39 43h18m-5-5 5 5-5 5M176 43h22m-6-5 6 5-6 5"/><path d="M45 124h151" strokeDasharray="3 3"/></g>}
      <ellipse cx="111" cy="119" rx="39" ry="4" fill={light} opacity=".35"/>
    </Sheet>;
  }

  if (/простая рабочая среда/.test(text)) {
    const stage = /организуй свет/.test(stage) ? 1 : /убери со стола/.test(stage) ? 2 : /пробные линии/.test(stage) ? 3 : /сохрани|подпиши/.test(stage) ? 4 : 0;
    return <Sheet>
      <path d="M25 119h190" stroke={light} strokeWidth="1.1"/>
      <path d="M42 105 181 35" stroke="#d6b98c" strokeWidth="10" strokeLinecap="round"/>
      <path d="M42 105 181 35" stroke={pencil} strokeWidth="1.2" strokeLinecap="round"/>
      <path d="M42 105l-9 12 15-6" fill="#d6b98c" stroke={pencil} strokeWidth="1"/>
      <path d="M177 33l10-5 1 6-7 4" fill={ink} stroke={ink} strokeWidth="1"/>
      {stage === 1 && <g fill="none" stroke={terracotta} strokeWidth="1.2"><path d="M190 19 169 30m14-12 7 1-2 7"/><path d="M158 44 139 54" strokeDasharray="3 3"/></g>}
      {stage === 2 && <g fill="none" stroke={sage} strokeWidth="1.4"><path d="M36 38h37v18H36zM174 91h28v18h-28z"/><path d="M36 38l37 18m-37 0 37-18" strokeDasharray="2 3"/></g>}
      {stage === 3 && <g fill="none" stroke={pencil} strokeLinecap="round"><path d="M29 37q25-4 48 0" strokeWidth=".6"/><path d="M29 53q25-4 48 0" strokeWidth="1.3"/><path d="M29 69h49" strokeWidth="2"/><path d="M29 85h49" strokeWidth=".9" strokeDasharray="6 3"/></g>}
      {stage === 4 && <g><rect x="140" y="76" width="65" height="39" rx="2" fill="none" stroke={sage} strokeWidth="1.2"/><path d="M148 88h47m-47 7h35m-35 7h40" stroke={light} strokeWidth="1.2"/><path d="m184 25 5 5 9-11" fill="none" stroke={sage} strokeWidth="1.8"/></g>}
    </Sheet>;
  }

  if (/первый лист визуального дневника/.test(text)) {
    const stage = /раздели лист/.test(stage) ? 0 : /нарисуй небольшой предмет/.test(stage) ? 1 : /крупными формами/.test(stage) ? 2 : /запиши/.test(stage) ? 3 : 4;
    return <Sheet>
      <rect x="24" y="19" width="192" height="112" fill="#fffefa" stroke={light} strokeWidth="1"/>
      <path d="M88 19v112M152 19v112" stroke={light} strokeWidth="1" strokeDasharray={stage === 0 ? "0" : "3 3"}/>
      <g fill={ink} fontSize="6.2" fontFamily="Arial, sans-serif" textAnchor="middle">
        <text x="56" y="29">НАБЛЮДАЮ</text><text x="120" y="29">ПРОБУЮ</text><text x="184" y="29">ЗАМЕЧАЮ</text>
      </g>
      {stage === 1 && <g>
        <path d="M37 52q17-8 35 0l-3 39q-14 10-29 0z" fill="#e4dfd3" fillOpacity=".6" stroke={pencil} strokeWidth="1.2"/>
        <path d="M68 60q24-9 21 13q-1 12-20 9" fill="none" stroke={pencil} strokeWidth="1.2"/>
        <ellipse cx="54" cy="52" rx="17" ry="4" fill="#e4dfd3" stroke={pencil} strokeWidth="1"/>
      </g>}
      {stage === 2 && <g fill="none" stroke={blue} strokeWidth="1.3"><path d="M100 56h33l-3 35q-13 7-27 0z"/><ellipse cx="116" cy="56" rx="16" ry="4"/><path d="M132 62q16-5 14 10q-1 8-14 7"/></g>}
      {stage === 3 && <g stroke={sage} strokeWidth="1" strokeLinecap="round"><path d="M164 49h37m-37 10h32m-32 10h37m-37 10h24m-24 10h34"/></g>}
      {stage === 4 && <g><path d="M36 52q17-8 35 0l-3 39q-14 10-29 0z" fill="#e4dfd3" fillOpacity=".35" stroke={pencil} strokeWidth="1"/><path d="M68 60q24-9 21 13q-1 12-20 9" fill="none" stroke={pencil}/><path d="M101 56h31l-3 34q-12 8-25 0z" fill="none" stroke={blue} strokeWidth="1.3"/><ellipse cx="116" cy="56" rx="15" ry="4" fill="none" stroke={blue} strokeWidth="1.3"/><path d="M132 62q16-5 14 10q-1 8-14 7" fill="none" stroke={blue} strokeWidth="1.3"/><path d="M163 49h38m-38 10h31m-31 10h35" stroke={sage} strokeWidth="1"/></g>}
      {stage === 0 && <g fill="none" stroke={light} strokeWidth=".7"><path d="M30 40h51M94 40h51M158 40h51"/><path d="M30 120h51M94 120h51M158 120h51"/></g>}
    </Sheet>;
  }

  if (/сложный предмет из простых форм/.test(text)) {
    const stage = /выбери предмет/.test(stage) ? 0 : /упрости/.test(stage) ? 1 : /наметь эти формы/.test(stage) ? 2 : /взаимный размер/.test(stage) ? 3 : 4;
    return <Sheet>
      <path d="M24 121h192" stroke={light} strokeWidth="1"/>
      {stage < 2 && <g fill="none" stroke={stage === 1 ? blue : pencil} strokeWidth="1.3" strokeDasharray={stage === 1 ? "3 2" : "0"}>
        <ellipse cx="118" cy="116" rx="35" ry="7"/><path d="M89 111 96 101 101 94 106 70 137 70 143 94 149 111"/>
        <path d="M106 70 90 53 98 49 119 65M137 70l24-20 7 7-26 21"/>
        <path d="M100 48 111 24 139 24 151 48Z"/>
      </g>}
      {stage === 0 && <g fill="none" stroke={ink} strokeWidth="1.5"><path d="M100 48 111 24 139 24 151 48Z"/><path d="M106 49 98 72 112 82 130 70 145 83 158 67 151 49"/><ellipse cx="118" cy="116" rx="35" ry="7"/></g>}
      {stage === 1 && <g fill="none" stroke={blue} strokeWidth="1.3"><path d="M100 48 111 24 139 24 151 48Z"/><path d="M106 49 98 72 112 82 130 70 145 83 158 67 151 49"/><ellipse cx="118" cy="116" rx="35" ry="7"/></g>}
      {stage === 2 && <g fill="none" stroke={pencil} strokeWidth="1.2"><path d="M100 48 111 24 139 24 151 48Z"/><path d="M106 49 98 72 112 82 130 70 145 83 158 67 151 49"/><ellipse cx="118" cy="116" rx="35" ry="7"/><path d="M90 53 98 49 119 65M137 70l24-20 7 7-26 21" strokeDasharray="3 2"/></g>}
      {stage >= 3 && <g fill="none" stroke={ink} strokeWidth="1.4"><path d="M100 48 111 24 139 24 151 48Z"/><path d="M106 49 98 72 112 82 130 70 145 83 158 67 151 49"/><ellipse cx="118" cy="116" rx="35" ry="7"/><path d="M90 53 98 49 119 65M137 70l24-20 7 7-26 21"/></g>}
      {stage === 4 && <g fill="none" stroke={terracotta} strokeWidth="1.3"><path d="M111 24 139 24 151 48 100 48Z"/><path d="M112 82 130 70 145 83 158 67" strokeDasharray="3 2"/><path d="M164 96h26m-5-5 5 5-5 5"/></g>}
    </Sheet>;
  }

  if (lineCount !== null) {
    return <Sheet>
      {Array.from({ length: lineCount }, (_, index) => {
        const y = 23 + index * (108 / Math.max(1, lineCount - 1));
        const weight = 0.7 + (index / Math.max(1, lineCount - 1)) * 0.9;
        return <g key={index}>
          <path d={`M28 ${y} Q118 ${y - (index % 2 ? 1.5 : -1.5)} 212 ${y}`} fill="none" stroke={light} strokeWidth="2.2" opacity=".25" />
          <path d={`M28 ${y} Q118 ${y - (index % 2 ? 1.5 : -1.5)} 212 ${y}`} fill="none" stroke={index === lineCount - 1 ? ink : pencil} strokeWidth={weight} strokeLinecap="round" />
        </g>;
      })}
    </Sheet>;
  }

  if (/негативн|пространств вокруг|пуст(?:ой|ые|ого|ых|ым) промежут/.test(text)) {
    return <Sheet>
      <path d="M48 28h22v94H48zM169 28h22v94h-22z" fill="#d7d8c8" fillOpacity=".65" stroke={sage} strokeDasharray="3 3" />
      <path d="M91 27c-19 7-23 23-18 41l-4 39q22 15 43 0l-4-39c6-18 0-34-17-41z" fill="#e3ded2" fillOpacity=".5" stroke={ink} strokeWidth="1.5" />
      <path d="M76 70h-12m0 0 4-4m-4 4 4 4M124 70h12m0 0-4-4m4 4-4 4" stroke={terracotta} fill="none" strokeWidth="1.3" />
      {details && <path d="M83 37q10-7 19 0M79 100q12 5 25 0" stroke={pencil} fill="none" />}
      <StageMarks title={title} instruction={instruction} />
    </Sheet>;
  }

  if (/линия|контур|нажим|штрих/.test(text)) {
    return <Sheet>
      {[0,1,2,3].map((n) => <g key={n}><path d={`M29 ${29+n*29} Q86 ${24+n*29} 122 ${29+n*29} T211 ${29+n*29}`} fill="none" stroke={n > 1 ? ink : pencil} strokeWidth={.65+n*.42} strokeLinecap="round" opacity={.45+n*.15}/><path d={`M31 ${31+n*29} Q88 ${26+n*29} 124 ${31+n*29} T209 ${31+n*29}`} fill="none" stroke={light} strokeWidth="2" opacity=".22"/></g>)}
      <path d="M28 20h183" stroke={light} strokeDasharray="2 4" />
      <StageMarks title={title} instruction={instruction} />
    </Sheet>;
  }

  if (/портрет|лицо|черты лица|голов|анатомия/.test(text)) {
    return <Sheet>
      <path d="M91 25c-23 0-31 18-27 43 3 23 16 39 31 39s29-17 31-41c3-24-9-41-35-41z" fill="#e8dfd2" fillOpacity=".45" stroke={pencil} strokeWidth="1.5" />
      <path d="M63 54c-1-28 15-36 31-36 20 0 33 14 33 37l-12-16q-26-10-45 7z" fill="none" stroke={ink} strokeWidth="1.5" />
      <path d="M64 60h61M94 37v68M80 67q7-5 13 0m12 0q7-5 13 0M93 69l-4 17 9 2m-17 9q12 8 24 0" stroke={blue} strokeWidth="1" strokeDasharray="3 3" fill="none" />
      {details && <path d="M72 49q-4 7-2 13m45-13q5 7 3 13M86 101q8 4 16 0" stroke={terracotta} fill="none" />}
      <StageMarks title={title} instruction={instruction} />
    </Sheet>;
  }

  if (/пейзаж|небо|дерев|гора|обла/.test(text)) {
    return <Sheet>
      <circle cx="191" cy="31" r="10" fill="#ead9b8" stroke={terracotta} strokeWidth=".8" />
      <path d="M20 91 58 47 83 76 121 36 169 89 204 57 220 78v47H20z" fill="#d9d8cd" fillOpacity=".75" stroke={pencil} strokeWidth="1.3" />
      <path d="M20 105q40-22 78-1t78-1 44 1M20 119q46-9 87 0t91 0" fill="none" stroke={sage} strokeWidth="1.4" />
      {details && <path d="M58 47 67 62 76 55M121 36l-2 19 14-8M181 125V96m-8 12 8-13 8 13" stroke={pencil} fill="none" strokeWidth="1.1" />}
      <StageMarks title={title} instruction={instruction} />
    </Sheet>;
  }

  if (/цвет|колорит|палитр|пигмент|оттен|температур|насыщ/.test(text)) {
    return <Sheet>
      {["#d9b1a7","#d7c7a9","#a9bac2","#aeb99e"].map((c,i)=><g key={c}><rect x={25+i*49} y="29" width="40" height="39" rx="3" fill={c} fillOpacity=".85" stroke={pencil} strokeWidth=".8"/><path d={`M${30+i*49} 74h30`} stroke={light}/></g>)}
      <path d="M29 94h181" stroke={light} strokeWidth="1.1"/>
      {["#f0e8d9","#c6c0b4","#77746a","#45443e"].map((c,i)=><rect key={c} x={30+i*45} y="105" width="38" height="14" rx="2" fill={c} stroke="#d8d0c2" strokeWidth=".5"/>)}
      <StageMarks title={title} instruction={instruction} />
    </Sheet>;
  }

  if (/перспектив|горизонт|точк.*сход|уровень глаз/.test(text)) {
    return <Sheet>
      <path d="M20 71h200" stroke={terracotta} strokeWidth="1.1" strokeDasharray="4 3"/><circle cx="120" cy="71" r="3" fill={terracotta}/>
      <path d="M32 30 120 71 32 121M208 30 120 71 208 121M32 30h176M32 121h176" stroke={pencil} fill="none" strokeWidth="1.3"/>
      <path d="M63 45v61m114-61v61M63 45l57 26 57-26" stroke={blue} strokeWidth="1" strokeDasharray="3 3" fill="none"/>
      {details && <path d="M78 52v39m84-39v39" stroke={ink} strokeWidth="1.3"/>}
      <StageMarks title={title} instruction={instruction} />
    </Sheet>;
  }

  if (/композиц|миниатюр|фокус|акцент|баланс|кадр|располож/.test(text)) {
    return <Sheet>
      <rect x="34" y="18" width="172" height="116" fill="none" stroke={light}/>
      <path d="M91 18v116m58-116v116M34 56.7h172M34 95.3h172" stroke={light} strokeDasharray="3 3" strokeWidth=".8"/>
      <circle cx={compare ? 91 : 149} cy={compare ? 95 : 57} r="18" fill="#e6ded0" stroke={pencil} strokeWidth="1.3"/>
      <path d="M48 115q12-24 25-8t20-1" stroke={sage} fill="none" strokeWidth="1.6"/>
      <path d="M149 57l22-18m-7 0h7v7" stroke={terracotta} fill="none" strokeWidth="1.3"/>
      <StageMarks title={title} instruction={instruction} />
    </Sheet>;
  }

  if (/свет|тень|полутон|тональн|светлот|контраст|объём|объем/.test(text)) {
    return <Sheet>
      <circle cx="107" cy="67" r="36" fill="#eee9df" stroke={ink} strokeWidth="1.3"/>
      <path d="M107 31a36 36 0 0 1 0 72z" fill="#77766d" opacity=".9"/>
      <path d="M107 31a36 36 0 0 1 0 72" stroke={ink} fill="none" strokeWidth="1.1"/>
      <ellipse cx="112" cy="111" rx="44" ry="5" fill="#a9a396" opacity=".5"/>
      <circle cx="92" cy="49" r="5" fill={paper}/>
      <path d="M32 28 52 38m-8-1 8 1-3-8" stroke={terracotta} fill="none" strokeWidth="1.4"/>
      {details && <path d="M107 31a36 36 0 0 0 0 72" stroke={blue} strokeWidth="2" fill="none" strokeDasharray="3 3"/>}
      <StageMarks title={title} instruction={instruction} />
    </Sheet>;
  }

  if (/пропорц|измер|масштаб|отношени размеров/.test(text)) {
    return <Sheet>
      <path d="M68 30q-18 8-14 32l-3 42q18 12 37 0l-3-42q5-24-17-32z" fill="#e5dfd2" fillOpacity=".45" stroke={pencil} strokeWidth="1.5"/>
      <path d="M43 27v83m-4-83h8m-8 83h8M102 29v80m-4-80h8m-8 80h8M49 119h48" stroke={terracotta} strokeWidth="1" fill="none"/>
      <path d="M130 40h68M130 67h51M130 94h60" stroke={light} strokeWidth="1.5"/>
      <StageMarks title={title} instruction={instruction} />
    </Sheet>;
  }

  if (/натюрморт|чаш|бутыл|яблок|предмет/.test(text)) {
    return <Sheet>
      <path d="M25 119h190" stroke={light} strokeWidth="1.1"/>
      <path d="M44 52h42l-4 54q-17 13-34 0zM40 52q25-13 50 0q-25 11-50 0z" fill="#d8d4c8" fillOpacity=".45" stroke={pencil} strokeWidth="1.4"/>
      <path d="M137 55q-20-5-22 15t21 25q20-8 18-26-2-14-17-14z" fill="#d9b1a7" fillOpacity=".55" stroke={pencil} strokeWidth="1.4"/><path d="M136 55q-1-9 7-13" stroke={sage} fill="none" strokeWidth="1.4"/>
      <ellipse cx="137" cy="111" rx="36" ry="4" fill="none" stroke={light}/>
      {details && <path d="M47 61h32m-27 9h22M126 66q9 3 16-1" stroke={light} fill="none"/>}
      <StageMarks title={title} instruction={instruction} />
    </Sheet>;
  }

  if (/кист|краск|масл|акварел|живопис|мазок|холст|грунт/.test(text)) {
    return <Sheet>
      <rect x="34" y="22" width="172" height="105" rx="2" fill="#fffefa" stroke="#d8d0c2"/>
      <path d="M48 48q26-15 51 0t48 0 42 0M48 72q28-15 54 0t48 0 39 0M48 96q24-12 46 0t50 0 47 0" strokeWidth="9" strokeLinecap="round" fill="none" stroke={blue} opacity=".55"/>
      <path d="M48 48q26-15 51 0t48 0 42 0M48 72q28-15 54 0t48 0 39 0" strokeWidth="1" strokeLinecap="round" fill="none" stroke={pencil} opacity=".75"/>
      <StageMarks title={title} instruction={instruction} />
    </Sheet>;
  }

  if (/эллипс|круг в перспективе|цилиндрическ.*основан/.test(text)) {
    return <Sheet>
      <g fill="none" stroke={light} strokeWidth=".8" strokeDasharray="3 3">
        <rect x="24" y="22" width="83" height="49" />
        <path d="M65.5 17v60M18 46.5h95" />
        <path d="M139 26v72M119 62h80" />
      </g>
      <ellipse cx="65.5" cy="46.5" rx="39" ry="18" fill="#e5dfd2" fillOpacity=".25" stroke={pencil} strokeWidth="1.4" />
      <path d="M26.5 46.5Q65.5 10 104.5 46.5" fill="none" stroke={blue} strokeWidth="1.1" strokeDasharray="3 2" />
      <path d="M26.5 46.5Q65.5 83 104.5 46.5" fill="none" stroke={pencil} strokeWidth="1.1" />
      <ellipse cx="159" cy="42" rx="25" ry="10" fill="#e5dfd2" fillOpacity=".2" stroke={ink} strokeWidth="1.3" />
      <path d="M134 42v51M184 42v51" stroke={pencil} strokeWidth="1.2" />
      <path d="M134 93a25 10 0 0 0 50 0" fill="none" stroke={ink} strokeWidth="1.3" />
      <path d="M134 93a25 10 0 0 1 50 0" fill="none" stroke={light} strokeWidth="1.1" strokeDasharray="3 2" />
      <path d="M139 111h40m-40-3v6m40-6v6" stroke={terracotta} strokeWidth="1" />
      <StageMarks title={title} instruction={instruction} />
    </Sheet>;
  }

  if (/геометр|круг|овал|цилиндр|куб|шар|простых форм|форму/.test(text)) {
    return <Sheet>
      <circle cx="52" cy="58" r="22" fill="#e5dfd2" fillOpacity=".35" stroke={pencil} strokeWidth="1.4"/>
      <ellipse cx="117" cy="57" rx="18" ry="28" fill="#e5dfd2" fillOpacity=".25" stroke={pencil} strokeWidth="1.4"/>
      <path d="M157 37h43v48h-43zM157 37l13-10h43l-13 10M200 37l13-10v48l-13 10M157 85l13-10h43" fill="none" stroke={pencil} strokeWidth="1.3"/>
      <StageMarks title={title} instruction={instruction} />
    </Sheet>;
  }

  return <Sheet>
    <path d="M69 33q-18 9-13 32l-4 37q19 14 40 0l-4-37q5-24-19-32z" fill="#e5dfd2" fillOpacity=".35" stroke={pencil} strokeWidth="1.5"/>
    <path d="M49 27h44m-44-3v6m44-6v6M112 42h85m-85-3v6m85-6v6" stroke={light} strokeWidth="1"/>
    <path d="M31 120h177" stroke={light} strokeWidth="1"/>
    <StageMarks title={title} instruction={instruction} />
  </Sheet>;
}

export default function LessonStageDrawing(props: Props) {
  return <TopicDrawing {...props} />;
}
