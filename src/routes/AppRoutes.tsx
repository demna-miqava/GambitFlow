import { Route, Routes } from "react-router-dom";
import { lazy } from "react";
import { ROUTES } from "@/constants/routes";
import { AppLayout } from "@/components/AppLayout";
// Protected
const Home = lazy(() => import("@/pages/Home"));
const Settings = lazy(() => import("@/pages/Settings"));
const Play = lazy(() => import("@/pages/CreateGame"));
const ArchiveGame = lazy(() => import("@/pages/ArchiveGame"));
// Profile
const Profile = lazy(() => import("@/pages/Profile"));
const ProfileStats = lazy(() => import("@/pages/ProfileStats"));
const ProfileOverview = lazy(() => import("@/pages/ProfileOverview"));
const ProfileGames = lazy(() => import("@/pages/ProfileGames"));
const ProfileFriends = lazy(() => import("@/pages/ProfileFriends"));
// Public
const SignIn = lazy(() => import("@/pages/SignIn"));
const SignUp = lazy(() => import("@/pages/SignUp"));
const IntroPage = lazy(() => import("@/pages/IntroPage"));
const ProfileSetup = lazy(() => import("@/pages/ProfileSetup"));
const CurrentGame = lazy(() => import("@/pages/CurrentGame"));

export const AppRoutes = () => {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route path={ROUTES.HOME} element={<Home />} />
        <Route path={ROUTES.PROFILE.ROOT} element={<Profile />}>
          <Route index element={<ProfileOverview />} />
          <Route path={ROUTES.PROFILE.GAMES} element={<ProfileGames />} />
          <Route path={ROUTES.PROFILE.STATS} element={<ProfileStats />} />
          <Route path={ROUTES.PROFILE.FRIENDS} element={<ProfileFriends />} />
        </Route>
        <Route path={ROUTES.PLAY} element={<Play />} />
        <Route path={ROUTES.GAME} element={<CurrentGame />} />
        <Route path={ROUTES.ARCHIVE_GAME} element={<ArchiveGame />} />
        <Route path={ROUTES.SETTINGS} element={<Settings />} />
      </Route>
      <Route path={ROUTES.LANDING} element={<IntroPage />} />
      <Route path={ROUTES.AUTH.SIGN_IN} element={<SignIn />} />
      <Route path={ROUTES.AUTH.SIGN_UP} element={<SignUp />} />
      <Route path={ROUTES.AUTH.PROFILE_SETUP} element={<ProfileSetup />} />
    </Routes>
  );
};
