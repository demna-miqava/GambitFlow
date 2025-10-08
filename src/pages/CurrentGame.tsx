import CurrentGameBoard from "@/features/current-game/components/CurrentGameBoard";
import { MovesContainer } from "@/features/current-game/components/MovesContainer";
import { CurrentGameProvider } from "@/features/current-game/CurrentGameContext";

const CurrentGame = () => {
  return (
    <CurrentGameProvider>
      <div className="grid h-full grid-cols-1 lg:grid-cols-[1fr_300px] gap-4 p-4">
        <div className="flex items-center justify-center">
          <CurrentGameBoard />
        </div>
        <MovesContainer />
      </div>
    </CurrentGameProvider>
  );
};

export default CurrentGame;
