import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { TIME_CONTROL_ICONS } from "@/constants/timeControlIcons";
import { useQueryParams } from "@/hooks/useQueryParams";
import { ChartNoAxesColumnIncreasing } from "lucide-react";

const STATS_OPTIONS = [
  {
    label: "All",
    value: "all",
    icon: ChartNoAxesColumnIncreasing,
  },
  {
    label: "Bullet",
    value: "bullet",
    icon: TIME_CONTROL_ICONS.bullet,
  },
  {
    label: "Blitz",
    value: "blitz",
    icon: TIME_CONTROL_ICONS.blitz,
  },
  {
    label: "Rapid",
    value: "rapid",
    icon: TIME_CONTROL_ICONS.rapid,
  },
];
const StatsVariantSelect = () => {
  const [selectedStat, setSelectedStat] = useQueryParams("variant", "all");

  return (
    <Select value={selectedStat} onValueChange={setSelectedStat}>
      <SelectTrigger className="w-40 py-4">
        <SelectValue placeholder="All stats" />
      </SelectTrigger>
      <SelectContent>
        {STATS_OPTIONS.map((option) => (
          <SelectItem key={option.value} value={option.value}>
            <option.icon /> {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default StatsVariantSelect;
