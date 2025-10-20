import { apiRequest } from ".";

export type Game = {
  id: string;
  result: string;
  timeControl: string;
  type: string;
  createdAt: string;
  pgn?: string;
  moves?: string;
  players: {
    white: {
      userName: string;
      rating: number;
      image: string | null;
    };
    black: {
      userName: string;
      rating: number;
      image: string | null;
    };
  };
};

export type PaginatedGamesResponse = {
  data: Game[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
};

export type GetUserGamesParams = {
  userId: string;
  page?: number;
  limit?: number;
};

export const getUserGames = async ({
  userId,
  page = 1,
  limit = 10,
}: GetUserGamesParams): Promise<PaginatedGamesResponse> => {
  return apiRequest<PaginatedGamesResponse>(
    "get",
    `/games/archive/${userId}?page=${page}&limit=${limit}`
  );
};
