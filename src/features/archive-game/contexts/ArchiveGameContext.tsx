import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  type ReactNode,
} from "react";
import { Chess, type Square } from "chess.js";
import type { Key } from "@lichess-org/chessground/types";
import { useChessBoardContext } from "@/features/game/contexts/ChessBoardContext";
import { useChessSound } from "@/features/game/hooks/useChessSound";
import { useSettings } from "@/features/settings/SettingsContext";
import { syncBoard } from "@/features/game/utils/board-utils";
import { useArrowKeyNavigation } from "@/features/game/hooks/useArrowKeyNavigation";
import { useAnalysisTree } from "../hooks/useAnalysisTree";
import { useAnalysisNavigation } from "../hooks/useAnalysisNavigation";
import type {
  AnalysisMoveNode,
  AnalysisPosition,
} from "../types/analysis.types";

interface ArchiveGameContextValue {
  // Tree state
  moves: AnalysisMoveNode[];
  currentPosition: AnalysisPosition;
  originalMoves: string[];
  isInBranch: boolean;
  hasBranches: boolean;

  // Navigation state
  isAtStart: boolean;
  isAtEnd: boolean;

  // Navigation actions
  goToStart: () => void;
  goToEnd: () => void;
  goForward: () => void;
  goBack: () => void;
  goToPosition: (position: AnalysisPosition) => void;
  exitBranch: () => void;

  // Tree actions
  clearBranches: () => void;
}

const ArchiveGameContext = createContext<ArchiveGameContextValue | null>(null);

interface ArchiveGameProviderProps {
  children: ReactNode;
  pgn?: string;
}

export const ArchiveGameProvider = ({
  children,
  pgn,
}: ArchiveGameProviderProps) => {
  const { chessRef, cgRef, setTurn } = useChessBoardContext();
  const { settings } = useSettings();
  const { playSoundForMove } = useChessSound(settings?.soundsEnabled);

  // Parse initial moves from PGN
  const initialMoves = useMemo(() => {
    if (!pgn) return [];
    const tempChess = new Chess();
    try {
      tempChess.loadPgn(pgn);
      return tempChess.history({ verbose: true });
    } catch {
      return [];
    }
  }, [pgn]);

  const tree = useAnalysisTree({ initialMoves });
  const navigation = useAnalysisNavigation({
    tree,
    cgRef,
    chessRef,
    setTurn,
  });

  // Handle user making a move on the board
  const handleAnalysisMove = useCallback(
    (orig: Key, dest: Key) => {
      const chess = chessRef.current;
      const cg = cgRef.current;
      if (!chess || !cg) return;

      const fromSquare = orig as Square;
      const toSquare = dest as Square;

      // Create a temporary chess instance to validate move
      const tempChess = new Chess(chess.fen());

      try {
        const move = tempChess.move({
          from: fromSquare,
          to: toSquare,
          promotion: "q", // Auto-promote to queen
        });

        if (move) {
          // Add move to tree (handles branching automatically)
          tree.addMove(move);

          // Update board
          const turn = syncBoard({
            cg,
            chess: tempChess,
            movableColor: "both",
            lastMove: [orig, dest],
          });
          setTurn(turn);

          chessRef.current.load(tempChess.fen());
          playSoundForMove(move, tempChess.isCheckmate());
        }
      } catch {
        cg.set({ fen: chess.fen() });
      }
    },
    [chessRef, cgRef, setTurn, tree, playSoundForMove]
  );

  // Register move handler with Chessground
  useEffect(() => {
    if (!cgRef.current) return;

    cgRef.current.set({
      events: {
        move: handleAnalysisMove,
      },
    });
  }, [cgRef, handleAnalysisMove]);

  // Initialize board state on mount
  useEffect(() => {
    navigation.syncBoardToPosition(tree.currentPosition);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Keyboard navigation
  useArrowKeyNavigation({
    onLeft: navigation.goBack,
    onRight: navigation.goForward,
    onUp: navigation.goToStart,
    onDown: navigation.goToEnd,
  });

  const value = useMemo<ArchiveGameContextValue>(
    () => ({
      moves: tree.moves,
      currentPosition: tree.currentPosition,
      originalMoves: tree.originalMoves,
      isInBranch: tree.isInBranch,
      hasBranches: tree.hasBranches,
      isAtStart: tree.isAtStart,
      isAtEnd: tree.isAtEnd,
      goToStart: navigation.goToStart,
      goToEnd: navigation.goToEnd,
      goForward: navigation.goForward,
      goBack: navigation.goBack,
      goToPosition: navigation.goToPosition,
      exitBranch: navigation.exitBranch,
      clearBranches: tree.clearBranches,
    }),
    [
      tree.moves,
      tree.currentPosition,
      tree.originalMoves,
      tree.isInBranch,
      tree.hasBranches,
      tree.isAtStart,
      tree.isAtEnd,
      tree.clearBranches,
      navigation,
    ]
  );

  return (
    <ArchiveGameContext.Provider value={value}>
      {children}
    </ArchiveGameContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useArchiveGame = () => {
  const context = useContext(ArchiveGameContext);
  if (!context) {
    throw new Error("useArchiveGame must be used within ArchiveGameProvider");
  }
  return context;
};
