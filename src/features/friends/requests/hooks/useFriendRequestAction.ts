import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/services";
import {
  QKEY_PENDING_FRIEND_REQUESTS,
  QKEY_USER_FRIENDS,
} from "@/constants/queryKeys";
import { useUser } from "@/hooks/useUser";

export type FriendRequestAction = "accept" | "decline" | "cancel";

export type FriendRequestActionParams = {
  requestId: string;
  action: FriendRequestAction;
};

const ACTION_CONFIG: Record<
  FriendRequestAction,
  { method: "post" | "delete"; path: string }
> = {
  accept: { method: "post", path: "accept" },
  decline: { method: "post", path: "decline" },
  cancel: { method: "delete", path: "" },
};

const handleFriendRequestAction = async (
  params: FriendRequestActionParams
): Promise<void> => {
  const { requestId, action } = params;
  const config = ACTION_CONFIG[action];

  const endpoint = `/friend-requests/${requestId}${
    config.path ? `/${config.path}` : ""
  }`;
  return apiRequest(config.method, endpoint);
};

export const useFriendRequestAction = () => {
  const queryClient = useQueryClient();
  const { id: userId } = useUser();

  return useMutation({
    mutationFn: handleFriendRequestAction,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QKEY_PENDING_FRIEND_REQUESTS, userId],
      });
      queryClient.invalidateQueries({ queryKey: [QKEY_USER_FRIENDS] });
    },
  });
};
