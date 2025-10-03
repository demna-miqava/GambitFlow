export const useGetStats = () => {
  const numberOfGames = 3800;

  const stats = {
    bullet: {
      rating: 1251,
      delta: 83,
      highestRating: 1300,
      wins: 500,
      losses: 300,
      draws: 200,
      highestDate: "Sep 28, 2025",
      games: 1200,
    },
    blitz: {
      rating: 1415,
      delta: 292,
      highestRating: 1500,
      wins: 500,
      losses: 300,
      draws: 200,
      highestDate: "Sep 18, 2025",
      games: 1500,
    },
    rapid: {
      rating: 1574,
      delta: -9,
      highestRating: 1600,
      wins: 500,
      losses: 300,
      draws: 200,
      highestDate: "Sep 28, 2025",
      games: 1300,
    },
  };
  return {
    stats,
    numberOfGames,
  };
};
