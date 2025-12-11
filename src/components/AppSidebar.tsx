import {
  Moon,
  Sun,
  ArrowRightToLine,
  ArrowLeftToLine,
  LogOut,
} from "lucide-react";

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
  useSidebar,
} from "@/components/ui/sidebar";
import { Link } from "react-router-dom";
import { useTheme } from "@/context/ThemeContext";
import { useUser } from "@/hooks/useUser";
import { useMemo } from "react";
import { useLogout } from "@/features/auth/hooks/useLogout";
import { getSidebarItems } from "@/config/sidebarItems";
import { ROUTES } from "@/constants/routes";

export function AppSidebar() {
  const { theme, toggleTheme } = useTheme();
  const { state, toggleSidebar } = useSidebar();
  const isCollapsed = state === "collapsed";
  const { id } = useUser();
  const { logout } = useLogout();

  const items = useMemo(() => getSidebarItems(id!), [id]);

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <Link to={ROUTES.HOME}>
          <div className="flex items-center justify-start py-4">
            <img
              src="/logo.png"
              alt="GambitFlow"
              className="h-12 w-full object-cover"
            />
          </div>
        </Link>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild tooltip={item.title}>
                    <Link to={item.url}>
                      <item.icon className={item.color} />
                      <span
                        className={`text-lg font-medium group-data-[collapsible=icon]:hidden`}
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
              onClick={toggleSidebar}
              tooltip={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
            >
              {isCollapsed ? <ArrowRightToLine /> : <ArrowLeftToLine />}
              <span className="text-lg font-medium group-data-[collapsible=icon]:hidden">
                {isCollapsed ? "Expand" : "Collapse"}
              </span>
            </SidebarMenuButton>
          </SidebarMenuItem>
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
                <Sun className="text-muted-foreground" />
              ) : (
                <Moon className="text-muted-foreground" />
              )}
              <span className="text-lg font-medium group-data-[collapsible=icon]:hidden">
                {theme === "dark" ? "Light Mode" : "Dark Mode"}
              </span>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton onClick={() => logout()} tooltip="Logout">
              <LogOut className="text-muted-foreground" />
              <span className="text-lg font-medium group-data-[collapsible=icon]:hidden">
                Logout
              </span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
