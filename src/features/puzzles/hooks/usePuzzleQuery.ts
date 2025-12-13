import { useInfiniteQuery } from "@tanstack/react-query";
import { puzzleService } from "../services/puzzle.service";
import { PUZZLE_CONFIG, PUZZLE_QUERY_KEY } from "../constants/puzzle.constants";

export const usePuzzleQuery = () => {
  return useInfiniteQuery({
    queryKey: [PUZZLE_QUERY_KEY, "infinite"],
    queryFn: ({ pageParam = 0 }) => puzzleService.fetchPuzzles(pageParam),
    getNextPageParam: (lastPage) => lastPage.nextCursor,
    initialPageParam: 0,
    staleTime: Infinity,
    refetchOnWindowFocus: false,
    maxPages: PUZZLE_CONFIG.PREFETCH.MAX_PAGES,
  });
};
