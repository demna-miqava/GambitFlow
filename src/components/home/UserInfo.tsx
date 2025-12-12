import { Link } from "react-router-dom";
import { useUser } from "@/hooks/useUser";
import { UserAvatar } from "@/components/UserAvatar";
import { getProfileRoute } from "@/constants/routes";

export const UserInfo = () => {
  const { image, username, id } = useUser();

  return (
    <div className="flex items-center gap-2">
      <Link to={getProfileRoute(id || 0)}>
        <UserAvatar src={image} username={username} />
      </Link>
      <span className="text-sm font-medium">{username}</span>
    </div>
  );
};
