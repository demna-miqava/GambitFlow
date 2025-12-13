import type { ReactNode } from "react";

interface GameLayoutProps {
  board: ReactNode;
  sidebar: ReactNode;
}

export const GameLayout = ({ board, sidebar }: GameLayoutProps) => {
  return (
    <div className="h-full grid grid-cols-1 lg:overflow-hidden lg:grid-cols-[minmax(auto,680px)_500px] 2xl:grid-cols-[minmax(auto,800px)_500px] gap-6 lg:justify-center lg:content-center">
      <div className="flex items-center justify-center">{board}</div>
      <div>{sidebar}</div>
    </div>
  );
};
