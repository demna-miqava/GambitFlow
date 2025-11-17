export const enum GAME_MESSAGE_TYPES {
  // Game actions
  MOVE = "move",
  RESIGN = "resign",
  CHECKMATE = "checkmate",
  STALEMATE = "stalemate",
  TIMEOUT = "timeout",
  ABORT = "abort",

  // Draw actions
  DRAW_OFFER = "draw_offer",
  DRAW_RESPONSE = "draw_response",

  // Rematch actions
  REMATCH_REQUEST = "rematch_request",
  REMATCH_RESPONSE = "rematch_response",
  CANCEL_REMATCH = "cancel_rematch",
  REMATCH_CANCELED = "rematch_canceled",

  // Game state
  GAME_ENDED = "game_ended",
  INITIAL_GAME_STATE = "initial_game_state",
}
