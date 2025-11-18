import { createContext, useContext, type ReactNode, useMemo } from "react";
import { useChessBoardContext } from "./ChessBoardContext";
import { useEffect } from "react";
import { Chess } from "chess.js";
import { calculateLegalMoves } from "../utils/board-utils";
import { useMoveNavigation } from "../hooks/useMoveNavigation";

interface GameNavigationContextValue {
  goToFirstMove: () => void;
  goToPreviousMove: () => void;
  goToNextMove: () => void;
  goToLastMove: () => void;
  isAtStart: boolean;
  isAtEnd: boolean;
  viewingIndex: number | null;
  currentIndex: number;
  isViewingHistory: boolean;
}

const GameNavigationContext = createContext<GameNavigationContextValue | null>(
  null
);

interface GameNavigationProviderProps {
  children: ReactNode;
}

export const GameNavigationProvider = ({
  children,
}: GameNavigationProviderProps) => {
  const { chessRef, cgRef, color } = useChessBoardContext();
  const totalMoves = chessRef.current?.history().length || 0;

  const {
    goToFirstMove,
    goToPreviousMove,
    goToNextMove,
    goToLastMove,
    isAtStart,
    isAtEnd,
    viewingIndex,
    currentIndex,
    isViewingHistory,
  } = useMoveNavigation(totalMoves);

  // Handle navigation - runs when user explicitly navigates
  useEffect(() => {
    if (!chessRef.current || !cgRef.current) return;

    const history = chessRef.current.history();

    if (isViewingHistory) {
      // Viewing a historical position
      const tempChess = new Chess();

      // Replay moves up to currentIndex
      for (let i = 0; i < currentIndex; i++) {
        tempChess.move(history[i]);
      }

      // Update the board to show this historical position (disable moves)
      cgRef.current.set({
        fen: tempChess.fen(),
        movable: {
          color: undefined, // Disable moves when viewing history
          dests: new Map(),
        },
        check: tempChess.inCheck(),
      });
    } else if (viewingIndex === null && history.length > 0) {
      // User navigated back to current position - restore the live board state
      const playerColorCode = color === "white" ? "w" : "b";
      const isMyTurn = chessRef.current.turn() === playerColorCode;

      cgRef.current.set({
        fen: chessRef.current.fen(),
        movable: {
          color: color,
          dests: isMyTurn ? calculateLegalMoves(chessRef.current) : new Map(),
        },
        check: chessRef.current.inCheck(),
      });
    }
  }, [viewingIndex, chessRef, cgRef, isViewingHistory, currentIndex, color]);

  const value = useMemo<GameNavigationContextValue>(() => ({
    goToFirstMove,
    goToPreviousMove,
    goToNextMove,
    goToLastMove,
    isAtStart,
    isAtEnd,
    viewingIndex,
    currentIndex,
    isViewingHistory,
  }), [
    goToFirstMove,
    goToPreviousMove,
    goToNextMove,
    goToLastMove,
    isAtStart,
    isAtEnd,
    viewingIndex,
    currentIndex,
    isViewingHistory
  ]);

  return (
    <GameNavigationContext.Provider value={value}>
      {children}
    </GameNavigationContext.Provider>
  );
};

/* eslint-disable-next-line */
export const useGameNavigation = () => {
  const context = useContext(GameNavigationContext);
  if (!context) {
    throw new Error(
      "useGameNavigation must be used within GameNavigationProvider"
    );
  }
  return context;
};
