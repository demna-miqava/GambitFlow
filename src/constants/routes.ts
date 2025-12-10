export const ROUTES = {
  HOME: "/home",
  PLAY: "/play",
  SETTINGS: "/settings",
  GAME: "/game/:gameId",
  ARCHIVE_GAME: "/archive/:gameId",
  PROFILE: {
    ROOT: "/profile/:id",
    OVERVIEW: "",
    GAMES: "games",
    STATS: "stats",
    FRIENDS: "friends",
  },
  AUTH: {
    SIGN_IN: "/signin",
    SIGN_UP: "/signup",
    PROFILE_SETUP: "/profile-setup",
  },
  LANDING: "/",
} as const;

// Helper functions for dynamic routes
export const getGameRoute = (gameId: string) => `/game/${gameId}`;
export const getArchiveGameRoute = (gameId: string) => `/archive/${gameId}`;
export const getProfileRoute = (id: number) => `/profile/${id}`;
export const getProfileGamesRoute = (id: number) => `/profile/${id}/games`;
export const getProfileStatsRoute = (id: number) => `/profile/${id}/stats`;
export const getProfileFriendsRoute = (id: number) => `/profile/${id}/friends`;
