import { useSearchParams } from "react-router-dom";
import { useCallback } from "react";

export const useQueryParams = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const getParam = useCallback(
    (key: string): string | null => {
      return searchParams.get(key);
    },
    [searchParams]
  );

  const getNumberParam = useCallback(
    (key: string, defaultValue: number): number => {
      const value = searchParams.get(key);
      const parsed = Number(value);
      return !isNaN(parsed) && parsed > 0 ? parsed : defaultValue;
    },
    [searchParams]
  );

  const setParam = useCallback(
    (key: string, value: string | number) => {
      setSearchParams((prev) => {
        prev.set(key, String(value));
        return prev;
      });
    },
    [setSearchParams]
  );

  const setParams = useCallback(
    (params: Record<string, string | number>) => {
      setSearchParams((prev) => {
        Object.entries(params).forEach(([key, value]) => {
          prev.set(key, String(value));
        });
        return prev;
      });
    },
    [setSearchParams]
  );

  const removeParam = useCallback(
    (key: string) => {
      setSearchParams((prev) => {
        prev.delete(key);
        return prev;
      });
    },
    [setSearchParams]
  );

  /**
   * Clear all query parameters
   */
  const clearParams = useCallback(() => {
    setSearchParams({});
  }, [setSearchParams]);

  return {
    getParam,
    getNumberParam,
    setParam,
    setParams,
    removeParam,
    clearParams,
    searchParams,
  };
};
