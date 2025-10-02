import type { ReactNode } from "react";

const Header = ({ children }: { children: ReactNode }) => {
  return (
    <div className="flex flex-col gap-4 items-center">
      <span className="text-2xl font-bold text-center">ChessHub</span>
      {children}
    </div>
  );
};

export default Header;
