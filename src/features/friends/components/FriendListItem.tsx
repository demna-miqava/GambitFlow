import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import type { Friend } from "@/types";
import { type LucideIcon, MessageSquare, MoreVertical, Sword, UserMinus } from "lucide-react";

interface FriendListItemProps {
  friend: Friend;
  onChallenge?: (friend: Friend) => void;
  onMessage?: (friend: Friend) => void;
  onRemove?: (friend: Friend) => void;
}

interface ActionConfig {
  icon: LucideIcon;
  label: string;
  onClick: (friend: Friend) => void;
  variant?: "outline" | "destructive";
  destructive?: boolean;
}

export const FriendListItem = ({
  friend,
  onChallenge,
  onMessage,
  onRemove,
}: FriendListItemProps) => {
  const actions: ActionConfig[] = [
    onChallenge && {
      icon: Sword,
      label: "Challenge",
      onClick: onChallenge,
      variant: "outline" as const,
    },
    onMessage && {
      icon: MessageSquare,
      label: "Message",
      onClick: onMessage,
      variant: "outline" as const,
    },
    onRemove && {
      icon: UserMinus,
      label: "Remove",
      onClick: onRemove,
      variant: "destructive" as const,
      destructive: true,
    },
  ].filter(Boolean) as ActionConfig[];

  return (
    <div className="flex items-center justify-between p-4 border rounded-lg hover:bg-sidebar-accent/20 transition-colors">
      <div className="flex items-center gap-4">
        <img
          src={friend.image}
          alt={friend.username}
          className="size-12 rounded-full"
        />
        <div className="flex flex-col">
          <span className="font-medium">{friend.username}</span>
          <span className="text-sm text-muted-foreground">
            {friend.fullName}
          </span>
          <span className="text-xs text-muted-foreground">
            Friends for {friend.friendFor}
          </span>
        </div>
      </div>

      {/* Desktop actions - hidden on md and smaller */}
      <div className="hidden lg:flex gap-2">
        {actions.map(({ icon: Icon, label, onClick, variant }) => (
          <Button
            key={label}
            size="sm"
            variant={variant}
            onClick={() => onClick(friend)}
          >
            <Icon className="size-4" />
            {label}
          </Button>
        ))}
      </div>

      {/* Mobile/Tablet dropdown - shown on md and smaller */}
      <div className="lg:hidden">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm">
              <MoreVertical className="size-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {actions.map(({ icon: Icon, label, onClick, destructive }) => (
              <DropdownMenuItem
                key={label}
                onClick={() => onClick(friend)}
                className={
                  destructive ? "text-destructive focus:text-destructive" : ""
                }
              >
                <Icon className="size-4 mr-2" />
                {label}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};
