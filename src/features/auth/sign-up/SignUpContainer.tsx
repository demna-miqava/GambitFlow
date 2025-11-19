import { useState } from "react";
import { Link } from "react-router-dom";
import { ROUTES } from "@/constants/routes";
import { ArrowLeft } from "lucide-react";

import { Button } from "@/components/ui/button";

import { CredentialsStep } from "./components/CredentialsStep";
import Header from "./components/Header";
import { IntroStep } from "./components/IntroStep";
import { SkillStep } from "./components/SkillStep";
import { SKILL_OPTIONS, STEP_COPY } from "./consts";
import { useStepsNavigation } from "./hooks/useStepsNavigation";
import type { SignupSkill } from "./types";

export const SignUpContainer = () => {
  const { currentStep, goNext, goBack, canGoBack } = useStepsNavigation();

  const [selectedSkill, setSelectedSkill] = useState<SignupSkill | null>(null);

  const { title } = STEP_COPY[currentStep];

  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <header className="mx-auto flex w-full max-w-xl items-center justify-between px-4 pt-6 sm:px-0">
        {canGoBack ? (
          <Button
            variant="ghost"
            size="icon"
            onClick={goBack}
            className="size-10 rounded-full border border-border bg-muted transition hover:bg-accent"
            aria-label="Go back"
          >
            <ArrowLeft className="size-5" />
          </Button>
        ) : (
          <span className="size-10" />
        )}

        {currentStep === "intro" ? (
          <Link
            to={ROUTES.AUTH.SIGN_IN}
            className="rounded-full border border-border bg-muted px-4 py-2 text-sm font-medium transition hover:bg-accent"
          >
            Log in
          </Link>
        ) : (
          <span className="size-10" />
        )}
      </header>

      <div className="mx-auto w-full max-w-xl px-4 pb-16 sm:px-0">
        <Header>
          <span className="text-base text-muted-foreground text-center">
            {title}
          </span>
        </Header>
        <main className="mt-10">
          <div className="w-full">
            {currentStep === "intro" && <IntroStep onEmailSignup={goNext} />}

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
