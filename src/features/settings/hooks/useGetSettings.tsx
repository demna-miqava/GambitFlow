import { QKEY_USER_SETTINGS } from "@/constants/queryKeys";
import { useUser } from "@/hooks/useUser";
import { getSettings } from "@/services/settings";
import { useQuery } from "@tanstack/react-query";

export const useGetSettings = () => {
  const { id: userId } = useUser();
  const query = useQuery({
    queryFn: getSettings,
    queryKey: [QKEY_USER_SETTINGS],
    enabled: !!userId,
    staleTime: 1000 * 60 * 5,
  });

  return {
    settings: query.data?.data || {},
    ...query,
  };
};
