import { Handshake, Plus, Puzzle, Zap } from "lucide-react";
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
        to: ROUTES.PLAY,
        description: "Fast-paced blitz match",
        icon: Zap,
        state: {
          timeControl: previouslyPlayedTimeControl,
        },
      },
      {
        title: "New Game",
        description: "Start a fresh challenge",
        to: ROUTES.PLAY,
        icon: Plus,
        state: {
          section: "new",
        },
      },
      {
        title: "Solve Puzzle",
        to: "/puzzles",
        description: "Challenge yourself with a puzzle",
        icon: Puzzle,
      },
      {
        title: "Play a Friend",
        description: "Invite someone to play",
        to: ROUTES.PLAY,
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
        <Link key={option.title} to={option.to} state={option.state}>
          <div className="h-full flex items-center rounded-xl border p-6 gap-4 border-border/60 bg-card text-card-foreground hover:border-sidebar-ring/80 hover:shadow-lg transition-all">
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
