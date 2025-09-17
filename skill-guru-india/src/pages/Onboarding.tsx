import { useState } from "react";

import { PersonalInfoForm } from "@/components/PersonalInfoForm";
import { CareerInfoForm } from "@/components/CareerInfoForm";
import { DocumentUpload } from "@/components/DocumentUpload";
import Profile from "./Profile";

type OnboardingStep = "personal" | "career" | "documents" | "completed";

const Onboarding = () => {
  const [currentStep, setCurrentStep] = useState<OnboardingStep>("personal");

  const handleStepComplete = (nextStep: OnboardingStep) => {
    setCurrentStep(nextStep);
  };

  const handleStepBack = (prevStep: OnboardingStep) => {
    setCurrentStep(prevStep);
  };

  const renderCurrentStep = () => {
    switch (currentStep) {
      case "personal":
        return (
          <PersonalInfoForm
            onNext={() => handleStepComplete("career")}
            // No more going back to auth
            onBack={() => {}}
          />
        );
      case "career":
        return (
          <CareerInfoForm
            onNext={() => handleStepComplete("documents")}
            onBack={() => handleStepBack("personal")}
          />
        );
      case "documents":
        return (
          <DocumentUpload
            onNext={() => handleStepComplete("completed")}
            onBack={() => handleStepBack("career")}
          />
        );
      case "completed":
        return <Profile />;
    }
  };

  return renderCurrentStep();
};

export default Onboarding;
