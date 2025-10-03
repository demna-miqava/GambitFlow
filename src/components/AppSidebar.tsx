import { Moon, Sun, ArrowRightToLine, ArrowLeftToLine } from "lucide-react";

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
import { Link } from "react-router";
import { useTheme } from "@/context/ThemeContext";
import { useUser } from "@/hooks/useUser";
import { useMemo } from "react";
import { getSidebarItems } from "./config/sidebarItems";

export function AppSidebar() {
  const { theme, toggleTheme } = useTheme();
  const { state, toggleSidebar } = useSidebar();
  const isCollapsed = state === "collapsed";
  const { userName } = useUser();

  const items = useMemo(() => getSidebarItems(userName), [userName]);

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>(Logo)</SidebarHeader>
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
                <Sun className="text-amber-500" />
              ) : (
                <Moon className="text-sky-600" />
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
