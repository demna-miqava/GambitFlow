import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router";

const heroImage =
  "https://digital-game-technology-2021.imgix.net/media/Headers/dgt-electronic-plastic-chess-pieces.jpg?auto=format&crop=focalpoint&domain=digital-game-technology-2021.imgix.net&fit=crop&fp-x=0.5&fp-y=0.5&h=721&ixlib=php-3.3.1&q=82&w=1081";

const IntroPage = () => {
  const navigate = useNavigate();
  return (
    <div className="flex gap-20 max-w-8xl mx-auto bg-black h-screen items-center justify-center">
      <div className="relative w-full max-w-lg overflow-hidden rounded-3xl shadow-[0_30px_120px_rgba(0,0,0,0.45)]">
        <img
          src={heroImage}
          alt="Chess pieces"
          className="h-full w-full object-cover"
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-black via-transparent to-black/70" />
      </div>

      <div className="flex flex-col gap-4">
        <h1 className="text-2xl font-bold">Welcome to Chess App</h1>
        <p className="text-sm text-gray-500">
          Improve your chess skills with our app. Enjoy!
        </p>
        <Button onClick={() => navigate("/signup")}>Get Started</Button>
      </div>
    </div>
  );
};

export default IntroPage;
