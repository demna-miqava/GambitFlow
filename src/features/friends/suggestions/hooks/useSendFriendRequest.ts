import { useMutation, useQueryClient } from "@tanstack/react-query";
import { sendFriendRequest } from "@/services/friends";
import {
  QKEY_PENDING_FRIEND_REQUESTS,
  QKEY_SUGGESTED_FRIENDS,
} from "@/constants/queryKeys";
import { useUser } from "@/hooks/useUser";

export const useSendFriendRequest = () => {
  const queryClient = useQueryClient();
  const { id: userId } = useUser();

  return useMutation({
    mutationFn: (receiverId: string) => {
      return sendFriendRequest({ receiverId });
    },
    onSuccess: () => {
      // Invalidate suggested friends to refresh the list
      queryClient.invalidateQueries({ queryKey: [QKEY_SUGGESTED_FRIENDS] });
      queryClient.invalidateQueries({
        queryKey: [QKEY_PENDING_FRIEND_REQUESTS, userId],
      });
    },
    onError: (error) => {
      console.error("Failed to send friend request:", error);
    },
  });
};
