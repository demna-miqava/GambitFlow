import { useCallback } from "react";
import { Chess } from "chess.js";
import type { Api } from "@lichess-org/chessground/api";
import type { RefObject } from "react";
import { syncBoard } from "@/features/game/utils/board-utils";
import * as TreeUtils from "../utils/analysisTree";
import type {
  AnalysisMoveNode,
  AnalysisPosition,
} from "../types/analysis.types";

interface AnalysisTree {
  moves: AnalysisMoveNode[];
  currentPosition: AnalysisPosition;
  setCurrentPosition: (position: AnalysisPosition) => void;
}

interface UseAnalysisNavigationOptions {
  tree: AnalysisTree;
  cgRef: RefObject<Api | null>;
  chessRef: RefObject<Chess>;
  setTurn: (turn: "white" | "black") => void;
}

export const useAnalysisNavigation = ({
  tree,
  cgRef,
  chessRef,
  setTurn,
}: UseAnalysisNavigationOptions) => {
  const syncBoardToPosition = useCallback(
    (position: AnalysisPosition) => {
      const cg = cgRef.current;
      if (!cg) return;

      const fen = TreeUtils.buildPositionFen(tree.moves, position);
      const tempChess = new Chess(fen);

      const turn = syncBoard({
        cg,
        chess: tempChess,
        movableColor: "both",
      });
      setTurn(turn);

      chessRef.current.load(fen);
    },
    [cgRef, chessRef, setTurn, tree.moves]
  );

  const goToStart = useCallback(() => {
    const newPosition = TreeUtils.createInitialPosition();
    tree.setCurrentPosition(newPosition);
    syncBoardToPosition(newPosition);
  }, [tree, syncBoardToPosition]);

  const goToEnd = useCallback(() => {
    const newPosition = TreeUtils.goToEndPosition(
      tree.moves,
      tree.currentPosition
    );
    tree.setCurrentPosition(newPosition);
    syncBoardToPosition(newPosition);
  }, [tree, syncBoardToPosition]);

  const goForward = useCallback(() => {
    const newPosition = TreeUtils.goForwardPosition(
      tree.moves,
      tree.currentPosition
    );
    if (newPosition) {
      tree.setCurrentPosition(newPosition);
      syncBoardToPosition(newPosition);
    }
  }, [tree, syncBoardToPosition]);

  const goBack = useCallback(() => {
    const newPosition = TreeUtils.goBackPosition(tree.currentPosition);
    if (newPosition) {
      tree.setCurrentPosition(newPosition);
      syncBoardToPosition(newPosition);
    }
  }, [tree, syncBoardToPosition]);

  const goToPosition = useCallback(
    (position: AnalysisPosition) => {
      tree.setCurrentPosition(position);
      syncBoardToPosition(position);
    },
    [tree, syncBoardToPosition]
  );

  const exitBranch = useCallback(() => {
    const newPosition = TreeUtils.exitBranchPosition(tree.currentPosition);
    tree.setCurrentPosition(newPosition);
    syncBoardToPosition(newPosition);
  }, [tree, syncBoardToPosition]);

  return {
    goToStart,
    goToEnd,
    goForward,
    goBack,
    goToPosition,
    exitBranch,
    syncBoardToPosition,
  };
};
