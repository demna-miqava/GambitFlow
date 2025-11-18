import {
  createContext,
  useContext,
  useState,
  useEffect,
  useMemo,
  useCallback,
} from "react";
import { useLocation } from "react-router";
import { useTimeControl, type TimeControl } from "./hooks/useTimeControl";
import type { TimeControlType } from "@/types";
import type { Friend } from "@/types";
import { useMatchmaking } from "@/features/matchmaking/hooks/useMatchmaking";

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
  updateTimeControl: (
    format: TimeControlType,
    time: number,
    increment?: number
  ) => void;
  selectedFriend: Friend | null;
  setSelectedFriend: React.Dispatch<React.SetStateAction<Friend | null>>;

  // Matchmaking
  isSearching: boolean;
  setShouldConnect: (shouldConnect: boolean) => void;
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

  const { isSearching, setShouldConnect } = useMatchmaking({
    time: timeControl.time,
    increment: timeControl.increment,
  });

  const canGoBack = activeSection !== "new";
  const goBack = useCallback(() => {
    if (activeSection === "friend-invite-options") {
      setActiveSection("friends");
    } else {
      setActiveSection("new");
    }
  }, [activeSection]);

  useEffect(() => {
    if (state?.selectedFriend) {
      setSelectedFriend(state.selectedFriend);
    }
  }, [state?.selectedFriend]);

  useEffect(() => {
    setActiveSection(initialSection);
  }, [initialSection]);

  const value = useMemo(
    () => ({
      activeSection,
      setActiveSection,
      canGoBack,
      goBack,
      timeControl,
      updateTimeControl,
      selectedFriend,
      setSelectedFriend,
      isSearching,
      setShouldConnect,
    }),
    [
      activeSection,
      canGoBack,
      timeControl,
      updateTimeControl,
      selectedFriend,
      isSearching,
      setShouldConnect,
      goBack,
    ]
  );
  return (
    <GameSetupContext.Provider value={value}>
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
