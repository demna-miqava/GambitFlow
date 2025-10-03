export interface GameStats {
  rating: number;
  delta: number;
  highestRating: number;
  highestDate: string;
  games: number;
  wins: number;
  losses: number;
  draws: number;
}

export interface Stats {
  bullet: GameStats;
  blitz: GameStats;
  rapid: GameStats;
}
