interface PlayerCellProps {
  white: { userName: string; rating: number };
  black: { userName: string; rating: number };
}

export const PlayerCell = ({ white, black }: PlayerCellProps) => {
  return (
    <div className="flex flex-col">
      <span className="text-accent-foreground">
        {white.userName}{" "}
        <span className="text-xs text-gray-400">({white.rating})</span>
      </span>
      <span className="text-accent-foreground">
        {black.userName}{" "}
        <span className="text-xs text-gray-400">({black.rating})</span>
      </span>
    </div>
  );
};
