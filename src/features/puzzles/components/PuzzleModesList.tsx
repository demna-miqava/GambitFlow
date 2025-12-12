import { PUZZLE_MODES } from "../config/puzzleModes";
import { PuzzleModeItem } from "./PuzzleModeItem";

export const PuzzleModesList = () => {
  return (
    <section className="grid gap-4">
      {PUZZLE_MODES.map((mode) => (
        <PuzzleModeItem key={mode.title} mode={mode} />
      ))}
    </section>
  );
};
