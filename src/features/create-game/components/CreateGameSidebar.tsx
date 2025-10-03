import { ArrowLeft } from "lucide-react";

import { New } from "./sections/New";
import { Bots } from "./sections/Bots";
import { Friends } from "./sections/Friends";
import { Custom } from "./sections/Custom";
import { FriendInviteOptions } from "./sections/FriendInviteOptions";
import {
  useCreateGame,
  type SidebarSection,
} from "@/features/create-game/CreateGameContext";
import { Tabs } from "./Tabs";

const SECTIONS = (activeSection: SidebarSection) => {
  switch (activeSection) {
    case "new":
      return <New />;
    case "bots":
      return <Bots />;
    case "friends":
      return <Friends />;
    case "custom":
      return <Custom />;
    case "friend-invite-options":
      return <FriendInviteOptions />;
    default:
      return <New />;
  }
};

export const CreateGameSidebar = () => {
  const { activeSection, canGoBack, goBack } = useCreateGame();

  return (
    <aside className="flex max-h-[calc(100vh-4rem)] w-full flex-col overflow-hidden rounded-xl border border-border/60 bg-sidebar text-sidebar-foreground p-4 shadow-sm lg:w-[500px]">
      <div
        className="flex flex-1 flex-col gap-6 overflow-y-auto pr-2 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
      >
        <Tabs />
        {canGoBack && (
          <button type="button" onClick={goBack} className="cursor-pointer">
            <ArrowLeft size={20} />
          </button>
        )}
        {SECTIONS(activeSection)}
      </div>
    </aside>
  );
};
