import { createContext, useContext, useEffect, type RefObject } from "react";
import { useMoveNavigation } from "./hooks/useMoveNavigation";
import { useBoard } from "./hooks/useBoard";
import { Chess } from "chess.js";
import type { PlayerColor } from "../game/types/game.types";
import { useLocation } from "react-router";
import { calculateLegalMoves } from "../game/utils/board-sync";

const CurrentGameContext = createContext<{
  boardRef: RefObject<HTMLDivElement | null>;
  goToFirstMove: () => void;
  goToPreviousMove: () => void;
  goToNextMove: () => void;
  goToLastMove: () => void;
  isAtStart: boolean;
  isAtEnd: boolean;
  chessRef: RefObject<Chess | null>;
  turn: PlayerColor;
  viewingIndex: number | null;
  currentIndex: number;
  isViewingHistory: boolean;
}>({
  boardRef: { current: null },
  goToFirstMove: () => {},
  goToPreviousMove: () => {},
  goToNextMove: () => {},
  goToLastMove: () => {},
  isAtStart: false,
  isAtEnd: false,
  chessRef: { current: null },
  turn: "white",
  viewingIndex: null,
  currentIndex: 0,
  isViewingHistory: false,
});

export const CurrentGameProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { boardRef, chessRef, turn, cgRef } = useBoard();
  const { color } = useLocation().state || { color: "white" as PlayerColor };
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

      // Update the board to show this historical position
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

  return (
    <CurrentGameContext.Provider
      value={{
        boardRef,
        goToFirstMove,
        goToPreviousMove,
        goToNextMove,
        goToLastMove,
        isAtStart,
        isAtEnd,
        chessRef,
        turn,
        viewingIndex,
        currentIndex,
        isViewingHistory,
      }}
    >
      {children}
    </CurrentGameContext.Provider>
  );
};

/* eslint-disable-next-line */
export const useCurrentGame = () => {
  return useContext(CurrentGameContext);
};
