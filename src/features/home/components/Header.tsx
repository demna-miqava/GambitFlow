import { Mail, Settings, Users } from "lucide-react";
import { UserInfo } from "./UserInfo";
import { Link } from "react-router";

export const Header = () => {
  return (
    <div className="flex justify-between items-center">
      <UserInfo />

      <nav className="flex items-center gap-4" aria-label="Quick actions">
        <Link to="/" aria-label="View friends list">
          <Users className="h-5 w-5" aria-hidden="true" />
        </Link>
        <Link to="/" aria-label="View Messages">
          <Mail className="h-5 w-5" aria-hidden="true" />
        </Link>
        <Link to="/settings" aria-label="Open settings">
          <Settings className="h-5 w-5" aria-hidden="true" />
        </Link>
      </nav>
    </div>
  );
};
