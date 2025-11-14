import { useQuery } from "@tanstack/react-query";
import { getPendingFriendRequests } from "@/services/friends";
import { useUser } from "@/hooks/useUser";
import { QKEY_PENDING_FRIEND_REQUESTS } from "@/constants/queryKeys";
import { TWO_MINUTES_MS } from "@/constants/time";

export const usePendingFriendRequests = () => {
  const { id: userId } = useUser();

  const query = useQuery({
    queryKey: [QKEY_PENDING_FRIEND_REQUESTS, userId],
    queryFn: getPendingFriendRequests,
    enabled: !!userId,
    staleTime: TWO_MINUTES_MS,
  });

  return {
    ...query,
    sentRequests: query.data?.outgoing || [],
    receivedRequests: query.data?.incoming || [],
  };
};
