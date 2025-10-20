import { type ColumnDef } from "@tanstack/react-table";
import { TimeControlCell } from "./components/TimeControlCell";
import { PlayerCell } from "./components/PlayerCell";
import { ResultBadge } from "./components/ResultBadge";
import { format } from "date-fns";
import type { Game } from "@/services/game";

export const columns: ColumnDef<Game>[] = [
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
    accessorKey: "createdAt",
    header: "Date",
    cell: ({ row }) => {
      const date = row.original.createdAt;
      return <p className="max-w-2">{format(new Date(date), "MMM d, yyyy")}</p>;
    },
  },
];
