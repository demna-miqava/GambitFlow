import { Navigate, useLocation } from "react-router-dom";
import { useUser } from "@/hooks/useUser";
import { FullScreenLoader } from "./FullScreenLoader";
import { ROUTES } from "@/constants/routes";

const publicRoutes: string[] = [
  ROUTES.LANDING,
  ROUTES.AUTH.SIGN_IN,
  ROUTES.AUTH.SIGN_UP,
  ROUTES.AUTH.FORGOT_PASSWORD,
];

const AuthGuard = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();
  const isPublicRoute = publicRoutes.includes(location.pathname);
  const { id, isPending } = useUser();

  if (isPending) {
    return <FullScreenLoader />;
  }
  // User is authenticated
  if (id) {
    // Redirect authenticated users away from public routes
    if (isPublicRoute) {
      return <Navigate to={ROUTES.HOME} replace />;
    }
  } else {
    // User is not authenticated
    // Redirect unauthenticated users to signin
    if (!isPublicRoute) {
      return <Navigate to={ROUTES.AUTH.SIGN_IN} replace />;
    }
  }

  return <>{children}</>;
};

export default AuthGuard;
