import { WS_BASE_URL } from "@/constants/apiConfig";

export const BOARD_CONFIG = {
  ENABLE_PREMOVES: true,
  ENABLE_DRAGGABLE: true,
  WEBSOCKET_BASE_URL: WS_BASE_URL,
} as const;
