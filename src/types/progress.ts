export interface UserProgress {
  sessionId: string;
  currentStepIndex: number;
  completed: boolean;
  lastUpdated: string;
}

export type ProgressMap = Record<string, UserProgress>;
