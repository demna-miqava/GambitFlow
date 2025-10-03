import { type ReactNode } from "react";

interface StatRowProps {
  label: string;
  value: ReactNode;
}

export const StatRow = ({ label, value }: StatRowProps) => {
  return (
    <div className="flex items-center justify-between">
      <span className="text-gray-300">{label}</span>
      {typeof value === "string" || typeof value === "number" ? (
        <span className="text-gray-200 font-medium">{value}</span>
      ) : (
        value
      )}
    </div>
  );
};
