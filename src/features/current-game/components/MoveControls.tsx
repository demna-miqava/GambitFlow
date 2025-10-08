import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";
import { useCurrentGame } from "../CurrentGameContext";

const MoveControls = () => {
  const {
    goToFirstMove,
    goToPreviousMove,
    goToNextMove,
    goToLastMove,
    isAtStart,
    isAtEnd,
  } = useCurrentGame();

  const moveControls = [
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
  ];

  return (
    <div className="flex w-full gap-2">
      {moveControls.map((control) => (
        <button
          key={control.id}
          className="flex flex-1 items-center justify-center rounded-md bg-[#2f2f2f] py-2 text-white transition-colors hover:bg-[#3d3d3d] disabled:cursor-not-allowed disabled:opacity-50"
          title={control.title}
          onClick={control.onClick}
          disabled={control.disabled}
        >
          <control.icon className="size-4" />
        </button>
      ))}
    </div>
  );
};

export default MoveControls;
