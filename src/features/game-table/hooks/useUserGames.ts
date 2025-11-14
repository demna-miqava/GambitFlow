import { useQuery } from "@tanstack/react-query";
import { getUserGames } from "@/services/game";
import { useQueryParams } from "@/hooks/useQueryParams";
import { useUser } from "@/hooks/useUser";
import { QKEY_USER_GAMES } from "@/constants/queryKeys";

interface UseUserGamesOptions {
  defaultPage?: number;
  defaultLimit?: number;
}

export const useUserGames = ({
  defaultPage = 1,
  defaultLimit = 10,
}: UseUserGamesOptions = {}) => {
  const { id: userId, username } = useUser();
  const [pageStr, setPageStr] = useQueryParams("page", String(defaultPage));
  const [limitStr] = useQueryParams("limit", String(defaultLimit));

  const page = parseInt(pageStr) || defaultPage;
  const limit = parseInt(limitStr) || defaultLimit;

  const query = useQuery({
    queryKey: [QKEY_USER_GAMES, username, page, limit],
    queryFn: () => getUserGames({ username: username || "", page, limit }),
    enabled: !!userId,
  });

  const setPage = (newPage: number) => {
    setPageStr(String(newPage));
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
