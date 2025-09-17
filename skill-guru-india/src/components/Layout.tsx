import { ReactNode } from "react";

interface LayoutProps {
  children: ReactNode;
  showProgress?: boolean;
  currentStep?: number;
  totalSteps?: number;
  stepLabels?: string[];
}

export const Layout = ({ 
  children, 
  showProgress = false, 
  currentStep, 
  totalSteps, 
  stepLabels 
}: LayoutProps) => {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b border-border px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-sm">CP</span>
            </div>
            <h1 className="text-xl font-semibold text-foreground">CareerPath</h1>
          </div>
          
          {showProgress && currentStep && totalSteps && (
            <div className="hidden md:flex items-center space-x-4 text-sm text-muted-foreground">
              <span>Step {currentStep} of {totalSteps}</span>
              <div className="w-32 h-1 bg-muted rounded-full overflow-hidden">
                <div 
                  className="h-full bg-primary transition-all duration-300"
                  style={{ width: `${(currentStep / totalSteps) * 100}%` }}
                />
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 px-6 py-8">
        <div className="max-w-4xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
};