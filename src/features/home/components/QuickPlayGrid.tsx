import { Bot, Handshake, Plus, Zap } from "lucide-react";
import { useMemo } from "react";
import { Link } from "react-router-dom";
import { ROUTES } from "@/constants/routes";

export const QuickPlayGrid = () => {
  // TODO: should come from API
  const previouslyPlayedTimeControl = "15 | 10";

  const gridOptions = useMemo(() => {
    return [
      {
        title: `Play ${previouslyPlayedTimeControl} `,
        description: "Fast-paced blitz match",
        icon: Zap,
        state: {
          timeControl: previouslyPlayedTimeControl,
        },
      },
      {
        title: "New Game",
        description: "Start a fresh challenge",
        icon: Plus,
        state: {
          section: "new",
        },
      },
      {
        title: "Play Bots",
        description: "Practice against the engine",
        icon: Bot,
        state: {
          section: "bots",
        },
      },
      {
        title: "Play a Friend",
        description: "Invite someone to play",
        icon: Handshake,
        state: {
          section: "friends",
        },
      },
    ];
  }, [previouslyPlayedTimeControl]);

  return (
    <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {gridOptions.map((option) => (
        <Link key={option.title} to={ROUTES.PLAY} state={option.state}>
          <div className="border-border/60 bg-card text-card-foreground hover:border-sidebar-ring/80 hover:shadow-lg transition-colors rounded-xl border p-6 flex items-center gap-4 h-full">
            <option.icon size={30} className="flex-shrink-0" />
            <div className="flex-1 min-w-0">
              <h3 className="text-lg font-semibold">{option.title}</h3>
              <p className="text-muted-foreground mt-2 text-sm">
                {option.description}
              </p>
            </div>
          </div>
        </Link>
      ))}
    </section>
  );
};
