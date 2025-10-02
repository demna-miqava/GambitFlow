const InfoSection = ({
  userName,
  fullName,
  joinedAt,
  friendsCount,
}: {
  userName: string;
  fullName: string;
  joinedAt: string;
  friendsCount: number;
}) => {
  return (
    <div className="flex h-full flex-col gap-2">
      <div className="space-y-1">
        <h1 className="text-2xl font-bold">{fullName}</h1>
        <span className="text-sm text-gray-500">@{userName}</span>
      </div>
      <div className="mt-auto flex items-center gap-2 text-sm text-white/70">
        <span>Joined {joinedAt}</span>
        <span>•</span>
        <span>{friendsCount} friends</span>
      </div>
    </div>
  );
};

export default InfoSection;
