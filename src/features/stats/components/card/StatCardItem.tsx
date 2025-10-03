import { getTimeControlIcon } from "@/utils/timeControl";

interface StatCardItemProps {
  gameType: string;
  rating: number;
}

const StatCardItem = ({ gameType, rating }: StatCardItemProps) => {
  const IconComponent = getTimeControlIcon(gameType);

  return (
    <>
      <div className="flex items-center gap-3">
        <IconComponent />
        <span className="text-gray-300 capitalize">{gameType}</span>
      </div>
      <div className="flex items-center gap-2">
        <span className="text-gray-200 font-medium">{rating}</span>
      </div>
    </>
  );
};

export default StatCardItem;
