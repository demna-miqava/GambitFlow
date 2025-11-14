import { Home, Puzzle, Settings, User, type LucideIcon } from "lucide-react";

export interface SidebarItem {
  title: string;
  url: string | ((username: string) => string);
  icon: LucideIcon;
  color: string;
}

export const SIDEBAR_ITEMS: SidebarItem[] = [
  {
    title: "Home",
    url: "/home",
    icon: Home,
    color: "text-sky-600 dark:text-sky-400",
  },
  {
    title: "Puzzles",
    url: "/home",
    icon: Puzzle,
    color: "text-violet-600 dark:text-violet-400",
  },
  {
    title: "Profile",
    url: (username: string) => `/profile/${username}`,
    icon: User,
    color: "text-emerald-600 dark:text-emerald-400",
  },
  {
    title: "Settings",
    url: "/settings",
    icon: Settings,
    color: "text-amber-600 dark:text-amber-400",
  },
];

export const getSidebarItems = (username: string) => {
  return SIDEBAR_ITEMS.map((item) => ({
    ...item,
    url: typeof item.url === "function" ? item.url(username) : item.url,
  }));
};
