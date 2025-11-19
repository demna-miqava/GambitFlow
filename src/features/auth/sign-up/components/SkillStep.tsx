import { Button } from "@/components/ui/button";
import type { SkillOption, SignupSkill } from "../types";

type SkillStepProps = {
  options: SkillOption[];
  selectedSkill: SignupSkill | null;
  onSelectSkill: (value: SignupSkill) => void;
  onContinue: () => void;
};

export const SkillStep = ({
  options,
  selectedSkill,
  onSelectSkill,
  onContinue,
}: SkillStepProps) => {
  return (
    <div className="space-y-8">
      <div className="space-y-3 text-center">
        <h2 className="text-3xl font-semibold text-foreground">
          What is your chess skill level?
        </h2>
        <p className="text-sm text-muted-foreground">
          A starting point for smart match pairings and curated training plans.
        </p>
      </div>

      <div className="flex flex-col gap-3">
        {options.map((skill) => {
          const isActive = selectedSkill === skill.value;
          return (
            <button
              key={skill.value}
              type="button"
              onClick={() => onSelectSkill(skill.value)}
              className={`flex w-full items-center justify-between rounded-2xl border px-5 py-4 text-left transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background ${
                isActive
                  ? "border-primary bg-primary/10"
                  : "border-border bg-muted hover:bg-accent"
              }`}
            >
              <span className="flex flex-col">
                <span className="text-base font-semibold text-foreground">
                  {skill.title}
                </span>
                <span className="text-xs text-muted-foreground">
                  {skill.description}
                </span>
                {skill.badge && (
                  <span className="mt-1 text-xs font-semibold uppercase tracking-wide text-primary">
                    {skill.badge}
                  </span>
                )}
              </span>
              <span className="text-2xl text-primary">{skill.icon}</span>
            </button>
          );
        })}
      </div>

      <Button
        onClick={onContinue}
        disabled={!selectedSkill}
        className="w-full rounded-full px-8 py-6 text-base font-semibold disabled:opacity-60"
      >
        Continue
      </Button>
    </div>
  );
};
