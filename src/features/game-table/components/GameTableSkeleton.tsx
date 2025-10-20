import { Skeleton } from "@/components/ui/skeleton";
import { TableRow, TableCell } from "@/components/ui/table";

type GameTableSkeletonProps = {
  rows?: number;
  columnCount: number;
};

// Individual skeleton components for each column type
const TimeControlSkeleton = () => (
  <div className="flex flex-col items-center gap-1">
    <Skeleton className="h-6 w-6 rounded" />
    <Skeleton className="h-3 w-12" />
  </div>
);

const PlayersSkeleton = () => (
  <div className="flex flex-col">
    <Skeleton className="h-3 w-40" />
    <Skeleton className="h-3 w-40" />
  </div>
);

const ResultSkeleton = () => <Skeleton className="h-6 w-16 rounded-full" />;

const MovesSkeleton = () => <Skeleton className="h-4 w-8" />;

const DateSkeleton = () => <Skeleton className="h-4 w-24" />;

// Configuration array mapping column index to skeleton component
const COLUMN_SKELETONS = [
  TimeControlSkeleton,
  PlayersSkeleton,
  ResultSkeleton,
  MovesSkeleton,
  DateSkeleton,
] as const;

export const GameTableSkeleton = ({
  rows = 5,
  columnCount,
}: GameTableSkeletonProps) => {
  return (
    <>
      {Array.from({ length: rows }).map((_, rowIndex) => (
        <TableRow key={rowIndex}>
          {Array.from({ length: columnCount }).map((_, colIndex) => {
            const SkeletonComponent = COLUMN_SKELETONS[colIndex];

            return (
              <TableCell key={colIndex}>
                {SkeletonComponent ? (
                  <SkeletonComponent />
                ) : (
                  <Skeleton className="h-4 w-24" />
                )}
              </TableCell>
            );
          })}
        </TableRow>
      ))}
    </>
  );
};
