import type { LucideIcon } from "lucide-react";

export interface SidebarItem {
  title: string;
  url: string | ((username: string) => string);
  icon: LucideIcon;
  color: string;
}
