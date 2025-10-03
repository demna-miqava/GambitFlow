import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import type { GameStats } from "./types";
import GameStatsContent from "./GameStatsContent";
import { TIME_CONTROL_ICONS } from "@/consts";

interface GameTypeAccordionProps {
  gameType: string;
  gameStats: GameStats;
}

const GameTypeAccordion = ({ gameType, gameStats }: GameTypeAccordionProps) => {
  const IconComponent =
    TIME_CONTROL_ICONS[gameType as keyof typeof TIME_CONTROL_ICONS];

  return (
    <AccordionItem value={gameType} className="border-gray-700">
      <AccordionTrigger className="hover:no-underline py-3">
        <div className="flex items-center justify-between w-full mr-4">
          <div className="flex items-center gap-3">
            <IconComponent />
            <span className="text-gray-300 capitalize">{gameType}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-gray-200 font-medium">
              {gameStats.rating}
            </span>
          </div>
        </div>
      </AccordionTrigger>
      <AccordionContent className="pt-4">
        <GameStatsContent gameStats={gameStats} />
      </AccordionContent>
    </AccordionItem>
  );
};

export default GameTypeAccordion;
