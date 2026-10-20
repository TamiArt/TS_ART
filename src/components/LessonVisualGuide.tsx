import type { Lesson } from "../data/types";
import NegativeSpaceTutorial from "./NegativeSpaceTutorial";
import RepeatByExample from "./RepeatByExample";
import InteractiveLessonPractice from "./InteractiveLessonPractice";

export default function LessonVisualGuide({ lesson }: { lesson: Lesson }) {
  if (lesson.id === "negative-space") return <NegativeSpaceTutorial key={lesson.id} />;

  if (lesson.id === "light-observation") return <RepeatByExample />;

  return <InteractiveLessonPractice key={lesson.id} lesson={lesson} />;
}
