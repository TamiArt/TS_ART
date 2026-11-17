import type { Lesson } from "../data/types";
import NegativeSpaceTutorial from "./NegativeSpaceTutorial";
import RepeatByExample from "./RepeatByExample";
import InteractiveLessonPractice from "./InteractiveLessonPractice";
import { ColorDimensionsGuide, ColorWheelGuide, WadaSanzoGuide } from "./ColorTheoryGuides";

export default function LessonVisualGuide({ lesson }: { lesson: Lesson }) {
  if (lesson.id === "negative-space") return <NegativeSpaceTutorial key={lesson.id} />;

  if (lesson.id === "light-observation") return <RepeatByExample />;
  if (lesson.id === "m22-color-wheel") return <ColorWheelGuide />;
  if (lesson.id === "m22-tone-saturation") return <ColorDimensionsGuide />;
  if (lesson.id === "m22-wada-sanzo") return <WadaSanzoGuide />;

  return <InteractiveLessonPractice key={lesson.id} lesson={lesson} />;
}
