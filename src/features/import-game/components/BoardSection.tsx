import { EvaluationBar, useAnalysis } from "@/features/engine-analysis";
import ImportGameBoard from "./ImportGameBoard";

interface BoardSectionProps {
  isGameLoaded: boolean;
}

const BoardSection = ({ isGameLoaded }: BoardSectionProps) => {
  const { engineEnabled } = useAnalysis();

  return (
    <div className="flex gap-3 w-full">
      <div className="hidden lg:block w-7 self-stretch">
        {isGameLoaded && engineEnabled && <EvaluationBar />}
      </div>
      <ImportGameBoard disabled={!isGameLoaded} />
    </div>
  );
};

export default BoardSection;
