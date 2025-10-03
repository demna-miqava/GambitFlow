"use client";

import { TIME_CONTROL_ICONS } from "@/consts";
import { type ColumnDef } from "@tanstack/react-table";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type GameTableData = {
  id: string;
  timeControl: string;
  type: string; //es unda iyos rapid blitz blitz rapid enum
  players: {
    white: { userName: string; rating: number; image: string };
    black: { userName: string; rating: number; image: string };
  };
  result: string;
  moves: string;
  date: string;
};

export const columns: ColumnDef<GameTableData>[] = [
  {
    accessorKey: "timeControl",
    header: "",
    size: 110,
    minSize: 90,
    maxSize: 120,
    cell: ({ row }) => {
      const { type, timeControl } = row.original;
      const Icon = TIME_CONTROL_ICONS[type as keyof typeof TIME_CONTROL_ICONS];
      return (
        <div className="flex flex-col items-center gap-1 text-xs text-white/70">
          <Icon />
          <span className="font-medium text-gray-400">{timeControl}</span>
        </div>
      );
    },
  },

  {
    accessorKey: "Players",
    header: "Players",
    cell: ({ row }) => {
      const { white, black } = row.original.players;

      return (
        <div className="flex flex-col">
          <span className="text-accent-foreground">
            {white.userName}{" "}
            <span className="text-xs text-gray-400">({white.rating})</span>
          </span>{" "}
          <span className="text-accent-foreground">
            {black.userName}{" "}
            <span className="text-xs text-gray-400">({black.rating})</span>
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "result",
    header: "Result",
    cell: ({ row }) => {
      const { result } = row.original;
      const isWin = result === "win";
      const isDraw = result === "draw";

      const badgeLabel = isDraw ? "=" : isWin ? "+" : "-";
      const badgeColor = isDraw
        ? "bg-white/10 text-foreground"
        : isWin
        ? "bg-lime-500/20 text-green-600"
        : "bg-rose-500/20 text-red-600";

      const topScore = isDraw ? "½" : isWin ? "1" : "0";
      const bottomScore = isDraw ? "½" : isWin ? "0" : "1";

      return (
        <div className="flex items-center gap-2 text-sm text-white/80">
          <div className="flex flex-col text-center leading-tight text-foreground">
            <span>{topScore}</span>
            <span>{bottomScore}</span>
          </div>
          <span
            className={`flex h-6 w-6 items-center justify-center rounded-md text-xs font-semibold uppercase ${badgeColor}`}
          >
            {badgeLabel}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "moves",
    header: "Moves",
  },
  {
    accessorKey: "date",
    header: "Date",
  },
];
