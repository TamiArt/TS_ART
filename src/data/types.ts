export type Lesson = {
  id: string;
  title: string;
  duration: string;
  kind: "practice" | "lesson";
  objective: string;
  materials: string;
  steps: string[];
  selfCheck: string[];
};

export type Module = {
  id: number;
  title: string;
  description: string;
  status: "available" | "planned";
  lessons: Lesson[];
  content?: "oil-painting-techniques";
};

export function makeModule(id: number, title: string, description: string, lessons: Lesson[]): Module {
  return { id, title, description, status: "available", lessons };
}

export function makeLesson(
  id: string, title: string, duration: string, kind: Lesson["kind"], objective: string,
  materials: string, steps: string[], selfCheck: string[]
): Lesson {
  return { id, title, duration, kind, objective, materials, steps, selfCheck };
}
