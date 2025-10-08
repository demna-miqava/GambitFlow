import { Button } from "@/components/ui/button";
import { Flag, HandshakeIcon } from "lucide-react";

const MatchActions = () => {
  return (
    <div className="flex gap-2">
      <Button className="flex flex-1 items-center justify-center gap-2 rounded-md bg-red-600/20 px-4 py-2 text-sm font-medium text-red-400 transition-colors hover:bg-red-600/30">
        <Flag className="size-4" />
        Resign
      </Button>
      <button className="flex flex-1 items-center justify-center gap-2 rounded-md bg-blue-600/20 px-4 py-2 text-sm font-medium text-blue-400 transition-colors hover:bg-blue-600/30">
        <HandshakeIcon className="size-4" />
        Offer Draw
      </button>
    </div>
  );
};

export default MatchActions;
