import { useCallback } from "react";
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
import { useMessageDispatcher } from "@/hooks/useMessageDispatcher";
import { GAME_MESSAGE_TYPES } from "@/features/game/constants/websocket-types";

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

  // Handle move messages
  const handleMove = useCallback(
    (data: MoveMessage) => {
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
    },
    [chessRef, cgRef, color, setTurn, playSoundForMove, goToLastMove]
  );

  // Handle game_ended messages
  const handleGameEnded = useCallback(
    (data: GameEndedMessage) => {
      setGameEnded(true);
      if (data.ratingChanges) {
        setRatingChanges(data.ratingChanges);
      }
    },
    [setGameEnded, setRatingChanges]
  );

  // Handle initial game state
  const handleInitialState = useCallback(
    (data: InitialGameStateMessage) => {
      if (!chessRef.current || !cgRef.current) return;
      if (!data.data?.fen) return;

      if (data.data.pgn) {
        chessRef.current.loadPgn(data.data.pgn);
      }

      syncBoardState(chessRef, cgRef, color, setTurn);

      if (data.data.isFinished) {
        setGameEnded(true);
      }
    },
    [chessRef, cgRef, color, setTurn, setGameEnded]
  );

  // Subscribe to all message types using the reusable hook
  useMessageDispatcher<MoveMessage>(GAME_MESSAGE_TYPES.MOVE, handleMove);

  useMessageDispatcher<GameEndedMessage>(
    GAME_MESSAGE_TYPES.GAME_ENDED,
    handleGameEnded
  );

  useMessageDispatcher<InitialGameStateMessage>(
    GAME_MESSAGE_TYPES.INITIAL_GAME_STATE,
    handleInitialState
  );
};
