import {
  Moon,
  Sun,
  ArrowRightToLine,
  ArrowLeftToLine,
  LogOut,
} from "lucide-react";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { useTheme } from "@/context/ThemeContext";
import { useLogout } from "@/features/auth/hooks/useLogout";

export function SidebarFooterContent() {
  const { theme, toggleTheme } = useTheme();
  const { state, toggleSidebar } = useSidebar();
  const isCollapsed = state === "collapsed";
  const { logout } = useLogout();

  return (
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
            theme === "dark" ? "Switch to light mode" : "Switch to dark mode"
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
  );
}
