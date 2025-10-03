interface ResultBadgeProps {
  result: string;
}

export const ResultBadge = ({ result }: ResultBadgeProps) => {
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
};
