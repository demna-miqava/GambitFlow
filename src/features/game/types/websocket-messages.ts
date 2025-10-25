export type DrawOfferMessage = {
  type: "draw_offer";
};

export type DrawResponseMessage = {
  type: "draw_response";
  accepted: boolean;
  userId?: string;
};

export type GameEndedMessage = {
  type: "game_ended";
  reason?:
    | "resignation"
    | "draw_agreement"
    | "aborted"
    | "checkmate"
    | "timeout"
    | "stalemate";
  winnerId?: string; // userId of the winner, if applicable
};

export type ResignMessage = {
  type: "resign";
  userId?: string;
};

export type AbortMessage = {
  type: "abort";
};

export type MoveMessage = {
  type: "move";
  move: {
    lan: string;
    san?: string;
    from: string;
    to: string;
  };
  userId?: string;
  fen?: string;
  pgn?: string;
};

export type TimeoutMessage = {
  type: "timeout";
};

export type CheckmateMessage = {
  type: "checkmate";
  winnerId: string;
};

export type StalemateMessage = {
  type: "stalemate";
};

export type InitialGameStateMessage = {
  type: "initial_game_state";
  data?: {
    fen: string;
    pgn?: string;
    isFinished?: boolean;
  };
};

export type RematchRequestMessage = {
  type: "rematch_request";
};

export type RematchResponseMessage = {
  type: "rematch_response";
  accepted: boolean;
};

export type CancelRematchMessage = {
  type: "rematch_canceled";
};

export type GameWebSocketMessage =
  | DrawOfferMessage
  | DrawResponseMessage
  | GameEndedMessage
  | ResignMessage
  | AbortMessage
  | MoveMessage
  | TimeoutMessage
  | CheckmateMessage
  | StalemateMessage
  | InitialGameStateMessage
  | RematchRequestMessage
  | RematchResponseMessage
  | CancelRematchMessage;
