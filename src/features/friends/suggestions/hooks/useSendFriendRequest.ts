import { useMutation, useQueryClient } from "@tanstack/react-query";
import { sendFriendRequest } from "@/services/friends";
import { useUser } from "@/hooks/useUser";
import { QKEY_SUGGESTED_FRIENDS } from "@/consts/queryKeys";

export const useSendFriendRequest = () => {
  const queryClient = useQueryClient();
  const { id: senderId } = useUser();

  return useMutation({
    mutationFn: (receiverId: string) => {
      if (!senderId) {
        throw new Error("User not authenticated");
      }
      return sendFriendRequest({ senderId, receiverId });
    },
    onSuccess: () => {
      // Invalidate suggested friends to refresh the list
      queryClient.invalidateQueries({ queryKey: [QKEY_SUGGESTED_FRIENDS] });
    },
    onError: (error) => {
      console.error("Failed to send friend request:", error);
    },
  });
};
