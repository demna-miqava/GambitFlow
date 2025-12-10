import { Button } from "@/components/ui/button";
import { type SignupSkill } from "../types";
import { SKILL_OPTIONS } from "../consts";
import SkillOption from "./SkillOption";

type SkillStepProps = {
  selectedSkill: SignupSkill | undefined;
  onSelectSkill: (value: SignupSkill) => void;
  onContinue: () => void;
  onBack: () => void;
  isLoading: boolean;
};

export const SkillStep = ({
  selectedSkill,
  onSelectSkill,
  onContinue,
  onBack,
  isLoading,
}: SkillStepProps) => {
  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <button
          type="button"
          onClick={onBack}
          className="text-sm text-muted-foreground hover:text-foreground"
        >
          ← Back
        </button>
        <div className="space-y-3 text-center">
          <h2 className="text-3xl font-semibold text-foreground">
            What is your chess skill level?
          </h2>
          <p className="text-sm text-muted-foreground">
            A starting point for smart match pairings and curated training
            plans.
          </p>
        </div>
      </div>

      <div className="flex flex-col gap-3">
        {SKILL_OPTIONS.map((skill) => {
          const isActive = selectedSkill === skill.value;
          return (
            <SkillOption
              skill={skill}
              onSelectSkill={onSelectSkill}
              isActive={isActive}
            />
          );
        })}
      </div>

      <Button
        onClick={onContinue}
        disabled={!selectedSkill || isLoading}
        className="w-full rounded-full px-8 py-6 text-base font-semibold disabled:opacity-60"
      >
        {isLoading ? "Creating profile..." : "Continue"}
      </Button>
    </div>
  );
};
