import ProfileHeader from "@/features/profile/components/ProfileHeader";
import ProfileTabs from "@/features/profile/components/ProfileTabs";

const Profile = () => {
  return (
    <div className="mx-auto max-w-8xl py-6 px-16">
      <ProfileHeader />
      <ProfileTabs />
    </div>
  );
};

export default Profile;
