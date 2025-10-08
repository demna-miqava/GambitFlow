import { useUser } from "@/hooks/useUser";
import { Chessground } from "@lichess-org/chessground";
import type { Api } from "@lichess-org/chessground/api";
import { Chess } from "chess.js";
import { useEffect, useRef, useState } from "react";
import { useLocation, useParams } from "react-router";
import type { Key } from "@lichess-org/chessground/types";
import { useGameWebSocket } from "@/features/game/hooks/useGameWebSocket";
import {
  syncBoardState,
  calculateLegalMoves,
} from "@/features/game/utils/board-sync";
import { BOARD_CONFIG } from "@/features/game/constants/board-config";
import type { PlayerColor } from "@/features/game/types/game.types";

export const useBoard = () => {
  const boardRef = useRef<HTMLDivElement>(null);
  const chessRef = useRef(new Chess());
  const cgRef = useRef<Api | null>(null);
  const [turn, setTurn] = useState<"white" | "black">("white");
  const { color } = useLocation().state || {
    color: "black" as PlayerColor,
    timeControl: "3",
  };
  const { id } = useUser();
  const { gameId } = useParams();

  // Use the game WebSocket hook
  const { sendMessage } = useGameWebSocket({
    gameId,
    userId: id || "",
    playerColor: color,
    chessRef,
    cgRef,
    setTurn,
  });

  useEffect(() => {
    if (boardRef.current) {
      const chess = chessRef.current;
      const playerColorCode = color === "white" ? "w" : "b";
      const isMyTurn = chess.turn() === playerColorCode;

      cgRef.current = Chessground(boardRef.current, {
        fen: chess.fen(),
        orientation: color,
        premovable: { enabled: BOARD_CONFIG.ENABLE_PREMOVES },
        draggable: { enabled: BOARD_CONFIG.ENABLE_DRAGGABLE },
        turnColor: chess.turn() === "w" ? "white" : "black",
        movable: {
          color: color,
          free: false,
          dests: isMyTurn ? calculateLegalMoves(chess) : new Map(),
        },
        events: {
          move: (orig: Key, dest: Key) => {
            try {
              const move = chess.move({
                from: orig as string,
                to: dest as string,
              });

              // Sync board after move
              syncBoardState(chessRef, cgRef, color, setTurn);
              // Send move to server
              sendMessage(
                JSON.stringify({
                  type: "move",
                  move: move,
                  fen: chess.fen(),
                  pgn: chess.pgn(),
                })
              );
            } catch {
              // If move fails, reset board to correct position
              cgRef.current?.set({ fen: chess.fen() });
            }
          },
        },
      });
    }
  }, [color, sendMessage, chessRef, cgRef]);

  return {
    boardRef,
    chessRef,
    cgRef,
    turn,
  };
};
