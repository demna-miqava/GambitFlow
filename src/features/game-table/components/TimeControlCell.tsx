import { getTimeControlIcon } from "@/utils/timeControl";

interface TimeControlCellProps {
  type: string;
  timeControl: string;
}

export const TimeControlCell = ({
  type,
  timeControl,
}: TimeControlCellProps) => {
  const Icon = getTimeControlIcon(type);

  return (
    <div className="flex flex-col items-center gap-1 text-xs text-white/70">
      <Icon />
      <span className="font-medium text-gray-400">{timeControl}</span>
    </div>
  );
};
