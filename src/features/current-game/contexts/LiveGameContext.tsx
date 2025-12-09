import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
  useMemo,
  type ReactNode,
} from "react";
import { useChessBoardContext } from "@/features/game/contexts/ChessBoardContext";
import { useGameWebSocket } from "@/features/game/hooks/useGameWebSocket";
import type { RatingChanges } from "@/features/game/types/websocket-messages";
import { useChessSound } from "@/features/game/hooks/useChessSound";
import { useSettings } from "@/features/settings/SettingsContext";
import { useUser } from "@/hooks/useUser";
import type { Key } from "@lichess-org/chessground/types";
import type { Square, PieceSymbol } from "chess.js";
import { syncBoard } from "@/features/game/utils/board-utils";
import { useLiveGameMessages } from "../hooks/useLiveGameMessages";
import type { SendMessage } from "react-use-websocket";
import { GAME_MESSAGE_TYPES } from "@/features/game/constants/websocket-types";
import { isPromotionMove } from "@/features/game/utils/promotionUtils";

interface PendingPromotion {
  from: Square;
  to: Square;
}

interface LiveGameContextValue {
  gameEnded: boolean;
  ratingChanges: RatingChanges | null;
  sendMessage: SendMessage;
  whiteTimeLeft: number | undefined;
  blackTimeLeft: number | undefined;
  pendingPromotion: PendingPromotion | null;
  handlePromotionSelect: (piece: PieceSymbol) => void;
  cancelPromotion: () => void;
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
  const [pendingPromotion, setPendingPromotion] =
    useState<PendingPromotion | null>(null);

  // Complete a move with a specific promotion piece
  const completeMove = useCallback(
    (fromSquare: Square, toSquare: Square, promotion?: PieceSymbol) => {
      const chess = chessRef.current;
      const cg = cgRef.current;
      if (!chess || !cg) return;

      try {
        const move = chess.move({
          from: fromSquare,
          to: toSquare,
          promotion,
        });

        const isCheckmate = chess.isCheckmate();
        const isStalemate = chess.isStalemate();

        const turn = syncBoard({
          cg: cg,
          chess,
          movableColor: color,
          playPremove: true,
        });
        setTurn(turn);

        playSoundForMove(move, isCheckmate);

        sendMessage(
          JSON.stringify({
            type: GAME_MESSAGE_TYPES.MOVE,
            move: move,
            fen: chess.fen(),
            pgn: chess.pgn(),
            moveNumber: chess.history().length,
          })
        );

        // Check for game ending conditions
        if (isCheckmate) {
          sendMessage(
            JSON.stringify({
              type: GAME_MESSAGE_TYPES.CHECKMATE,
              winnerId: id,
            })
          );
        } else if (isStalemate) {
          sendMessage(
            JSON.stringify({
              type: GAME_MESSAGE_TYPES.STALEMATE,
            })
          );
        }
      } catch {
        cg.set({ fen: chess.fen() });
      }
    },
    [chessRef, cgRef, setTurn, color, playSoundForMove, sendMessage, id]
  );

  // Handle promotion piece selection
  const handlePromotionSelect = useCallback(
    (piece: PieceSymbol) => {
      if (!pendingPromotion) return;

      completeMove(pendingPromotion.from, pendingPromotion.to, piece);
      setPendingPromotion(null);
    },
    [pendingPromotion, completeMove]
  );

  // Cancel promotion and revert the move
  const cancelPromotion = useCallback(() => {
    const cg = cgRef.current;
    const chess = chessRef.current;

    if (cg && chess) {
      // Revert the board to the current chess state and sync everything
      const turn = syncBoard({
        cg,
        chess,
        movableColor: color,
        playPremove: true,
      });
      setTurn(turn);
    }

    setPendingPromotion(null);
  }, [cgRef, chessRef, color, setTurn]);

  // Handle player's piece drag/drop on the board
  const handlePlayerMove = useCallback(
    (orig: Key, dest: Key) => {
      const chess = chessRef.current;
      const cg = cgRef.current;
      if (!chess || !cg) return;

      const fromSquare = orig as Square;
      const toSquare = dest as Square;

      // Check if this is a promotion move (pawn reaching 8th/1st rank)
      const piece = chess.get(fromSquare);

      const isPromotion = isPromotionMove(toSquare, piece);

      if (isPromotion) {
        // Check if auto-promote to queen is enabled
        if (settings?.autoPromoteToQueenEnabled) {
          completeMove(fromSquare, toSquare, "q");
        } else {
          // Show promotion selector
          setPendingPromotion({ from: fromSquare, to: toSquare });
        }
      } else {
        completeMove(fromSquare, toSquare);
      }
    },
    [chessRef, cgRef, settings?.autoPromoteToQueenEnabled, completeMove]
  );

  // Register move handler with Chessground
  useEffect(() => {
    if (!cgRef.current) return;

    cgRef.current.set({
      events: {
        move: handlePlayerMove,
      },
    });
  }, [cgRef, handlePlayerMove]);

  const { whiteTimeLeft, blackTimeLeft } = useLiveGameMessages({
    setGameEnded,
    setRatingChanges,
  });

  const value = useMemo<LiveGameContextValue>(
    () => ({
      gameEnded,
      ratingChanges,
      sendMessage,
      pendingPromotion,
      handlePromotionSelect,
      cancelPromotion,
      whiteTimeLeft,
      blackTimeLeft,
    }),
    [
      gameEnded,
      ratingChanges,
      sendMessage,
      pendingPromotion,
      handlePromotionSelect,
      cancelPromotion,
      whiteTimeLeft,
      blackTimeLeft,
    ]
  );

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
