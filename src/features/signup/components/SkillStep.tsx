import { Button } from "@/components/ui/button";
import type { SkillOption } from "../types";

type SkillStepProps = {
  options: SkillOption[];
  selectedSkill: string | null;
  onSelectSkill: (value: string) => void;
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
        <h2 className="text-3xl font-semibold text-white">
          What is your chess skill level?
        </h2>
        <p className="text-sm text-white/60">
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
              className={`flex w-full items-center justify-between rounded-2xl border px-5 py-4 text-left transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lime-400 focus-visible:ring-offset-2 focus-visible:ring-offset-background ${
                isActive
                  ? "border-lime-500 bg-lime-500/10 shadow-[0_0_0_1px_rgba(132,204,22,0.45)]"
                  : "border-white/10 bg-white/5 hover:border-white/20"
              }`}
            >
              <span className="flex flex-col">
                <span className="text-base font-semibold text-white">
                  {skill.title}
                </span>
                <span className="text-xs text-white/50">
                  {skill.description}
                </span>
                {skill.badge && (
                  <span className="mt-1 text-xs font-semibold uppercase tracking-wide text-lime-400">
                    {skill.badge}
                  </span>
                )}
              </span>
              <span className="text-2xl text-lime-400">{skill.icon}</span>
            </button>
          );
        })}
      </div>

      <Button
        onClick={onContinue}
        disabled={!selectedSkill}
        className="w-full rounded-full bg-lime-500 px-8 py-6 text-base font-semibold text-lime-950 transition hover:bg-lime-400 disabled:opacity-60"
      >
        Continue
      </Button>
    </div>
  );
};
