import { Accordion } from "@/components/ui/accordion";
import { useGetStats } from "../../hooks/useGetStats";
import StatsHeader from "./StatsHeader";
import GeneralStats from "./GeneralStats";
import GameTypeAccordion from "./GameTypeAccordion";

const CollapsibleStats = () => {
  const { numberOfGames, stats } = useGetStats();

  return (
    <div className="space-y-4">
      <StatsHeader />
      <GeneralStats numberOfGames={numberOfGames} />

      <Accordion type="single" collapsible className="w-full">
        {Object.entries(stats).map(([gameType, gameStats]) => (
          <GameTypeAccordion
            key={gameType}
            gameType={gameType}
            gameStats={gameStats}
          />
        ))}
      </Accordion>
    </div>
  );
};

export default CollapsibleStats;
