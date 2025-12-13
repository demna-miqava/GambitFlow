import { ImportGameForm } from "./ImportGameForm";
import { AnalysisSidebarContent } from "./AnalysisSidebarContent";

interface ImportGameSidebarProps {
  onLoadPgn: (pgn: string) => void;
  onNewGame: () => void;
  isGameLoaded: boolean;
}

const ImportGameSidebar = ({
  onLoadPgn,
  onNewGame,
  isGameLoaded,
}: ImportGameSidebarProps) => {
  return (
    <div className="flex gap-3 w-full">
      {isGameLoaded ? (
        <AnalysisSidebarContent onNewGame={onNewGame} />
      ) : (
        <ImportGameForm onLoadPgn={onLoadPgn} />
      )}
    </div>
  );
};

export default ImportGameSidebar;
