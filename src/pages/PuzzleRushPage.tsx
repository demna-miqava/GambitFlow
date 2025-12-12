import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ROUTES } from "@/constants/routes";
import { ArrowLeft } from "lucide-react";

const PuzzleRushPage = () => {
  return (
    <div className="flex h-full flex-col items-center justify-center gap-6 p-8">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold tracking-tighter">Puzzle Rush</h1>
        <p className="text-muted-foreground">Mode currently in development.</p>
      </div>

      <Link to={ROUTES.PUZZLES}>
        <Button variant="outline" className="gap-2">
          <ArrowLeft className="h-4 w-4" />
          Back to Puzzles
        </Button>
      </Link>
    </div>
  );
};

export default PuzzleRushPage;
