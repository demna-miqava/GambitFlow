import { Zap, Target, Skull, type LucideIcon } from "lucide-react";
import type { PuzzleMode } from "../types/puzzle.types";

export interface PuzzleModeConfig {
  title: string;
  description: string;
  icon: LucideIcon;
  iconColor: string;
  url: PuzzleMode;
  disabled?: boolean;
}

export const PUZZLE_MODES: PuzzleModeConfig[] = [
  {
    title: "Solve Puzzles",
    description: "Train tactics at your own pace",
    icon: Target,
    iconColor: "text-green-500",
    url: "infinite",
  },
  {
    title: "Puzzle Rush",
    description: "Solve as many as you can in 3 minutes",
    icon: Zap,
    iconColor: "text-yellow-500",
    url: "rush",
  },
  {
    title: "Sudden Death",
    description: "3 lives - one wrong move costs a life",
    icon: Skull,
    iconColor: "text-red-500",
    url: "survival",
  },
];
