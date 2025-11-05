export interface UserInputs {
  stream: string;
  exam: string;
  daysRemaining: number;
  chaptersCompleted: number;
  studyStyle: string;
  targetRank: string;
}

export interface Chapter {
  name: string;
  weightage: 'High' | 'Medium' | 'Low' | string;
  questionsToPractice: string;
}

export interface StudyCycle {
  cycle: string;
  chapters: Chapter[];
  revisionStrategy: string;
}

export interface StudyPlan {
  examName: string;
  plan: StudyCycle[];
  finalAdvice: string;
}