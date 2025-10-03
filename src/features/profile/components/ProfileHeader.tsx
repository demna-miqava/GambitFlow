import { useUser } from "@/hooks/useUser";
import InfoSection from "./InfoSection";

const ProfileHeader = () => {
  const { userName, fullName, joinedAt, friendsCount, image } = useUser();
  return (
    <header className="w-full flex flex-wrap items-start gap-6 border p-4 rounded-lg">
      <img
        src={image}
        alt={userName}
        className="size-40 rounded-md object-cover sm:size-48"
      />
      <InfoSection
        userName={userName}
        fullName={fullName}
        joinedAt={joinedAt}
        friendsCount={friendsCount}
      />
    </header>
  );
};

export default ProfileHeader;
