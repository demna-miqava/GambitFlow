import type { GameStats } from "./types";
import ViewFullStatsLink from "./ViewFullStatsLink";
import RatingDelta from "@/features/stats/components/RatingDelta";

interface GameStatsContentProps {
  gameStats: GameStats;
}

const GameStatsContent = ({ gameStats }: GameStatsContentProps) => {
  return (
    <div className="space-y-4">
      {/* Highest Rating */}
      <div className="flex items-center justify-between">
        <span className="text-gray-300">Highest</span>
        <div className="flex items-center gap-2">
          <span className="text-green-400 font-medium">
            {gameStats.highestRating}
          </span>
          <span className="text-gray-400 text-sm">
            ({gameStats.highestDate})
          </span>
        </div>
      </div>

      {/* Games */}
      <div className="flex items-center justify-between">
        <span className="text-gray-300">Games</span>
        <span className="text-gray-200 font-medium">
          {gameStats.games.toLocaleString()}
        </span>
      </div>

      {/* Win/Draw/Loss */}
      <div className="flex items-center justify-between">
        <span className="text-gray-300">W/D/L</span>
        <div className="flex items-center gap-1">
          <span className="text-green-400 font-medium">{gameStats.wins}</span>
          <span className="text-gray-400">/</span>
          <span className="text-gray-400">{gameStats.draws}</span>
          <span className="text-gray-400">/</span>
          <span className="text-red-400">{gameStats.losses}</span>
        </div>
      </div>

      {/* Rating Change Last 30 Days */}
      <div className="flex items-center justify-between">
        <span className="text-gray-300">Rating Change Last 30 Days</span>
        <RatingDelta delta={gameStats.delta} />
      </div>

      <ViewFullStatsLink />
    </div>
  );
};

export default GameStatsContent;
