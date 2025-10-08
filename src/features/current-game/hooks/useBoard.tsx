import { useUser } from "@/hooks/useUser";
import { Chessground } from "@lichess-org/chessground";
import type { Api } from "@lichess-org/chessground/api";
import { Chess } from "chess.js";
import { useEffect, useRef } from "react";
import useWebSocket from "react-use-websocket";
import { useLocation, useParams } from "react-router";
import type { Key } from "@lichess-org/chessground/types";

const ENABLE_PREMOVES = true;
const ENABLE_DRAGGABLE = true;

const syncTheBoardAfterTheMove = (
  chessRef: React.RefObject<Chess>,
  cgRef: React.RefObject<Api | null>,
  color: "black" | "white"
) => {
  const chess = chessRef.current;
  const turn = chess.turn();
  const playerColorCode = color === "white" ? "w" : "b";
  const isMyTurn = turn === playerColorCode;
  cgRef.current?.set({
    fen: chess.fen(),
    turnColor: turn === "w" ? "white" : "black",
    movable: {
      color: color,
      dests: isMyTurn
        ? new Map(
            chess
              .moves({ verbose: true })
              .map((m) => [
                m.from,
                chess
                  .moves({ square: m.from, verbose: true })
                  .map((move) => move.to),
              ])
          )
        : new Map(),
    },
    check: chess.inCheck(),
  });

  if (isMyTurn) {
    cgRef.current?.playPremove();
  }
};

export const useBoard = () => {
  const boardRef = useRef<HTMLDivElement>(null);
  const chessRef = useRef(new Chess());
  const cgRef = useRef<Api | null>(null);
  const { color } = useLocation().state || { color: "black" };
  const { id } = useUser();
  const { gameId } = useParams();

  const { lastMessage, sendMessage } = useWebSocket(
    gameId ? `ws://localhost:5001/ws/game/${gameId}?userId=${id}` : null
  );

  useEffect(() => {
    if (lastMessage) {
      const data = JSON.parse(lastMessage.data);

      // Handle initial connection with game state
      if (data && data?.data?.fen) {
        const chess = chessRef.current;
        if (data?.pgn) {
          chess.loadPgn(data.pgn);
        }
        syncTheBoardAfterTheMove(chessRef, cgRef, color);
      }

      if (data && data.type === "move" && data?.move && data?.userId !== id) {
        chessRef.current.move(data.move.lan);
        syncTheBoardAfterTheMove(chessRef, cgRef, color);
      }
    }
  }, [lastMessage, id, color]);

  useEffect(() => {
    if (boardRef.current) {
      const chess = chessRef.current;
      const playerColorCode = color === "white" ? "w" : "b";
      const isMyTurn = chess.turn() === playerColorCode;

      cgRef.current = Chessground(boardRef.current, {
        fen: chess.fen(),
        orientation: color,
        premovable: { enabled: ENABLE_PREMOVES },
        draggable: { enabled: ENABLE_DRAGGABLE },
        turnColor: chess.turn() === "w" ? "white" : "black",
        movable: {
          color: color,
          free: false,
          dests: isMyTurn
            ? new Map(
                chess
                  .moves({ verbose: true })
                  .map((m) => [
                    m.from,
                    chess
                      .moves({ square: m.from, verbose: true })
                      .map((move) => move.to),
                  ])
              )
            : new Map(),
        },
        events: {
          move: (orig: Key, dest: Key) => {
            try {
              const move = chess.move({
                from: orig,
                to: dest,
              });
              syncTheBoardAfterTheMove(chessRef, cgRef, color);

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
  }, [color, sendMessage]);

  return {
    boardRef,
    chessRef,
    cgRef,
  };
};
