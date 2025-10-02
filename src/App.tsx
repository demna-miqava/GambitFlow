import { Route, Routes } from "react-router";
// Protected
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";
import Play from "./pages/CreateGame";
// Public
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import IntroPage from "./pages/IntroPage";
// Components
import ProtectedRoute from "./components/ProtectedRoute";
import { AppLayout } from "./components/AppLayout";

function App() {
  return (
    <Routes>
      <Route
        element={
          <ProtectedRoute>
            <AppLayout />
          </ProtectedRoute>
        }
      >
        <Route path="/home" element={<Home />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/play" element={<Play />} />
        <Route path="/settings" element={<Settings />} />
      </Route>
      <Route path="/" element={<IntroPage />} />
      <Route path="/signin" element={<SignIn />} />
      <Route path="/signup" element={<SignUp />} />
    </Routes>
  );
}

export default App;
