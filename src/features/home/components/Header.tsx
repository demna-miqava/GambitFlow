import { Mail, Settings, Users } from "lucide-react";
import { UserInfo } from "./userInfo";

export const Header = () => {
  return (
    <div className="flex justify-between items-center">
      <UserInfo />

      <div className="flex items-center gap-4">
        <Users />
        <Mail />
        <Settings />
      </div>
    </div>
  );
};
