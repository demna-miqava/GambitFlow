import { Button } from "@/components/ui/button";

type Props = {
  onCancelRematchRequest: () => void;
};

const RematchRequested = ({ onCancelRematchRequest }: Props) => {
  return (
    <div className="flex flex-col justify-center w-full gap-4 animate-pulse">
      <p className="text-center text-muted-foreground text-sm">
        Waiting for opponent...
      </p>
      <Button onClick={onCancelRematchRequest} className="w-full">
        Cancel
      </Button>
    </div>
  );
};

export default RematchRequested;
