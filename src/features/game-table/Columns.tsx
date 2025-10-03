"use client";

import { type ColumnDef } from "@tanstack/react-table";
import { TimeControlCell } from "./components/TimeControlCell";
import { PlayerCell } from "./components/PlayerCell";
import { ResultBadge } from "./components/ResultBadge";

export type GameTableData = {
  id: string;
  timeControl: string;
  type: string; // TODO: Should be an enum (rapid, blitz, bullet)
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
      return <TimeControlCell type={type} timeControl={timeControl} />;
    },
  },

  {
    accessorKey: "Players",
    header: "Players",
    cell: ({ row }) => {
      const { white, black } = row.original.players;
      return <PlayerCell white={white} black={black} />;
    },
  },
  {
    accessorKey: "result",
    header: "Result",
    cell: ({ row }) => {
      const { result } = row.original;
      return <ResultBadge result={result} />;
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
