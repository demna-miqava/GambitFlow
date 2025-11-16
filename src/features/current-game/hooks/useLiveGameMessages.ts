import { useEffect } from "react";
import type {
  RatingChanges,
  MoveMessage,
  GameEndedMessage,
  InitialGameStateMessage,
} from "@/features/game/types/websocket-messages";
import { syncBoardState } from "@/features/game/utils/board-utils";
import { useChessBoardContext } from "@/features/game/contexts/ChessBoardContext";
import { useGameNavigation } from "@/features/game/contexts/GameNavigationContext";
import { useChessSound } from "@/features/game/hooks/useChessSound";
import { useSettings } from "@/features/settings/SettingsContext";
import { messageDispatcher } from "@/features/game/services/WebSocketMessageDispatcher";

interface UseLiveGameMessagesOptions {
  setGameEnded: (ended: boolean) => void;
  setRatingChanges: (changes: RatingChanges | null) => void;
}

export const useLiveGameMessages = ({
  setGameEnded,
  setRatingChanges,
}: UseLiveGameMessagesOptions) => {
  const { chessRef, cgRef, color, setTurn } = useChessBoardContext();
  const { goToLastMove } = useGameNavigation();
  const { settings } = useSettings();
  const { playSoundForMove } = useChessSound(settings?.soundsEnabled);

  useEffect(() => {
    // Subscribe to move messages
    const unsubMove = messageDispatcher.subscribe<MoveMessage>(
      "move",
      (data) => {
        if (!chessRef.current || !cgRef.current) return;
        if (!data.move) return;

        const chess = chessRef.current;

        try {
          const move = chess.move(data.move.lan);
          const isCheckmate = chess.isCheckmate();

          syncBoardState(chessRef, cgRef, color, setTurn);
          playSoundForMove(move, isCheckmate);

          // Auto-jump to latest move when opponent moves
          goToLastMove();
        } catch (error) {
          console.error("Failed to apply move:", error);
        }
      }
    );

    // Subscribe to game_ended messages
    const unsubGameEnded = messageDispatcher.subscribe<GameEndedMessage>(
      "game_ended",
      (data) => {
        setGameEnded(true);
        if (data.ratingChanges) {
          setRatingChanges(data.ratingChanges);
        }
      }
    );

    // Subscribe to initial game state
    const unsubInitialState =
      messageDispatcher.subscribe<InitialGameStateMessage>(
        "initial_game_state",
        (data) => {
          if (!chessRef.current || !cgRef.current) return;
          if (!data.data?.fen) return;

          if (data.data.pgn) {
            chessRef.current.loadPgn(data.data.pgn);
          }

          syncBoardState(chessRef, cgRef, color, setTurn);

          if (data.data.isFinished) {
            setGameEnded(true);
          }
        }
      );

    return () => {
      unsubMove();
      unsubGameEnded();
      unsubInitialState();
    };
  }, [
    chessRef,
    cgRef,
    setTurn,
    color,
    playSoundForMove,
    goToLastMove,
    setGameEnded,
    setRatingChanges,
  ]);
};
