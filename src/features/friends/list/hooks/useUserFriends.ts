import { useQuery } from "@tanstack/react-query";
import { searchFriends } from "@/services/friends";
import { useUser } from "@/hooks/useUser";
import { useQueryParams } from "@/hooks/useQueryParams";
import { QKEY_USER_FRIENDS } from "@/consts/queryKeys";

interface UseUserFriendsOptions {
  defaultPage?: number;
  defaultLimit?: number;
  searchQuery?: string;
}

export const useUserFriends = ({
  defaultPage = 1,
  defaultLimit = 20,
  searchQuery,
}: UseUserFriendsOptions = {}) => {
  const { id: userId } = useUser();
  const { getNumberParam, getParam, setParam } = useQueryParams();

  const page = getNumberParam("page", defaultPage);

  // Use searchQuery prop if provided, otherwise read from URL params
  const search =
    searchQuery !== undefined ? searchQuery : getParam("search") || "";

  const buildQuery = () => {
    const params = new URLSearchParams();
    if (userId) params.append("userId", userId.toString());
    if (search) params.append("username", search);
    params.append("page", String(page));
    params.append("limit", String(defaultLimit));
    return params.toString();
  };

  const query = useQuery({
    queryKey: [QKEY_USER_FRIENDS, userId, page, defaultLimit, search],
    queryFn: () => searchFriends(buildQuery()),
    enabled: !!userId,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });

  const totalPages = query.data?.pagination.totalPages ?? 1;

  const setPage = (newPage: number) => {
    setParam("page", newPage);
  };

  return {
    friends: query.data?.data || [],
    pagination: query.data?.pagination,
    page,
    limit: defaultLimit,
    search,
    setPage,
    hasNextPage: page < totalPages,
    hasPreviousPage: page > 1,
    isLoading: query.isPending,
    isError: query.isError,
  };
};
