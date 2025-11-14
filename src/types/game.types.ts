export type TimeControlType = "bullet" | "blitz" | "rapid";
export type GameStatus = "in_progress" | "finished";

export type Game = {
  id: number;
  createdAt: Date;
  pgn: string | null;
  fen: string | null;
  winnerId: number | null;
  numMoves: number | null;
  time: number;
  increment: number | null;
  type: TimeControlType;
  status: GameStatus;
  whitePlayer: {
    id: number | null;
    username: string;
    rating: number;
    avatarUrl: string;
  };
  blackPlayer: {
    id: number | null;
    username: string;
    rating: number;
    avatarUrl: string;
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
  username: string;
  page?: number;
  limit?: number;
};
