import type { Lesson } from "../data/types";
import NegativeSpaceTutorial from "./NegativeSpaceTutorial";
import RepeatByExample from "./RepeatByExample";
import InteractiveLessonPractice from "./InteractiveLessonPractice";

export default function LessonVisualGuide({ lesson }: { lesson: Lesson }) {
  if (lesson.id === "negative-space") return <NegativeSpaceTutorial />;

  const lessonText = [lesson.title, lesson.objective, ...lesson.steps]
    .filter((value): value is string => typeof value === "string")
    .join(" ")
    .toLocaleLowerCase("ru");

  const isLightShadowLesson =
    lesson.id === "light-observation" ||
    /светотен|свет и тень|тональн(ая|ые|ых) зон|переход.{0,20}тени|повтори по образцу/.test(lessonText);

  if (isLightShadowLesson) return <RepeatByExample />;

  return <InteractiveLessonPractice lesson={lesson} />;
}
