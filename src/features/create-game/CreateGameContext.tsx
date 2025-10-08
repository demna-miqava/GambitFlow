import { createContext, useContext, useState, useEffect } from "react";
import { useLocation } from "react-router";

export type SidebarSection =
  | "new"
  | "bots"
  | "friends"
  | "friend-invite-options"
  | "custom";

type CreateGameSidebarContextProps = {
  activeSection: SidebarSection;
  setActiveSection: (section: SidebarSection) => void;
  canGoBack: boolean;
  goBack: () => void;
  selectedFormat: string;
  setSelectedFormat: React.Dispatch<React.SetStateAction<string>>;
  selectedTimeControl: string;
  setSelectedTimeControl: React.Dispatch<React.SetStateAction<string>>;
};

const CreateGameSidebarContext =
  createContext<CreateGameSidebarContextProps | null>(null);

export const CreateGameSidebarProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const location = useLocation();
  const state = location.state;
  const initialSection = state.section ?? "new";
  const [selectedFormat, setSelectedFormat] = useState<string>("blitz");
  const [selectedTimeControl, setSelectedTimeControl] = useState<string>("3");

  const [activeSection, setActiveSection] = useState(initialSection);

  const canGoBack = activeSection !== "new";
  const goBack = () => {
    switch (activeSection) {
      case "friend-invite-options":
        setActiveSection("friends");
        break;
      default:
        setActiveSection("new");
    }
  };

  useEffect(() => {
    setActiveSection(initialSection);
  }, [initialSection]);
  return (
    <CreateGameSidebarContext.Provider
      value={{
        activeSection,
        setActiveSection,
        canGoBack,
        goBack,
        selectedFormat,
        setSelectedFormat,
        selectedTimeControl,
        setSelectedTimeControl,
      }}
    >
      {children}
    </CreateGameSidebarContext.Provider>
  );
};

/* eslint-disable-next-line */
export const useCreateGame = () => {
  const context = useContext(CreateGameSidebarContext);
  if (!context) {
    throw new Error("usePlaySidebar must be used within a PlaySidebarProvider");
  }
  return context;
};
