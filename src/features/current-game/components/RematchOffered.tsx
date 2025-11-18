import { Button } from "@/components/ui/button";

type Props = {
  onAcceptRematch: () => void;
  onDeclineRematch: () => void;
};

const RematchOffered = ({ onAcceptRematch, onDeclineRematch }: Props) => {
  return (
    <>
      <div className="flex flex-col justify-center w-full gap-4">
        <p className="text-center text-muted-foreground text-sm">
          Opponent wants a rematch!
        </p>
        <div className="flex">
          <Button onClick={onAcceptRematch} className="flex-1 cursor-pointer">
            Accept
          </Button>
          <Button
            onClick={onDeclineRematch}
            variant="secondary"
            className="flex-1 cursor-pointer"
          >
            Decline
          </Button>
        </div>
      </div>
    </>
  );
};

export default RematchOffered;
