import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { BOTS, type Bot } from "../constants/bots";
import { BotCard } from "./BotCard";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import type { PlayerColorOption } from "@/types/game.types";

const colorOptions: PlayerColorOption[] = ["white", "black", "random"];

export const BotSelector = () => {
  const [selectedBot, setSelectedBot] = useState<Bot | null>(null);
  const [selectedColor, setSelectedColor] =
    useState<PlayerColorOption>("random");
  const navigate = useNavigate();

  const handleStartGame = () => {
    if (!selectedBot) return;

    const finalColor =
      selectedColor === "random"
        ? Math.random() > 0.5
          ? "white"
          : "black"
        : selectedColor;
    console.log("selectedBot", selectedBot);
    navigate("/bot-game", {
      state: {
        bot: selectedBot,
        color: finalColor,
        gameKey: Date.now(),
      },
    });
  };

  return (
    <div className="flex items-center justify-center p-4">
      <Card className="w-full max-w-lg flex flex-col">
        <CardHeader>
          <CardTitle className="text-center">Play Against a Bot</CardTitle>
        </CardHeader>
        <CardContent className="flex-1 flex flex-col space-y-4 min-h-0">
          <div className="flex-1 flex flex-col space-y-2 min-h-0">
            <label className="text-sm font-medium text-foreground">
              Select Opponent
            </label>
            <ScrollArea className="h-[400px] rounded-md border p-2">
              <div className="space-y-2 pr-4">
                {BOTS.map((bot) => (
                  <BotCard
                    key={bot.id}
                    bot={bot}
                    isSelected={selectedBot?.id === bot.id}
                    onSelect={setSelectedBot}
                  />
                ))}
              </div>
            </ScrollArea>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">
              Play As
            </label>
            <div className="grid grid-cols-3 gap-2">
              {colorOptions.map((color) => (
                <Button
                  variant={selectedColor === color ? "default" : "outline"}
                  onClick={() => setSelectedColor(color)}
                  className="w-full capitalize"
                >
                  {color}
                </Button>
              ))}
            </div>
          </div>

          <Button
            onClick={handleStartGame}
            disabled={!selectedBot}
            className="w-full"
            size="lg"
          >
            {selectedBot
              ? `Play vs ${selectedBot.name}`
              : "Select a Bot to Play"}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};
