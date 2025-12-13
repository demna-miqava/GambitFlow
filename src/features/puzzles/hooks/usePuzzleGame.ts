import { useCallback, useEffect } from "react";
import { useChessBoardContext } from "@/features/game/contexts/ChessBoardContext";
import { useChessSound } from "@/features/game/hooks/useChessSound";
import { useSettings } from "@/features/settings/SettingsContext";
import { calculateLegalMoves } from "@/features/game/utils/board-utils";
import type { usePuzzleState } from "./usePuzzleState";
import type { Puzzle } from "../types/puzzle.types";
import type { Key } from "@lichess-org/chessground/types";
import type { Move } from "chess.js";

interface UsePuzzleGameProps {
  puzzleState: ReturnType<typeof usePuzzleState>;
  onSolve: () => void;
  onFail: () => void;
}

export const usePuzzleGame = ({
  puzzleState,
  onSolve,
  onFail,
}: UsePuzzleGameProps) => {
  const {
    puzzle,
    status,
    setStatus,
    moveIndex,
    setMoveIndex,
    userColor,
    isSystemMove,
  } = puzzleState;

  const { chessRef, cgRef } = useChessBoardContext();
  const { settings } = useSettings();
  const { playSound, playGenericSound } = useChessSound(
    settings?.soundsEnabled
  );

  const resetBoard = useCallback(
    (newPuzzle: Puzzle | null) => {
      if (!newPuzzle) return;

      const chess = chessRef.current;

      // Validate FEN before loading
      try {
        chess.load(newPuzzle.fen);
      } catch (error) {
        console.error("Invalid FEN:", newPuzzle.fen, error);
        return;
      }

      const playerColor = chess.turn() === "w" ? "white" : "black";
      userColor.current = playerColor;
      isSystemMove.current = false;

      if (cgRef.current) {
        cgRef.current.set({
          fen: newPuzzle.fen,
          orientation: playerColor,
          turnColor: playerColor,
          lastMove: undefined,
          check: chess.inCheck(),
          movable: {
            color: playerColor,
            dests: calculateLegalMoves(chess),
          },
        });
      }
    },
    [chessRef, cgRef, userColor, isSystemMove]
  );

  const playOpponentMove = useCallback(
    (nextIndex: number) => {
      if (!puzzle || !cgRef.current) return;

      // Bounds check - ensure move exists
      if (nextIndex >= puzzle.moves.length) {
        console.error(
          "Move index out of bounds:",
          nextIndex,
          puzzle.moves.length
        );
        return;
      }

      const api = cgRef.current;
      const chess = chessRef.current;

      setTimeout(() => {
        const replyUCI = puzzle.moves[nextIndex];
        if (!replyUCI || replyUCI.length < 4) {
          console.error("Invalid UCI move:", replyUCI);
          return;
        }

        const from = replyUCI.slice(0, 2);
        const to = replyUCI.slice(2, 4);
        const promotion = replyUCI.length > 4 ? replyUCI[4] : undefined;

        const replyMove = chess.move({ from, to, promotion });
        if (!replyMove) {
          console.error("Failed to execute move:", { from, to, promotion });
          return;
        }

        isSystemMove.current = true;
        api.move(from as Key, to as Key);

        const currentTurn = chess.turn() === "w" ? "white" : "black";

        api.set({
          turnColor: currentTurn,
          movable: {
            dests: calculateLegalMoves(chess),
            color: currentTurn,
          },
          check: chess.inCheck(),
        });

        if (replyMove.captured) playSound("capture");
        else playSound("move");

        setMoveIndex(nextIndex + 1);
      }, 500);
    },
    [puzzle, cgRef, chessRef, isSystemMove, playSound, setMoveIndex]
  );

  const handleMoveFailure = useCallback(() => {
    if (!cgRef.current) return;

    // We update status to 'failed' here so UI can react (e.g. show red color)
    setStatus("failed");
    playGenericSound();

    cgRef.current.set({ movable: { color: undefined } });

    onFail();
  }, [cgRef, setStatus, playGenericSound, onFail]);

  const handleMoveSuccess = useCallback(
    (move: Move) => {
      if (!puzzle || !cgRef.current) return;

      if (move.captured) playSound("capture");
      else playSound("move");

      const nextIndex = moveIndex + 1;
      setMoveIndex(nextIndex);

      if (nextIndex >= puzzle.moves.length) {
        setStatus("success");
        playGenericSound();
        cgRef.current.set({ movable: { color: undefined } });
        onSolve();
        return;
      }

      playOpponentMove(nextIndex);
    },
    [
      puzzle,
      cgRef,
      moveIndex,
      playSound,
      setMoveIndex,
      setStatus,
      playGenericSound,
      playOpponentMove,
      onSolve,
    ]
  );

  const onHint = useCallback(() => {
    if (!puzzle || !cgRef.current) return;

    const nextMoveUCI = puzzle.moves[moveIndex];
    if (!nextMoveUCI) return;

    const from = nextMoveUCI.slice(0, 2);
    const to = nextMoveUCI.slice(2, 4);

    cgRef.current.set({
      drawable: {
        shapes: [
          {
            orig: from as Key,
            dest: to as Key,
            brush: "green",
          },
        ],
      },
    });
  }, [puzzle, moveIndex, cgRef]);

  // Handle user move
  useEffect(() => {
    if (!cgRef.current || !puzzle || status !== "solving") return;

    const api = cgRef.current;

    api.set({
      events: {
        move: (orig, dest) => {
          if (isSystemMove.current) {
            isSystemMove.current = false;
            return;
          }

          const chess = chessRef.current;
          const move = chess.move({ from: orig, to: dest, promotion: "q" });

          if (!move) return;

          const uciMove =
            move.from + move.to + (move.promotion ? move.promotion : "");
          const expectedMove = puzzle.moves[moveIndex];
          const isCorrect =
            uciMove === expectedMove || uciMove.startsWith(expectedMove);

          if (isCorrect) {
            handleMoveSuccess(move);
          } else {
            handleMoveFailure();
          }
        },
      },
    });
  }, [
    puzzle,
    status,
    moveIndex,
    cgRef,
    isSystemMove,
    chessRef,
    handleMoveSuccess,
    handleMoveFailure,
  ]);

  const showSolution = useCallback(() => {
    if (!puzzle || !cgRef.current) return;

    const chess = chessRef.current;
    const api = cgRef.current;

    // Reset board to initial puzzle position
    try {
      chess.load(puzzle.fen);
    } catch (error) {
      console.error("Invalid FEN:", puzzle.fen, error);
      return;
    }

    const playerColor = chess.turn() === "w" ? "white" : "black";

    api.set({
      fen: puzzle.fen,
      orientation: playerColor,
      turnColor: playerColor,
      lastMove: undefined,
      check: chess.inCheck(),
      movable: { color: undefined },
    });

    setMoveIndex(0);
    setStatus("solving");

    const playMove = (index: number) => {
      if (index >= puzzle.moves.length) {
        setStatus("success");
        return;
      }

      const moveUCI = puzzle.moves[index];
      if (!moveUCI || moveUCI.length < 4) return;

      const from = moveUCI.slice(0, 2);
      const to = moveUCI.slice(2, 4);
      const promotion = moveUCI.length > 4 ? moveUCI[4] : undefined;

      const moveResult = chess.move({ from, to, promotion });
      if (!moveResult) return;

      isSystemMove.current = true;
      api.move(from as Key, to as Key);

      const turnColor = chess.turn() === "w" ? "white" : "black";
      api.set({
        turnColor,
        check: chess.inCheck(),
      });

      if (moveResult.captured) playSound("capture");
      else playSound("move");

      setTimeout(() => playMove(index + 1), 500);
    };

    playMove(0);
  }, [
    puzzle,
    cgRef,
    chessRef,
    setStatus,
    setMoveIndex,
    playSound,
    isSystemMove,
  ]);

  return {
    resetBoard,
    onHint,
    showSolution,
  };
};
