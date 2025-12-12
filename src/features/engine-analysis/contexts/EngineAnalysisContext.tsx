import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { EvaluationLine } from "../types";

export interface EngineAnalysisState {
  score: number; // Centipawns from White's perspective
  mate?: number; // Mate in X moves (positive = white winning, negative = black)
  lines: EvaluationLine[];
  depth: number;
  isAnalyzing: boolean;
  fen: string; // FEN position these lines belong to
}

interface EngineAnalysisContextValue {
  analysis: EngineAnalysisState;
  setAnalysis: (analysis: Partial<EngineAnalysisState>) => void;
  clearAnalysis: () => void;
  engineEnabled: boolean;
  setEngineEnabled: (value: boolean) => void;
}

const defaultAnalysis: EngineAnalysisState = {
  score: 0,
  mate: undefined,
  lines: [],
  depth: 0,
  isAnalyzing: false,
  fen: "",
};

const AnalysisContext = createContext<EngineAnalysisContextValue | null>(null);

interface EngineAnalysisProviderProps {
  children: ReactNode;
}

export const EngineAnalysisProvider = ({
  children,
}: EngineAnalysisProviderProps) => {
  const [analysis, setAnalysisState] =
    useState<EngineAnalysisState>(defaultAnalysis);
  const [engineEnabled, setEngineEnabled] = useState(false);

  const setAnalysis = useCallback((partial: Partial<EngineAnalysisState>) => {
    setAnalysisState((prev) => {
      return { ...prev, ...partial };
    });
  }, []);

  const clearAnalysis = useCallback(() => {
    setAnalysisState(defaultAnalysis);
  }, []);

  const value = useMemo<EngineAnalysisContextValue>(
    () => ({
      analysis,
      setAnalysis,
      clearAnalysis,
      engineEnabled,
      setEngineEnabled,
    }),
    [analysis, setAnalysis, clearAnalysis, engineEnabled, setEngineEnabled]
  );

  return (
    <AnalysisContext.Provider value={value}>
      {children}
    </AnalysisContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAnalysis = () => {
  const context = useContext(AnalysisContext);
  if (!context) {
    throw new Error("useAnalysis must be used within EngineAnalysisProvider");
  }
  return context;
};
