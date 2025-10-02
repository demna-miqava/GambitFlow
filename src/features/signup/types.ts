import type { ReactNode } from "react";

export type SignUpStep = "intro" | "skill" | "credentials";

export type SkillOption = {
  value: string;
  title: string;
  description: string;
  badge?: string;
  icon?: ReactNode;
};
