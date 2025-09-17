import { Progress } from "@/components/ui/progress";

interface ProgressIndicatorProps {
  currentStep: number;
  totalSteps: number;
  stepLabels?: string[];
}

export const ProgressIndicator = ({ 
  currentStep, 
  totalSteps, 
  stepLabels = [] 
}: ProgressIndicatorProps) => {
  const progress = (currentStep / totalSteps) * 100;
  
  return (
    <div className="w-full max-w-2xl mx-auto mb-8">
      <div className="flex justify-between items-center mb-3">
        <span className="text-sm font-medium text-muted-foreground">
          Step {currentStep} of {totalSteps}
        </span>
        <span className="text-sm font-medium text-primary">
          {Math.round(progress)}% Complete
        </span>
      </div>
      
      <Progress value={progress} className="h-2" />
      
      {stepLabels.length > 0 && (
        <div className="flex justify-between mt-2 text-xs text-muted-foreground">
          {stepLabels.map((label, index) => (
            <span
              key={index}
              className={`${
                index < currentStep 
                  ? "text-primary font-medium" 
                  : index === currentStep - 1 
                    ? "text-foreground font-medium" 
                    : "text-muted-foreground"
              }`}
            >
              {label}
            </span>
          ))}
        </div>
      )}
    </div>
  );
};