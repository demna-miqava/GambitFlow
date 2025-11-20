import { FriendsList } from "./FriendsList";
import { Pagination } from "@/components/Pagination";
import type { Friend, FriendActionHandlers } from "@/types";
import type { ReactNode } from "react";

interface FriendsPaginatedListProps extends FriendActionHandlers {
  friends: Friend[];
  page: number;
  setPage: (page: number) => void;
  pagination?: {
    total: number;
    totalPages: number;
  };
  isLoading?: boolean;
  searchSlot?: ReactNode;
  emptyMessage?: string;
  showPagination?: boolean;
  currentUserId?: number;
  isOwnProfile?: boolean;
}

export const FriendsPaginatedList = ({
  friends,
  page,
  setPage,
  pagination,
  isLoading = false,
  onChallenge,
  onMessage,
  onRemove,
  searchSlot,
  emptyMessage = "No friends yet",
  showPagination = true,
  currentUserId,
  isOwnProfile,
}: FriendsPaginatedListProps) => {
  const totalPages = pagination?.totalPages ?? 1;
  const hasNextPage = page < totalPages;
  const hasPreviousPage = page > 1;

  return (
    <div className="space-y-4">
      {searchSlot && <div className="w-full">{searchSlot}</div>}

      {isLoading ? (
        <div className="text-center py-8 text-muted-foreground">Loading...</div>
      ) : (
        <FriendsList
          items={friends}
          emptyMessage={emptyMessage}
          onChallenge={onChallenge}
          onMessage={onMessage}
          onRemove={onRemove}
          currentUserId={currentUserId}
          isOwnProfile={isOwnProfile}
        />
      )}

      {showPagination && totalPages > 1 && (
        <Pagination
          currentPage={page}
          totalPages={totalPages}
          onPageChange={setPage}
          hasNextPage={hasNextPage}
          hasPreviousPage={hasPreviousPage}
        />
      )}
    </div>
  );
};
