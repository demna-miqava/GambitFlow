export type PlayerColor = "white" | "black";
export type ColorCode = "w" | "b";

export interface GameState {
  fen: string;
  pgn?: string;
  turn: ColorCode;
  check: boolean;
  checkmate: boolean;
  stalemate: boolean;
}
