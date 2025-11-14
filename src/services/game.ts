import { apiRequest } from ".";
import type { PaginatedGamesResponse, GetUserGamesParams } from "@/types";

export const getUserGames = async ({
  username,
  page = 1,
  limit = 10,
}: GetUserGamesParams): Promise<PaginatedGamesResponse> => {
  return apiRequest<PaginatedGamesResponse>(
    "get",
    `/games/archive/${username}?page=${page}&limit=${limit}`
  );
};
