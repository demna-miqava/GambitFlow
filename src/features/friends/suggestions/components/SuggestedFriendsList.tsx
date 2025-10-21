import { FriendCard } from "../../components/FriendCard";
import type { Friend, FriendSuggestionActionHandlers } from "@/types";

interface SuggestedFriendsListProps extends FriendSuggestionActionHandlers {
  items: Friend[];
  emptyMessage?: string;
}

export const SuggestedFriendsList = ({
  items,
  emptyMessage = "No suggested friends",
  onChallenge,
  onMessage,
  onAddFriend,
}: SuggestedFriendsListProps) => {
  if (items.length === 0 && emptyMessage) {
    return (
      <div className="text-center py-8 text-muted-foreground">
        {emptyMessage}
      </div>
    );
  }

  return (
    <div className="space-y-2">
      {items.map((suggestion) => (
        <FriendCard
          key={suggestion.id}
          friend={suggestion}
          onChallenge={onChallenge}
          onMessage={onMessage}
          onAddFriend={onAddFriend}
        />
      ))}
    </div>
  );
};
