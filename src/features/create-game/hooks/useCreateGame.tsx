import { useUser } from "@/hooks/useUser";
import { useEffect, useMemo, useState } from "react";
import useWebSocket from "react-use-websocket";
import { useNavigate } from "react-router";

export const useCreateGameWS = (
  selectedFormat: string,
  selectedTimeControl: string
) => {
  const [shouldConnect, setShouldConnect] = useState(false);
  const navigate = useNavigate();
  const { id } = useUser();

  const wsUrl = useMemo(
    () =>
      shouldConnect
        ? `ws://localhost:5001/ws/matchmaking?userId=${id}&timeControl=${encodeURIComponent(
            selectedTimeControl
          )}&timeFormat=${selectedFormat}&rating=1000`
        : null,
    [shouldConnect, id, selectedTimeControl, selectedFormat]
  );

  const { sendMessage, lastMessage, readyState } = useWebSocket(wsUrl);

  useEffect(() => {
    if (lastMessage) {
      const data = JSON.parse(lastMessage.data);
      if (data.type === "match_found") {
        navigate(`/game/${data.gameId}`, {
          state: {
            color: data.color,
            opponentRating: data.opponentRating,
            opponentUserName: data.opponentUsername,
          },
        });
      }
    }
  }, [lastMessage, navigate]);

  return { sendMessage, lastMessage, readyState, setShouldConnect };
};
