import { Home, Puzzle, Settings, Gamepad2, Wrench, type LucideIcon } from "lucide-react";
import { ROUTES, getProfileGamesRoute, getProfileStatsRoute, getPuzzleModeRoute } from "@/constants/routes";

export interface SidebarItem {
  title: string;
  url?: string | ((id: number) => string);
  icon: LucideIcon;
  color: string;
  disabled?: boolean;
  items?: {
    title: string;
    url: string | ((id: number) => string);
    disabled?: boolean;
  }[];
}


export const SIDEBAR_ITEMS: SidebarItem[] = [
  {
    title: "Home",
    icon: Home,
    color: "text-muted-foreground",
    url: ROUTES.HOME,
    items: [
      {
        title: "Home",
        url: ROUTES.HOME,
      },
      {
        title: "Stats",
        url: (id: number) => getProfileStatsRoute(id),
      },
      {
        title: "Profile",
        url: (id: number) => `/profile/${id}`,
      }
    ]
  },
  {
    title: "Play",
    icon: Gamepad2,
    color: "text-muted-foreground",
    url: ROUTES.PLAY,
    items: [
      {
        title: "Play Online",
        url: ROUTES.PLAY,
      },
      {
        title: "Play Bots",
        url: ROUTES.PLAY,
        disabled: true,
      },
      {
        title: "Game History",
        url: (id: number) => getProfileGamesRoute(id),
      }
    ]
  },
  {
    title: "Puzzles",
    icon: Puzzle,
    color: "text-muted-foreground",
    url: ROUTES.PUZZLES,
    items: [
      {
        title: "Solve Puzzles",
        url: getPuzzleModeRoute("infinite"),
      },
      {
        title: "Puzzle Rush",
        url: getPuzzleModeRoute("rush"),
      },
      {
        title: "Sudden Death",
        url: getPuzzleModeRoute("survival"),
      },
    ],
  },
  {
    title: "Tools",
    icon: Wrench,
    color: "text-muted-foreground",
    url: ROUTES.TOOLS.ANALYSIS_BOARD,
    items: [
      {
        title: "Import Game",
        url: ROUTES.TOOLS.IMPORT_GAME,
      },
      {
        title: "Analysis Board",
        url: ROUTES.TOOLS.ANALYSIS_BOARD,
      },
    ],
  },
  {
    title: "Settings",
    url: ROUTES.SETTINGS,
    icon: Settings,
    color: "text-muted-foreground",
  },
];

export const getSidebarItems = (id: number) => {
  return SIDEBAR_ITEMS.map((item) => ({
    ...item,
    url: typeof item.url === "function" ? item.url(id) : item.url,
    items: item.items?.map(subItem => ({
      ...subItem,
      url: typeof subItem.url === "function" ? subItem.url(id) : subItem.url
    }))
  }));
};

