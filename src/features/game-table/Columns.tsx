import { type ColumnDef } from "@tanstack/react-table";
import { TimeControlCell } from "./components/TimeControlCell";
import { PlayerCell } from "./components/PlayerCell";
import { ResultBadge } from "./components/ResultBadge";
import { format } from "date-fns";
import type { Game } from "@/types";

// Helper function to determine result from current user's perspective
const getResult = (game: Game, currentUserId?: string): "win" | "loss" | "draw" => {
  // If no winner, it's a draw
  if (!game.winnerId) return "draw";
  if (!currentUserId) return "draw";

  // Convert userId to number for comparison
  const userIdNum = Number(currentUserId);

  // Check if current user is one of the players
  const isWhitePlayer = game.whitePlayer.id === userIdNum;
  const isBlackPlayer = game.blackPlayer.id === userIdNum;

  // Determine if current user won
  if (isWhitePlayer || isBlackPlayer) {
    return game.winnerId === userIdNum ? "win" : "loss";
  }

  return "draw";
};

export const createColumns = (currentUserId?: string): ColumnDef<Game>[] => [
  {
    accessorKey: "timeControl",
    header: "",
    size: 110,
    minSize: 90,
    maxSize: 120,
    cell: ({ row }) => {
      const { type, time, increment } = row.original;
      return <TimeControlCell type={type} time={time} increment={increment} />;
    },
  },

  {
    accessorKey: "Players",
    header: "Players",
    cell: ({ row }) => {
      const { blackPlayer, whitePlayer } = row.original;
      return <PlayerCell white={whitePlayer} black={blackPlayer} />;
    },
  },
  {
    accessorKey: "result",
    header: "Result",
    cell: ({ row }) => {
      const result = getResult(row.original, currentUserId);
      return <ResultBadge result={result} />;
    },
  },
  {
    accessorKey: "numMoves",
    header: "Moves",
    cell: ({ row }) => {
      return <span>{row.original.numMoves ?? "-"}</span>;
    },
  },
  {
    accessorKey: "createdAt",
    header: "Date",
    cell: ({ row }) => {
      const date = row.original.createdAt;
      return <p className="max-w-2">{format(new Date(date), "MMM d, yyyy")}</p>;
    },
  },
];
