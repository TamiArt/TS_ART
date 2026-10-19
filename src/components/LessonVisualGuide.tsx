import type { Lesson } from "../data/types";
import "./lesson-visual-guide.css";
import { buildLessonVisualStages, classifyLesson, getVisualKindLabel, getVisualPrinciple } from "./lessonVisuals";

function VisualDrawing({ kind, stage, stepNumber }: { kind: ReturnType<typeof classifyLesson>; stage: number; stepNumber: number }) {
  const stroke = "#56564b";
  const muted = "#a8a18f";
  const accent = "#b77b5d";
  const sage = "#8b9273";
  const paper = "#f8f5ec";
  const line = (x1: number, y1: number, x2: number, y2: number) =>
    <line x1={x1} y1={y1} x2={x2} y2={y2} stroke={stroke} strokeWidth="1.7" strokeLinecap="round" />;
  const circle = (cx: number, cy: number, r: number, fill: string, opacity = 1) =>
    <circle cx={cx} cy={cy} r={r} fill={fill} opacity={opacity} stroke={stroke} strokeWidth="1.3" />;
  let art;
  switch (kind) {
    case "line":
      art = <>{[0,1,2,3,4].map((n) => <path key={n} d={`M 20 ${23+n*14} Q 66 ${18+n*14+(stage>1?8:0)} 118 ${23+n*14}`} fill="none" stroke={n < stage ? accent : muted} strokeWidth={n < stage ? 2.7 : 1.1} strokeLinecap="round" opacity={n < stage ? 1 : .65} />)}{stage > 1 && <path d="M132 24 Q148 48 132 72 T132 94" fill="none" stroke={sage} strokeWidth="2.4" strokeLinecap="round" />}</>;
      break;
    case "shape":
    case "still-life":
      art = <>{stage >= 1 && <ellipse cx="78" cy="106" rx="49" ry="8" fill="#d9d1c1" opacity=".65" />}{stage >= 1 && <><rect x="28" y="48" width="48" height="54" rx="2" fill={stage >= 3 ? "#c5ad8d" : "none"} stroke={stroke} strokeWidth="1.6" /><ellipse cx="104" cy="54" rx="21" ry="7" fill={stage >= 2 ? "#e6d7bf" : "none"} stroke={stroke} strokeWidth="1.6"/><path d="M83 54 L83 91 Q104 103 125 91 L125 54" fill={stage >= 3 ? "#d9bda0" : "none"} stroke={stroke} strokeWidth="1.6"/>{stage >= 2 && <path d="M104 43 C96 32 101 21 112 20 C121 20 125 31 118 38" fill="none" stroke={sage} strokeWidth="2" />}</>}{stage >= 3 && <path d="M31 59 L31 93 M86 61 L86 86" stroke="#fff7e5" strokeWidth="4" opacity=".8" />}</>;
      break;
    case "proportion":
      art = <>{line(25,24,25,108)}{line(19,24,31,24)}{line(19,108,31,108)}{line(39,24,39,78)}{line(33,24,45,24)}{line(33,78,45,78)}{stage >= 1 && <rect x="54" y="28" width={stage >= 2 ? 63 : 39} height={stage >= 2 ? 75 : 75} fill="none" stroke={accent} strokeWidth="1.6" strokeDasharray={stage >= 3 ? "0" : "4 3"} />}{stage >= 2 && <><path d="M54 28 L85 17 L117 28" fill="none" stroke={sage} strokeWidth="1.5" />{line(54,103,117,103)}</>}{stage >= 3 && <><ellipse cx="86" cy="54" rx="18" ry="26" fill="#e2d2b9" stroke={stroke} strokeWidth="1.4"/>{line(86,28,86,80)}</>}</>;
      break;
    case "tone":
      art = <>{[0,1,2,3,4].map((n) => <g key={n}><rect x={17+n*27} y="23" width="23" height="27" rx="1" fill={["#f2eee2","#d7d0c0","#aaa594","#77776b","#3f423d"][n]} stroke="#b9b1a1" strokeWidth=".5"/><text x={28.5+n*27} y="65" textAnchor="middle" fontSize="8" fill={stroke}>{n+1}</text></g>)}{stage >= 2 && <><path d="M35 103 A24 24 0 0 1 83 103 Z" fill="#e9e1d2" stroke={stroke} strokeWidth="1.3"/><path d="M59 79 A24 24 0 0 1 83 103 L59 103 Z" fill="#77776b"/><path d="M83 103 A24 24 0 0 1 35 103" fill="none" stroke={stroke} strokeWidth="1.3"/>{stage >= 3 && <ellipse cx="61" cy="108" rx="31" ry="5" fill="#bdb5a5" opacity=".7"/>}</>}</>;
      break;
    case "negative-space":
      art = <>{stage >= 1 && <><rect x="15" y="18" width="128" height="94" fill="#f4efe3" stroke="#c8c0b0" /><path d="M64 38 Q54 43 57 55 L57 88 Q79 100 101 88 L101 55 Q104 43 94 38 L88 28 L70 28 Z" fill="#c9b89d" stroke={stroke} strokeWidth="1.5" /></>}{stage >= 2 && <><path d="M18 22 L51 22 L51 108 L18 108 Z" fill="#c4d0c0" opacity=".75" /><path d="M107 22 L140 22 L140 108 L107 108 Z" fill="#c4d0c0" opacity=".75" /></>}{stage >= 3 && <><path d="M34 61 L52 61 M107 61 L125 61" stroke={accent} strokeWidth="1.8" strokeDasharray="3 2" /><path d="M34 61 L39 57 M34 61 L39 65 M125 61 L120 57 M125 61 L120 65" stroke={accent} strokeWidth="1.5" fill="none" /></>}</>;
      break;
    case "perspective":
      art = <>{line(14,53,144,53)}{circle(101,53,2.7,accent)}{stage >= 1 && <><path d="M38 62 L71 62 L71 94 L38 94 Z" fill="#e9dfcd" stroke={stroke} strokeWidth="1.4"/>{stage >= 2 && <><path d="M38 62 L78 43 L110 43 L71 62" fill="#f3ebdd" stroke={stroke} strokeWidth="1.4"/><path d="M71 62 L110 43 L110 76 L71 94" fill="#c9b59b" stroke={stroke} strokeWidth="1.4"/>{line(38,62,101,53)}{line(71,62,101,53)}{line(71,94,101,53)}{line(110,76,101,53)}</>}{stage >= 3 && <path d="M14 112 L144 112 M22 112 L101 53 M50 112 L101 53 M78 112 L101 53 M122 112 L101 53" stroke={sage} strokeWidth="1.1" fill="none" opacity=".8"/>}</>}</>;
      break;
    case "composition":
      art = <>{[0,1,2].map((n) => <g key={n}><rect x={13+n*48} y="24" width="39" height="78" fill={paper} stroke="#c8c0b0" strokeWidth="1"/>{n < stage && <>{circle([31,38,33][n], [49,41,65][n], [9,14,11][n], n===1?accent:sage, .88)}<path d={`M ${20+n*48} 88 Q ${31+n*48} 70 ${43+n*48} 88`} fill="none" stroke={stroke} strokeWidth="1.8"/></>}</g>)}{stage >= 3 && <path d="M82 17 L82 108" stroke={accent} strokeWidth="1.5" strokeDasharray="3 3"/>}</>;
      break;
    case "colour":
      art = <>{circle(38,47,22,"#bd795d")}{circle(88,47,22,"#89936f")}{stage >= 1 && <><path d="M54 83 Q63 65 72 83 L72 103 L54 103 Z" fill="#bda17b" stroke={stroke} strokeWidth="1.1"/><path d="M50 80 L77 80" stroke={stroke} strokeWidth="1.2"/>{circle(63,81,7,"#c5a081")}</>}{stage >= 2 && <><rect x="96" y="73" width="37" height="25" rx="2" fill={stage >= 3 ? "#a5a078" : "#c5a081"} stroke={stroke} strokeWidth="1"/><path d="M97 104 L132 104" stroke={stroke} strokeWidth="1.2"/></>}{stage >= 3 && <><rect x="17" y="112" width="119" height="7" rx="3.5" fill="#c5a081"/><rect x="17" y="112" width="58" height="7" rx="3.5" fill="#bd795d"/></>}</>;
      break;
    case "portrait":
      art = <>{stage >= 1 && <ellipse cx="79" cy="57" rx="29" ry="37" fill="#dfc1a3" stroke={stroke} strokeWidth="1.5"/>}{stage >= 1 && <path d="M50 51 Q45 17 78 17 Q111 16 108 52 L103 37 Q82 22 58 39 Z" fill="#7d6858" stroke={stroke} strokeWidth="1.3"/>}{stage >= 2 && <><path d="M61 55 Q67 51 72 55 M86 55 Q92 51 97 55" stroke={stroke} strokeWidth="1.6" fill="none"/><path d="M79 57 L75 71 L82 72" stroke="#9d775f" strokeWidth="1.4" fill="none"/><path d="M70 83 Q79 88 89 82" stroke="#9e6e60" strokeWidth="1.5" fill="none"/></>}{stage >= 3 && <><path d="M49 51 Q58 71 59 88" stroke="#b77b5d" strokeWidth="5" opacity=".6" fill="none"/><path d="M99 44 Q104 61 99 75" stroke="#fff0d7" strokeWidth="5" opacity=".8" fill="none"/><path d="M44 112 Q46 91 63 91 L94 91 Q111 95 114 112" fill="#9b9a7a" stroke={stroke} strokeWidth="1.4"/></>}</>;
      break;
    case "landscape":
      art = <>{stage >= 1 && <><rect x="13" y="20" width="132" height="90" fill="#f4efe3" stroke="#c8c0b0"/><circle cx="111" cy="39" r="10" fill="#d4aa78"/><path d="M14 75 L45 43 L68 71 L90 48 L145 78 L145 110 L14 110 Z" fill={stage >= 2 ? "#9ba18a" : "#d8d0c0"} stroke={stroke} strokeWidth="1.1"/>{stage >= 2 && <path d="M14 92 Q47 71 73 92 T145 90 L145 110 L14 110 Z" fill="#c4ad8f" stroke={stroke} strokeWidth="1.1"/>}{stage >= 3 && <><path d="M14 100 Q52 91 83 101 T145 98" fill="none" stroke="#f8f2e5" strokeWidth="3"/><path d="M44 64 L51 56 L57 64 M87 61 L94 53 L100 61" stroke="#f6f0e5" strokeWidth="2" fill="none"/></>}</>}</>;
      break;
    case "paint":
      art = <>{[0,1,2].map((n) => <path key={n} d={`M ${18+n*4} ${34+n*31} Q 53 ${16+n*31} 83 ${34+n*31} T 139 ${34+n*31}`} fill="none" stroke={[accent,sage,"#c6a16f"][n]} strokeWidth={stage > n ? 10 : 3} strokeLinecap="round" opacity={stage > n ? .9 : .45}/>)}{stage >= 2 && <path d="M36 19 L48 11 L57 20 L49 47 Z" fill="#9b775d" stroke={stroke} strokeWidth="1.1"/>}{stage >= 3 && <path d="M26 112 Q73 98 129 112" stroke={stroke} strokeWidth="1.2" strokeDasharray="3 3" fill="none"/>}</>;
      break;
    default:
      art = <>{stage >= 1 && <rect x="25" y="25" width="105" height="80" rx="2" fill="#f4efe3" stroke="#c8c0b0"/>}{stage >= 1 && <><path d="M36 87 L62 55 L82 76 L100 45 L120 87 Z" fill="#d4c8b2" stroke={stroke} strokeWidth="1.4"/>{circle(102,40,8,"#d2aa7b")}</>}{stage >= 2 && <path d="M36 91 Q66 75 90 91 T120 91" fill="none" stroke={sage} strokeWidth="3"/>}{stage >= 3 && <path d="M42 99 L114 99" stroke={accent} strokeWidth="2.5" strokeLinecap="round"/>}</>;
  }
  return <svg className="lesson-visual-svg" viewBox="0 0 158 132" role="img" aria-label={`Схематичный пример, этап ${stepNumber}, тема: ${getVisualKindLabel(kind)}`} xmlns="http://www.w3.org/2000/svg">{art}{stage >= 4 && <g aria-hidden="true"><circle cx="138" cy="17" r="10" fill="#e1e6d8" stroke="#8b9273" strokeWidth="1.2" /><path d="M133 17 L137 21 L143 13" fill="none" stroke="#59684f" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></g>}</svg>;
}


