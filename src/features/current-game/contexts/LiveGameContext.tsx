import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
  type ReactNode,
} from "react";
import { useChessBoardContext } from "@/features/game/contexts/ChessBoardContext";
import { useGameWebSocket } from "@/features/game/hooks/useGameWebSocket";
import type { RatingChanges } from "@/features/game/types/websocket-messages";
import { useChessSound } from "@/features/game/hooks/useChessSound";
import { useSettings } from "@/features/settings/SettingsContext";
import { useUser } from "@/hooks/useUser";
import type { Key } from "@lichess-org/chessground/types";
import { syncBoardState } from "@/features/game/utils/board-utils";
import { useLiveGameMessages } from "../hooks/useLiveGameMessages";
import type { SendMessage } from "react-use-websocket";

interface LiveGameContextValue {
  gameEnded: boolean;
  ratingChanges: RatingChanges | null;
  sendMessage: SendMessage;
}

const LiveGameContext = createContext<LiveGameContextValue | null>(null);

interface LiveGameProviderProps {
  children: ReactNode;
}

export const LiveGameProvider = ({ children }: LiveGameProviderProps) => {
  const { chessRef, cgRef, setTurn, color } = useChessBoardContext();
  const { sendMessage } = useGameWebSocket();
  const { settings } = useSettings();
  const { playSoundForMove } = useChessSound(settings?.soundsEnabled);
  const { id } = useUser();

  const [gameEnded, setGameEnded] = useState(false);
  const [ratingChanges, setRatingChanges] = useState<RatingChanges | null>(
    null
  );

  // Handle player's move
  const handleMove = useCallback(
    (orig: Key, dest: Key) => {
      const chess = chessRef.current;
      const cg = cgRef.current;
      if (!chess || !cg) return;

      try {
        const move = chess.move({
          from: orig as string,
          to: dest as string,
        });

        const numberOfMoves = chess.moveNumber();
        const isCheckmate = chess.isCheckmate();
        const isStalemate = chess.isStalemate();

        syncBoardState(chessRef, cgRef, color, setTurn);

        playSoundForMove(move, isCheckmate);

        sendMessage(
          JSON.stringify({
            type: "move",
            move: move,
            fen: chess.fen(),
            pgn: chess.pgn(),
            moveNumber: numberOfMoves,
          })
        );

        // Check for game ending conditions
        if (isCheckmate) {
          sendMessage(
            JSON.stringify({
              type: "checkmate",
              winnerId: id,
            })
          );
        } else if (isStalemate) {
          sendMessage(
            JSON.stringify({
              type: "stalemate",
            })
          );
        }
      } catch {
        cg.set({ fen: chess.fen() });
      }
    },
    [chessRef, cgRef, setTurn, color, playSoundForMove, sendMessage, id]
  );

  // Register move handler with Chessground
  useEffect(() => {
    if (!cgRef.current) return;

    cgRef.current.set({
      events: {
        move: handleMove,
      },
    });
  }, [cgRef, handleMove]);

  useLiveGameMessages({
    setGameEnded,
    setRatingChanges,
  });

  const value: LiveGameContextValue = {
    gameEnded,
    ratingChanges,
    sendMessage,
  };

  return (
    <LiveGameContext.Provider value={value}>
      {children}
    </LiveGameContext.Provider>
  );
};

/* eslint-disable-next-line */
export const useLiveGame = () => {
  const context = useContext(LiveGameContext);
  if (!context) {
    throw new Error("useLiveGame must be used within LiveGameProvider");
  }
  return context;
};
