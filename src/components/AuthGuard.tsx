import { Navigate, useLocation } from "react-router-dom";
import { useUser } from "@/hooks/useUser";
import { FullScreenLoader } from "./FullScreenLoader";
import { ROUTES } from "@/constants/routes";

const publicRoutes: string[] = [
  ROUTES.LANDING,
  ROUTES.AUTH.SIGN_IN,
  ROUTES.AUTH.SIGN_UP,
];

const AuthGuard = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();
  const isPublicRoute = publicRoutes.includes(location.pathname);
  const isProfileSetupRoute = location.pathname === ROUTES.AUTH.PROFILE_SETUP;
  const { isPending, isAuthenticated, hasProfile } = useUser();

  if (isPending) {
    return <FullScreenLoader />;
  }

  // User is authenticated via Clerk
  if (isAuthenticated) {
    // User doesn't have a chess profile yet
    if (!hasProfile) {
      // Already on profile setup page, allow
      if (isProfileSetupRoute) {
        return <>{children}</>;
      }
      // Redirect to profile setup
      return <Navigate to={ROUTES.AUTH.PROFILE_SETUP} replace />;
    }

    // User has profile - redirect away from public routes and profile setup
    if (isPublicRoute || isProfileSetupRoute) {
      return <Navigate to={ROUTES.HOME} replace />;
    }
  } else {
    // User is not authenticated
    // Allow public routes
    if (isPublicRoute) {
      return <>{children}</>;
    }
    // Redirect unauthenticated users to signin
    return <Navigate to={ROUTES.AUTH.SIGN_IN} replace />;
  }

  return <>{children}</>;
};

export default AuthGuard;
