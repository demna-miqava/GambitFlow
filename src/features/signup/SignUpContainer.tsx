import { Button } from "@/components/ui/button";
import { SKILL_OPTIONS, STEP_COPY } from "./consts";
import { useStepsNavigation } from "./hooks/useStepsNavigation";
import { ArrowLeft } from "lucide-react";
import Header from "./components/Header";
import { IntroStep } from "./components/IntroStep";
import { SkillStep } from "./components/SkillStep";
import { CredentialsStep } from "./components/CredentialsStep";
import { useState } from "react";

export const SignUpContainer = () => {
  const { currentStep, goNext, goBack, canGoBack } = useStepsNavigation();

  const [selectedSkill, setSelectedSkill] = useState<string | null>(null);

  const { title } = STEP_COPY[currentStep];

  return (
    <div className="flex min-h-screen flex-col bg-[#0d0f14] text-white">
      <div className="flex items-center gap-2 px-6 py-6">
        {canGoBack && (
          <Button
            variant="ghost"
            size="icon"
            onClick={goBack}
            className="size-10 rounded-full border border-white/10 bg-white/5 text-white hover:bg-white/10 absolute top-5 left-[15%]"
          >
            <ArrowLeft className="size-5" />
          </Button>
        )}
      </div>

      <div className="w-full max-w-xl mx-auto">
        <Header>
          <span className="text-base text-white/60 text-center">{title}</span>
        </Header>
        <main className="mt-10">
          <div className="w-full max-w-xl">
            {currentStep === "intro" && (
              <IntroStep
                onEmailSignup={goNext}
                onGoogleSignup={() => {
                  /* TODO: hook up OAuth */
                }}
              />
            )}

            {currentStep === "skill" && (
              <SkillStep
                options={SKILL_OPTIONS}
                selectedSkill={selectedSkill}
                onSelectSkill={setSelectedSkill}
                onContinue={goNext}
              />
            )}

            {currentStep === "credentials" && (
              <CredentialsStep selectedSkill={selectedSkill!} />
            )}
          </div>
        </main>
      </div>
    </div>
  );
};
