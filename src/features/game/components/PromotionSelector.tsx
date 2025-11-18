import { useEffect, useRef, useMemo, useCallback, memo } from "react";
import type { PlayerColor } from "@/features/game/types/game.types";
import type { PieceSymbol } from "chess.js";
import {
  PROMOTION_PIECES,
  PIECE_NAMES,
  PIECE_SVGS,
} from "@/features/game/constants/promotion";
import {
  calculatePromotionPosition,
  shouldReversePromotionOrder,
} from "@/features/game/utils/promotionUtils";

interface PromotionSelectorProps {
  color: PlayerColor;
  square: string;
  onSelect: (piece: PieceSymbol) => void;
  onCancel: () => void;
  boardOrientation: PlayerColor;
}

const PromotionButton = memo(
  ({
    piece,
    pieceSvg,
    onSelect,
  }: {
    piece: PieceSymbol;
    pieceSvg: string;
    onSelect: (piece: PieceSymbol) => void;
  }) => {
    const handleClick = useCallback(() => onSelect(piece), [piece, onSelect]);

    return (
      <button
        onClick={handleClick}
        className="aspect-square bg-background dark:bg-slate-600 hover:bg-accent hover:text-accent-foreground transition-colors rounded-md relative overflow-hidden p-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        aria-label={`Promote to ${PIECE_NAMES[piece]}`}
      >
        <img
          src={pieceSvg}
          alt={PIECE_NAMES[piece]}
          className="w-full h-full object-contain"
        />
      </button>
    );
  }
);

PromotionButton.displayName = "PromotionButton";

export const PromotionSelector = memo(
  ({
    color,
    square,
    onSelect,
    onCancel,
    boardOrientation,
  }: PromotionSelectorProps) => {
    const menuRef = useRef<HTMLDivElement>(null);

    // Memoize position calculation
    const position = useMemo(
      () => calculatePromotionPosition(square, boardOrientation),
      [square, boardOrientation]
    );

    // Memoize order calculation
    const reverseOrder = useMemo(
      () => shouldReversePromotionOrder(color, boardOrientation),
      [color, boardOrientation]
    );

    // Stable event handlers
    const handleClickOutside = useCallback(
      (event: MouseEvent) => {
        if (
          menuRef.current &&
          !menuRef.current.contains(event.target as Node)
        ) {
          onCancel();
        }
      },
      [onCancel]
    );

    const handleEscape = useCallback(
      (event: KeyboardEvent) => {
        if (event.key === "Escape") {
          onCancel();
        }
      },
      [onCancel]
    );

    // Handle click outside and escape key
    useEffect(() => {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("keydown", handleEscape);

      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
        document.removeEventListener("keydown", handleEscape);
      };
    }, [handleClickOutside, handleEscape]);

    return (
      <div
        ref={menuRef}
        className="absolute z-50"
        style={{
          ...position,
          width: "12.5%",
        }}
      >
        <div
          className={`flex flex-col ${
            reverseOrder ? "flex-col-reverse" : ""
          } gap-1 rounded-lg overflow-hidden shadow-lg border bg-popover p-1`}
        >
          {PROMOTION_PIECES.map((piece) => {
            const pieceSvg = PIECE_SVGS[color][piece];
            return (
              <button
                key={piece}
                onClick={() => onSelect(piece)}
                className="aspect-square bg-background dark:bg-slate-600 hover:bg-accent hover:text-accent-foreground transition-colors rounded-md relative overflow-hidden p-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                aria-label={`Promote to ${PIECE_NAMES[piece]}`}
              >
                <img
                  src={pieceSvg}
                  alt={PIECE_NAMES[piece]}
                  className="w-full h-full object-contain"
                />
              </button>
            );
          })}
        </div>
      </div>
    );
  }
);
