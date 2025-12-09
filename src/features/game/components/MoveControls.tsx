import { useMemo } from "react";
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";
import { useGameNavigation } from "@/features/game/contexts/GameNavigationContext";
import { BaseMoveControls, type MoveControl } from "./BaseMoveControls";

const MoveControls = () => {
  const {
    goToFirstMove,
    goToPreviousMove,
    goToNextMove,
    goToLastMove,
    isAtStart,
    isAtEnd,
  } = useGameNavigation();

  const controls = useMemo<MoveControl[]>(
    () => [
      {
        id: "first",
        icon: ChevronsLeft,
        title: "First move",
        onClick: goToFirstMove,
        disabled: isAtStart,
      },
      {
        id: "previous",
        icon: ChevronLeft,
        title: "Previous move",
        onClick: goToPreviousMove,
        disabled: isAtStart,
      },
      {
        id: "next",
        icon: ChevronRight,
        title: "Next move",
        onClick: goToNextMove,
        disabled: isAtEnd,
      },
      {
        id: "last",
        icon: ChevronsRight,
        title: "Last move",
        onClick: goToLastMove,
        disabled: isAtEnd,
      },
    ],
    [goToFirstMove, goToPreviousMove, goToNextMove, goToLastMove, isAtStart, isAtEnd]
  );

  return <BaseMoveControls controls={controls} />;
};

export default MoveControls;
