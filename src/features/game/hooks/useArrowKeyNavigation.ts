import { useEffect } from "react";

interface ArrowKeyHandlers {
  onLeft?: () => void;
  onRight?: () => void;
  onUp?: () => void;
  onDown?: () => void;
}

/**
 * Shared hook for arrow key navigation.
 * Used by both live game move navigation and archive game analysis.
 */
export const useArrowKeyNavigation = ({
  onLeft,
  onRight,
  onUp,
  onDown,
}: ArrowKeyHandlers) => {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      switch (event.key) {
        case "ArrowLeft":
          onLeft?.();
          break;
        case "ArrowRight":
          onRight?.();
          break;
        case "ArrowUp":
          event.preventDefault();
          onUp?.();
          break;
        case "ArrowDown":
          event.preventDefault();
          onDown?.();
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onLeft, onRight, onUp, onDown]);
};
