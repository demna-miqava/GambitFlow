import { useGameSetup } from "../GameSetupContext";
import type { TimeControlType } from "@/types";

interface TimeControlOptionProps {
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  options: Array<{ label: string; time: number; increment: number }>;
}

export const TimeControlOption = ({
  label,
  icon: Icon,
  options,
}: TimeControlOptionProps) => {
  const { timeControl, updateTimeControl } = useGameSetup();
  const formatType = label.toLowerCase() as TimeControlType;

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-2">
        {Icon && <Icon />}
        {label}
      </div>
      <div className="w-full flex justify-between gap-2">
        {options.map((option) => {
          const { label, time, increment } = option;
          const isSelected =
            timeControl.time === time &&
            timeControl.increment === increment &&
            timeControl.format === formatType;
          return (
            <button
              type="button"
              key={`${time}-${increment}`}
              className={`w-full border rounded-md p-2 text-center tracking-normal hover:bg-white/5 transition-colors ${
                isSelected ? "border-lime-400" : ""
              }`}
              onClick={() => {
                updateTimeControl(formatType, time, increment);
              }}
            >
              {label}
            </button>
          );
        })}
      </div>
    </div>
  );
};
