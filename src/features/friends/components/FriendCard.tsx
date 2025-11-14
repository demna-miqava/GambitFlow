import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { UserAvatar } from "@/components/UserAvatar";
import type { Friend } from "@/types";
import {
  MessageSquare,
  MoreVertical,
  Sword,
  UserMinus,
  UserRoundPlus,
} from "lucide-react";

interface FriendCardProps<T extends Friend> {
  friend: T;
  onChallenge?: (id: Friend) => void;
  onMessage?: (id: string) => void;
  onRemove?: (id: string) => void;
  onAddFriend?: (id: string) => void;
  secondaryText?: React.ReactNode;
}

export function FriendCard<T extends Friend>({
  friend,
  onChallenge,
  onMessage,
  onRemove,
  onAddFriend,
  secondaryText,
}: FriendCardProps<T>) {
  const actions = [
    onChallenge && {
      icon: Sword,
      label: "Challenge",
      onClick: () => onChallenge(friend),
    },
    onMessage && {
      icon: MessageSquare,
      label: "Message",
      onClick: () => onMessage(friend.id),
    },
    onAddFriend && {
      icon: UserRoundPlus,
      label: "Add Friend",
      onClick: () => onAddFriend(friend.id),
      variant: "default" as const,
    },
    onRemove && {
      icon: UserMinus,
      label: "Remove",
      onClick: () => onRemove(friend.id),
      variant: "destructive" as const,
      destructive: true,
    },
  ].filter(Boolean) as Array<{
    icon: typeof Sword;
    label: string;
    onClick: () => void;
    variant?: "default" | "destructive" | "outline";
    destructive?: boolean;
  }>;

  return (
    <div className="flex items-center justify-between rounded-lg border p-4">
      <div className="flex items-center gap-3">
        <UserAvatar src={friend.avatarUrl} username={friend.username} />
        <div className="flex flex-col">
          <span className="font-medium">{friend.username}</span>
          {secondaryText && (
            <span className="text-xs text-muted-foreground">
              {secondaryText}
            </span>
          )}
        </div>
      </div>

      <div className="flex items-center gap-2">
        {/* Desktop actions */}
        <div className="hidden gap-2 md:flex">
          {actions.map(
            ({ icon: Icon, label, onClick, variant = "outline" }) => (
              <Button key={label} size="sm" variant={variant} onClick={onClick}>
                <Icon className="size-4" />
                {label}
              </Button>
            )
          )}
        </div>

        {/* Mobile dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild className="md:hidden">
            <Button variant="ghost" size="sm">
              <MoreVertical className="size-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {actions.map(({ icon: Icon, label, onClick, destructive }) => (
              <DropdownMenuItem
                key={label}
                onClick={onClick}
                className={
                  destructive ? "text-destructive focus:text-destructive" : ""
                }
              >
                <Icon className="mr-2 size-4" />
                {label}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}
