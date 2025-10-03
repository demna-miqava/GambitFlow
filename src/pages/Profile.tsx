import { Outlet } from "react-router";

import ProfileHeader from "@/features/profile/components/ProfileHeader";
import ProfileTabs from "@/features/profile/components/ProfileTabs";

const Profile = () => {
  return (
    <div className="mx-auto max-w-8xl py-6 md:px-16 space-y-8">
      <ProfileHeader />
      <ProfileTabs />
      <div className="space-y-8">
        <Outlet />
      </div>
    </div>
  );
};

export default Profile;
