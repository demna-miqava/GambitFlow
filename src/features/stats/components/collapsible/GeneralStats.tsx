interface GeneralStatsProps {
  numberOfGames: number;
}

const GeneralStats = ({ numberOfGames }: GeneralStatsProps) => {
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="text-gray-300">Games</span>
        </div>
        <span className="text-gray-200 font-medium">
          {numberOfGames.toLocaleString()}
        </span>
      </div>
    </div>
  );
};

export default GeneralStats;
