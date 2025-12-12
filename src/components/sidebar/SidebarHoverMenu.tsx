import { useState } from "react";
import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { SidebarMenuButton } from "@/components/ui/sidebar";
import { type SidebarItem } from "@/config/sidebarItems";

export function SidebarHoverMenu({ item }: { item: SidebarItem }) {
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = () => {
    setIsOpen(false);
  };

  return (
    <HoverCard
      open={isOpen}
      onOpenChange={setIsOpen}
      openDelay={200}
      closeDelay={100}
    >
      <HoverCardTrigger asChild>
        <SidebarMenuButton asChild tooltip={item.title}>
          <Link to={item.url as string} onClick={handleClick}>
            <item.icon className={item.color} />
            <span className="text-lg font-medium group-data-[collapsible=icon]:hidden">
              {item.title}
            </span>
            <ChevronRight className="ml-auto h-4 w-4" />
          </Link>
        </SidebarMenuButton>
      </HoverCardTrigger>
      <HoverCardContent side="right" align="start" className="w-48 p-2">
        <div className="flex flex-col gap-1">
          {item.items?.map((subItem) => {
            const commonClasses =
              "flex w-full items-center rounded-md px-2 py-1.5 text-sm font-medium hover:bg-accent hover:text-accent-foreground";

            if (subItem.disabled) {
              return (
                <span
                  key={subItem.title}
                  className={`${commonClasses} opacity-50 cursor-not-allowed bg-transparent hover:bg-transparent hover:text-muted-foreground`}
                >
                  {subItem.title}
                </span>
              );
            }

            return (
              <Link
                key={subItem.title}
                to={subItem.url as string}
                onClick={handleClick}
                className={commonClasses}
              >
                {subItem.title}
              </Link>
            );
          })}
        </div>
      </HoverCardContent>
    </HoverCard>
  );
}
