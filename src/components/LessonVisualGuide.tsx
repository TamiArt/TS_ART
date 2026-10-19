import type { Lesson } from "../data/types";
import StepIllustration from "./StepIllustration";
import NegativeSpaceTutorial from "./NegativeSpaceTutorial";
import "./lesson-visual-guide.css";
import { buildLessonVisualStages, classifyLesson, getVisualKindLabel, getVisualPrinciple } from "./lessonVisuals";

export default function LessonVisualGuide({ lesson }: { lesson: Lesson }) {
  if (lesson.id === "negative-space") return <NegativeSpaceTutorial />;

  const kind = classifyLesson(lesson);
  const stages = buildLessonVisualStages(lesson);

  return (
    <section className="lesson-visual-guide" aria-labelledby={`lesson-visual-title-${lesson.id}`}>
      <div className="lesson-visual-heading">
        <div>
          <span className="eyebrow">ВИЗУАЛЬНЫЙ ПРИМЕР</span>
          <span className="lesson-visual-kind">{getVisualKindLabel(kind)}</span>
          <h2 id={`lesson-visual-title-${lesson.id}`}>Повтори по образцу</h2>
          <p>Каждый рисунок показывает конкретное действие из этого шага. Количество линий, зон и частей соответствует заданию; рисунки выполнены в стиле лёгкого карандашного наброска.</p>
        </div>
        <span className="lesson-visual-stamp" aria-hidden="true">ЭТЮД<br />{String(stages.length).padStart(2, "0")}</span>
      </div>
      <div className="lesson-visual-stages">
        {stages.map((step) => (
          <article className="lesson-visual-stage" key={`${lesson.id}-visual-${step.number}`}>
            <div className="lesson-visual-stage-top">
              <span>{String(step.number).padStart(2, "0")}</span>
              <small>{step.label}</small>
            </div>
            <StepIllustration title={lesson.title} instruction={step.instruction} />
            <p>{step.instruction}</p>
          </article>
        ))}
      </div>
      <div className="lesson-visual-footer">
        <span className="lesson-visual-footer-mark" aria-hidden="true">✳</span>
        <p><strong>Главный принцип.</strong> {getVisualPrinciple(kind)} Рисунок — наглядная опора для шага; сверяйся также с натурой и точной формулировкой задания.</p>
      </div>
    </section>
  );
}
