import { PlayBoard } from "./PlayBoard";
import { CreateGameSidebar } from "./CreateGameSidebar";
import { GameSetupProvider } from "@/features/create-game/GameSetupContext";
import { GameLayout } from "@/features/game/components/GameLayout";

export const CreateGameLayout = () => {
  return (
    <GameSetupProvider>
      <GameLayout board={<PlayBoard />} sidebar={<CreateGameSidebar />} />
    </GameSetupProvider>
  );
};
