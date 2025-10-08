import { createContext, useContext, type RefObject } from "react";
import { useMoveNavigation } from "./hooks/useMoveNavigation";
import { useBoard } from "./hooks/useBoard";
import { Chess } from "chess.js";
import type { PlayerColor } from "../game/types/game.types";

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
});

export const CurrentGameProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { boardRef, chessRef, turn } = useBoard();
  const totalMoves = chessRef.current?.history().length || 0;

  const {
    goToFirstMove,
    goToPreviousMove,
    goToNextMove,
    goToLastMove,
    isAtStart,
    isAtEnd,
  } = useMoveNavigation(totalMoves);

  // Handle navigation - runs when user explicitly navigates
  // useEffect(() => {
  //   if (!chessRef.current || !cgRef.current) return;

  //   const history = chessRef.current.history();

  //   if (navigation.isViewingHistory) {
  //     // Viewing a historical position
  //     const tempChess = new Chess();

  //     // Replay moves up to currentIndex
  //     for (let i = 0; i < navigation.currentIndex; i++) {
  //       tempChess.move(history[i]);
  //     }

  //     // Update the board to show this historical position
  //     cgRef.current.set({
  //       fen: tempChess.fen(),
  //       movable: {
  //         color: undefined, // Disable moves when viewing history
  //         dests: new Map(),
  //       },
  //       check: tempChess.inCheck(),
  //     });
  //   } else if (navigation.viewingIndex === null && history.length > 0) {
  //     // User navigated back to current position - restore the live board state
  //     cgRef.current.set({
  //       fen: chessRef.current.fen(),
  //       movable: {
  //         color: "white", // Re-enable moves (you'll need to set this based on player color)
  //         dests: new Map(
  //           chessRef.current
  //             .moves({ verbose: true })
  //             .map((m) => [
  //               m.from,
  //               chessRef
  //                 .current!.moves({ square: m.from, verbose: true })
  //                 .map((move) => move.to),
  //             ])
  //         ),
  //       },
  //       check: chessRef.current.inCheck(),
  //     });
  //   }
  // }, [
  //   navigation.viewingIndex,
  //   chessRef,
  //   cgRef,
  //   navigation.isViewingHistory,
  //   navigation.currentIndex,
  // ]);

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
