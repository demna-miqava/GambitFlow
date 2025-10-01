import { Home, Puzzle, Settings, User, Moon, Sun } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Link } from "react-router";
import { useTheme } from "@/context/ThemeContext";

// Menu items.
const items = [
  {
    title: "Home",
    url: "/",
    icon: Home,
    color: "text-sky-600 dark:text-sky-400",
  },
  {
    title: "Puzzles",
    url: "",
    icon: Puzzle,
    color: "text-violet-600 dark:text-violet-400",
  },

  {
    title: "Profile",
    url: "/profile",
    icon: User,
    color: "text-emerald-600 dark:text-emerald-400",
  },
  {
    title: "Settings",
    url: "/",
    icon: Settings,
    color: "text-amber-600 dark:text-amber-400",
  },
];

export function AppSidebar() {
  const { theme, toggleTheme } = useTheme();

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader />
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild tooltip={item.title}>
                    <Link to={item.url}>
                      <item.icon className={item.color} size={24} />
                      <span
                        className={`text-lg font-medium group-data-[collapsible=icon]:hidden ${item.color}`}
                      >
                        {item.title}
                      </span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              onClick={toggleTheme}
              tooltip={
                theme === "dark"
                  ? "Switch to light mode"
                  : "Switch to dark mode"
              }
            >
              {theme === "dark" ? (
                <Sun className="text-amber-500" size={24} />
              ) : (
                <Moon className="text-sky-600" size={24} />
              )}
              <span className="text-lg font-medium group-data-[collapsible=icon]:hidden">
                {theme === "dark" ? "Light Mode" : "Dark Mode"}
              </span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
