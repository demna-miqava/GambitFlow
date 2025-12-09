import { useCallback, useState } from "react";
import type {
  RatingChanges,
  MoveMessage,
  GameEndedMessage,
  InitialGameStateMessage,
} from "@/features/game/types/websocket-messages";
import { syncBoard } from "@/features/game/utils/board-utils";
import { useChessBoardContext } from "@/features/game/contexts/ChessBoardContext";
import { useGameNavigation } from "@/features/game/contexts/GameNavigationContext";
import { useChessSound } from "@/features/game/hooks/useChessSound";
import { useSettings } from "@/features/settings/SettingsContext";
import { useMessageDispatcher } from "@/hooks/useMessageDispatcher";
import { GAME_MESSAGE_TYPES } from "@/features/game/constants/websocket-types";
import { toast } from "sonner";
import { useUser } from "@/hooks/useUser";

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
  const { id: currentUserId } = useUser();

  const [whiteTimeLeft, setWhiteTimeLeft] = useState<number | undefined>(
    undefined
  );
  const [blackTimeLeft, setBlackTimeLeft] = useState<number | undefined>(
    undefined
  );

  // Handle incoming move messages from WebSocket
  const handleIncomingMove = useCallback(
    (data: MoveMessage) => {
      if (!chessRef.current || !cgRef.current) return;
      if (!data.move) return;

      const chess = chessRef.current;
      const isOwnMove = data.userId === currentUserId;
      try {
        // Only apply the move to chess.js if it's from opponent
        if (!isOwnMove) {
          const move = chess.move(data.move.lan);
          const isCheckmate = chess.isCheckmate();

          const turn = syncBoard({
            cg: cgRef.current,
            chess,
            movableColor: color,
            playPremove: true,
          });
          setTurn(turn);
          playSoundForMove(move, isCheckmate);

          // Auto-jump to latest move when opponent moves
          goToLastMove();
        }

        // Always update clocks with server time (for both players)
        if (data.whiteTimeLeft !== undefined) {
          setWhiteTimeLeft(data.whiteTimeLeft);
        }
        if (data.blackTimeLeft !== undefined) {
          setBlackTimeLeft(data.blackTimeLeft);
        }
      } catch {
        toast.error("Failed to sync move. Please refresh the page.");
      }
    },
    [
      chessRef,
      cgRef,
      color,
      setTurn,
      playSoundForMove,
      goToLastMove,
      currentUserId,
    ]
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

      const turn = syncBoard({
        cg: cgRef.current,
        chess: chessRef.current,
        movableColor: color,
        playPremove: true,
      });
      setTurn(turn);

      if (data.data.isFinished) {
        setGameEnded(true);
      }

      // Set initial clock times if provided
      if (data.data.whiteTimeLeft !== undefined) {
        setWhiteTimeLeft(data.data.whiteTimeLeft);
      }
      if (data.data.blackTimeLeft !== undefined) {
        setBlackTimeLeft(data.data.blackTimeLeft);
      }
    },
    [chessRef, cgRef, color, setTurn, setGameEnded]
  );

  // Subscribe to all message types using the reusable hook
  useMessageDispatcher<MoveMessage>(GAME_MESSAGE_TYPES.MOVE, handleIncomingMove);

  useMessageDispatcher<GameEndedMessage>(
    GAME_MESSAGE_TYPES.GAME_ENDED,
    handleGameEnded
  );

  useMessageDispatcher<InitialGameStateMessage>(
    GAME_MESSAGE_TYPES.INITIAL_GAME_STATE,
    handleInitialState
  );

  return { whiteTimeLeft, blackTimeLeft };
};
