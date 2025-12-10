import { useProfileSetup } from "./hooks/useProfileSetup";
import { UsernameStep } from "./components/UsernameStep";
import { SkillStep } from "./components/SkillStep";

export const ProfileSetupContainer = () => {
  const {
    form,
    step,
    isCheckingUsername,
    isUsernameAvailable,
    showAvailabilityStatus,
    canProceedToSkill,
    isCreatingProfile,
    goToSkillStep,
    goToUsernameStep,
    onSubmit,
    selectSkill,
  } = useProfileSetup();

  const selectedSkill = form.watch("skill");

  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-background p-4">
      <div className="w-full max-w-md">
        {step === "username" && (
          <UsernameStep
            form={form}
            isCheckingUsername={isCheckingUsername}
            isUsernameAvailable={isUsernameAvailable}
            showAvailabilityStatus={showAvailabilityStatus}
            canProceed={canProceedToSkill}
            onContinue={goToSkillStep}
          />
        )}
        {step === "skill" && (
          <SkillStep
            selectedSkill={selectedSkill}
            onSelectSkill={selectSkill}
            onContinue={onSubmit}
            onBack={goToUsernameStep}
            isLoading={isCreatingProfile}
          />
        )}
      </div>
    </div>
  );
};
