export const ROUTES = {
  HOME: "/home",
  PLAY: "/play",
  SETTINGS: "/settings",
  GAME: "/game/:gameId",
  PROFILE: {
    ROOT: "/profile/:username",
    OVERVIEW: "",
    GAMES: "games",
    STATS: "stats",
    FRIENDS: "friends",
  },
  AUTH: {
    SIGN_IN: "/signin",
    SIGN_UP: "/signup",
    FORGOT_PASSWORD: "/forgot-password",
  },
  LANDING: "/",
} as const;

// Helper functions for dynamic routes
export const getGameRoute = (gameId: string) => `/game/${gameId}`;
export const getProfileRoute = (username: string) => `/profile/${username}`;
export const getProfileGamesRoute = (username: string) => `/profile/${username}/games`;
export const getProfileStatsRoute = (username: string) => `/profile/${username}/stats`;
export const getProfileFriendsRoute = (username: string) => `/profile/${username}/friends`;
