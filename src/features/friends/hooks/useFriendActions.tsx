import { useNavigate } from "react-router";
import { useSendFriendRequest } from "../suggestions/hooks/useSendFriendRequest";
import { useRemoveFriend } from "./useRemoveFriend";

export const useFriendActions = () => {
  const navigate = useNavigate();
  const sendFriendRequestMutation = useSendFriendRequest();
  const removeFriendMutation = useRemoveFriend();

  const onChallenge = (id: string) => {
    // Navigate to create game with friend pre-selected
    navigate(`/create-game?friendId=${id}`);
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
