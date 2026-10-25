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
    const stageIndex = /наблюдай|30 секунд/.test(stage) ? 0 : /прищур/.test(stage) ? 1 : /5–10|крупных линий/.test(stage) ? 2 : /сравни|запиши/.test(stage) ? 3 : 0;
    return <Sheet>
      <path d="M24 119h192" stroke={light} strokeWidth="1.1"/>
      {stageIndex === 1 && <g fill="none" stroke={blue} strokeDasharray="3 3" strokeWidth="1"><path d="M72 43v65M43 76h61"/><path d="M54 45 98 108M98 45 54 108"/></g>}
      <path d={stageIndex === 2 ? "M61 74 Q58 48 78 42 Q91 37 100 46 M100 46 Q119 33 137 46 Q157 53 154 76 Q151 101 125 111 Q100 117 77 105 Q61 95 61 74" : "M61 75 C59 55 72 42 91 43 C96 36 105 36 111 44 C132 38 151 51 154 72 C159 93 139 109 116 112 C91 117 68 103 61 75Z"} fill="#d77f75" fillOpacity={stageIndex === 2 ? ".12" : ".42"} stroke={ink} strokeWidth={stageIndex === 2 ? "1.3" : "1.7"} strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M101 44 Q105 34 113 27 Q116 24 119 27" fill="none" stroke={ink} strokeWidth="2" strokeLinecap="round"/>
      <path d="M113 31 Q132 22 139 35 Q127 43 113 31Z" fill={sage} fillOpacity=".75" stroke={sage} strokeWidth="1"/>
      {stageIndex === 1 && <path d="M72 60q-8 15 2 30M137 57q9 14 2 28" fill="none" stroke={terracotta} strokeWidth="1.2" strokeDasharray="2 3"/>}
      {stageIndex === 2 && <g stroke={pencil} strokeWidth="1.3" strokeLinecap="round"><path d="M67 67l7 5m-9 7 8 4m-1 9 8 3M131 53l7 4m-2 10 8 2m-13 22 7 3M86 104l5 2"/></g>}
      {stageIndex === 3 && <g fill="none" stroke={terracotta} strokeWidth="1.2"><path d="M39 43h18m-5-5 5 5-5 5M176 43h22m-6-5 6 5-6 5"/><path d="M45 124h151" strokeDasharray="3 3"/></g>}
      <ellipse cx="111" cy="119" rx="39" ry="4" fill={light} opacity=".35"/>
    </Sheet>;
  }

  if (/простая рабочая среда/.test(text)) {
    const stageIndex = /организуй свет/.test(stage) ? 1 : /убери со стола/.test(stage) ? 2 : /пробные линии/.test(stage) ? 3 : /сохрани|подпиши/.test(stage) ? 4 : 0;
    return <Sheet>
      <path d="M24 119h192" stroke={light} strokeWidth="1.2"/>
      {stageIndex === 0 && <g>
        <rect x="41" y="33" width="106" height="76" rx="3" fill="#f5f0e5" stroke={light}/>
        <path d="M52 44h83M52 51h58" stroke="#d7d0c2" strokeWidth="1"/>
        <path d="M61 91 115 42" stroke="#d6b98c" strokeWidth="12" strokeLinecap="round"/>
        <path d="M61 91 115 42" stroke={pencil} strokeWidth="1.2" strokeLinecap="round"/>
        <path d="m61 91-7 12 13-7" fill="#d6b98c" stroke={pencil} strokeWidth="1"/>
        <path d="m111 43 8-7 3 5-6 6" fill={ink} stroke={ink}/>
        <circle cx="174" cy="44" r="18" fill="#e7eef0" stroke={blue} strokeWidth="1.4"/>
        <path d="M163 44h22M174 33v22" stroke={blue} strokeWidth="1"/>
        <path d="M158 71h32m-32 6h23" stroke={sage} strokeWidth="2" strokeLinecap="round"/>
      </g>}
      {stageIndex === 1 && <g>
        <path d="M33 110h174" stroke="#b8a58c" strokeWidth="2"/>
        <path d="M76 109V76l-8-28 14-3 10 31v33" fill="#e9e2d5" stroke={pencil} strokeWidth="1.4" strokeLinejoin="round"/>
        <path d="M67 48q15-17 29 0l-6 12H73Z" fill="#d8c5a4" stroke={pencil} strokeWidth="1.3"/>
        <path d="M76 60 54 99M82 60l21 39M91 61l30 28" stroke="#d8b778" strokeWidth="2" strokeLinecap="round" opacity=".85"/>
        <rect x="117" y="84" width="72" height="26" rx="2" fill="#fffdf7" stroke={light}/>
        <path d="M126 91h52m-52 6h39" stroke="#d9d3c8" strokeWidth="1"/>
        <path d="M111 79 99 68m12 11 2-10" fill="none" stroke={terracotta} strokeWidth="1.5"/>
      </g>}
      {stageIndex === 2 && <g>
        <path d="M28 110h184" stroke="#b8a58c" strokeWidth="2"/>
        <rect x="47" y="72" width="51" height="37" rx="2" fill="#f0e8d8" stroke={light}/>
        <path d="M54 80h36m-36 6h29m-29 6h32" stroke="#b9b1a3" strokeWidth="1.2"/>
        <path d="M61 69v-9h23v9" fill="none" stroke={pencil} strokeWidth="1.3"/>
        <path d="M120 103 142 80l18 23Z" fill="#e2e9e9" stroke={blue} strokeWidth="1.3"/>
        <path d="M142 80v23" stroke={blue} strokeWidth="1"/>
        <rect x="165" y="82" width="29" height="27" rx="2" fill="#e6ecdf" stroke={sage}/>
        <path d="M171 89h17m-17 5h13" stroke={sage} strokeWidth="1"/>
        <path d="M39 43h162" stroke={light} strokeDasharray="3 4"/>
        <path d="m34 38 7 5-7 5m172-10-7 5 7 5" fill="none" stroke={terracotta} strokeWidth="1.4"/>
      </g>}
      {stageIndex === 3 && <g>
        <rect x="32" y="25" width="176" height="83" rx="2" fill="#fffefa" stroke="#e3dccf"/>
        <path d="M45 43q24-6 48 0" fill="none" stroke={pencil} strokeWidth=".7" strokeLinecap="round"/>
        <path d="M45 56q24-5 48 0" fill="none" stroke={pencil} strokeWidth="1.4" strokeLinecap="round"/>
        <path d="M45 69h48" fill="none" stroke={pencil} strokeWidth="2.4" strokeLinecap="round"/>
        <path d="M45 82h48" fill="none" stroke={pencil} strokeWidth="1" strokeDasharray="5 3" strokeLinecap="round"/>
        <path d="M112 41h73M112 54h56M112 67h78M112 80h65" stroke="#d6d0c4" strokeWidth=".8"/>
        <path d="m119 95 12-5 8 3 11-7 13 5 10-4" fill="none" stroke={terracotta} strokeWidth="1.2" opacity=".8"/>
      </g>}
      {stageIndex === 4 && <g>
        <rect x="62" y="19" width="116" height="95" rx="2" fill="#fffefa" stroke={light} strokeWidth="1.2"/>
        <path d="M75 33h87" stroke="#d7d0c2" strokeWidth="1"/>
        <path d="M80 67q7-20 20-8t21-2 20 8" fill="none" stroke={pencil} strokeWidth="1.5" strokeLinecap="round"/>
        <path d="M80 78q18-5 33 0t29-1" fill="none" stroke={blue} strokeWidth="1.2" strokeLinecap="round"/>
        <path d="M80 89h52" stroke="#d7d0c2" strokeWidth="1"/>
        <path d="M80 99q17 3 32-3" fill="none" stroke={terracotta} strokeWidth="1.3" strokeLinecap="round"/>
        <path d="m143 97 5 5 10-13" fill="none" stroke={sage} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M169 29v-7m-4 3h8" stroke={terracotta} strokeWidth="1.2"/>
      </g>}
    </Sheet>;
  }

  if (/первый лист визуального дневника/.test(text)) {
    const stageIndex = /раздели лист/.test(stage) ? 0 : /нарисуй небольшой предмет/.test(stage) ? 1 : /крупными формами/.test(stage) ? 2 : /запиши/.test(stage) ? 3 : 4;
    return <Sheet>
      <rect x="24" y="19" width="192" height="112" fill="#fffefa" stroke={light} strokeWidth="1"/>
      <path d="M88 19v112M152 19v112" stroke={light} strokeWidth="1" strokeDasharray={stageIndex === 0 ? "0" : "3 3"}/>
      <g fill={ink} fontSize="6.2" fontFamily="Arial, sans-serif" textAnchor="middle">
        <text x="56" y="29">НАБЛЮДАЮ</text><text x="120" y="29">ПРОБУЮ</text><text x="184" y="29">ЗАМЕЧАЮ</text>
      </g>
      {stageIndex === 1 && <g>
        <path d="M37 52q17-8 35 0l-3 39q-14 10-29 0z" fill="#e4dfd3" fillOpacity=".6" stroke={pencil} strokeWidth="1.2"/>
        <path d="M68 60q24-9 21 13q-1 12-20 9" fill="none" stroke={pencil} strokeWidth="1.2"/>
        <ellipse cx="54" cy="52" rx="17" ry="4" fill="#e4dfd3" stroke={pencil} strokeWidth="1"/>
      </g>}
      {stageIndex === 2 && <g fill="none" stroke={blue} strokeWidth="1.3"><path d="M100 56h33l-3 35q-13 7-27 0z"/><ellipse cx="116" cy="56" rx="16" ry="4"/><path d="M132 62q16-5 14 10q-1 8-14 7"/></g>}
      {stageIndex === 3 && <g stroke={sage} strokeWidth="1" strokeLinecap="round"><path d="M164 49h37m-37 10h32m-32 10h37m-37 10h24m-24 10h34"/></g>}
      {stageIndex === 4 && <g><path d="M36 52q17-8 35 0l-3 39q-14 10-29 0z" fill="#e4dfd3" fillOpacity=".35" stroke={pencil} strokeWidth="1"/><path d="M68 60q24-9 21 13q-1 12-20 9" fill="none" stroke={pencil}/><path d="M101 56h31l-3 34q-12 8-25 0z" fill="none" stroke={blue} strokeWidth="1.3"/><ellipse cx="116" cy="56" rx="15" ry="4" fill="none" stroke={blue} strokeWidth="1.3"/><path d="M132 62q16-5 14 10q-1 8-14 7" fill="none" stroke={blue} strokeWidth="1.3"/><path d="M163 49h38m-38 10h31m-31 10h35" stroke={sage} strokeWidth="1"/></g>}
      {stageIndex === 0 && <g fill="none" stroke={light} strokeWidth=".7"><path d="M30 40h51M94 40h51M158 40h51"/><path d="M30 120h51M94 120h51M158 120h51"/></g>}
    </Sheet>;
  }

  if (/сложный предмет из простых форм/.test(text)) {
    const stageIndex = /выбери предмет/.test(stage) ? 0 : /упрости/.test(stage) ? 1 : /наметь эти формы/.test(stage) ? 2 : /взаимный размер/.test(stage) ? 3 : 4;
    return <Sheet>
      <path d="M24 121h192" stroke={light} strokeWidth="1"/>
      {stageIndex < 2 && <g fill="none" stroke={stageIndex === 1 ? blue : pencil} strokeWidth="1.3" strokeDasharray={stageIndex === 1 ? "3 2" : "0"}>
        <ellipse cx="118" cy="116" rx="35" ry="7"/><path d="M89 111 96 101 101 94 106 70 137 70 143 94 149 111"/>
        <path d="M106 70 90 53 98 49 119 65M137 70l24-20 7 7-26 21"/>
        <path d="M100 48 111 24 139 24 151 48Z"/>
      </g>}
      {stageIndex === 0 && <g fill="none" stroke={ink} strokeWidth="1.5"><path d="M100 48 111 24 139 24 151 48Z"/><path d="M106 49 98 72 112 82 130 70 145 83 158 67 151 49"/><ellipse cx="118" cy="116" rx="35" ry="7"/></g>}
      {stageIndex === 1 && <g fill="none" stroke={blue} strokeWidth="1.3"><path d="M100 48 111 24 139 24 151 48Z"/><path d="M106 49 98 72 112 82 130 70 145 83 158 67 151 49"/><ellipse cx="118" cy="116" rx="35" ry="7"/></g>}
      {stageIndex === 2 && <g fill="none" stroke={pencil} strokeWidth="1.2"><path d="M100 48 111 24 139 24 151 48Z"/><path d="M106 49 98 72 112 82 130 70 145 83 158 67 151 49"/><ellipse cx="118" cy="116" rx="35" ry="7"/><path d="M90 53 98 49 119 65M137 70l24-20 7 7-26 21" strokeDasharray="3 2"/></g>}
      {stageIndex >= 3 && <g fill="none" stroke={ink} strokeWidth="1.4"><path d="M100 48 111 24 139 24 151 48Z"/><path d="M106 49 98 72 112 82 130 70 145 83 158 67 151 49"/><ellipse cx="118" cy="116" rx="35" ry="7"/><path d="M90 53 98 49 119 65M137 70l24-20 7 7-26 21"/></g>}
      {stageIndex === 4 && <g fill="none" stroke={terracotta} strokeWidth="1.3"><path d="M111 24 139 24 151 48 100 48Z"/><path d="M112 82 130 70 145 83 158 67" strokeDasharray="3 2"/><path d="M164 96h26m-5-5 5 5-5 5"/></g>}
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
