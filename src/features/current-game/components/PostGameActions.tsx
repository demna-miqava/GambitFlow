import { Button } from "@/components/ui/button";
import { useMatchmaking } from "@/features/matchmaking/hooks/useMatchmaking";
import { useLocation } from "react-router";

type Props = {
  onRematch: () => void;
};

const PostGameActions = ({ onRematch }: Props) => {
  const { time, increment } = useLocation()?.state || {};
  const { setShouldConnect, isSearching } = useMatchmaking({ time, increment });
  return (
    <>
      <Button
        variant="secondary"
        disabled={isSearching}
        onClick={() => {
          setShouldConnect(true);
        }}
        className="flex-1 cursor-pointer"
      >
        {isSearching ? "Searching..." : "New Game"}
      </Button>
      <Button onClick={onRematch} className="flex-1 cursor-pointer">
        Rematch
      </Button>
    </>
  );
};

export default PostGameActions;
