import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useQueryParams } from "@/hooks/useQueryParams";
import { Calendar, CalendarDays } from "lucide-react";
import { useMemo } from "react";

const STATS_DAYS_OPTIONS = [
  {
    label: "All time",
    value: "all-time",
  },
  {
    label: "30 days",
    value: "30",
  },
  {
    label: "90 days",
    value: "90",
  },
  {
    label: "1 year",
    value: "365",
  },
];

const StatsDaysSelect = () => {
  const [selectedDays, setSelectedDays] = useQueryParams("days", "all-time");

  const label = useMemo(
    () =>
      STATS_DAYS_OPTIONS.find((option) => option.value === selectedDays)?.label,
    [selectedDays]
  );

  return (
    <Select
      value={selectedDays}
      onValueChange={(value) => {
        setSelectedDays(value);
      }}
    >
      <SelectTrigger className="w-40 py-4">
        <SelectValue placeholder="All stats">
          {selectedDays === "all-time" ? <Calendar /> : <CalendarDays />}{" "}
          {label}
        </SelectValue>
      </SelectTrigger>
      <SelectContent>
        {STATS_DAYS_OPTIONS.map((option) => (
          <SelectItem key={option.value} value={option.value}>
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default StatsDaysSelect;
