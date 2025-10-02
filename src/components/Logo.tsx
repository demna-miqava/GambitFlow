const heroImage =
  "https://digital-game-technology-2021.imgix.net/media/Headers/dgt-electronic-plastic-chess-pieces.jpg?auto=format&crop=focalpoint&domain=digital-game-technology-2021.imgix.net&fit=crop&fp-x=0.5&fp-y=0.5&h=721&ixlib=php-3.3.1&q=82&w=1081";

const Logo = () => {
  return (
    <div className="relative w-full max-w-lg overflow-hidden rounded-3xl shadow-[0_30px_120px_rgba(0,0,0,0.45)]">
      <img
        src={heroImage}
        alt="Chess pieces"
        className="h-full w-full object-cover"
      />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-black via-transparent to-black/70" />
    </div>
  );
};

export default Logo;
