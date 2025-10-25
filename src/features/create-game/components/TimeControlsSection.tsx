import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { PLAY_TIME_CONTROLS } from "../consts/timeControls";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";
import { getTimeControlIcon } from "@/utils/timeControl";
import { TimeControlOption } from "./TimeControlOption";
import { useGameSetup } from "../CreateGameContext";

export const TimeControlsSection = () => {
  const { timeControl } = useGameSetup();
  const Icon = getTimeControlIcon(timeControl.format);
  const [open, setOpen] = useState(false);

  return (
    <Collapsible open={open} onOpenChange={setOpen}>
      <CollapsibleTrigger className="w-full m-auto">
        <div className="flex items-center justify-between rounded-lg bg-card border border-border px-3 py-2 text-sm text-foreground hover:bg-accent transition-colors">
          <span className="inline-flex items-center gap-2">
            {Icon && <Icon />}{" "}
            {timeControl.increment > 0
              ? `${timeControl.time / 60} | ${timeControl.increment}`
              : `${timeControl.time / 60} min`}{" "}
            <span className="capitalize">({timeControl.format})</span>
          </span>
          <span className="text-xs text-muted-foreground">
            {open ? <ChevronUp /> : <ChevronDown />}
          </span>
        </div>
      </CollapsibleTrigger>
      <CollapsibleContent>
        <div className="flex flex-col gap-4 px-3 mt-4 mb-8 border rounded-lg py-4">
          {PLAY_TIME_CONTROLS.map((option) => (
            <TimeControlOption
              key={option.label}
              label={option.label}
              icon={option.icon}
              options={option.options}
            />
          ))}
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
};
