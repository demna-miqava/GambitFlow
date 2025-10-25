import { createContext, useContext, useState, useEffect } from "react";
import { useLocation } from "react-router";
import {
  useTimeControl,
  type TimeControlFormat,
  type TimeControl,
} from "./hooks/useTimeControl";
import type { Friend } from "@/types";

export type GameSection =
  | "new"
  | "bots"
  | "friends"
  | "friend-invite-options"
  | "custom";

interface GameSetupContextValue {
  // Navigation
  activeSection: GameSection;
  setActiveSection: (section: GameSection) => void;
  canGoBack: boolean;
  goBack: () => void;

  // Time Control
  timeControl: TimeControl;
  updateTimeControl: (format: TimeControlFormat, time: number, increment?: number) => void;
  selectedFriend: Friend | null;
  setSelectedFriend: React.Dispatch<React.SetStateAction<Friend | null>>;
}

const GameSetupContext = createContext<GameSetupContextValue | null>(null);

export const GameSetupProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const location = useLocation();
  const state = location.state;
  const initialSection = (state?.section as GameSection) ?? "new";
  const [activeSection, setActiveSection] =
    useState<GameSection>(initialSection);
  const [selectedFriend, setSelectedFriend] = useState<Friend | null>(null);
  const { timeControl, updateTimeControl } = useTimeControl();

  const canGoBack = activeSection !== "new";
  const goBack = () => {
    if (activeSection === "friend-invite-options") {
      setActiveSection("friends");
    } else {
      setActiveSection("new");
    }
  };

  useEffect(() => {
    setActiveSection(initialSection);
  }, [initialSection]);

  return (
    <GameSetupContext.Provider
      value={{
        activeSection,
        setActiveSection,
        canGoBack,
        goBack,
        timeControl,
        updateTimeControl,
        selectedFriend,
        setSelectedFriend,
      }}
    >
      {children}
    </GameSetupContext.Provider>
  );
};

/* eslint-disable-next-line */
export const useGameSetup = () => {
  const context = useContext(GameSetupContext);
  if (!context) {
    throw new Error("useGameSetup must be used within GameSetupProvider");
  }
  return context;
};
