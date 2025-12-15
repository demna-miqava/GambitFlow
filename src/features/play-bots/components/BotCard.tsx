import { cn } from "@/lib/utils";
import type { Bot } from "../constants/bots";
import { Bot as BotIcon, Trophy } from "lucide-react";

interface BotCardProps {
  bot: Bot;
  isSelected: boolean;
  onSelect: (bot: Bot) => void;
}

const getDifficultyLevel = (rating: number) => {
  if (rating < 800) return "Beginner";
  if (rating < 1500) return "Intermediate";
  if (rating < 2200) return "Advanced";
  return "Expert";
};

export const BotCard = ({ bot, isSelected, onSelect }: BotCardProps) => {
  const difficulty = getDifficultyLevel(bot.rating);

  return (
    <button
      onClick={() => onSelect(bot)}
      className={cn(
        "relative w-full p-5 rounded-xl border-2 text-left transition-all",
        "hover:shadow-lg",
        isSelected
          ? "border-primary bg-primary/5 shadow-md"
          : "border-border bg-card hover:border-primary/50"
      )}
    >
      {/* Avatar Circle */}
      <div className="flex items-start gap-4 mb-3">
        <div
          className={cn(
            "flex h-12 w-12 shrink-0 items-center justify-center rounded-full transition-colors",
            isSelected
              ? "bg-primary text-primary-foreground"
              : "bg-muted text-muted-foreground"
          )}
        >
          <BotIcon className="h-6 w-6" />
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <h3 className="font-semibold text-foreground truncate">
              {bot.name}
            </h3>
            {isSelected && (
              <div className="h-2 w-2 rounded-full bg-primary animate-pulse" />
            )}
          </div>
          <div className="flex items-center gap-2">
            <Trophy className="h-3 w-3 text-muted-foreground" />
            <span className="text-sm font-mono font-semibold text-foreground">
              {bot.rating}
            </span>
            <span className="text-xs font-semibold">({difficulty})</span>
          </div>
        </div>
      </div>

      <p className="text-sm text-muted-foreground line-clamp-2">
        {bot.description}
      </p>
    </button>
  );
};
