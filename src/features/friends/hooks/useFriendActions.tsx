import { useNavigate } from "react-router";
import { useSendFriendRequest } from "../suggestions/hooks/useSendFriendRequest";
import { useRemoveFriend } from "./useRemoveFriend";
import type { Friend } from "@/types";

export const useFriendActions = () => {
  const navigate = useNavigate();
  const sendFriendRequestMutation = useSendFriendRequest();
  const removeFriendMutation = useRemoveFriend();

  const onChallenge = (friend: Friend) => {
    // Navigate to create game with friend pre-selected
    navigate(`/create-game?friendId=${friend.id}`);
  };

  const onRemove = (id: string) => {
    removeFriendMutation.mutate(id);
  };

  const onMessage = (id: string) => {
    // TODO: Navigate to messages when messaging feature is implemented
    console.log("messaging", id);
  };

  const onAddFriend = (id: string) => {
    sendFriendRequestMutation.mutate(id);
  };

  return {
    onChallenge,
    onRemove,
    onMessage,
    onAddFriend,
  };
};
