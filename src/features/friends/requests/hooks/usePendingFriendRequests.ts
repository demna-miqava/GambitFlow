import { useQuery } from "@tanstack/react-query";
import { getPendingFriendRequests } from "@/services/friends";
import { useUser } from "@/hooks/useUser";
import { QKEY_PENDING_FRIEND_REQUESTS } from "@/consts/queryKeys";

export const usePendingFriendRequests = () => {
  const { id: userId } = useUser();

  const query = useQuery({
    queryKey: [QKEY_PENDING_FRIEND_REQUESTS, userId],
    queryFn: getPendingFriendRequests,
    enabled: !!userId,
    staleTime: 1000 * 60 * 2, // 2 minutes
  });

  return {
    ...query,
    sentRequests: query.data?.sent || [],
    receivedRequests: query.data?.received || [],
  };
};
