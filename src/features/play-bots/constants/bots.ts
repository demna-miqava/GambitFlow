export interface Bot {
  id: string;
  name: string;
  rating: number;
  description: string;
}

export const BOTS: Bot[] = [
  {
    id: "beginner-bot",
    name: "Beginner Bot",
    rating: 300,
    description: "Just learning the rules. Makes many mistakes.",
  },
  {
    id: "casual-bot",
    name: "Casual Carl",
    rating: 600,
    description: "A casual player who enjoys the game.",
  },
  {
    id: "improving-bot",
    name: "Improving Ivan",
    rating: 900,
    description: "Working hard to get better at chess.",
  },
  {
    id: "club-bot",
    name: "Club Player Clara",
    rating: 1200,
    description: "A solid club-level player with good fundamentals.",
  },
  {
    id: "intermediate-bot",
    name: "Intermediate Igor",
    rating: 1500,
    description: "Knows tactics and basic endgames well.",
  },
  {
    id: "advanced-bot",
    name: "Advanced Alex",
    rating: 1800,
    description: "Strong tactical vision and positional understanding.",
  },
  {
    id: "expert-bot",
    name: "Expert Elena",
    rating: 2100,
    description: "Expert-level player with deep strategic knowledge.",
  },
  {
    id: "master-bot",
    name: "Master Gary",
    rating: 2400,
    description: "National master level. Rarely makes mistakes.",
  },
  {
    id: "grandmaster-bot",
    name: "Grandmaster Magnus",
    rating: 2800,
    description: "World-class player. Extremely difficult to beat.",
  },
  {
    id: "stockfish-bot",
    name: "Stockfish Supreme",
    rating: 3500,
    description: "Maximum engine strength. Nearly unbeatable.",
  },
];

export const getBotById = (id: string): Bot | undefined => {
  return BOTS.find((bot) => bot.id === id);
};
