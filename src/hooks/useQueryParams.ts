import { useSearchParams } from "react-router-dom";
import { useCallback, useMemo } from "react";

export const useQueryParams = (key: string, defaultValue: string = "") => {
  const [searchParams, setSearchParams] = useSearchParams();

  const value = useMemo(() => {
    return searchParams.get(key) || defaultValue;
  }, [searchParams, key, defaultValue]);

  const setValue = useCallback(
    (newValue: string | undefined) => {
      if (newValue === undefined || newValue === "") {
        searchParams.delete(key);
      } else {
        searchParams.set(key, newValue);
      }
      setSearchParams(searchParams);
    },
    [searchParams, setSearchParams, key]
  );

  return [value, setValue] as const;
};
