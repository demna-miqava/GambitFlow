import { HandshakeIcon, X, Check } from "lucide-react";
import type { SendMessage } from "react-use-websocket";
import { ActionButton } from "./ActionButton";
import { GAME_MESSAGE_TYPES } from "@/features/game/constants/websocket-types";

interface DrawOfferProps {
  sendMessage: SendMessage;
  onRespond: () => void;
}

const DrawOffer = ({ sendMessage, onRespond }: DrawOfferProps) => {
  const respond = (accepted: boolean) => {
    sendMessage(
      JSON.stringify({ type: GAME_MESSAGE_TYPES.DRAW_RESPONSE, accepted })
    );
    onRespond();
  };

  return (
    <div className="w-full rounded-lg border border-blue-500/40 bg-blue-500/15 p-4 dark:border-blue-500/30 dark:bg-blue-500/10">
      <div className="mb-3 flex items-center gap-2">
        <HandshakeIcon className="size-5 text-blue-600 dark:text-blue-400" />
        <p className="text-sm font-medium text-blue-700 dark:text-blue-300">
          Opponent offered a draw
        </p>
      </div>
      <div className="flex gap-2">
        <ActionButton
          variant="accept"
          onClick={() => respond(true)}
          icon={<Check className="size-4" />}
          label="Accept"
        />
        <ActionButton
          variant="decline"
          onClick={() => respond(false)}
          icon={<X className="size-4" />}
          label="Decline"
        />
      </div>
    </div>
  );
};

export default DrawOffer;
