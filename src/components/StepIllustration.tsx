import LessonStageDrawing from "./LessonStageDrawing";

type StepIllustrationProps = {
  title: string;
  instruction: string;
};

/**
 * Keeps every lesson card in the same pencil-on-paper visual language while
 * choosing a drawing that matches the lesson topic and current instruction.
 */
export default function StepIllustration({ title, instruction }: StepIllustrationProps) {
  return <LessonStageDrawing title={title} instruction={instruction} />;
}
