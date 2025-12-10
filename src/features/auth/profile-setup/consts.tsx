import { Crown, Shield, Sparkles, Trophy } from "lucide-react";
import type { SkillOption } from "./types";

export const SKILL_OPTIONS: SkillOption[] = [
  {
    value: "new",
    title: "New to Chess",
    description: "Learn the basics with gentle opponents and guided lessons.",
    badge: "Most common",
    icon: <Sparkles className="size-6" />,
  },
  {
    value: "beginner",
    title: "Beginner",
    description: "You play casually and want structure & tactics practice.",
    icon: <Shield className="size-6" />,
  },
  {
    value: "intermediate",
    title: "Intermediate",
    description: "You know openings and crave stronger competition.",
    icon: <Trophy className="size-6" />,
  },
  {
    value: "advanced",
    title: "Advanced",
    description: "Tournament-ready and looking for deep analysis.",
    icon: <Crown className="size-6" />,
  },
];
