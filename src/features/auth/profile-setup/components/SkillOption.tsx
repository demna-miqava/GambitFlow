import type { SignupSkill, SkillOption as TSkillOption } from "../types";

type SkillOptionProps = {
  skill: TSkillOption;
  onSelectSkill: (value: SignupSkill) => void;
  isActive: boolean;
};

const SkillOption = ({ skill, onSelectSkill, isActive }: SkillOptionProps) => {
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
};
export default SkillOption;
