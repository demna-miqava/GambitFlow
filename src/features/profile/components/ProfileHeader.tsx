import { useUser } from "@/hooks/useUser";
import InfoSection from "./InfoSection";

const ProfileHeader = () => {
  const { userName, fullName, joinedAt, friendsCount } = useUser();
  return (
    <header className="w-full flex flex-wrap items-start gap-6 border p-4 rounded-lg">
      <img
        src={
          "https://images.chesscomfiles.com/uploads/v1/user/221994941.525197ea.200x200o.7f9a4d16a29f.jpg"
        }
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
