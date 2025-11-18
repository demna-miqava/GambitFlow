import { Suspense } from "react";
import AuthGuard from "./components/AuthGuard";
import { FullScreenLoader } from "./components/FullScreenLoader";
import { AppRoutes } from "./routes/AppRoutes";

function App() {
  return (
    <AuthGuard>
      <Suspense fallback={<FullScreenLoader />}>
        <AppRoutes />
      </Suspense>
    </AuthGuard>
  );
}

export default App;
