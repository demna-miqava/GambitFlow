import { useUser as useClerkUser } from "@clerk/clerk-react";
import { useQuery } from "@tanstack/react-query";
import { getProfileStatus } from "@/services/user";
import { DEFAULT_AVATAR_URL } from "@/constants/defaults";
import { QKEY_PROFILE_STATUS } from "@/constants/queryKeys";

export const useUser = () => {
  const { user: clerkUser, isLoaded: clerkLoaded, isSignedIn } = useClerkUser();

  const {
    data: profileStatus,
    isFetched: profileFetched,
    refetch,
  } = useQuery({
    queryKey: [QKEY_PROFILE_STATUS],
    queryFn: getProfileStatus,
    enabled: clerkLoaded && isSignedIn,
  });

  const chessProfile = profileStatus?.user;

  const { blitzRating, rapidRating, bulletRating } = chessProfile || {};

  const hasProfile = profileStatus?.hasProfile ?? false;
  // Use chess profile data when available, fall back to Clerk data
  const id = chessProfile?.id;
  const username =
    chessProfile?.username || clerkUser?.username || clerkUser?.fullName || "";
  const image =
    chessProfile?.avatarUrl || clerkUser?.imageUrl || DEFAULT_AVATAR_URL;
  const email =
    chessProfile?.email || clerkUser?.primaryEmailAddress?.emailAddress;

  // isPending until Clerk loaded AND profile status fetched (when signed in)
  const isPending = !clerkLoaded || (isSignedIn && !profileFetched);
  const isAuthenticated = clerkLoaded && isSignedIn;

  return {
    id,
    username,
    image,
    email,
    rapidRating,
    blitzRating,
    bulletRating,
    isPending,
    isAuthenticated,
    hasProfile,
    chessProfile,
    error: null,
    refetch,
  };
};
