export type ColourTest = {
  id: string;
  question: string;
  pigments: string;
  ratio: string;
  medium: string;
  support: string;
  wetObservation: string;
  dryObservation: string;
  result: string;
  nextStep: string;
  createdAt: string;
};

export type StudioProject = {
  id: string;
  title: string;
  question: string;
  medium: string;
  constraint: string;
  nextStep: string;
  status: "active" | "paused" | "complete";
  createdAt: string;
};

export type PortfolioItem = {
  id: string;
  title: string;
  medium: string;
  year: string;
  description: string;
  link: string;
  createdAt: string;
};

export type SavedState = {
  completed: string[];
  reflections: Record<string, string>;
  journal: string;
  colourTests: ColourTest[];
  projects: StudioProject[];
  portfolio: PortfolioItem[];
};
