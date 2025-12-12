import { ROUTES } from "@/constants/routes";
import { Zap, Target, type LucideIcon } from "lucide-react";

export interface PuzzleMode {
    title: string;
    description: string;
    icon: LucideIcon;
    iconColor: string;
    url: string;
    disabled?: boolean;
}

export const PUZZLE_MODES: PuzzleMode[] = [
    {
        title: "Solve Puzzles",
        description: "Train tactics at your own pace",
        icon: Target,
        iconColor: "text-green-500",
        url: ROUTES.PUZZLES_SOLVE,
    },
    {
        title: "Puzzle Rush",
        description: "Race against the clock",
        icon: Zap,
        iconColor: "text-yellow-500",
        url: ROUTES.PUZZLE_RUSH,
        disabled: true,
    },
];
