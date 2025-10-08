import { useEffect } from "react";
import useWebSocket from "react-use-websocket";
import type { Chess } from "chess.js";
import type { Api } from "@lichess-org/chessground/api";
import { syncBoardState } from "../utils/board-sync";
import type { PlayerColor } from "../types/game.types";
import { BOARD_CONFIG } from "../constants/board-config";

interface GameWebSocketProps {
  gameId: string | undefined;
  userId: string;
  playerColor: PlayerColor;
  chessRef: React.RefObject<Chess | null>;
  cgRef: React.RefObject<Api | null>;
  setTurn: React.Dispatch<PlayerColor>;
}

/**
 * Hook to manage WebSocket connection for a live chess game
 * Handles receiving moves from opponent and initial game state
 */
export const useGameWebSocket = ({
  gameId,
  userId,
  playerColor,
  chessRef,
  cgRef,
  setTurn,
}: GameWebSocketProps) => {
  const { lastMessage, sendMessage } = useWebSocket(
    gameId
      ? `${BOARD_CONFIG.WEBSOCKET_BASE_URL}/game/${gameId}?userId=${userId}`
      : null
  );

  useEffect(() => {
    if (!lastMessage || !chessRef.current) return;

    const data = JSON.parse(lastMessage.data);

    // Handle initial game state from server
    if (data?.data?.fen) {
      if (data?.pgn) {
        chessRef.current.loadPgn(data.pgn);
      }
      syncBoardState(chessRef, cgRef, playerColor, setTurn);
    }

    // Handle opponent's move
    if (data.type === "move" && data?.move && data?.userId !== userId) {
      chessRef.current.move(data.move.lan);
      syncBoardState(chessRef, cgRef, playerColor, setTurn);
    }
  }, [lastMessage, userId, playerColor, chessRef, cgRef]);

  return { sendMessage };
};
