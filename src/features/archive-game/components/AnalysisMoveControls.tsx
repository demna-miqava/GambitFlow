import { useMemo } from "react";
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  CornerUpLeft,
  RotateCcw,
} from "lucide-react";
import { useArchiveGame } from "../contexts/ArchiveGameContext";
import { Button } from "@/components/ui/button";
import {
  BaseMoveControls,
  type MoveControl,
} from "@/features/game/components/BaseMoveControls";

export const AnalysisMoveControls = () => {
  const {
    goToStart,
    goBack,
    goForward,
    goToEnd,
    exitBranch,
    clearBranches,
    isAtStart,
    isAtEnd,
    isInBranch,
    hasBranches,
  } = useArchiveGame();

  const controls = useMemo<MoveControl[]>(
    () => [
      {
        id: "first",
        icon: ChevronsLeft,
        title: "First move",
        onClick: goToStart,
        disabled: isAtStart,
      },
      {
        id: "previous",
        icon: ChevronLeft,
        title: "Previous move",
        onClick: goBack,
        disabled: isAtStart,
      },
      {
        id: "next",
        icon: ChevronRight,
        title: "Next move",
        onClick: goForward,
        disabled: isAtEnd,
      },
      {
        id: "last",
        icon: ChevronsRight,
        title: "Last move",
        onClick: goToEnd,
        disabled: isAtEnd,
      },
    ],
    [goToStart, goBack, goForward, goToEnd, isAtStart, isAtEnd]
  );

  const additionalActions = (
    <>
      {isInBranch && (
        <Button
          type="button"
          variant="outline"
          className="w-full flex items-center gap-2"
          onClick={exitBranch}
          title="Exit branch and return to main line"
        >
          <CornerUpLeft className="size-4" />
          Exit branch
        </Button>
      )}

      {hasBranches && (
        <Button
          type="button"
          variant="outline"
          className="w-full flex items-center gap-2"
          onClick={clearBranches}
          title="Clear all branches"
        >
          <RotateCcw className="size-4" />
          Reset branches
        </Button>
      )}
    </>
  );

  return (
    <BaseMoveControls
      controls={controls}
      additionalActions={additionalActions}
      className="flex flex-col gap-2"
    />
  );
};
