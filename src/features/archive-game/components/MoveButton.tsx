import { cn } from "@/lib/utils";

interface MoveButtonProps {
  move: string;
  isActive: boolean;
  onClick: () => void;
}

export const MoveButton = ({ move, isActive, onClick }: MoveButtonProps) => {
  return (
    <button
      onClick={onClick}
      className={cn(
        "px-1.5 py-0.5 rounded text-sm font-medium transition-colors",
        "hover:bg-accent hover:text-accent-foreground",
        "focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1",
        isActive && "bg-primary text-primary-foreground"
      )}
    >
      {move}
    </button>
  );
};
