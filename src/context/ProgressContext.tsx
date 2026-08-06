import {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
  type ReactNode,
} from "react";
import type { ProgressMap, UserProgress } from "@/types";

const STORAGE_KEY = "moph.progress";

interface ProgressContextValue {
  progressMap: ProgressMap;
  getProgress: (sessionId: string) => UserProgress | undefined;
  setStepIndex: (sessionId: string, stepIndex: number, totalSteps: number) => void;
  resetProgress: (sessionId: string) => void;
}

const ProgressContext = createContext<ProgressContextValue | undefined>(undefined);

function loadFromStorage(): ProgressMap {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as ProgressMap) : {};
  } catch {
    return {};
  }
}

export function ProgressProvider({ children }: { children: ReactNode }) {
  const [progressMap, setProgressMap] = useState<ProgressMap>(() => loadFromStorage());

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(progressMap));
    } catch {
      // localStorage unavailable — fail silently.
    }
  }, [progressMap]);

  const getProgress = useCallback(
    (sessionId: string) => progressMap[sessionId],
    [progressMap]
  );

  const setStepIndex = useCallback(
    (sessionId: string, stepIndex: number, totalSteps: number) => {
      setProgressMap((prev) => ({
        ...prev,
        [sessionId]: {
          sessionId,
          currentStepIndex: stepIndex,
          completed: stepIndex >= totalSteps - 1,
          lastUpdated: new Date().toISOString(),
        },
      }));
    },
    []
  );

  const resetProgress = useCallback((sessionId: string) => {
    setProgressMap((prev) => ({
      ...prev,
      [sessionId]: {
        sessionId,
        currentStepIndex: 0,
        completed: false,
        lastUpdated: new Date().toISOString(),
      },
    }));
  }, []);

  return (
    <ProgressContext.Provider value={{ progressMap, getProgress, setStepIndex, resetProgress }}>
      {children}
    </ProgressContext.Provider>
  );
}

export function useProgress(): ProgressContextValue {
  const ctx = useContext(ProgressContext);
  if (!ctx) throw new Error("useProgress must be used within ProgressProvider");
  return ctx;
}
