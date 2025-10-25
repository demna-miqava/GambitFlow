import {
  createContext,
  useContext,
  useEffect,
  useState,
  type RefObject,
} from "react";
import { useMoveNavigation } from "./hooks/useMoveNavigation";
import { useBoard } from "./hooks/useBoard";
import { Chess } from "chess.js";
import type { PlayerColor } from "../game/types/game.types";
import { useLocation } from "react-router";
import { calculateLegalMoves } from "../game/utils/board-sync";
import { useGameWebSocket } from "../game/hooks/useGameWebSocket";
import { parseWebSocketMessage } from "../game/utils/websocket-helpers";
import type { GameWebSocketMessage } from "../game/types/websocket-messages";

const CurrentGameContext = createContext<{
  boardRef: RefObject<HTMLDivElement | null>;
  goToFirstMove: () => void;
  goToPreviousMove: () => void;
  goToNextMove: () => void;
  goToLastMove: () => void;
  isAtStart: boolean;
  isAtEnd: boolean;
  chessRef: RefObject<Chess | null>;
  turn?: PlayerColor;
  viewingIndex: number | null;
  currentIndex: number;
  isViewingHistory: boolean;
  gameEnded: boolean;
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
  gameEnded: false,
});

export const CurrentGameProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { boardRef, chessRef, turn, cgRef } = useBoard();
  const { color } = useLocation().state || { color: "white" as PlayerColor };
  const totalMoves = chessRef.current?.history().length || 0;
  const [gameEnded, setGameEnded] = useState(false);
  const { lastMessage } = useGameWebSocket();

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

  // Listen for game_ended messages to stop clocks
  useEffect(() => {
    if (!lastMessage) return;

    const data = parseWebSocketMessage(lastMessage) as GameWebSocketMessage;

    // Handle games that ended during play
    if (data?.type === "game_ended") {
      setGameEnded(true);
    }

    // Handle games that are already finished (viewing past games)
    if (data?.type === "initial_game_state" && data.data?.isFinished) {
      setGameEnded(true);
    }
  }, [lastMessage]);

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
        gameEnded,
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
