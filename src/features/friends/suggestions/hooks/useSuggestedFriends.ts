import { useQuery } from "@tanstack/react-query";
import { getFriendSuggestions } from "@/services/friends";
import { useUser } from "@/hooks/useUser";
import { QKEY_SUGGESTED_FRIENDS } from "@/consts/queryKeys";

export const useSuggestedFriends = (searchQuery?: string) => {
  const { id: userId } = useUser();

  const buildQuery = () => {
    const params = new URLSearchParams();
    if (userId) params.append("userId", userId.toString());
    if (searchQuery) params.append("username", searchQuery);
    return params.toString();
  };

  const query = useQuery({
    queryKey: [QKEY_SUGGESTED_FRIENDS, userId, searchQuery],
    queryFn: () => getFriendSuggestions(buildQuery()),
    enabled: !!(userId && searchQuery),
    staleTime: 1000 * 60 * 5, // 5 minutes
  });

  return {
    ...query,
    suggestions: query.data?.data || [],
  };
};
