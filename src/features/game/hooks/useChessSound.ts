import { useCallback, useRef, useEffect } from "react";
import type { Move } from "chess.js";
import {
  CAPTURE_SOUND_URL,
  GENERIC_SOUND_URL,
  MOVE_SOUND_URL,
} from "@/constants/apiConfig";

export type ChessSoundType = "move" | "capture" | "generic";

// Chess sound URLs
const SOUND_URLS = {
  move: MOVE_SOUND_URL,
  capture: CAPTURE_SOUND_URL,
  generic: GENERIC_SOUND_URL,
};

export const useChessSound = (enabled = false) => {
  const audioRefs = useRef<Record<ChessSoundType, HTMLAudioElement> | null>(
    null
  );

  useEffect(() => {
    if (enabled) {
      audioRefs.current = {
        move: new Audio(SOUND_URLS.move),
        capture: new Audio(SOUND_URLS.capture),
        generic: new Audio(SOUND_URLS.generic),
      };
    }
  }, [enabled]);

  useEffect(() => {
    if (audioRefs.current) {
      Object.values(audioRefs.current).forEach((audio) => {
        audio.volume = 0.5;
      });
    }
  }, []);

  /**
   * Play a specific sound type
   */
  const playSound = useCallback(
    (soundType: ChessSoundType) => {
      if (!enabled || !audioRefs.current) return;

      const audio = audioRefs.current[soundType];
      if (audio) {
        // Reset audio to start if it's already playing
        audio.currentTime = 0;
        audio.play().catch((error) => {
          console.warn(`Failed to play ${soundType} sound:`, error);
        });
      }
    },
    [enabled]
  );

  /**
   * Determine which sound to play based on the move and game state
   */
  const playSoundForMove = useCallback(
    (move: Move | null, isCheckmate: boolean) => {
      if (!move) return;
      if (isCheckmate) {
        playSound("generic");
      } else if (move.captured) {
        playSound("capture");
      } else {
        playSound("move");
      }
    },
    [playSound]
  );

  /**
   * Play generic sound for game events (start, end, checkmate, etc.)
   */
  const playGenericSound = useCallback(() => {
    playSound("generic");
  }, [playSound]);

  return {
    playSound,
    playSoundForMove,
    playGenericSound,
  };
};
