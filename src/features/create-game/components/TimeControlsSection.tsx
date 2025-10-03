import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { PLAY_TIME_CONTROLS } from "../consts/timeControls";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";
import { TIME_CONTROL_ICONS } from "@/consts";

export const TimeControlsSection = () => {
  const type = "blitz";
  const Icon = TIME_CONTROL_ICONS[type as keyof typeof TIME_CONTROL_ICONS];
  const [open, setOpen] = useState(false);
  return (
    <Collapsible open={open} onOpenChange={setOpen}>
      <CollapsibleTrigger className="w-full m-auto">
        <div className="flex items-center justify-between rounded-lg bg-[#1f1f1f] px-3 py-2 text-sm text-white/80">
          <span className="inline-flex items-center gap-2">
            <Icon /> 3 min ({type})
          </span>
          <span className="text-xs text-white/50">
            {open ? <ChevronUp /> : <ChevronDown />}
          </span>
        </div>
      </CollapsibleTrigger>
      <CollapsibleContent>
        <div className="flex flex-col gap-4 px-3 mt-4 mb-8 border rounded-lg py-4">
          {PLAY_TIME_CONTROLS.map((option) => {
            console.log("option", option);
            const { label, options } = option;
            return (
              <div key={label} className="flex flex-col gap-4">
                <div className="flex items-center gap-2">
                  <option.icon />
                  {label}
                </div>
                <div className="w-full flex justify-between gap-2">
                  {options.map((option) => {
                    const { label, value } = option;
                    return (
                      <div
                        key={value}
                        className="w-full border rounded-md p-2 text-center tracking-normal"
                      >
                        {label}
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
};
