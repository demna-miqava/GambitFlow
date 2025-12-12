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
import { Link } from "react-router-dom";
import { useUser } from "@/hooks/useUser";
import { useMemo } from "react";
import { getSidebarItems } from "@/config/sidebarItems";
import { ROUTES } from "@/constants/routes";
import { SidebarHoverMenu } from "./SidebarHoverMenu";
import { SidebarFooterContent } from "./SidebarFooterContent";

export function AppSidebar() {
  const { id } = useUser();
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
                  {item.items ? (
                    <SidebarHoverMenu item={item} />
                  ) : (
                    <SidebarMenuButton asChild tooltip={item.title}>
                      <Link to={item.url as string}>
                        <item.icon className={item.color} />
                        <span
                          className={`text-lg font-medium group-data-[collapsible=icon]:hidden`}
                        >
                          {item.title}
                        </span>
                      </Link>
                    </SidebarMenuButton>
                  )}
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarFooterContent />
      </SidebarFooter>
    </Sidebar>
  );
}