export default function LessonVisualGuide({ lesson }: { lesson: Lesson }) {
  const kind = classifyLesson(lesson);
  const stages = buildLessonVisualStages(lesson);
  return (
    <section className="lesson-visual-guide" aria-labelledby={`lesson-visual-title-${lesson.id}`}>
      <div className="lesson-visual-heading">
        <div>
          <span className="eyebrow">ВИЗУАЛЬНЫЙ ПРИМЕР</span><span className="lesson-visual-kind">{getVisualKindLabel(kind)}</span>
          <h2 id={`lesson-visual-title-${lesson.id}`}>Повтори по образцу</h2>
          <p>Смотри на каждый этап и выполняй действие рядом. Рисунок-схема помогает понять порядок работы — твой результат может отличаться.</p>
        </div>
        <span className="lesson-visual-stamp">STEP<br />BY STEP</span>
      </div>
      <div className="lesson-visual-stages">
        {stages.map((step) => (
          <article className="lesson-visual-stage" key={`${lesson.id}-visual-${step.number}`}>
            <div className="lesson-visual-stage-top"><span>{String(step.number).padStart(2, "0")}</span><small>{step.label}</small></div>
            <VisualDrawing kind={kind} stage={step.drawingStage} stepNumber={step.number} />
            <p>{step.instruction}</p>
          </article>
        ))}
      </div>
      <div className="lesson-visual-footer"><span className="lesson-visual-footer-mark">✳</span><p><strong>Главный принцип.</strong> {getVisualPrinciple(kind)} Схема показывает общий порядок работы; сверяйся также с натурой и условиями конкретного задания.</p></div>
    </section>
  );
}
