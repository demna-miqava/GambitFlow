import { useMemo, useState } from "react";
import type { SignUpStep } from "../types";
import { STEPS } from "../consts";

export const useStepsNavigation = () => {
  const [currentStep, setCurrentStep] = useState<SignUpStep>("intro");

  const stepIndex = useMemo(
    () => STEPS.findIndex((step) => step === currentStep),
    [currentStep]
  );

  const canGoBack = stepIndex > 0;

  const goNext = () => {
    const next = STEPS[stepIndex + 1];
    if (next) {
      setCurrentStep(next);
    }
  };

  const goBack = () => {
    const prev = STEPS[stepIndex - 1];
    if (prev) {
      setCurrentStep(prev);
    }
  };

  return {
    currentStep,
    goNext,
    goBack,
    canGoBack,
  };
};
