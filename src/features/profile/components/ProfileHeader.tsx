import { useUserProfile } from "../hooks/useUserProfile";
import InfoSection from "./InfoSection";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import { DEFAULT_AVATAR_URL } from "@/constants/defaults";

const ProfileHeader = () => {
  const { profile, isPending } = useUserProfile();
  const username = profile?.username || "";
  const avatarUrl = profile?.avatarUrl || DEFAULT_AVATAR_URL;
  const joinedAt = profile?.createdAt || "";
  const friendsCount = profile?.friendCount || 0;

  if (isPending) {
    return (
      <header className="w-full flex flex-wrap items-start gap-6 border p-4 rounded-lg">
        <Skeleton className="size-40 sm:size-48 rounded-full" />
        <div className="flex h-full flex-col gap-2">
          <div className="space-y-1">
            <Skeleton className="h-8 w-48" />
          </div>
          <div className="mt-auto flex items-center gap-2">
            <Skeleton className="h-4 w-32" />
            <Skeleton className="h-4 w-4 rounded-full" />
            <Skeleton className="h-4 w-24" />
          </div>
        </div>
      </header>
    );
  }

  return (
    <header className="w-full flex flex-wrap items-start gap-6 border p-4 rounded-lg">
      <Avatar className="size-40 sm:size-48">
        <AvatarImage src={avatarUrl} alt={username} />
        <AvatarFallback>{username.charAt(0)}</AvatarFallback>
      </Avatar>
      <InfoSection
        username={username}
        joinedAt={joinedAt}
        friendsCount={friendsCount}
      />
    </header>
  );
};

export default ProfileHeader;
