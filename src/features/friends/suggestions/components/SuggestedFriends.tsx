import { useSuggestedFriends } from "../hooks/useSuggestedFriends";
import { SuggestedFriendsList } from "./SuggestedFriendsList";
import { useQueryParams } from "@/hooks/useQueryParams";
import { useFriendActions } from "../../hooks/useFriendActions";

export const SuggestedFriends = () => {
  const { onChallenge, onMessage, onAddFriend } = useFriendActions();
  const { getParam } = useQueryParams();
  const search = getParam("search") || "";
  const { suggestions } = useSuggestedFriends(search);

  if (suggestions.length === 0) {
    return null;
  }

  return (
    <div className="space-y-4 mt-8">
      <h3 className="text-lg font-semibold">Suggested Friends</h3>
      <SuggestedFriendsList
        items={suggestions}
        emptyMessage=""
        onChallenge={onChallenge}
        onMessage={onMessage}
        onAddFriend={onAddFriend}
      />
    </div>
  );
};
