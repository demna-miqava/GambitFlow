import { useQuery } from "@tanstack/react-query";
import { getUserGames } from "@/services/game";
import { useQueryParams } from "@/hooks/useQueryParams";
import { useUser } from "@/hooks/useUser";
import { QKEY_USER_GAMES } from "@/consts/queryKeys";

interface UseUserGamesOptions {
  defaultPage?: number;
  defaultLimit?: number;
}

export const useUserGames = ({
  defaultPage = 1,
  defaultLimit = 10,
}: UseUserGamesOptions = {}) => {
  const { id: userId } = useUser();
  const { getNumberParam, setParam } = useQueryParams();

  const page = getNumberParam("page", defaultPage);
  const limit = getNumberParam("limit", defaultLimit);

  const query = useQuery({
    queryKey: [QKEY_USER_GAMES, userId, page, limit],
    queryFn: () => getUserGames({ userId: userId || "", page, limit }),
    enabled: !!userId,
    staleTime: 1000 * 60 * 5,
  });

  const setPage = (newPage: number) => {
    setParam("page", newPage);
  };

  return {
    ...query,
    page,
    limit,
    setPage,
    pagination: query.data?.pagination,
    games: query.data?.data || [],
  };
};
