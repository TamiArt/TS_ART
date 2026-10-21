import type { ReactNode } from "react";

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
