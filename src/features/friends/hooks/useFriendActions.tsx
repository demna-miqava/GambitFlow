import { useNavigate } from "react-router-dom";
import { useSendFriendRequest } from "../suggestions/hooks/useSendFriendRequest";
import { useRemoveFriend } from "./useRemoveFriend";
import type { Friend } from "@/types";
import { ROUTES } from "@/constants/routes";

export const useFriendActions = () => {
  const navigate = useNavigate();
  const sendFriendRequestMutation = useSendFriendRequest();
  const removeFriendMutation = useRemoveFriend();

  const onChallenge = (friend: Friend) => {
    const { username, avatarUrl, blitzRating, bulletRating, rapidRating, id } =
      friend;
    navigate(ROUTES.PLAY, {
      state: {
        section: "friend-invite-options",
        selectedFriend: {
          id,
          username,
          avatarUrl,
          blitzRating,
          bulletRating,
          rapidRating,
        },
      },
    });
  };

  const onRemove = (id: string) => {
    removeFriendMutation.mutate(id);
  };

  const onMessage = (_id: string) => {
    // TODO: Navigate to messages when messaging feature is implemented
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
