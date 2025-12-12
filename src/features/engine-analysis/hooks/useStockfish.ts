import { useEffect, useRef, useState, useCallback } from "react";
import {
  StockfishService, type StockfishOptions,
  type MultiPvResult,
} from "../services/stockfish";

interface UseStockfishOptions extends StockfishOptions {
  autoInit?: boolean;
}

export function useStockfish(options: UseStockfishOptions = {}) {
  const { autoInit = true, depth, moveTime, skillLevel, multiPv } = options;
  const engineRef = useRef<StockfishService | null>(null);
  const [isReady, setIsReady] = useState(false);
  const [isThinking, setIsThinking] = useState(false);

  const init = useCallback(async () => {
    if (!engineRef.current) {
      engineRef.current = new StockfishService();
    }
    await engineRef.current.init({ depth, moveTime, skillLevel, multiPv });
    setIsReady(true);
  }, [depth, moveTime, skillLevel, multiPv]);

  // Auto-initialize on mount
  useEffect(() => {
    if (autoInit) {
      init();
    }
    return () => {
      engineRef.current?.destroy();
      engineRef.current = null;
    };
  }, []);

  const analyzeMultiPv = useCallback(
    async (
      fen: string,
      numLines: number = 3
    ): Promise<MultiPvResult | null> => {
      if (!engineRef.current) return null;

      setIsThinking(true);
      try {
        return await engineRef.current.analyzeMultiPv(fen, numLines);
      } finally {
        setIsThinking(false);
      }
    },
    []
  );

  // Update options (e.g., change difficulty)
  const setOptions = useCallback(async (opts: StockfishOptions) => {
    await engineRef.current?.setOptions(opts);
  }, []);

  // Stop current calculation
  const stop = useCallback(() => {
    engineRef.current?.stop();
    setIsThinking(false);
  }, []);

  return {
    isReady,
    isThinking,
    init,
    analyzeMultiPv,
    setOptions,
    stop,
  };
}
