import Logo from "@/components/Logo";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "@/constants/routes";

const IntroPage = () => {
  const navigate = useNavigate();
  return (
    <div className="flex gap-20 max-w-8xl mx-auto bg-black h-screen items-center justify-center">
      <Logo />

      <div className="flex flex-col gap-4">
        <h1 className="text-2xl font-bold text-foreground">Welcome to ChessHub</h1>
        <p className="text-sm text-muted-foreground">
          Improve your chess skills with our app. Enjoy!
        </p>
        <Button onClick={() => navigate(ROUTES.AUTH.SIGN_UP)}>Get Started</Button>
      </div>
    </div>
  );
};

export default IntroPage;
