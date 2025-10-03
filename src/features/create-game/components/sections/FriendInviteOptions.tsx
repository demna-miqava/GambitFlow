import { useState } from "react";
import { Crown } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";

import { TimeControlsSection } from "../TimeControlsSection";

type ColorChoice = "white" | "random" | "black";

const COLOR_CHOICES: ColorChoice[] = ["white", "random", "black"];

export const FriendInviteOptions = () => {
  const [colorChoice, setColorChoice] = useState<ColorChoice>("random");

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col items-center gap-3">
        <Avatar className="size-20">
          <AvatarImage
            src="https://images.chesscomfiles.com/uploads/v1/user/195303573.7eeab86b.50x50o.4f5a7d721b05.jpg"
            className="rounded-md object-cover"
          />
          <AvatarFallback>A</AvatarFallback>
        </Avatar>
        <div className="flex items-center gap-1">
          <span className="text-md font-medium">joffarex</span>
          <span className="text-md font-medium">(300)</span>
        </div>
      </div>

      <TimeControlsSection />

      <section className="flex justify-between items-center">
        <p className="text-sm font-semibold">I play as</p>
        <div className="flex gap-3">
          {COLOR_CHOICES.map((choice) => {
            const isActive = colorChoice === choice;
            const bgColor =
              choice === "white" ? "bg-white" :
              choice === "black" ? "bg-[#1a1a1a]" :
              "bg-sidebar";
            const borderColor = isActive
              ? "border-lime-400 shadow-[0_0_0_1px_rgba(163,230,53,0.4)]"
              : "border-sidebar-border hover:border-lime-300";

            return (
              <button
                key={choice}
                type="button"
                aria-pressed={isActive}
                onClick={() => setColorChoice(choice)}
                className={`relative size-12 flex items-center justify-center rounded-md border transition-all ${borderColor} ${bgColor}`}
              >
                {choice === "random" ? (
                  <div className="absolute inset-0 grid grid-cols-2 overflow-hidden rounded-md">
                    <span className="bg-white" />
                    <span className="bg-[#1a1a1a]" />
                  </div>
                ) : (
                  <Crown className={`size-6 ${choice === "white" ? "text-black" : "text-white"}`} />
                )}
              </button>
            );
          })}
        </div>
      </section>

      <div className="flex items-center justify-between">
        <p className="text-sm font-semibold">Rated</p>
        <Switch className="text-lime-400 bg-lime-400/10" />
      </div>

      <Button variant="secondary" size="lg">
        Send Challenge
      </Button>
    </div>
  );
};
