import { useState, useCallback } from "react";
import { Chess } from "chess.js";

interface UsePgnInputProps {
  onLoadPgn: (pgn: string) => void;
}

export const usePgnInput = ({ onLoadPgn }: UsePgnInputProps) => {
  const [pgnInput, setPgnInput] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleInputChange = useCallback((value: string) => {
    setPgnInput(value);
    setError(null);
  }, []);

  const handleLoadPgn = useCallback(() => {
    if (!pgnInput.trim()) {
      setError("Please enter a PGN");
      return;
    }

    const chess = new Chess();
    try {
      chess.loadPgn(pgnInput);
      if (chess.history().length === 0) {
        setError("No moves found in PGN");
        return;
      }
      setError(null);
      onLoadPgn(pgnInput);
    } catch {
      setError("Invalid PGN format");
    }
  }, [pgnInput, onLoadPgn]);

  const handleClear = useCallback(() => {
    setPgnInput("");
    setError(null);
  }, []);

  return {
    pgnInput,
    error,
    handleInputChange,
    handleLoadPgn,
    handleClear,
  };
};
