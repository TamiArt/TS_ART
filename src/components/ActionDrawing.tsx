import type { VisualAction } from "./lessonVisuals";

export default function ActionDrawing({ action, stage }: { action: VisualAction; stage: number }) {
  const ink = "#56564b";
  const accent = "#b77b5d";
  const sage = "#8b9273";
  const paper = "#f8f5ec";
  switch (action) {
    case "observe":
      return <g><rect x="20" y="20" width="118" height="91" fill={paper} stroke="#a8a18f"/><ellipse cx="79" cy="65" rx="25" ry="34" fill="none" stroke={stage >= 2 ? accent : "#a8a18f"} strokeWidth={stage >= 2 ? 2.5 : 1.4} strokeDasharray={stage >= 2 ? "0" : "4 3"}/><path d="M27 27 L27 18 L36 18 M122 18 L131 18 L131 27 M27 103 L27 112 L36 112 M122 112 L131 112 L131 103" fill="none" stroke={sage} strokeWidth="1.8"/>{stage >= 3 && <path d="M108 38 L124 28 M124 28 L118 29 M124 28 L122 34" fill="none" stroke={accent} strokeWidth="1.8"/>}</g>;
    case "place":
      return <g><path d="M18 99 L140 99" stroke={ink} strokeWidth="2"/><rect x="29" y="57" width="28" height="42" fill="#d9c6a8" stroke={ink}/><circle cx="102" cy="32" r="12" fill="#d6b17e" stroke={accent}/><path d="M102 47 L83 65 M102 47 L121 65 M102 47 L102 70" stroke={accent} strokeWidth="1.5" strokeDasharray="3 3"/>{stage >= 2 && <><path d="M85 71 L85 93 L122 93 L122 71 Z" fill="#e3d9c6" stroke={ink}/><path d="M82 68 L125 68" stroke={sage} strokeWidth="2"/></>}</g>;
    case "trace":
    case "outline":
      return <g><path d="M79 19 C63 26 54 41 57 58 C47 73 60 97 79 106 C98 97 111 73 101 58 C104 41 95 26 79 19 Z" fill={stage >= 3 ? "#d7c2a4" : "none"} stroke={stage >= 2 ? accent : "#a8a18f"} strokeWidth={stage >= 2 ? 2.4 : 1.4} strokeDasharray={stage >= 2 ? "0" : "4 3"}/>{stage >= 3 && <path d="M79 21 L79 13 M74 13 L84 13 M110 34 L127 25 M127 25 L120 26 M127 25 L124 32" fill="none" stroke={sage} strokeWidth="1.7"/>}</g>;
    case "simplify":
      return <g><circle cx="49" cy="48" r="20" fill={stage >= 2 ? "#d9c8ad" : "none"} stroke={accent} strokeWidth="1.7"/><rect x="79" y="29" width="38" height="40" fill={stage >= 2 ? "#c7b59a" : "none"} stroke={sage} strokeWidth="1.7"/><ellipse cx="96" cy="91" rx="22" ry="13" fill={stage >= 2 ? "#d8d0c0" : "none"} stroke={ink} strokeWidth="1.7"/>{stage >= 3 && <path d="M30 112 L125 112" stroke={accent} strokeWidth="2" strokeDasharray="4 3"/>}</g>;
    case "measure":
      return <g><path d="M45 23 L45 108 M39 23 L51 23 M39 108 L51 108" stroke={accent} strokeWidth="1.6"/><path d="M66 36 L111 36 L111 99 L66 99 Z" fill="#d8c7ad" fillOpacity=".55" stroke={ink} strokeWidth="1.6"/><path d="M66 29 L111 29 M66 25 L66 33 M111 25 L111 33" stroke={sage} strokeWidth="1.6"/>{stage >= 2 && <><path d="M88 36 L88 99" stroke={accent} strokeDasharray="3 3" strokeWidth="1.4"/><text x="90" y="20" textAnchor="middle" fontSize="8" fill={ink}>1 : 2</text></>}{stage >= 3 && <path d="M66 99 L111 36" stroke={sage} strokeWidth="1.4" strokeDasharray="3 3"/>}</g>;
    case "compare":
      return <g><rect x="17" y="25" width="54" height="72" fill={paper} stroke="#a8a18f"/><rect x="87" y="25" width="54" height="72" fill={paper} stroke="#a8a18f"/><path d="M29 81 L42 51 L59 81 Z" fill="#c8b89d" stroke={ink}/><path d="M99 81 L113 43 L130 81 Z" fill={stage >= 2 ? "#c8b89d" : "none"} stroke={stage >= 2 ? accent : ink} strokeWidth={stage >= 2 ? 2 : 1.3}/>{stage >= 3 && <><path d="M74 58 L84 58 M80 54 L84 58 L80 62" stroke={sage} strokeWidth="1.7" fill="none"/><circle cx="114" cy="43" r="3" fill={accent}/></>}</g>;
    case "shade":
      return <g><circle cx="79" cy="63" r="33" fill="#eee6d7" stroke={ink} strokeWidth="1.4"/><path d="M79 30 A33 33 0 0 1 79 96 Z" fill={stage >= 2 ? "#73756b" : "#d5cbbb"}/><path d="M79 30 A33 33 0 0 1 79 96" fill="none" stroke={ink} strokeWidth="1.2"/><circle cx="66" cy="48" r="5" fill="#fffaf0"/>{stage >= 3 && <ellipse cx="79" cy="101" rx="36" ry="6" fill="#a9a393" opacity=".55"/>}</g>;
    case "fill":
      return <g><path d="M79 23 C59 34 47 52 54 75 C59 93 69 102 79 107 C89 102 99 93 104 75 C111 52 99 34 79 23 Z" fill={stage >= 2 ? "#6f7066" : "none"} stroke={ink} strokeWidth="1.7"/>{stage >= 3 && <path d="M59 74 Q78 65 99 74" stroke="#f5efe1" strokeWidth="3" fill="none" opacity=".8"/>}</g>;
    case "mix":
      return <g><circle cx="40" cy="43" r="19" fill="#bd795d" stroke={ink}/><circle cx="118" cy="43" r="19" fill="#89936f" stroke={ink}/><path d="M61 43 L96 43 M89 36 L96 43 L89 50" stroke={accent} strokeWidth="2" fill="none"/><path d="M53 76 Q79 58 105 76 L105 99 Q79 111 53 99 Z" fill={stage >= 2 ? "#a5a078" : "#c5a081"} stroke={ink} strokeWidth="1.4"/>{stage >= 3 && <><text x="40" y="71" textAnchor="middle" fontSize="8" fill={ink}>1 часть</text><text x="118" y="71" textAnchor="middle" fontSize="8" fill={ink}>1 часть</text><path d="M58 114 L100 114" stroke={accent} strokeWidth="5" strokeLinecap="round"/></>}</g>;
    case "select":
      return <g><circle cx="43" cy="43" r="16" fill="#d8c8ad" stroke="#a8a18f"/><rect x="75" y="27" width="30" height="32" fill="#d8c8ad" stroke="#a8a18f"/><path d="M31 92 Q46 70 61 92" fill="none" stroke="#a8a18f" strokeWidth="3"/><circle cx="116" cy="83" r="18" fill={stage >= 2 ? "#d6b17e" : "none"} stroke={stage >= 2 ? accent : "#a8a18f"} strokeWidth={stage >= 2 ? 2.5 : 1.4}/>{stage >= 3 && <path d="M106 83 L113 90 L126 75" stroke={sage} strokeWidth="2.4" fill="none"/>}</g>;
    case "record":
      return <g><rect x="37" y="16" width="84" height="102" rx="2" fill="#fffdf7" stroke="#a8a18f"/><path d="M48 36 L109 36 M48 48 L101 48 M48 60 L106 60" stroke={sage} strokeWidth="1.6"/><rect x="48" y="70" width="28" height="25" fill="#e5d9c6" stroke="#a8a18f"/><path d="M52 90 L61 78 L71 90" fill="none" stroke={accent} strokeWidth="1.4"/>{stage >= 2 && <><path d="M82 76 L109 76 M82 85 L109 85 M82 94 L103 94" stroke={accent} strokeWidth="1.4"/><path d="M105 104 L111 110 L122 97" stroke={sage} strokeWidth="2.3" fill="none"/></>}</g>;
    case "practice":
      return <g>{[0,1,2,3].map((n) => <path key={n} d={`M 18 ${27+n*24} Q 72 ${stage >= 2 ? 11+n*24 : 27+n*24} 140 ${27+n*24}`} fill="none" stroke={n === 0 ? accent : n === 1 ? sage : "#a8a18f"} strokeWidth={stage >= 2 && n < 2 ? 3 : 1.4} strokeLinecap="round"/>)}{stage >= 3 && <path d="M18 115 L140 115" stroke={accent} strokeWidth="2" strokeDasharray="4 3"/>}</g>;
    case "review":
    default:
      return <g><rect x="19" y="21" width="120" height="89" fill={paper} stroke="#a8a18f"/><path d="M29 84 L50 55 L68 77 L89 42 L128 84 Z" fill="#d6c9b3" stroke={ink} strokeWidth="1.3"/><circle cx="111" cy="39" r="8" fill="#d6b17e"/>{stage >= 2 && <path d="M29 92 L129 92" stroke={sage} strokeWidth="2"/>}</g>;
  }
}
