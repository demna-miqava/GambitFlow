import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/services";
import { QKEY_PENDING_FRIEND_REQUESTS } from "@/consts/queryKeys";

export type FriendRequestAction = "accept" | "reject" | "cancel";

export type FriendRequestActionParams = {
  requestId: string;
  userId: string;
  action: FriendRequestAction;
};

const handleFriendRequestAction = (
  params: FriendRequestActionParams
): Promise<void> => {
  return apiRequest("post", "/friend-requests/handle", { data: params });
};

export const useFriendRequestAction = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: handleFriendRequestAction,
    onSuccess: () => {
      // Invalidate pending friend requests to refresh the lists
      queryClient.invalidateQueries({
        queryKey: [QKEY_PENDING_FRIEND_REQUESTS],
      });
      // Also invalidate friends list in case accept was used
      queryClient.invalidateQueries({ queryKey: ["friends"] });
    },
  });
};
