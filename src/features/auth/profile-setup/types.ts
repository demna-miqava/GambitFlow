import type { ReactNode } from "react";

export type SignupSkill = "new" | "beginner" | "intermediate" | "advanced";

export type SkillOption = {
  value: SignupSkill;
  title: string;
  description: string;
  badge?: string;
  icon?: ReactNode;
};
