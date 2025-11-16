import { GAME_MESSAGE_TYPES } from "../constants/websocket-types";

export type DrawOfferMessage = {
  type: GAME_MESSAGE_TYPES.DRAW_OFFER;
};

export type DrawResponseMessage = {
  type: GAME_MESSAGE_TYPES.DRAW_RESPONSE;
  accepted: boolean;
  userId?: string;
};

export type RatingChanges = {
  whiteRatingChange: number;
  blackRatingChange: number;
  whiteNewRating: number;
  blackNewRating: number;
};

export type GameEndedMessage = {
  type: GAME_MESSAGE_TYPES.GAME_ENDED;
  reason:
    | "resignation"
    | "draw_agreement"
    | "aborted"
    | "checkmate"
    | "timeout"
    | "stalemate";
  winnerId?: string;
  ratingChanges?: RatingChanges;
};

export type ResignMessage = {
  type: GAME_MESSAGE_TYPES.RESIGN;
  userId?: string;
};

export type AbortMessage = {
  type: GAME_MESSAGE_TYPES.ABORT;
};

export type MoveMessage = {
  type: GAME_MESSAGE_TYPES.MOVE;
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
  type: GAME_MESSAGE_TYPES.TIMEOUT;
};

export type CheckmateMessage = {
  type: GAME_MESSAGE_TYPES.CHECKMATE;
  winnerId: string;
};

export type StalemateMessage = {
  type: GAME_MESSAGE_TYPES.STALEMATE;
};

export type InitialGameStateMessage = {
  type: GAME_MESSAGE_TYPES.INITIAL_GAME_STATE;
  data?: {
    fen: string;
    pgn?: string;
    isFinished?: boolean;
  };
};

export type RematchRequestMessage = {
  type: GAME_MESSAGE_TYPES.REMATCH_REQUEST;
};

export type RematchResponseMessage = {
  type: GAME_MESSAGE_TYPES.REMATCH_RESPONSE;
  accepted: boolean;
};

export type CancelRematchMessage = {
  type: GAME_MESSAGE_TYPES.REMATCH_CANCELED;
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
